import { useEffect, useRef } from "react";
import { motion} from "framer-motion";
import Lottie from "lottie-react";
import characterAnimation from "../Lottie/character_animation.json";
import { EnterFromTop, thanks_animation } from "../Animation_Variants/variants";
import { useState } from "react";
import speechBubble from "../assets/Bubble/speechBubble.png";
import cancelIcon from "../assets/cancel.png";
import RippleImage from "../Utile/displacement";

const ThanksPage = ({}) => {

    const characterRef = useRef(null);

    const [showAgain, setShowAgain] = useState(false);

    // 캐릭터 Lottie를 3.5초 후에 재생
    useEffect(() => {
        const timer = setTimeout(() => {
            if (characterRef.current && characterRef.current.play) {
                characterRef.current.play();
            }
        }, 3500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
          className="w-full h-full flex flex-col-reverse items-center justify-between overflow-hidden relative p-[25px] z-[100] bg-cover bg-center bg-no-repeat"
        >
            <motion.div
                className="w-[369px] h-[337px] absolute top-[50%]"
                variants={thanks_animation}
                initial="initial"
                animate="animate"
            >   <p className="w-full text-center text-[18px] font-bold text-white absolute left-[50%] translate-x-[-50%] top-[-12%]">리뷰 등록이 완료되었습니다!</p>
                <RippleImage />
                <div className="w-full h-full flex flex-col items-center justify-start mt-[25px] absolute z-[2]">
                    <Lottie
                        lottieRef={characterRef}
                        animationData={characterAnimation}
                        loop={false}
                        autoplay={false}
                        style={{ width: 160, height: 160 }}
                    />
                    <p className="text-[14px] font-bold text-[#00AFFE] mt-[16px]">사장님의 한마디</p>
                    <div className="flex items-center justify-center gap-[6px]">
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/quote_1.png`}
                            alt="ThanksPage"
                            className="w-[24px] h-[24px] inline-block"
                        />
                        <p className="text-[16px] font-medium w-full leading-[20px] text-[#222B32] text-center mt-[8px]">
                            의견 감사합니다, 더욱 맛있는 <br/>송파구 햄버거점이 되겠습니다!
                        </p>
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/quote_2.png`}
                            alt="ThanksPage"
                            className="w-[24px] h-[24px] inline-block"
                        />
                    </div>
                </div>
            </motion.div>
        <div className="flex flex-row text-[14px] text-gray-400 items-center mt-[12px] cursor-pointer"
            onClick={() => setShowAgain(!showAgain)}
            >
          <img
            src={`${process.env.PUBLIC_URL}/assets/${showAgain ? 'check_4.png' : 'check_3.png'}`}
            className="w-[16px] h-[16px] mr-[6px]"
          />
          <span className={`${showAgain ? 'text-[#F5F5F5]' : 'text-[#F5F5F5CC]'} mt-[2px]`}>애니메이션 다시 보지 않기</span>
        </div>
        </motion.div>
    )
}
export default ThanksPage;