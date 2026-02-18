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
    hidden: (custom) => ({ transition: motion.spring.ui, y: `${(100 - custom)/3}vh` })
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
        transition: {
          x: { ...motion.spring.ui },
          y: { ...motion.spring.ui },
          width: { ...motion.spring.ui },
          height: { ...motion.spring.ui },
          backgroundColor: { ...motion.spring.ui },
          opacity: { 
            duration: 0.15, 
            ease: "easeOut",
            times: [0, 1],
            // x, y 이동이 대략 80% 완료된 시점에 opacity가 변하도록 delay 설정
            // spring 애니메이션의 대략적인 duration을 고려하여 delay 계산
            delay: 0.4
          }
        },
        x: positionX,
        y: positionY,
        width: width > 0 ? width : 7, 
        height: height > 0 ? height : 7,
        backgroundColor: backgroundColor,
        opacity: 0
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

  export const skeletonAndtextarea_animate = {
    hidden: (custom) => ({
    }),
    show: (custom) => ({
      transition: {
        delay: custom,
      }
    }),
  }

  export const skeleton_animate = {
    phase1: { opacity: 1, y: 0 },                 
    phase2: { opacity: 0, y: -10 },               
    phase3: { opacity: 0, y: -10 },  

  }

  export const textarea_animate = {
    phase1: { opacity: 0, y: 10 },          
    phase2: { opacity: 1, y: 0 },      
    phase3: { opacity: 1, y: 0 },
  }

  export const button_animate = {
    active: {
      backgroundColor: "#00AFFE",
      color: "#ffffff",
      transition: motion.spring.ui
    },
    inactive: {
      backgroundColor: "#DFE2E7",
      color: "#919FAC",
      transition: motion.spring.ui
    }
  }

  export const review_animation = {
    phase1: {
      scale: 1,
      y: 0,
    },
    phase2: {
      scale: 0.8,
      y: -200,
      height: "100%",
      transition: { 
        y: {
          type: "tween",
          duration: 0.4,
          ease: "easeInOut",
        }
      }
    },
    phase3: {
      y: 450,
      transition: { ...motion.spring.ui },
      height: "0%",
      transition: {
        ...motion.spring.ui,
      }
    },
  }

  export const letter_animation = {
    phase1: {
      opacity: 0,
      y: 400,
    },
    phase2: {
      opacity: [0,1],
      y: 0,
      scaleX:  1,
      scaleY:  1,
      transition: { type: "tween", duration: 0.4, ease: "easeOut" }
    },
    phase3: {
      y: 0,
      scaleX: [1.1, 0.9, 1],
      scaleY: [0.9, 1.1, 1],
      opacity: [1,1,0,0],
      
      transition: {
        times: [0, 0.2, 0.4],
        type: "tween", duration: 0.8, ease: "ease" }
    }
  }

  export const sealed = {
    phase1: {
      y: 400,
      opacity: 0,
    },
    phase2: {
      y: 0,
      opacity: 0,
      scaleX:  1,
      scaleY:  1,
      transition: { type: "tween", duration: 0.4, ease: "easeOut" }
    },
    phase3: {
      y: 0,
      x: [0, 0, 0, 400],
      rotate: [0, 0, 0, 30],
      scaleX: [1.1, 0.9, 1],
      scaleY: [0.9, 1.1, 1],
      opacity: [0,0,1,1],
      transition: {
        times: [0, 0.2, 0.4],
        type: "tween", duration: 0.8, ease: "ease" }
    },
    phase4: {
    }
  }

  export const shilling_animation = {
    phase1: {},
    phase2: {},
    phase3: {
      scale: [0,1],
      transition: { type: "tween", duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
    }
  }


  // ------------------------------------------------------------
  // ThanksPage Animation Variants
  // ------------------------------------------------------------


  export const thanks_animation = {
    initial: {
      opacity: 0,
      scale: 0.7
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 3.5,
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  }

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