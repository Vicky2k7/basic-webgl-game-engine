export class Model {
    constructor ( gl, program, modelData ) {
        this.gl = gl;
        this.program = program;
        this.modelData = modelData;

        this.vertexBuffer = this.gl.createBuffer ();
        this.gl.bindBuffer ( this.gl.ARRAY_BUFFER, this.vertexBuffer );
        this.gl.bufferData ( this.gl.ARRAY_BUFFER, new Float32Array ( this.modelData.vertices ), this.gl.STATIC_DRAW );

        this.indexBuffer = this.gl.createBuffer ();
        this.gl.bindBuffer ( this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer );
        this.gl.bufferData ( this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array ( this.modelData.indices ), this.gl.STATIC_DRAW );
    }

    render () {
        const vertPosAttribLoc = this.gl.getAttribLocation ( this.program, 'vertPos' );
        
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.vertexAttribPointer(
            vertPosAttribLoc, 
            3, 
            this.gl.FLOAT, 
            this.gl.FALSE, 
            3*Float32Array.BYTES_PER_ELEMENT, 
            0
        );
        
        this.gl.enableVertexAttribArray(vertPosAttribLoc);

        this.gl.bindBuffer (this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.drawElements (this.gl.TRIANGLES, this.modelData.indices.length, this.gl.UNSIGNED_SHORT, 0);
    }
}