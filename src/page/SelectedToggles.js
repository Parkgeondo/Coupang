import { EnterFromBottom, ToggleItem_animate } from "../Animation_Variants/variants";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { useResizeObserver } from "../Utile/resizeObserver";

const TOGGLES = [
    {
        id: 1,
        name: [' ','맛있었어요','맛없었었어요'],
        selected: false,
        positionX: 20,
        positionY: 60
    },
    {
        id: 2,
        name: [' ','충분했어요','부족했어요'],
        selected: false,
        positionX: 50,
        positionY: 90
    },
    {
        id: 3,
        name: [' ','깔끔했어요','더러웠어요'],
        selected: false,
        positionX: -65,
        positionY: 120
    },
    {
        id: 4,
        name: [' ','빨랐어요','늦었어요'],
        selected: false,
        positionX: -20,
        positionY: 150
    },
]

const ToggleItem = ({ item, swipeDataItem, swipeData, toPosition }) => {
    // useResizeObserver hook 각 Toggle들의 텍스트의 넗이와 높이를 추적하는데 사용
    const { ref: textRef, width, height } = useResizeObserver();

    // 어떤 텍스트를 넣을지 결정하는 상태
    const [currentText, setCurrentText] = useState(item.name[0]);
    // 텍스트가 넣어지는 활성화 상태
    const [isThisActive, setIsThisActive] = useState(false);

    //swipeDataItem의 각 토글들의 방향을 확인하고 left면 첫번쨰 글씨를 right면 두번째 글씨를 써 넣는 로직
    useEffect(() => {
        if (!swipeDataItem) {
            setCurrentText(item.name[0]);
            setIsThisActive(false);
            return;
        }
        if (swipeDataItem.direction === 'left') {
            setCurrentText(item.name[1]);
            setIsThisActive(true);
        } else if (swipeDataItem.direction === 'right') {
            setCurrentText(item.name[2]);
            setIsThisActive(true);
        } else {
            setCurrentText(item.name[0]);
            setIsThisActive(false);
        }
    }, [swipeData, swipeDataItem, item.name]);


    const controls = useAnimationControls();
    useEffect(() => {
        if (isThisActive) {
          controls.start("toggle_show");
        } else if (isThisActive && toPosition) {
          controls.start("toPosition");
        }
      }, [controls, isThisActive, width, height, toPosition]); // width, height가 변경될 때도 재실행


    return (
        <motion.div 
            className="bg-[#017BD9] rounded-full flex items-center justify-center overflow-hidden"
                variants={ToggleItem_animate}
                custom={{ width, height, positionX: item.positionX, positionY: item.positionY }}
                initial="toggle_hidden"
                animate={controls}
            >
            <p ref={textRef} className="text-[#00A7F8] text-xs font-medium whitespace-nowrap inline-block">
                {currentText}
            </p>
        </motion.div>
    )
}

const SelectedToggles = ({ swipeData, stage }) => {

    // 모든 토글이 활성화 되었는지 확인

    return (
        <motion.div className="w-[343px] h-[28px] top-[48px] flex flex-row justify-center items-center gap-[8px] absolute"
            variants={EnterFromBottom}
            custom={30}
            initial="hidden"
            animate="show"
        >
            {TOGGLES.map((item) => {
                // swipeData 배열에서 해당 categoryId를 가진 항목 찾기
                const swipeDataItem = swipeData[item.id - 1]
                const toPosition = stage === "review"
                console.log("toPosition", toPosition);
                return (
                    <ToggleItem 
                        key={item.id} 
                        item={item} 
                        swipeDataItem={swipeDataItem}
                        swipeData={swipeData}
                        toPosition={toPosition}
                    />
                );
            })}
        </motion.div>
    )
}

export default SelectedToggles;