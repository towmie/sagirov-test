import { useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

function Sun({ position, ...props }) {
  const { viewport } = useThree();
  return (
    <group {...props}>
      <EffectComposer>
        <Bloom mipmapBlur />
      </EffectComposer>
      <mesh
        scale={viewport.height / 15}
        position={[position.x, position.y, position.z]}
      >
        <sphereGeometry />
        <meshBasicMaterial color={[1.5, 1.05, 1.05]} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default Sun;
