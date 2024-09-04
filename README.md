# A basic HTML + JavaScript, WebGL game engine!
This program runs only on Javascript and HTML for the rendering and using [glMatrix](https://glmatrix.net/) for most of the linear algebra. 

### Usage:
To use the program in your own project you would have to copy over all most everything besides maybe the .html file and main.js which you can rewrite on your own.
Set up looks something like this:
```js
import { WebGLEngine } from "./src/engine.js";

document.body.onload = async () => {
    const canvas = document.getElementById ("gc");
    const engine = new WebGLEngine ( canvas );

    await engine.initShader("./shaders/shader.vs.glsl", "./shaders/shader.fs.glsl");
    await engine.loadModels ( ["./assets/models/cube.json"], ["./assets/textures/cube-texture.jpg"] );
    engine.start();
}
```
Where ```document.body.onload``` can be replaced by any function to will be eventually called. This function is asynchronous because ```initShader ()``` & ```loadModels``` has to call files from outside Javascript, and thus the rest of the code will have to wait on the delay.

### Use purposes:
For now this program is pretty bare bones, and doesn't really serve any purpose besides filling my time. I'm hoping to be able to use this in the future as standard boilerplate for projects I would like to work on.

### Todo:
- Phong lighting.
- Testing with more objects.
- Smooth lighting.
- Bump mapes.
- Bloom.