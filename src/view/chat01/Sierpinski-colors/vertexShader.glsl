#version 300 es

in vec3 aPosition;
in vec4 aColor;
out vec4 vColor;

void main() {
    gl_PointSize = 3.0;
    vColor = aColor;
    gl_Position = vec4(aPosition, 1.0);
}
