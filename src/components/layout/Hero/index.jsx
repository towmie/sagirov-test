import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Hero() {
  return (
    <div className="hero">
      <div className="hero__canvas">
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          <mesh>
            <boxGeometry />
            <meshStandardMaterial />
          </mesh>
        </Canvas>
      </div>
    </div>
  );
}

export default Hero;
