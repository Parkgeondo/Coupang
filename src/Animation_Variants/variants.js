import { expression } from "three/tsl";
import { motion } from "./motionTokens";


export const EnterFromTop = {
    show: (custom) => ({ transition: motion.spring.ui, y: `calc(${custom}vh - 100% - 20px)` }),
    hidden: (custom) => ({ transition: motion.spring.ui, y: `-${(100 - custom)/3}vh` })
  };    

  export const EnterFromBottom = {
    show: (custom) => ({ transition: motion.spring.ui, y: `${custom}vh` }),
    hidden: (custom) => ({ transition: motion.spring.ui, y: "100vh" }),
    exit: (custom) => ({ transition: { ...motion.spring.ui, delay: 0.6 }, opacity: 0
    })
  };    

  export const EnterFromBottom_modal = {
    show: (custom) => ({ transition: motion.spring.ui, y: `-${custom}vh` }),
    hidden: (custom) => ({ transition: motion.spring.ui, y: "0vh" })
  };    

  export const dimmedBackground = {
    show: () => ({ transition: motion.spring.ui, opacity: 1, backdropFilter: "blur(5px)"}),
    hidden: () => ({ transition: motion.spring.ui, opacity: 0, backdropFilter: "blur(0px)"})
  };    

  export const dimmedScale = {
    show: () => ({ transition: motion.spring.ui, scale: 0.95}),
    hidden: () => ({ transition: motion.spring.ui, scale: 1})
  };

  export const cardSwipe = {
    variantSwipeX: (custom) => ({ transition: motion.spring.ui, x: custom }),
  };

  export const ToggleItem_animate = {
    toggle_show: (custom) => {
      const width = custom?.width+16 || 7;
      const height = custom?.height+6 || 7;
      const backgroundColor = '#ffffff';
      return { 
        transition: motion.elasticity.ui, 
        width: width,
        height: height,
        backgroundColor: backgroundColor
      };
    },
    toggle_hidden: (c) => ({
      transition: motion.elasticity.ui,
      width: 7,
      height: 7,
      backgroundColor: "#017BD9",
      x: 0,
      y: 0,
    }),
    toPosition: (custom) => {
      const positionX = custom?.positionX || 0;
      const positionY = custom?.positionY || 0;
      const width = custom?.width+16 || 7;
      const height = custom?.height+6 || 7;
      const backgroundColor = '#ffffff';
      return { 
        transition: { ...motion.spring.ui, delay: 0},
        x: positionX,
        y: positionY,
        width: width > 0 ? width : 7, 
        height: height > 0 ? height : 7,
        backgroundColor: backgroundColor
      };
    },
  };

  export const textContainer = {
    hidden: {},
    show: {
      transition: {
        type: motion.spring.ui,
        delayChildren: 0.07,
        staggerChildren: 0.02,
      },
    },
    exit: {
      transition: {
        type: motion.spring.ui,
        staggerChildren: 0.02,
      },
    },
  };
  
  export const textLetter = {
    hidden: (d) => ({ y: -d, opacity: 0 }),
    show: { y: 0, opacity: 1, transition: { duration: 0.18, ease: "easeOut" } },
    exit: (d) => ({ y: d, opacity: 0, transition: { duration: 0.14, ease: "easeIn" } }),
  };
  // ------------------------------------------------------------
  // ------------------------------------------------------------


  
export const swipe_circle = {
  animate: {
    x: [0, 50, 0, 50, 0],
  },
  transition: {
    duration: 4.5,
    ease: "easeInOut",
  },
}