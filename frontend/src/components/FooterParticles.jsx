import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function FooterParticles() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles-footer"
      init={particlesInit}
      options={{
        fullScreen: { enable: false }, // very important
        background: { color: "transparent" },
        particles: {
          number: { value: 25 },
          color: { value: "#ffb700" },
          shape: { type: "circle" },
          opacity: { value: 0.7 },
          size: { value: { min: 2, max: 4 } },
          move: { enable: true, speed: 0.5, direction: "top", outModes: "out" },
        },
        detectRetina: true,
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1, // behind footer content
      }}
    />
  );
}
