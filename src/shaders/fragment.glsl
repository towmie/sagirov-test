varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform sampler2D uTexture;

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);

    vec3 sunDirection = vec3(0.0, 0.0, 1.0);

    float sunOrientation = dot(sunDirection, normal);
    
    // Adjust these parameters to control the lighting
    float contrast = 1.2;  // Increase for more contrast
    float midPoint = 0.2;  // Decrease to make dark side larger
    float ambientLight = 0.1;  // Decrease to make dark side darker
    
    // Apply contrast and shift the midpoint
    float lightIntensity = (sunOrientation - midPoint) * contrast;
    lightIntensity = lightIntensity * 0.5 + 0.5;
    
    // Clamp and add ambient light
    lightIntensity = clamp(lightIntensity, 0.0, 1.0);
    lightIntensity = max(lightIntensity, ambientLight);

    vec3 textureColor = texture2D(uTexture, vUv).rgb;

    // Combine lighting with texture color
    vec3 color = lightIntensity * textureColor;

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
