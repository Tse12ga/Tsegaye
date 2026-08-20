"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Particles = () => {
  const count = 4000;
  
  // Generate random positions for the nodes
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
    }
    return pos;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      // Slow, luxurious rotation
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
      
      // Gentle floating effect tied to mouse
      const mouseX = (state.pointer.x * Math.PI) / 10;
      const mouseY = (state.pointer.y * Math.PI) / 10;
      
      pointsRef.current.rotation.x += (mouseY - pointsRef.current.rotation.x) * 0.02;
      pointsRef.current.rotation.y += (mouseX - pointsRef.current.rotation.y) * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default function FiberBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#030303]">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <fog attach="fog" args={["#030303", 2, 10]} />
        <Particles />
      </Canvas>
      {/* Luxury vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)] opacity-90" />
    </div>
  );
}
