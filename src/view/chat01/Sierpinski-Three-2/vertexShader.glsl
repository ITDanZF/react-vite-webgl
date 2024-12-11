#version 300 es

in vec4 aPosition;
in vec4 aColor;
out vec4 vColor;
void main() {
    gl_Position = aPosition;
    gl_PointSize = 1.0;
    vColor = aColor;
}