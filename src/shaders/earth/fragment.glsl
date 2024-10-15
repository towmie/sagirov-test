varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform sampler2D uTexture;
uniform vec3 uLightDirection;

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);

    vec3 sunDirection = uLightDirection;

    float sunOrientation = dot(sunDirection, normal);
    
    // Adjust these parameters to control the lighting
    float contrast = 2.2;  // Decrease for smoother transition
    float midPoint = 0.1;  // Adjust to control the size of the dark side
    float ambientLight = 0.06;  // Increase for brighter dark side
    float smoothness = 1.0;  // New parameter for transition smoothness
    
    // Apply smoothstep for a smoother transition
    float lightIntensity = smoothstep(-smoothness, smoothness, sunOrientation - midPoint);
    
    // Apply contrast
    lightIntensity = pow(lightIntensity, contrast);
    
    // Add ambient light
    lightIntensity = mix(ambientLight, 1.0, lightIntensity);

    vec3 textureColor = texture2D(uTexture, vUv).rgb;

    // Combine lighting with texture color
    vec3 color = lightIntensity * textureColor;

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}