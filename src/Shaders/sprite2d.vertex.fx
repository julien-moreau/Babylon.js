// Attributes
attribute vec3 position;
attribute vec2 uv;

// Uniforms
uniform mat4 worldViewProjection;

// Varying
varying vec2 vUV;

void main(void)
{
    vUV = uv;
    
	gl_Position = worldViewProjection * vec4(position, 1.0);
}
