varying vec3 vNormal;
varying vec3 vPosition;


void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);

    vec3 sunDirection = vec3(1.0, -0.5, -1.0);

    float sunOrientation = dot(sunDirection, normal);
    
    // Adjust these parameters to control the lighting
    float contrast = 0.8;  // Increase for more contrast
    float midPoint = 0.1;  // Decrease to make dark side larger
    float ambientLight = 0.09;  // Decrease to make dark side darker
    
    // Apply contrast and shift the midpoint
    float lightIntensity = (sunOrientation - midPoint) * contrast;
    lightIntensity = lightIntensity * 0.5 + 0.5;
    
    // Clamp and add ambient light
    lightIntensity = clamp(lightIntensity, 0.0, 1.0);
    lightIntensity = max(lightIntensity, ambientLight);


    // Combine lighting with texture color
    // vec3 color = vec3(lightIntensity, 1.0);
    float edgeAlpha = dot(viewDirection, normal);
    edgeAlpha = smoothstep(0.0, 4.0, edgeAlpha);
    color += vec3(1.0, 0.0, 0.0);
    color = vec3(edgeAlpha) * color;

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
