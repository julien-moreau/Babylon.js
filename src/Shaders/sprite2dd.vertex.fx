// Attributes
attribute vec3 position;
attribute vec2 uv;

// Uniforms
uniform mat4 world;

// Varying
varying vec2 vUV;

void main(void)
{
    // UVs
    vUV = uv;
    
    // Position
    gl_Position = vec4((world * vec4(position, 1.0)).xy, 0.0, 1.0);
}
