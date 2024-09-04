precision mediump float;

attribute vec3 vertPos;
attribute vec2 vertTexCord;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

varying vec2 fragTexCord;

void main () {
    fragTexCord = vertTexCord;
    gl_Position = mProj * mView * mWorld * vec4 ( vertPos, 1.0 );
}