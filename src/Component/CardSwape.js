import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, transformTemplate, useMotionValueEvent, animate } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { EnterFromBottom } from '../Animation_Variants/variants';
import Lottie from 'lottie-react';
import lottieAnimation1 from '../Lottie/1.json';
import lottieAnimation2 from '../Lottie/2.json';
import lottieAnimation3 from '../Lottie/3.json';
import lottieAnimation4 from '../Lottie/4.json';
import swipeAnimation from '../Lottie/swipe.json';
import ThreeScene from './ThreeScene';
import { swipe_circle, afterimage } from '../Animation_Variants/variants';
import { motion as motionTokens } from '../Animation_Variants/motionTokens';
import TextUpandDown from '../Utile/textUpandDown';
import slideArrow from '../assets/slideArrow/slideArrow.svg';
// import lottieAnimation4 from '../Lottie/4.json';

// --- 평가데이터 ---
const CATEGORIES = [
    {
      id: 1,
      name: ['음식 맛은 어땠나요?', '좋았어요!', '별로예요...'],
      img: lottieAnimation1
    },
    {
      id: 2,
      name: ['음식의 양은 어땠나요?', '좋았어요!', '별로예요...'],
      img: lottieAnimation2
    },
    {
      id: 3,
      name: ['포장은 어땠나요?', '좋았어요!', '별로예요...'],
      img: lottieAnimation3
    },
    {
      id: 4,
      name: ['배달은 어땠나요?', '좋았어요!', '별로예요...'],
      useThree: true,
      img: lottieAnimation4
    }
  ]

//카드 컴포넌트
const Card = ({ text, img, useThree, index, Zindex, step_card, setStepCard, onComplete, onSwipe, swipeData, swipeLeftRef }) => {
    // 각 카드의 거리
    const DISTANCE = 200;
    // baseZ각 카드를 위치에 배분하는 함수
    const baseZ = (3 - index) * DISTANCE;
    //카드의 X좌표 위치
    const x = useMotionValue(0);

    /** 버튼 등으로 왼쪽 스와이프와 동일 동작 (현재 맨 앞 카드일 때만 ref에 등록) */
    const performLeftSwipe = useCallback((direction) => {
        animate(x, direction === 'left' ? -500 : 500, motionTokens.spring.ui);
        onSwipe(step_card, direction); // 스와이프 데이터 저장
        Zindex.set(Zindex.get() + DISTANCE);
        setStepCard(step_card + 1);

        // 마지막 카드일 때 완료 함수 호출
        if (step_card === CATEGORIES.length - 1) {
            onComplete();
        }
    }, [step_card, x, onSwipe, Zindex, setStepCard, onComplete]);

    useEffect(() => {
        if (!swipeLeftRef) return;
        if (index !== step_card) return;
        swipeLeftRef.current = performLeftSwipe;
        return () => {
            if (swipeLeftRef.current === performLeftSwipe) {
                swipeLeftRef.current = null;
            }
        };
    }, [index, step_card, performLeftSwipe, swipeLeftRef]);

    const [dragLeftOrRight, setDragLeftOrRight] = useState('none');

    useMotionValueEvent(x, 'change', (value) => {
        if (value < -10) {
            setDragLeftOrRight('left');
        } else if (value > 10) {
            setDragLeftOrRight('right');
        }else {
            setDragLeftOrRight('none');
        }
    });

    // 카드의 x 좌표에 따라서 회전값을 더해주는 함수
    const rotateCard = useTransform(x, [-120, 120], [-10, 10]);

    return (
    <motion.div
        dragMomentum={false}
        style={{ 
            x: x,
            rotateZ: rotateCard,
            transformStyle: 'preserve-3d',
            z: baseZ
        }}
        className="w-[290px] h-[439px] bg-gradient-to-b from-[#ECEEEE] to-[#DAE5E5]
                    rounded-[16px] px-4 py-4 absolute
                    shadow-[0px_-4px_0px_#FFFFFF]">
        <TextUpandDown text={text} swipeData={swipeData} dragLeftOrRight={dragLeftOrRight}/>
        <div className="relative w-full h-[280px] flex justify-center items-center mt-4">
            {useThree ? (
                <div className="">
                   <ThreeScene />
                    <Lottie
                        animationData={img}
                        loop={true}
                        autoplay={true}
                        style={{ width: '290px', height: '290px'}}
                        className="absolute top-0 left-0 z-[-1]"
                    />
                </div>
            ) : img ? (
                <Lottie
                    animationData={img}
                    loop={true}
                    autoplay={true}
                    style={{ width: '290px', height: '290px' }}
                />
            ) : null}
        </div>
    </motion.div>
    )
}

const CardSwape = ({ Ypoint, onComplete, swipeData, setSwipeData, swipeLeftRef }) => {

    const Zindex = useMotionValue(0);
    const [step_card, setStepCard] = useState(0);
    
    // Zindex에 spring 애니메이션 적용
    const springZindex = useSpring(Zindex, {
        stiffness: 100,  // 강성 (높을수록 빠르고 탄력적)
        damping: 15,      // 감쇠 (높을수록 부드럽고 느림)
        mass: 1          // 질량 (높을수록 느림)
    });

    // 스와이프 데이터 저장 핸들러
    const handleSwipe = (step_card, direction) => {
        setSwipeData(prev => {
            const newSwipeData = [...prev];
            newSwipeData[step_card].direction = direction;
            return newSwipeData;
        });
    };
    
    
    return (
        <motion.div className="w-[343px] h-[476px] rounded-[16px] bg-gradient-to-b from-[#00AFFE] to-[#0069CC] flex flex-col items-center [perspective:9000px] overflow-hidden absolute"
            variants={EnterFromBottom}
            custom={Ypoint}
            initial="hidden"
            animate="show"
            exit="exit"
        >
            <div className="text-white text-base font-bold text-center mt-[20px] relative">
                <motion.div 
                    className="absolute top-[-8px] left-[44%] w-[55px]"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 1, 0] }}
                    transition={{
                        duration: 1,
                        times: [0, 0.5, 1],
                        delay: 4.5,
                        ease: "easeInOut"
                    }}
                >
                </motion.div>
                <p>음식과 배달에 대해 평가해주세요</p>
            </div>
            <div className="relative w-[290px] h-[439px]
                            [transform-style:preserve-3d]
                            [transform:translateY(33px)_translateZ(-600px)_rotateX(-4deg)]
                            ">
                <motion.div
                    className="[transform-style:preserve-3d] z-20 w-full h-full"
                    style={{
                        z: springZindex,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {CATEGORIES.map((category, index) => (
                        <Card key={category.id} text={category.name} img={category.img} useThree={category.useThree} index={index} Zindex={Zindex} step_card={step_card} setStepCard={setStepCard} onComplete={onComplete} onSwipe={handleSwipe} swipeLeftRef={swipeLeftRef}/>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    )
}
export default CardSwape;