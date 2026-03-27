import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { textContainer, textLetter, textLetter_left, textLetter_right } from "../Animation_Variants/variants";
import Lottie from 'lottie-react';
import animationData from '../Lottie/positive.json';
import animationData2 from '../Lottie/negative.json';


//텍스트 렌더
const TextRender = ({ text, dragLeftOrRight }) => {
    const letters = useMemo(() => (text ?? "").split(""), [text]);
  
    return (
      <motion.div
        className="absolute mt-[15px] z-[0]"
        variants={textContainer}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            className={
              `${
                dragLeftOrRight === 'left'
                ? 'text-[#15426C]'
                : dragLeftOrRight === 'right'
                ? 'text-[#463943]'
                : 'text-[#5D7082]'
              }
            ${dragLeftOrRight === 'left'|| dragLeftOrRight === 'right' ? 'text-[24px] ' : 'text-[20px] '} font-bold inline-block `}
            variants={dragLeftOrRight === 'left' ? textLetter_left : dragLeftOrRight === 'right' ? textLetter_right : textLetter}
            custom={[5, i]}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </motion.div>
    );
  };

const TextUpandDown = ({ text, dragLeftOrRight }) => {

    useEffect(() => {
        console.log(dragLeftOrRight);
    }, [dragLeftOrRight]);

    if (!text) return null;

    return (
        <div className="width-full flex justify-center items-center relative h-[40px]">
            <AnimatePresence mode="sync">
                <TextRender text={text[0]} key={0}/>
            </AnimatePresence>
        </div>
    )
}

export default TextUpandDown;