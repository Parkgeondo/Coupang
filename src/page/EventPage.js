import FoodThumbnail from '../Component/FoodThumbnail';
import CardSwape from '../Component/CardSwape';
import Review from '../page/Review';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const EventPage = () => {
    const [stage, setStage] = useState("swipe");
    // 각 카드의 스와이프 방향 저장 ('left' | 'right')
    const [swipeData, setSwipeData] = useState([]);

    useEffect(() => {
        console.log(swipeData);
    }, [swipeData]);

    return (
        <motion.div 
            className="z-50 absolute inset-0 flex flex-col items-center gap-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <FoodThumbnail />
            {stage === "swipe" && <CardSwape onComplete={() => setStage("review")} swipeData={swipeData} setSwipeData={setSwipeData} />}
            {/* {stage === "review" && <Review />} */}
        </motion.div>
    )
}
export default EventPage;