// Uniforms
uniform sampler2D textureSampler;
uniform float invertXY;

// Varying
varying vec2 vUV;

void main(void)
{
	gl_FragColor = texture2D(textureSampler, vec2(vUV.x * invertXY, vUV.y * invertXY));
}
