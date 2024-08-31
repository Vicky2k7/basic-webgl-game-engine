precision mediump float;

varying vec3 fragCol;

void main () {
    gl_FragColor = vec4 ( fragCol, 1.0 );
}