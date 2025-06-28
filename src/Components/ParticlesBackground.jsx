import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ParticlesBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -2 },
        particles: {
          number: { value: 40, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: {
            value: 0.2,
            random: true,
            anim: { enable: false }
          },
          size: {
            value: { min: 2, max: 4 },
            random: true
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            outMode: "out"
          }
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            resize: true
          }
        },
        detectRetina: true
      }}
    />
  );
};

export default ParticlesBackground;
