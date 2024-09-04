export class Model {
    constructor ( gl, program, modelData, textureCordData ) {
        this.gl = gl;
        this.program = program;
        this.modelData = modelData;

        this.vertexBuffer = this.gl.createBuffer ();
        this.gl.bindBuffer ( this.gl.ARRAY_BUFFER, this.vertexBuffer );
        this.gl.bufferData ( this.gl.ARRAY_BUFFER, new Float32Array ( this.modelData.vertices ), this.gl.STATIC_DRAW );

        this.indexBuffer = this.gl.createBuffer ();
        this.gl.bindBuffer ( this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer );
        this.gl.bufferData ( this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array ( this.modelData.indices ), this.gl.STATIC_DRAW );

        this.textureCordBuffer = this.gl.createBuffer ();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData ( this.gl.ARRAY_BUFFER, new Float32Array ( this.modelData.texturecoords ), this.gl.STATIC_DRAW );

        this.texture = this.gl.createTexture ();
        this.gl.bindTexture ( this.gl.TEXTURE_2D, this.texture );
    }

    loadTexture ( url ) {
        this.image = new Image ();
        this.image.src = url;
    }

    render () {
        const vertPosAttribLoc = this.gl.getAttribLocation ( this.program, 'vertPos' );
        const texCoordAttribLocation = this.gl.getAttribLocation( this.program, 'vertTexCord');
        
        this.gl.bindBuffer ( this.gl.ARRAY_BUFFER, this.vertexBuffer );
        this.gl.bufferData ( this.gl.ARRAY_BUFFER, new Float32Array ( this.modelData.vertices ), this.gl.STATIC_DRAW );

        this.gl.vertexAttribPointer(
            vertPosAttribLoc, 
            3, 
            this.gl.FLOAT, 
            this.gl.FALSE, 
            3*Float32Array.BYTES_PER_ELEMENT, 
            0
        );
        this.gl.enableVertexAttribArray(vertPosAttribLoc);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCordBuffer);
        this.gl.bufferData ( this.gl.ARRAY_BUFFER, new Float32Array ( this.modelData.texturecoords ), this.gl.STATIC_DRAW );

        this.gl.vertexAttribPointer(
            texCoordAttribLocation,
            2,
            this.gl.FLOAT,
            this.gl.FALSE,
            2 * Float32Array.BYTES_PER_ELEMENT,
            0
        );
        this.gl.enableVertexAttribArray(texCoordAttribLocation);
        
        this.gl.bindTexture ( this.gl.TEXTURE_2D, this.texture );
        
        if ( this.image.complete )
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.image);
        else 
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
        

        this.gl.bindBuffer (this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.drawElements (this.gl.TRIANGLES, this.modelData.indices.length, this.gl.UNSIGNED_SHORT, 0);
    }
}