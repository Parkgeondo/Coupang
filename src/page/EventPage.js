import FoodThumbnail from '../Component/FoodThumbnail';
import CardSwape from '../Component/CardSwape';
import Review from '../page/Review';
import { useState } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import SelectedToggles from '../page/SelectedToggles';
import { letter_animation, review_animation, sealed, shilling_animation, clipping_animation, EnterTitle } from '../Animation_Variants/variants';
import cancelIcon from '../assets/cancel.png';

const EventPage = ({
    stage,
    setStage,
    reviewText,
    setReviewText,
    showLetterAnimation,
    setShowAnimation,
    showStarAnimation,
    setShowStarAnimation,
    swipeLeftRef,
    EventPage_State,
    setEventPage_State,
}) => {

    // 카드 및 평가 별 점수 카드 스와이프 위치 조정
    const Ypoint = 50;

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
            <motion.div className="absolute z-[100] w-full h-full flex items-center justify-center pointer-events-none "
                variants={sealed}
                initial="phase1"
                animate={showLetterAnimation ? controls : "phase1"}
            >
            <motion.img
                    src={`${process.env.PUBLIC_URL}/assets/Letter/shilling.png`}
                    alt="shilling"
                    className="select-none absolute top-[calc(50%+50px)]"
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

            {/* z-50 inset-0 카드 영역보다 위에 두어야 클릭이 먹힘 */}
            <motion.div className="absolute left-[0px] top-[0px] z-[60] flex w-full p-[25px] items-start justify-start gap-[22px]"
                        variants={EnterTitle}
                        custom={0}
                        initial="hidden"
                        animate="show"
                        exit="exit"
            >
                    <img
                        role="button"
                        tabIndex={0}
                        onClick={() => {setStage(null); setShowAnimation(false);}}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setStage(null); setShowAnimation(false);
                            }
                        }}
                        src={cancelIcon}
                        alt="닫기"
                        width={22}
                        height={22}
                        decoding="async"
                        fetchPriority="high"
                        className="h-[22px] w-[22px] shrink-0 cursor-pointer object-contain"
                    />
                    <p className="text-[20px] h-[22px] font-bold text-white leading-[22px]">리뷰 작성</p>
            </motion.div>

            {/* 카드 리뷰 및 별점 부분 */}
            <motion.div className="w-full
                            h-[calc(100%+120px)]
                            absolute z-[20]
                            overflow-hidden
                            flex flex-col items-center justify-center
                        "
                        variants={clipping_animation}
                        initial="phase1"
                        animate={showLetterAnimation ? controls : "phase1"}
                        >   
                <motion.div
                    variants={review_animation}
                    initial="phase1"
                    animate={showLetterAnimation ? controls : "phase1"}
                    className="z-50 absolute inset-0 flex flex-col items-center gap-4 overflow-hidden"
                >
                    <FoodThumbnail Ypoint={Ypoint} showStarAnimation={showStarAnimation} swipeData={swipeData}/>
                        {(EventPage_State === "review") && <Review Ypoint={Ypoint} swipeData={swipeData} stage={EventPage_State} reviewText={reviewText} setReviewText={setReviewText} setShowStarAnimation={setShowStarAnimation} />}
                    <AnimatePresence>
                        {EventPage_State === "swipe" && <CardSwape Ypoint={Ypoint} onComplete={() => setEventPage_State("review")} swipeData={swipeData} setSwipeData={setSwipeData} swipeLeftRef={swipeLeftRef}/>}
                    </AnimatePresence>
                        {(EventPage_State === "review" || EventPage_State === "swipe") && <SelectedToggles Ypoint={Ypoint} swipeData={swipeData} stage={EventPage_State} />}
                </motion.div>
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