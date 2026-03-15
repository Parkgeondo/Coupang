import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { textContainer, textLetter } from "../Animation_Variants/variants";


//텍스트 렌더
const TextRender = ({ text, dragLeftOrRight }) => {
    const letters = useMemo(() => (text ?? "").split(""), [text]);
  
    return (
      <motion.div
        className="absolute mt-[15px]"
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
            variants={textLetter}
            custom={5}
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
                {dragLeftOrRight === 'none' && <TextRender text={text[0]} key={0}/>}
                {dragLeftOrRight === 'left' && <TextRender text={text[1]} key={1} dragLeftOrRight={dragLeftOrRight}/>}
                {/* {dragLeftOrRight === 'right' && <TextRender text={text[2]} key={2} dragLeftOrRight={dragLeftOrRight}/>} */}
            </AnimatePresence>
        </div>
    )
}

export default TextUpandDown;