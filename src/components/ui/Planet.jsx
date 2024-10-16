import { useFrame, useLoader, useThree } from "@react-three/fiber";
import vertexShader from "../../shaders/earth/vertex.glsl";
import fragmentShader from "../../shaders/earth/fragment.glsl";
import atmosphereVertexShader from "../../shaders/atmosphere/vertex.glsl";
import atmosphereFragmentShader from "../../shaders/atmosphere/fragment.glsl";
import { TextureLoader } from "three";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useControls } from "leva";

function Planet({ ...props }) {
  const { viewport } = useThree();
  const planetRef = useRef();
  const texture = useLoader(TextureLoader, "mars.webp");
  texture.colorSpace = THREE.SRGBColorSpace;

  const earthGeometry = useMemo(
    () => new THREE.SphereGeometry(3.2, 64, 64),
    []
  );

  const { atmospherePosition } = useControls({
    atmospherePosition: { value: { x: -0.48, y: 0.5, z: 0.45 }, step: 0.01 },
  });
  const { planetPosition } = useControls({
    planetPosition: { value: { x: 0.04, y: 0.13, z: 0.09 }, step: 0.01 },
  });

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.002;
      planetRef.current.rotation.x += 0.002;
    }
  });

  return (
    <group {...props}>
      <mesh
        scale={(viewport.width / 5) * 0.55}
        position={[
          atmospherePosition.x,
          atmospherePosition.y,
          atmospherePosition.z,
        ]}
        geometry={earthGeometry}
      >
        <shaderMaterial
          side={THREE.BackSide}
          transparent
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
        />
      </mesh>
      <mesh
        ref={planetRef}
        scale={(viewport.width / 5) * 0.5}
        position={[planetPosition.x, planetPosition.y, planetPosition.z]}
        geometry={earthGeometry}
      >
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTexture: new THREE.Uniform(texture),
            uLightDirection: new THREE.Uniform(new THREE.Vector3(3.75, -1, 1)),
          }}
        />
      </mesh>
    </group>
  );
}

export default Planet;
