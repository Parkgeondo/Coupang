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