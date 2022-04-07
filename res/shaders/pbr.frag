#version 450 core

in vec3 normal;
in vec3 position;
in vec2 texcoord;

layout(location = 3) uniform vec3 emissiveFactor;

//uniform sampler2D tex;
layout(binding = 0) uniform sampler2D diffuseTexture;
layout(binding = 1) uniform sampler2D normalTexture;
layout(binding = 2) uniform sampler2D roughnessTexture;

vec3 sun_position = vec3(100); 
vec3 sun_color = vec3(1); 

//out vec4 fragColor;
layout (location = 0) out vec4 fragColor;
layout (location = 1) out vec4 brightColor;

float fragBrightness(vec4 fragColor) {
	float average = dot(fragColor.rgb, vec3(0.2126, 0.7152, 0.0722));
    return average;
}

void main() {
//	float lum = max(dot(normal, normalize(sun_position)), 0.0);
	float lum = max(dot(texture(normalTexture, texcoord).rgb, normalize(sun_position)), 0.0);
	fragColor = texture(diffuseTexture, texcoord) * vec4((0.3 + 0.7 * lum) * sun_color, 1.0);
//	color = vec4(emissiveFactor, 1);
	if (fragBrightness(fragColor) > 0.15f) {
	brightColor = vec4(fragColor.rgb, 1.0f);
	} else {
		brightColor = vec4(vec3(1), 1.0f);
	}
}