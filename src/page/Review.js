import { EnterFromBottom, skeleton_animate, textarea_animate } from "../Animation_Variants/variants";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Review = ({ swipeData, showSkeleton = false }) => {
    const [reviewText, setReviewText] = useState("");
    const [answerData, setAnswerData] = useState([]);
    const [skeletonVisible, setSkeletonVisible] = useState(false);
    const [textareaVisible, setTextareaVisible] = useState(false);

    // answer.json 파일 로드
    useEffect(() => {
        fetch("/assets/answer.json")
            .then(res => res.json())
            .then(data => {
                setAnswerData(data);
            })
            .catch(err => console.error("Error loading answer.json:", err));
    }, []);

    useEffect(() => {
        if (!swipeData || swipeData.length !== 4 || answerData.length === 0) return;

        // swipeData에서 direction 값들을 배열로 추출
        const keywords = swipeData
            .sort((a, b) => a.id - b.id) // id 순서로 정렬
            .map(item => item.direction || null);

        // null이 있으면 아직 모든 선택이 완료되지 않음
        if (keywords.some(k => k === null)) {
            setReviewText("");
            return;
        }

        // answer.js에서 keywords와 일치하는 리뷰 찾기
        const matchedReview = answerData.find(item => {
            return item.keywords.every((keyword, index) => keyword === keywords[index]);
        });

        if (matchedReview) {
            setReviewText(matchedReview.review);
        } else {
            setReviewText("");
        }
    }, [swipeData, answerData]);

    // 스켈레톤 UI 애니메이션 제어
    useEffect(() => {
        if (showSkeleton) {
            setSkeletonVisible(true);
            setTextareaVisible(false);
            
            // 3초 후 스켈레톤 숨기고 textarea 표시
            const timer = setTimeout(() => {
                setSkeletonVisible(false);
                // 스켈레톤이 사라지는 애니메이션(0.3초) 후 textarea 표시
                setTimeout(() => {
                    setTextareaVisible(true);
                }, 300);
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            setSkeletonVisible(false);
            setTextareaVisible(true);
        }
    }, [showSkeleton]);

    return (
        <motion.div class="w-[343px] h-[476px] rounded-[16px] bg-white flex flex-col items-center [perspective:9000px] overflow-hidden absolute"
            variants={EnterFromBottom}
            custom={30}
            initial="show"
        >
             <p className="text-[#222B32] text-base font-bold text-center mt-[20px]">
                사용자님의 후기 말투를 기반으로
                <br />
                AI 후기를 작성했어요!
            </p>

            {/* 스켈레톤 UI와 텍스트 영역을 감싸는 컨테이너 */}
            <div className="w-[290px] h-[300px] rounded-[6px] mt-[20px] relative border border-[#E1E2E6] overflow-hidden">
                <motion.textarea 
                    className="w-full h-full p-[14px] absolute top-0 left-0 text-[#222B32] text-base font-medium resize-none outline-none cursor-text bg-transparent"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    variants={textarea_animate}
                    initial="hidden"
                    animate={textareaVisible ? "show" : "hidden"}
                />
                {/* // 스켈레톤 UI 위치하는 곳*/}
                <motion.div 
                    className="w-full h-full absolute top-0 left-0 p-[20px] flex flex-col gap-[8px] pointer-events-none"
                    variants={skeleton_animate}
                    initial="hide"
                    animate={skeletonVisible ? "show" : "hide"}
                >
                    <div className="w-full h-[23px] bg-gray-200 rounded-[2px] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                    </div>
                    <div className="w-full h-[23px] bg-gray-200 rounded-[2px] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <div className="w-full h-[23px] bg-gray-200 rounded-[2px] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <div className="w-full h-[23px] bg-gray-200 rounded-[2px] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" style={{ animationDelay: '0.6s' }}></div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
export default Review;