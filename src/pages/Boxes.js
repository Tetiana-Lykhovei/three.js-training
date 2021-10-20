import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import {
  softShadows,
  MeshWobbleMaterial,
  OrbitControls,
} from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import Plane from "../components/Plane";
import Box from "../components/Box";
import { Physics } from "@react-three/cannon";

softShadows();

const SpinningMesh = ({ position, args, color, speed }) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  const [expand, setExpand] = useState(false);
  const props = useSpring({ scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1] });
  return (
    <a.mesh
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow
      position={position}
      ref={mesh}
    >
      <boxBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial
        atttach="material"
        color={color}
        speed={speed}
        factor={0.6}
      />
    </a.mesh>
  );
};
const reload = (e) => {
  e.preventDefault();
  window.location.reload();
};

export function Boxes() {
  return (
    <div
      style={{
        display: "flex",
        margin: "auto",
        marginTop: "70px",
        justifyContent: "space-around",
      }}
    >
      <button className="dropBtn" onClick={reload}>
        DROP
      </button>
      <Canvas
        style={{
          width: "700px",
          height: "700px",
          backgroundColor: "white",
          borderRadius: "50px",
        }}
        camera={{ position: [0, 3, 5], zoom: 1 }}
      >
        <OrbitControls />
        <Physics>
          <color attach="background" args={["#9dc9f5"]} />
          <hemisphereLight intensity={0.35} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.3}
            penumbra={1}
            intensity={2}
            castShadow
          />
          <Plane />
          <Box />
          <Box position={[-1, 8, 0]} />
          <Box position={[0, 4, 0]} />
        </Physics>
      </Canvas>
      <Canvas
        shadows
        colorManagement
        camera={{ position: [-5, 2, 10], fov: 60 }}
        style={{
          width: "700px",
          height: "700px",
          backgroundColor: "white",
          borderRadius: "50px",
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
          <SpinningMesh
            position={[0, 1, 0]}
            args={[3, 2, 1]}
            color="lightblue"
            speed={2}
          />
          <SpinningMesh position={[-2, 1, -5]} color="pink" speed={6} />
          <SpinningMesh position={[5, 1, -2]} color="pink" speed={6} />
        </group>

        <OrbitControls />
      </Canvas>
    </div>
  );
}
