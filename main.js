import { WebGLEngine } from "./src/engine.js";

document.body.onload = async () => {
    const canvas = document.getElementById ("gc");
    const engine = new WebGLEngine ( canvas );

    await engine.initShader("./shaders/shader.vs.glsl", "./shaders/shader.fs.glsl");
    await engine.loadModels ( ["./assets/models/cube.json"] );
    engine.start();
}