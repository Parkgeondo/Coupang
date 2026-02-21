import FoodThumbnail from '../Component/FoodThumbnail';
import CardSwape from '../Component/CardSwape';
import Review from '../page/Review';
import { useState } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import SelectedToggles from '../page/SelectedToggles';
import { letter_animation, review_animation, sealed, shilling_animation } from '../Animation_Variants/variants';

const EventPage = ({ reviewText, setReviewText, showLetterAnimation, setShowAnimation }) => {
    const [stage, setStage] = useState("swipe");
    // 각 카드의 스와이프 방향 저장 ('left' | 'right')
    const [swipeData, setSwipeData] = useState([
        {
            id: 1,
            direction: null
        },
        {
            id: 2,
            direction: null
        },
        {
            id: 3,
            direction: null
        },{
            id: 4,
            direction: null
        }]
    );

    const controls = useAnimationControls();
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    useEffect(() => {
        if (!showLetterAnimation) return;
        (async () => {
          await controls.start("phase1");
          await controls.start("phase2");
          await controls.start("phase3");
          await controls.start("phase4");
          setShowAnimation?.(true);
        })();
      }, [controls, showLetterAnimation, setShowAnimation]);
      

    return (
        <>
            {/* 편지 포장 부분 */}
            <motion.div className="absolute z-[100] w-full h-full flex items-center justify-center pointer-events-none"
                variants={sealed}
                initial="phase1"
                animate={showLetterAnimation ? controls : "phase1"}
            >
                <motion.img
                    src={`${process.env.PUBLIC_URL}/assets/Letter/shilling.png`}
                    alt="shilling"
                    className="select-none absolute top-[55%]"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                    variants={shilling_animation}
                    initial="phase1"
                    animate={showLetterAnimation ? controls : "phase1"}
                />
                <img 
                    src={`${process.env.PUBLIC_URL}/assets/Letter/Letter_Closed.png`}
                    alt="letter_front" 
                    className="select-none"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                />
            </motion.div>
            {/* 편지 앞장 부분 */}
            <motion.div className="absolute z-[100] w-full h-full flex items-center justify-center pointer-events-none"
                variants={letter_animation}
                initial="phase1"
                animate={showLetterAnimation ? controls : "phase1"}
            >
                <img 
                    src={`${process.env.PUBLIC_URL}/assets/Letter/Letter_Front.png`}
                    alt="letter_front" 
                    className="select-none"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                />
            </motion.div>

            <motion.div 
                variants={review_animation}
                initial="phase1"
                animate={showLetterAnimation ? controls : "phase1"}
                className="z-50 absolute inset-0 flex flex-col items-center gap-4 overflow-hidden"
            >
                <FoodThumbnail />
                {(stage === "review") && <Review swipeData={swipeData} stage={stage} reviewText={reviewText} setReviewText={setReviewText} />}
                <AnimatePresence>
                    {stage === "swipe" && <CardSwape onComplete={() => setStage("review")} swipeData={swipeData} setSwipeData={setSwipeData}/>}
                </AnimatePresence>
                {(stage === "review" || stage === "swipe") && <SelectedToggles swipeData={swipeData} stage={stage} />}
            </motion.div>

            {/* 편지 뒷장 부분 */}
            <motion.div className="absolute z-[10] w-full h-full flex items-center justify-center pointer-events-none"
                variants={letter_animation}
                initial="phase1"
                animate={showLetterAnimation ? controls : "phase1"}
            >
                <img 
                    src={`${process.env.PUBLIC_URL}/assets/Letter/Letter_Back.png`}
                    alt="letter_back" 
                    className="select-none"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                />
            </motion.div>
        </>
    )
}
export default EventPage;