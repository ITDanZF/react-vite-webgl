#version 300 es
in vec4 aPosition;
uniform float u;
void main() {
    gl_Position.x = -sin(u) * aPosition.y + cos(u) * aPosition.x;
    gl_Position.y = sin(u) * aPosition.x + cos(u) * aPosition.y;
    gl_Position.z = 0.0;
    gl_Position.w = 1.0;
}