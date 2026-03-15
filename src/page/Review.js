import { EnterFromBottom, skeletonAndtextarea_animate, skeleton_animate, textarea_animate, reviewTitle_text_animate_1, reviewTitle_text_animate_2, reviewTitle_text_animate_3 } from "../Animation_Variants/variants";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useAnswerData, getMatchedReview } from "../Utile/getanswerdata";
import cancel from '../assets/photo/cancel.png';

const Review = ({ Ypoint, swipeData, reviewText, setReviewText, setShowStarAnimation }) => {
    const answerData = useAnswerData();
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const matchedReview = getMatchedReview(swipeData, answerData);
        setReviewText(matchedReview);
    }, [swipeData, answerData, setReviewText]);

    const controls = useAnimationControls();
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    useEffect(() => {
        (async () => {
          await sleep(1000); 
          await controls.start("phase1"); // textarea 보임
          await sleep(3000); 
          await setShowStarAnimation(true);
          await controls.start("phase2"); // textarea 숨김
          await controls.start("phase3"); // skeleton 보임
        })();
      }, [controls]);

    const handlePhotoAdd = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.onchange = (e) => {
            const files = Array.from(e.target.files);
            const remainingSlots = 5 - photos.length;
            const filesToAdd = files.slice(0, remainingSlots);
            
            if (filesToAdd.length > 0) {
                setPhotos(prev => [...prev, ...filesToAdd]);
            }
            
            if (files.length > remainingSlots) {
                alert(`최대 5개까지 추가할 수 있습니다. ${remainingSlots}개만 추가되었습니다.`);
            }
        };
        input.click();
    };

    const handlePhotoRemove = (index) => {
        setPhotos((prev) => prev.filter((_, i) => i !== index));
    };

    const photoCount = photos.length;

    // File → object URL (썸네일 표시용), 언마운트/교체 시 revoke
    const photoUrls = useMemo(
        () => photos.map((file) => URL.createObjectURL(file)),
        [photos]
    );
    useEffect(() => {
        return () => photoUrls.forEach((url) => URL.revokeObjectURL(url));
    }, [photoUrls]);

    return (
        <motion.div class="w-[343px] h-[476px] rounded-[16px] bg-white flex flex-col items-center [perspective:9000px] overflow-hidden absolute p-[20px]"
            variants={EnterFromBottom}
            custom={Ypoint}
            initial="show"
        >
             <p className="text-[#222B32] text-base font-bold text-center w-full h-[42px] relative">
                <motion.div className="absolute w-full top-0" initial="phase1" animate={controls} variants={reviewTitle_text_animate_1}>                
                    사용자님의 후기 말투를 기반으로
                </motion.div>
                <motion.div className="absolute w-full top-[24px]" initial="phase1" animate={controls} variants={reviewTitle_text_animate_2}>  
                    AI 후기를 대신 작성중이예요              
                </motion.div>
                <motion.div className="absolute w-full top-[24px]" initial="phase1" animate={controls} variants={reviewTitle_text_animate_3}>                
                    AI 후기를 작성했어요!
                </motion.div>
            </p>

            {/* 스켈레톤 UI와 텍스트 영역을 감싸는 컨테이너 */}
            {/* 또한, 이곳에서 stage가 review일때, 1초뒤 스켈레톤이 보이고 2초뒤, 텍스트가 보이도록 설계 */}
            <motion.div className="w-full h-[307px] rounded-[6px] mt-[20px] relative border border-[#E1E2E6] overflow-hidden"
            >
                {/* // 리뷰칸 위치하는 곳*/}
                <motion.textarea 
                    className="w-full h-full p-[14px] absolute top-0 left-0 text-[#242B33] text-base font-medium resize-none outline-none cursor-text bg-transparent"
                    value={reviewText}
                    variants={textarea_animate}
                    initial="phase1"
                    animate={controls}
                    onChange={(e) => setReviewText(e.target.value)}
                />
                {/* // 스켈레톤 UI 위치하는 곳*/}
                <motion.div 
                    className="w-full h-full absolute top-0 left-0 p-[20px] flex flex-col gap-[8px] pointer-events-none"
                    initial="phase2"
                    animate={controls}
                    variants={skeleton_animate}
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
            </motion.div>

            {/* 사진 추가 버튼 */}
            <div className="w-full h-[57px] mt-[12px] flex flex-row gap-[4px]">
                {photos.map((photo, index) => (
                    <div key={index} className="w-[57px] h-[57px] shrink-0 overflow-hidden rounded-[6px] relative">
                        <img
                            src={photoUrls[index]}
                            alt={`사진 ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <img
                            src={cancel}
                            alt="삭제"
                            role="button"
                            className="w-[24px] h-[24px] absolute top-[3px] right-[3px] cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePhotoRemove(index);
                            }}
                        />
                    </div>
                ))}
                <button
                    onClick={handlePhotoAdd}
                    disabled={photoCount >= 5}
                    className={[
                      photoCount >= 1 ? 'w-[57px]' : 'w-full',
                      'h-[57px] rounded-[6px]',
                      'border border-dashed border-[#00AFFE]',
                      'flex items-center justify-center',
                      photoCount >= 1 ? 'gap-[0px]' : 'gap-[8px]',
                      photoCount >= 1 ? 'flex-col' : 'flex-row',
                      'cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
                    ].join(' ')}
                >
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/camera.png`}
                        alt="plus"
                        className="w-[24px] h-[24px]"
                    />
                    <p className={`text-[#00AFFE] ${photoCount >= 1 ? 'font-medium text-[12px]' : 'font-bold text-[14px]'}`}>
                    {photoCount >= 1 ? `(${photoCount}/5)` : `사진 추가 (${photoCount}/5)`}
                    </p>
                </button>
            </div>
        </motion.div>
    )
}
export default Review;