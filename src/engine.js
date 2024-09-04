import { loadShader, createProgram } from "./utils.js";
import { Model } from "./model.js"

export class WebGLEngine {
    constructor ( canvas ) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext ("webgl");
	
        // Enabling back face culling.
        this.gl.enable ( this.gl.DEPTH_TEST );
        this.gl.enable (this.gl.CULL_FACE);
        this.gl.frontFace(this.gl.CCW);
        this.gl.cullFace(this.gl.BACK);

        this.bgCol = [0.3, 0.1, 0.1];

        // Setting up WebGL fallback.
        if ( !this.gl ) 
            this.gl = this.canvas.getContext ("experimental-webgl");
        if ( !this.gl )
            throw new Error ("WebGl is not supported on this machine.");

        this.models = [];
    }

    async initShader ( vertexShaderSource, fragmentShaderSource ) {
        const vertexShader = loadShader ( this.gl, this.gl.VERTEX_SHADER, vertexShaderSource );
        const fragmentShader = loadShader ( this.gl, this.gl.FRAGMENT_SHADER, fragmentShaderSource );

        this.program = createProgram ( this.gl, await vertexShader, await fragmentShader );
        this.gl.useProgram ( this.program );
        this.setupMatrices();
    }

    async loadModels ( models, textures ) {
        for ( let i = 0; i < models.length; i++ ) {
            const modelRaw = fetch ( models[i] );
            const modelJSON = (await modelRaw).json();
            const model = new Model ( this.gl, this.program, await modelJSON );
            model.loadTexture ( textures[i] );
            this.models.push ( model );
        }
        
            // Setting up texture parameters.
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    }

    setupMatrices () {
        this.matWorldUniformLocation = this.gl.getUniformLocation(this.program, 'mWorld');
        this.matViewUniformLocation = this.gl.getUniformLocation(this.program, 'mView');
        this.matProjUniformLocation = this.gl.getUniformLocation(this.program, 'mProj');

        this.worldMatrix = new Float32Array(16);
        this.viewMatrix = new Float32Array(16);
        this.projMatrix = new Float32Array(16);
        
        mat4.identity(this.worldMatrix);
        mat4.lookAt(this.viewMatrix, [0, 2, -7], [0, 0, 0], [0, 1, 0]);
        mat4.perspective(this.projMatrix, glMatrix.toRadian(45), this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000.0);
    
        this.gl.uniformMatrix4fv(this.matWorldUniformLocation, this.gl.FALSE, this.worldMatrix);
        this.gl.uniformMatrix4fv(this.matViewUniformLocation, this.gl.FALSE, this.viewMatrix);
        this.gl.uniformMatrix4fv(this.matProjUniformLocation, this.gl.FALSE, this.projMatrix);
    }

    start () {
        const identityMatrix = new Float32Array (16);
        mat4.identity (identityMatrix);

        const render = () => {
            this.gl.clearColor ( this.bgCol[0], this.bgCol[1], this.bgCol[2], 1.0 );
            this.gl.clear (this.gl.COLOR_BUFFER_BIT);

            if (this.models.length > 0)
                for ( const model of this.models ) model.render();

            // Rotation test.
            const angle = performance.now() / 1000 / 6 * 2*Math.PI;
            mat4.rotate (
                this.worldMatrix,
                identityMatrix,
                angle,
                [0, 1, 0]
            );

            this.gl.uniformMatrix4fv(this.matWorldUniformLocation, this.gl.FALSE, this.worldMatrix);
            // End test.

            requestAnimationFrame (render);
        }

        render();
    }
}