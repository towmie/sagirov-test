import { useFrame, useLoader, useThree } from "@react-three/fiber";
import vertexShader from "../../shaders/earth/vertex.glsl";
import fragmentShader from "../../shaders/earth/fragment.glsl";
import atmosphereVertexShader from "../../shaders/atmosphere/vertex.glsl";
import atmosphereFragmentShader from "../../shaders/atmosphere/fragment.glsl";
import { TextureLoader } from "three";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

function Planet({ ...props }) {
  const { viewport } = useThree();
  const sphereRef = useRef();
  const earthGeometry = useMemo(() => new THREE.SphereGeometry(2, 64, 64), []);

  const texture = useLoader(TextureLoader, "mars.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;

  const { atmospherePosition } = useControls({
    atmospherePosition: { value: { x: -0.18, y: 0.6, z: 0.2 }, step: 0.01 },
  });

  useFrame(() => {
    sphereRef.current.rotation.y += 0.002;
  });

  return (
    <group {...props}>
      <OrbitControls enableZoom={false} enablePan={false} />
      <mesh
        scale={(viewport.height / 5) * 0.51}
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
        ref={sphereRef}
        scale={(viewport.height / 5) * 0.5}
        position={[0, 0.5, 0]}
        geometry={earthGeometry}
      >
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTexture: new THREE.Uniform(texture),
            uLightDirection: new THREE.Uniform(
              new THREE.Vector3(3.5, -1.75, -0.5)
            ),
          }}
        />
      </mesh>
    </group>
  );
}

export default Planet;
