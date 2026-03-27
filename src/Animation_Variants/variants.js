import { expression } from "three/tsl";
import { motion } from "./motionTokens";


export const EnterFromTop = {
    show: (custom) => ({ transition: motion.spring.ui, y: `calc(${custom}vh - 50% - 290px)` }),
    hidden: (custom) => ({ transition: motion.spring.ui, y: `-${(100 - custom)/3}vh` })
  };    

  export const EnterFromBottom = {
    show: (custom) => ({ transition: motion.spring.ui, y: `calc(${custom}vh - 50%)` }),
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
      return { 
        transition: motion.elasticity.ui, 
        width: width,
        height: height,
        backgroundColor: custom?.direction === 'left' ? '#ffffff' : custom?.direction === 'right' ? '#F3F5F8' : '#017BD9'
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
        delayChildren: 0.18,
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
    hidden: ([d, i]) => ({ y: -d, opacity: 0 }),
    show: { y: 0, opacity: 1, transition: { duration: 0.18, ease: "easeOut" } },
    exit: ([d, i]) => ({ y: d, opacity: 0, transition: { duration: 0.14, ease: "easeIn" } }),
  };

  export const textLetter_left = {
    hidden: ([d, i]) => ({ y: 0, opacity: 0, scale: 1 }),
    show: ([d, i]) =>{ return { y: 0, opacity: 1, scale: [1, 1.2, 1.2, 1], x: [0, (i-2)*3, (i-2)*3.5, 0], transition: { duration: 0.6, ease: "easeOut" } } },
    exit: ([d, i]) => ({ y: 0, opacity: 0, scale: 1, transition: { duration: 0.14, ease: "easeIn" } }),
  };

  export const textLetter_right = {
    hidden: ([d, i]) => ({ y: 0, opacity: 0 }),
    show: ([d, i]) =>{ return { y: [0, 10], opacity: 1, transition: { duration: 1.2, ease: "easeOut" } } },
    exit: ([d, i]) => ({ y: 0, opacity: 0, scale: 1, transition: { duration: 0.14, ease: "easeIn" } }),
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

  // 사용자님의 후기 말투를 기반으로
  export const reviewTitle_text_animate_1 = {
    phase1: {
      opacity: [0,1],
      y: [10,0],
      },
    phase2: {
    },
  }
  // AI 후기를 대신 작성중이예요
  export const reviewTitle_text_animate_2 = {
    phase1: {
      opacity: [0,1],
      y: [10,0],
      transition: { delay: 0.02 },
    },
    phase2: {
      opacity: [1,0],
      y: [0,10],
    },
  }
  // AI 후기를 작성했어요!
  export const reviewTitle_text_animate_3 = {
    phase1: {
      opacity: [0],
    },
    phase2: {
      opacity: [0,1],
      y: [10,0],
      transition: { delay: 0.02 },
    },
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
      scaleX: [1,1.1, 0.9, 1],
      scaleY: [1,0.9, 1.1, 1],
      opacity: [1,1,1,0,0],
      transition: {
        delay: 0.3,
        times: [0, 0.2, 0.4, 0.6],
        type: "tween", duration: 0.8, ease: "ease" }
    }
  }

  // 닫히는 편지 봉투
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
      x: [0, 0, 0, 0, 450],
      rotate: [0, 0, 0, 0, 30],
      scaleX: [1,1.1, 0.9, 1],
      scaleY: [1,0.9, 1.1, 1],
      opacity: [0,0,0,1,1],
      transition: {
        delay: 0.3,
        times: [0, 0.2, 0.4, 0.6],
        type: "tween", duration: 0.8, ease: "ease" }
    },
    phase4: {
    }
  }

  // 왁스(씰링) 애니메이션
  export const shilling_animation = {
    phase1: {},
    phase2: {},
    phase3: {
      scale: [0,0,0,0,1],
      transition: {
        delay: 0.4,
        type: "tween",
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  }

  // 카드 스와이프 영역 및 별점 영역 클리핑
  export const clipping_animation = {
    phase1: {
      clipPath: 'inset(0 0 0% 0)'
    },
    phase2: {
      clipPath: 'inset(0 0 calc(50% - 50px)  0)'
    },
    phase3: {},
    phase4: {}
  }

  // ------------------------------------------------------------
  // ThanksPage Animation Variants
  // ------------------------------------------------------------


  export const thanks_animation = {
    initial: {
      opacity: 0,
      scale: 0.7,
      y: "calc(-50% - 80px)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: "calc(-50% - 80px)",
      transition: {
        delay: 3.5,
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  }

  // ------------------------------------------------------------
  // ------------------------------------------------------------


  
  // ------------------------------------------------------------
  // FoodThumbnail Animation Variants
  // ------------------------------------------------------------

  export const FoodThumbnail_animation = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.04,   // 각 자식 간격
      },
    },
  }
  export const FoodThumbnail_item = {
    hidden: {
      scale: 1,
    },
    show: ([starCount, i]) => ({
      scale: [1, 1.1, 1],
      color: starCount > i - 1 ? "#FEC400" : "#DFE2E7",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    }),
  }
  

  // ------------------------------------------------------------
  // ------------------------------------------------------------

    
  // ------------------------------------------------------------
  // Bottom Button Animation Variants
  // ------------------------------------------------------------

  export const bottomButton_animation_1 = {
    hidden: {
      y: 10,
      opacity: 0,
      transition: {
        duration: 0.1,
        ...motion.spring.ui
      },
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.1,
        ...motion.spring.ui
      },
    },
  }

  export const bottomButton_animation_2 = {
    hidden: {
      y: 10,
      opacity: 0,
      transition: {
        duration: 0.1,
        delay: 0.2, 
        ...motion.spring.ui
      },
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.1,
        delay: 0.2,
        ...motion.spring.ui
      },
    },
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