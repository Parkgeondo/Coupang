import FoodThumbnail from '../Component/FoodThumbnail';
import CardSwape from '../Component/CardSwape';
import Review from '../page/Review';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import SelectedToggles from '../page/SelectedToggles';
import { letter_animation, review_animation, sealed, shilling_animation, clipping_animation, EnterTitle, EnterFromBottom } from '../Animation_Variants/variants';
import cancelIcon from '../assets/cancel.png';

export const INITIAL_SWIPE_DATA = [
    { id: 1, direction: null },
    { id: 2, direction: null },
    { id: 3, direction: null },
    { id: 4, direction: null },
];

const EventPage = ({
    reviewText,
    setReviewText,
    showLetterAnimation,
    setShowAnimation,
    showStarAnimation,
    setShowStarAnimation,
    swipeLeftRef,
    EventPage_State,
    setEventPage_State,
    swipeData,
    setSwipeData,
}) => {

    /** null이면 이벤트 UI 비표시 — App은 EventPage를 항상 두고, 표시는 여기서만 제어 */
    const isEventOpen =
        EventPage_State === "swipe" || EventPage_State === "review";
    const isSwipe = EventPage_State === "swipe";
    const isReview = EventPage_State === "review";

    // 카드 및 평가 별 점수 카드 스와이프 위치 조정
    const Ypoint = 50;

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
            {isEventOpen && (
            <>
            {/* 편지 닫혀있는 모양 부분 */}
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
            </>
            )}

            {/* z-50 inset-0 카드 영역보다 위에 두어야 클릭이 먹힘 */}
            {/* 리뷰 작성 부분 */}
            <AnimatePresence mode="wait">
                {isEventOpen && (
                <motion.div
                            key="event-title-bar"
                            className="absolute left-[0px] top-[0px] z-[60] flex w-full p-[25px] items-start justify-start gap-[22px]"
                            variants={EnterTitle}
                            custom={0}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                >
                        <img
                            role="button"
                            tabIndex={0}
                            onClick={() => { setEventPage_State(null); setShowAnimation(false); }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setEventPage_State(null);
                                    setShowAnimation(false);
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
                )}
            </AnimatePresence>
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
                    <AnimatePresence>
                        {isEventOpen && <FoodThumbnail Ypoint={Ypoint} showStarAnimation={showStarAnimation} swipeData={swipeData}/>}
                    </AnimatePresence>
                    {/* EnterFromBottom의 exit는 AnimatePresence 자식으로만 재생됨 + isEventOpen일 때 마운트해야 진입도 보임 */}
                    <AnimatePresence mode="wait">
                        {isEventOpen && (
                            <motion.div
                                key="event-card-stack"
                                className="w-[343px] h-[476px]"
                                variants={EnterFromBottom}
                                custom={Ypoint}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                            >
                                {/* 자연스러운 CardSwape 애니메이션을 위해 바탕에 깔아주는 부분 */}
                                <motion.div className="w-[343px] h-[476px] bg-white rounded-[16px] absolute top-0 left-0 z-[-1]"></motion.div>
                                <AnimatePresence mode="wait">
                                {isReview && (
                                    <Review
                                        Ypoint={Ypoint}
                                        swipeData={swipeData}
                                        stage={EventPage_State}
                                        reviewText={reviewText}
                                        setReviewText={setReviewText}
                                        setShowStarAnimation={setShowStarAnimation}
                                    />
                                )}
                                </AnimatePresence>
                                <AnimatePresence mode="wait">
                                    {isSwipe && (
                                        <CardSwape
                                            key="card-swape"
                                            Ypoint={Ypoint}
                                            onComplete={() => setEventPage_State("review")}
                                            swipeData={swipeData}
                                            setSwipeData={setSwipeData}
                                            swipeLeftRef={swipeLeftRef}
                                        />
                                    )}
                                </AnimatePresence>
                                {(isReview || isSwipe) && (
                                    <SelectedToggles
                                        Ypoint={Ypoint}
                                        swipeData={swipeData}
                                        stage={EventPage_State}
                                    />
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
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