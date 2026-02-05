import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';


//텍스트 렌더
const TextRender = ({ text, key }) => {

    //제목의 문자열을 받는 부분
    const [letters, setLetters] = useState([]);
    useEffect(() => {
        setLetters(text.split(""));
    }, [text]);

    return (
        <motion.div className="absolute" key={key} >
            {letters.map((letter, index) => (
                letter === ' ' ? <span>&nbsp;</span> : <motion.span className="text-[#15426C] text-[20px] font-bold" key={index}>{letter}</motion.span>
            ))}
        </motion.div>
    )
}

const TextUpandDown = ({ text }) => {
    if (!text) return null;
    
    return (
        <div className="width-full flex justify-center items-center relative">
            <AnimatePresence>
                <TextRender text={text[0]} key={0}/>
                <TextRender text={text[1]} key={1}/>
                <TextRender text={text[2]} key={2}/>
            </AnimatePresence>
        </div>
    )
}

export default TextUpandDown;