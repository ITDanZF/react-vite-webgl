#version 300 es

in  vec4 aPosition;
out vec4 vColor;
void main() {
    vColor = vec4((1.0+aPosition.xyz)/2.0, 1.0);
    gl_PointSize = 3.0;
    gl_Position = aPosition;
}
