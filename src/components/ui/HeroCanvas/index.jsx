import { Canvas } from "@react-three/fiber";
import "./index.css";
import Planet from "../Planet";
import Sun from "../Sun";
import { Leva, useControls } from "leva";

function HeroCanvas() {
  const { sunPosition } = useControls({
    sunPosition: { value: { x: 1.1, y: -0.1, z: 0 }, step: 0.1 },
  });
  return (
    <div className="hero__canvas">
      <Canvas
        camera={{
          fov: 75,
        }}
      >
        <Leva hidden />
        <Sun position={sunPosition} />
        <Planet />
      </Canvas>
    </div>
  );
}

export default HeroCanvas;
