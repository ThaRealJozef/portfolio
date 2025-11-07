import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60, // Reduced from 120 for better performance
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 2, // Reduced from 4
          },
          repulse: {
            distance: 150, // Reduced from 200
            duration: 0.3, // Reduced from 0.4
          },
        },
      },
      particles: {
        color: {
          value: ["#a78bfa", "#60a5fa"],
        },
        links: {
          color: "#a78bfa",
          distance: 150,
          enable: true,
          opacity: 0.2, // Reduced from 0.3
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 0.5, // Reduced from 1
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 50, // Reduced from 80
        },
        opacity: {
          value: 0.4, // Reduced from 0.5
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 2 }, // Reduced from max: 3
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute inset-0 z-0"
      />
    );
  }

  return null;
}