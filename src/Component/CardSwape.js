import { motion, useMotionValue, useSpring, useTransform, transformTemplate, useMotionValueEvent, animate } from 'framer-motion';
import { useState, useEffect } from 'react';
import { EnterFromBottom } from '../Animation_Variants/variants';
import Lottie from 'lottie-react';
import lottieAnimation1 from '../Lottie/1.json';
import lottieAnimation2 from '../Lottie/2.json';
import lottieAnimation3 from '../Lottie/3.json';
import swipeAnimation from '../Lottie/swipe.json';
import ThreeScene from './ThreeScene';
import { cardSwipe } from '../Animation_Variants/variants';
import { swipe_circle, afterimage } from '../Animation_Variants/variants';
import { motion as motionTokens } from '../Animation_Variants/motionTokens';
import TextUpandDown from '../Utile/textUpandDown';
// import lottieAnimation4 from '../Lottie/4.json';

// --- 평가데이터 ---
const CATEGORIES = [
    {
        id: 1,
        name: ['배달은 빨랐나요?', '배달이 빨랐어요!', '배달이 느렸어요...'],
        useThree: true
    },
    {
        id: 2,
        name: ['포장은 괜찮았나요?', '포장이 깔끔했어요!', '포장이 더러웠어요...'],
        img: lottieAnimation3
    },
    {
        id: 3,
        name: ['음식의 양은 충분했나요?', '음식의 양이 충분했어요!', '음식의 양이 부족했어요...'],
        img: lottieAnimation2
    },
    {
        id: 4,
        name: ['음식 맛은 어땠나요?', '음식 맛이 맛있었어요!', '음식 맛이 맛없었어요...'],
        img: lottieAnimation1
    }
]

//카드 컴포넌트
const Card = ({ text, img, useThree, index, Zindex, step_card, setStepCard, onComplete, onSwipe, swipeData }) => {
    // 각 카드의 거리
    const DISTANCE = 200;
    // baseZ각 카드를 위치에 배분하는 함수
    const baseZ = index * DISTANCE;
    //카드의 X좌표 위치
    const x = useMotionValue(0);
    //카드의 왼쪽 오른쪽 판별범위
    const RANGE = 60;

    const handleDragEnd = (e, info) => {
        // dragX 카드를 드래그 하고 놓았을 시 카드의 X좌표 위치
        const dragX = info.offset.x;
        // dragX 카드를 드래그 하고 놓았을 시 카드의 속도
        const velocityX = info.velocity.x;
        // dragX 카드를 튕기듯 스와이프 해도 카드가 움직이도록
        const swipePower = Math.abs(dragX) * velocityX;

        if (dragX < -RANGE) {
            console.log("✅ 왼쪽 스와이프");
            animate(x, -500, motionTokens.spring.ui);
            onSwipe(step_card, 'left'); // 스와이프 데이터 저장
            Zindex.set(Zindex.get() + DISTANCE);
            setStepCard(step_card + 1);
            if (step_card === CATEGORIES.length - 1) {
                onComplete();
            }
            return;
        }else if (dragX > RANGE) {
            console.log("✅ 오른쪽 스와이프");
            animate(x, 500, motionTokens.spring.ui);
            onSwipe(step_card, 'right'); // 스와이프 데이터 저장
            Zindex.set(Zindex.get() + DISTANCE);
            setStepCard(step_card + 1);
            if (step_card === CATEGORIES.length - 1) {
                onComplete();
            }
            return;
        } else {
            animate(x, 0, motionTokens.spring.ui);
            console.log("❌ 스와이프 안됨");
            return;
        }
    }

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
        drag="x"
        dragMomentum={false}
        onDragEnd={handleDragEnd}
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
        <div className="w-full h-[280px] flex justify-center items-center mt-4">
            {useThree ? (
                <ThreeScene />
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

const CardSwape = ({ onComplete, swipeData, setSwipeData }) => {

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
        <motion.div className="w-[343px] h-[476px] rounded-[16px] bg-gradient-to-b from-[#00AFFE] to-[#0069CC] flex flex-col items-center [perspective:9000px] overflow-hidden absolute opacity-[30%]"
            variants={EnterFromBottom}
            custom={30}
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
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((index) => (
                        <motion.div
                            key={index}
                            className="absolute w-[8px] h-[8px] bg-white rounded-full"
                            initial={{ opacity: 1/(index+1), x: 0 }}
                            animate={{
                                x: [0, 50, 0, 50, 0],
                            }}
                            transition={{
                                duration: 4.5,
                                ease: "easeInOut",
                                delay: index * 0.02,
                                times: [0, 0.2, 0.8, 1],
                                repeat: Infinity,
                            }}
                        />
                    ))}
                </motion.div>
                <p>카드를 옆으로 슬라이드 해주세요</p>
            </div>
            <div className="relative w-[290px] h-[439px]
                            [transform-style:preserve-3d]
                            [transform:translateY(33px)_translateZ(-600px)_rotateX(-4deg)]
                            ">
                            <motion.div>
                                
                            </motion.div>
                <motion.div 
                    className="[transform-style:preserve-3d]"
                    style={{
                        z: springZindex,
                        transformStyle: 'preserve-3d'
                    }}>
                    {CATEGORIES.map((category, index) => (
                        <Card key={category.id} text={category.name} img={category.img} useThree={category.useThree} index={index} Zindex={Zindex} step_card={step_card} setStepCard={setStepCard} onComplete={onComplete} onSwipe={handleSwipe}/>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    )
}
export default CardSwape;