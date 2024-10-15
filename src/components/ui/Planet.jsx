import { useFrame, useLoader, useThree } from "@react-three/fiber";
import vertexShader from "../../shaders/vertex.glsl";
import fragmentShader from "../../shaders/fragment.glsl";
import { TextureLoader } from "three";
import * as THREE from "three";
import { useRef } from "react";

function Planet() {
  const { viewport } = useThree();
  const sphereRef = useRef();

  const texture = useLoader(TextureLoader, "mars.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame(() => {
    sphereRef.current.rotation.y += 0.002;
  });

  return (
    <>
      <mesh
        ref={sphereRef}
        scale={(viewport.height / 5) * 0.5}
        position={[0, 0.5, 0]}
      >
        <sphereGeometry args={[2, 64, 64]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTexture: new THREE.Uniform(texture),
          }}
        />
      </mesh>
    </>
  );
}

export default Planet;
