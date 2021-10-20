import React, { Suspense, useRef, useEffect, useState } from "react";
import Header from "../components/header";
import { Section } from "../components/section";
import state from "../components/state";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useGLTF, useProgress } from "@react-three/drei";
import { useInView } from "react-intersection-observer";
import { a, useTransition } from "@react-spring/web";

const Model = ({ url }) => {
  const gltf = useGLTF(url, true);
  return <primitive object={gltf.scene} dispose={null} />;
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
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
      <spotLight positon={[1000, 0, 0]} intensity={1} castShadow />
    </>
  );
};

const HtmlContent = ({
  domContent,
  children,
  bgColor,
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

function Loader() {
  const { active, progress } = useProgress();
  const transition = useTransition(active, {
    from: { opacity: 1, progress: 0 },
    leave: { opacity: 0 },
    update: { progress },
  });
  return transition(
    ({ progress, opacity }, active) =>
      active && (
        <a.div className="loading" style={{ opacity }}>
          <div className="loading-bar-container">
            <a.div className="loading-bar" style={{ width: progress }}></a.div>
          </div>
        </a.div>
      )
  );
}

export function Chairs() {
  const [events, setEvents] = useState();
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
          marginLeft: "35%",
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
            <h3 className="title"> Enjoy the warmth of Yellow</h3>
          </HtmlContent>
          <HtmlContent
            domContent={domContent}
            modelPath="/armchairGreen.gltf"
            positionY={0}
            bgColor="#327567"
          >
            <h3 className="title">Feel freedom with Green</h3>
          </HtmlContent>
          <HtmlContent
            domContent={domContent}
            modelPath="/armchairGray.gltf"
            positionY={-250}
            bgColor="#636567"
          >
            <h3 className="title">
              Stay focused <br /> in Gray
            </h3>
          </HtmlContent>
        </Suspense>
      </Canvas>
      <Loader />
      <div
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScroll}
        {...events}
      >
        <div style={{ position: "sticky", top: 0 }} ref={domContent}></div>
        <div style={{ height: `${state.sections * 100}vh` }}> </div>
      </div>
    </>
  );
}
