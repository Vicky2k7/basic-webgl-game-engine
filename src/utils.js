export async function loadShader ( gl, type, url ) {
    const shaderRaw = fetch ( url );
    const shaderText = (await shaderRaw).text();

    const shader = gl.createShader ( type );

    gl.shaderSource ( shader, await shaderText );
    gl.compileShader ( shader );

    if (!gl.getShaderParameter ( shader, gl.COMPILE_STATUS )) {
        console.error ( "Error compiling shader:", gl.getShaderInfoLog ( shader ) );
        
        gl.deleteShader ( shader );
        return null;
    }

    return shader;
}

export function createProgram ( gl, vertexShader, fragmentShader ) {
    const program = gl.createProgram ();
    gl.attachShader (program, vertexShader);
    gl.attachShader (program, fragmentShader);
    
    gl.linkProgram (program);

    if (!gl.getProgramParameter (program, gl.LINK_STATUS)) {
        console.error ("Error linking program: ", gl.getProgramInfoLog (program));

        gl.deleteProgram (program);
        return null;
    }

    return program;
}
