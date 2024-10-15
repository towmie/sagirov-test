import { Canvas } from "@react-three/fiber";
import "./index.css";
import Planet from "../Planet";

function HeroCanvas() {
  return (
    <div className="hero__canvas">
      <Canvas
        camera={{
          fov: 75,
        }}
      >
        <Planet />
      </Canvas>
    </div>
  );
}

export default HeroCanvas;
