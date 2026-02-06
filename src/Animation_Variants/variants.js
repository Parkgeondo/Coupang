import { expression } from "three/tsl";
import { motion } from "./motionTokens";


export const EnterFromTop = {
    show: (custom) => ({ transition: motion.spring.ui, y: `calc(${custom}vh - 100% - 20px)` }),
    hidden: (custom) => ({ transition: motion.spring.ui, y: `-${(100 - custom)/3}vh` })
  };    

  export const EnterFromBottom = {
    show: (custom) => ({ transition: motion.spring.ui, y: `${custom}vh` }),
    hidden: (custom) => ({ transition: motion.spring.ui, y: "100vh" })
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