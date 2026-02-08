import FoodThumbnail from '../Component/FoodThumbnail';
import CardSwape from '../Component/CardSwape';
import Review from '../page/Review';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import SelectedToggles from '../page/SelectedToggles';

const EventPage = () => {
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

    return (
        <motion.div 
            className="z-50 absolute inset-0 flex flex-col items-center gap-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <FoodThumbnail />

            {(stage === "review") && <Review />}
            <AnimatePresence>
                {stage === "swipe" && <CardSwape onComplete={() => setStage("review")} swipeData={swipeData} setSwipeData={setSwipeData} />}
            </AnimatePresence>
            {(stage === "review" || stage === "swipe") && <SelectedToggles swipeData={swipeData} stage={stage} />}
        </motion.div>
    )
}
export default EventPage;