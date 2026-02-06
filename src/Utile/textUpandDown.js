import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { textContainer, textLetter } from "../Animation_Variants/variants";


//텍스트 렌더
const TextRender = ({ text }) => {
    const letters = useMemo(() => (text ?? "").split(""), [text]);
  
    return (
      <motion.div
        className="absolute"
        variants={textContainer}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            className="text-[#15426C] text-[20px] font-bold inline-block"
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
                {dragLeftOrRight === 'left' && <TextRender text={text[1]} key={1}/>}
                {dragLeftOrRight === 'right' && <TextRender text={text[2]} key={2}/>}
            </AnimatePresence>
        </div>
    )
}

export default TextUpandDown;