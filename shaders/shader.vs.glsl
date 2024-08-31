precision mediump float;

attribute vec3 vertPos;
attribute vec3 vertCol;
varying vec3 fragCol;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main () {
    fragCol = vertCol;
    gl_Position = mProj * mView * mWorld * vec4 ( vertPos, 1.0 );
}