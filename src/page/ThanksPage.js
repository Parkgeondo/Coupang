import { useEffect, useRef } from "react";
import { motion} from "framer-motion";
import Lottie from "lottie-react";
import characterAnimation from "../Lottie/character_animation.json";
import { EnterFromTop, thanks_animation } from "../Animation_Variants/variants";

const ThanksPage = () => {

    const characterRef = useRef(null);

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
          className="w-full h-full flex flex-col items-center justify-between overflow-hidden absolute p-[25px] z-[100] bg-cover bg-center bg-no-repeat"
        >
            <div className="w-full flex items-center justify-start gap-[22px]">
                <img
                    src={`${process.env.PUBLIC_URL}/assets/cancel.png`}
                    alt="ThanksPage"
                    className="w-[22] h-[22px]"
                />
                <p className="text-[20px] font-bold text-white">후기 작성</p>
            </div>
            <motion.div
                className="w-[349px] h-[317px] absolute top-[20%]"
                variants={thanks_animation}
                initial="initial"
                animate="animate"
            >   <p className="w-full text-center text-[18px] font-bold text-white absolute left-[50%] translate-x-[-50%] top-[-12%]">후기를 써주셔서 감사합니다!</p>
                <img
                    src={`${process.env.PUBLIC_URL}/assets/speechBubble.png`}
                    alt="ThanksPage"
                    className="absolute inset-0 z-[1]"
                />
                <div className="w-full h-full flex flex-col items-center justify-start mt-[25px] absolute z-[2]">
                    <Lottie
                        lottieRef={characterRef}
                        animationData={characterAnimation}
                        loop={false}
                        autoplay={false}
                        style={{ width: 160, height: 160 }}
                    />
                    <p className="text-[14px] font-bold text-[#00AFFE] mt-[10px]">사장님의 한마디</p>
                    <div className="flex items-center justify-center gap-[6px]">
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/quote_1.png`}
                            alt="ThanksPage"
                            className="w-[30px] h-[30px] inline-block"
                        />
                        <p className="text-[18px] font-medium w-full leading-[24px] text-[#222B32] text-center mt-[8px]">
                            의견 감사합니다, 더욱 맛있는 <br/>송파구 햄버거점이 되겠습니다!
                        </p>
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/quote_2.png`}
                            alt="ThanksPage"
                            className="w-[30px] h-[30px] inline-block"
                        />
                    </div>
                </div>
            </motion.div>
            <div className="flex flex-row text-[14px] text-white items-center">
                <img
                    src={`${process.env.PUBLIC_URL}/assets/check_3.png`}
                    className="w-[16px] h-[16px] mr-[4px]"
                />
                <span>이 화면 다시 보지 않기</span>
            </div>
        </motion.div>
    )
}
export default ThanksPage;