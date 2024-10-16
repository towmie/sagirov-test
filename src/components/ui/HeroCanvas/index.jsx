import { Canvas } from "@react-three/fiber";
import "./index.css";
import Planet from "../Planet";
import { Leva } from "leva";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

function HeroCanvas() {
  return (
    <div className="hero__canvas">
      <Suspense fallback={null}>
        <Canvas
          camera={{
            fov: 75,
          }}
        >
          <Leva hidden />
          <OrbitControls enableZoom={false} enablePan={false} />
          <Planet />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default HeroCanvas;
