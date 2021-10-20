import { useBox } from "@react-three/cannon";
import React from "react";

const Box = (props) => {
  const [ref] = useBox(() => ({
    mass: 1,
    position: [0, 6, 0],
    rotation: [0.4, 0.3, 0.5],
    ...props,
  }));

  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="#1c5415" />
    </mesh>
  );
};
export default Box;
