import { useFrame, useLoader, useThree } from "@react-three/fiber";
import vertexShader from "../../shaders/earth/vertex.glsl";
import fragmentShader from "../../shaders/earth/fragment.glsl";
import atmosphereVertexShader from "../../shaders/atmosphere/vertex.glsl";
import atmosphereFragmentShader from "../../shaders/atmosphere/fragment.glsl";
import { TextureLoader } from "three";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { OrbitControls } from "@react-three/drei";

function Planet() {
  const { viewport } = useThree();
  const sphereRef = useRef();
  const earthGeometry = useMemo(() => new THREE.SphereGeometry(2, 64, 64), []);

  const texture = useLoader(TextureLoader, "mars.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame(() => {
    sphereRef.current.rotation.y += 0.002;
  });

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} />
      <mesh
        scale={(viewport.height / 5) * 0.6}
        position={[0, 0.5, 0]}
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
              new THREE.Vector3(2.5, -0.75, -1.75)
            ),
          }}
        />
      </mesh>
    </>
  );
}

export default Planet;
