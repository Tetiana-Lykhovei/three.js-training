import React, { Suspense, useRef, useEffect } from "react";
import Header from "../components/header";
import { Section } from "../components/section";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import state from "../components/state";
import { useInView } from "react-intersection-observer";

const Model = ({ url }) => {
  const gltf = useGLTF(url, true);
  return <primitive object={gltf.scene} dispose={null} />;
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight positopn={[10, 10, 5]} intensity={1} />
      <directionalLight positopn={[0, 10, 0]} intensity={1.5} />
      <spotLight positon={[1000, 0, 0]} intensity={1} />
    </>
  );
};

const HtmlContent = ({
  bgColor,
  domContent,
  children,
  modelPath,
  positionY,
}) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));
  const [refItem, inView] = useInView({ threshold: 0 });

  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={ref} position={[0, -35, 0]}>
          <Model url={modelPath} />
        </mesh>
        <Html portal={domContent} fullscreen>
          <div ref={refItem} className="container">
            {children}
          </div>
        </Html>
      </group>
    </Section>
  );
};

export function Chairs() {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);

  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <>
      <Header />
      <Canvas
        style={{
          width: "1024px",
          height: "800px",
          marginLeft: "23%",
        }}
        concurrent
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}
      >
        <Lights />
        <Suspense fallback={null}>
          <HtmlContent
            domContent={domContent}
            modelPath="/armchairYellow.gltf"
            positionY={250}
            bgColor="#f15946"
          >
            <h3 className="title">Yellow</h3>
          </HtmlContent>
          <HtmlContent
            domContent={domContent}
            modelPath="/armchairGreen.gltf"
            positionY={0}
            bgColor="#327567"
          >
            <h3 className="title">Green</h3>
          </HtmlContent>
          <HtmlContent
            domContent={domContent}
            modelPath="/armchairGray.gltf"
            positionY={-250}
            bgColor="#636567"
          >
            <h3 className="title">Gray</h3>
          </HtmlContent>
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ position: "sticky", top: 0 }} ref={domContent}></div>
        <div style={{ height: `${state.sections * 100}vh` }}> </div>
      </div>
    </>
  );
}
