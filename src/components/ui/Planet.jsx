import { useLoader, useThree } from "@react-three/fiber";
import vertexShader from "../../shaders/vertex.glsl";
import fragmentShader from "../../shaders/fragment.glsl";
import { TextureLoader, Uniform } from "three";
import * as THREE from "three";

function Planet() {
  const { viewport } = useThree();

  const texture = useLoader(TextureLoader, "mars.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <>
      <mesh scale={(viewport.height / 5) * 0.5} position={[0, 0.5, 0]}>
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
