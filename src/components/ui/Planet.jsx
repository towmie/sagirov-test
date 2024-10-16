import { useFrame, useLoader, useThree } from "@react-three/fiber";
import vertexShader from "../../shaders/earth/vertex.glsl";
import fragmentShader from "../../shaders/earth/fragment.glsl";
import atmosphereVertexShader from "../../shaders/atmosphere/vertex.glsl";
import atmosphereFragmentShader from "../../shaders/atmosphere/fragment.glsl";
import { TextureLoader } from "three";
import * as THREE from "three";
import { useMemo, useRef, useState } from "react";
import { useControls } from "leva";

function Planet({ ...props }) {
  const { viewport } = useThree();
  const earthGeometry = useMemo(
    () => new THREE.SphereGeometry(3.2, 64, 64),
    []
  );

  const texture = useLoader(TextureLoader, "mars.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;

  const { atmospherePosition } = useControls({
    atmospherePosition: { value: { x: -0.18, y: 0.26, z: 0.45 }, step: 0.01 },
  });
  const { planetPosition } = useControls({
    planetPosition: { value: { x: 0.04, y: -0.21, z: 0.09 }, step: 0.01 },
  });

  const planetRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const velocityRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (event) => {
    setIsDragging(true);
    setPreviousMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (event) => {
    if (isDragging && planetRef.current) {
      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y,
      };

      const rotationSpeed = 0.01;
      velocityRef.current.x = -deltaMove.x * rotationSpeed; // Add the negative sign here
      velocityRef.current.y = -deltaMove.y * rotationSpeed; // Keep the negative sign for vertical rotation

      planetRef.current.rotation.y += velocityRef.current.x; // Remove negative sign here
      planetRef.current.rotation.x += velocityRef.current.y;

      setPreviousMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  useFrame((state, delta) => {
    if (planetRef.current) {
      if (!isDragging) {
        // Apply damping to slow down the rotation
        const damping = 0.95;
        velocityRef.current.x *= damping;
        velocityRef.current.y *= damping;

        // Apply the slowed down rotation
        planetRef.current.rotation.y += velocityRef.current.x; // Remove negative sign here
        planetRef.current.rotation.x += velocityRef.current.y;

        // Stop the rotation when it becomes very small
        if (Math.abs(velocityRef.current.x) < 0.001) velocityRef.current.x = 0;
        if (Math.abs(velocityRef.current.y) < 0.001) velocityRef.current.y = 0;
      }

      // Apply constant rotation when not interacting
      if (
        !isDragging &&
        velocityRef.current.x === 0 &&
        velocityRef.current.y === 0
      ) {
        planetRef.current.rotation.y -= 0.002; // Keep this as is for constant rotation
      }
    }
  });

  return (
    <group {...props}>
      <mesh
        scale={(viewport.height / 5) * 0.55}
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
        scale={(viewport.height / 5) * 0.5}
        position={[planetPosition.x, planetPosition.y, planetPosition.z]}
        geometry={earthGeometry}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        onPointerMove={handlePointerMove}
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
