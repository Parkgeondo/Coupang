// useRipple.js
import { useState } from "react";
import { useMotionValue, animate } from "framer-motion";

export const useRipple = () => {
  const [ripples, setRipples] = useState([]);
  const scale = useMotionValue(1);

  const createRipple = (e) => {
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    const size = 600;
    const newRipple = {
      id: Date.now(),
      x: e.clientX - rect.left - size / 2 - 14,
      y: e.clientY - rect.top - size / 2 - 16,
    };
    setRipples((prev) => [...prev, newRipple]);
    animate(scale, 0.95, { type: "spring", stiffness: 300, damping: 30 });
  };

  const removeRipple = () => {
    setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 100);
    animate(scale, 1, { type: "spring", stiffness: 300, damping: 30 });
  };

  return {
    ripples,
    scale,
    createRipple,
    removeRipple,
  };
};
