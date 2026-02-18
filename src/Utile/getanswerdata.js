import { useEffect, useState } from "react";

export const useAnswerData = () => {
    //answer.json 파일을 담는 변수, 파일을 로드하기 위해서 필수
    const [answerData, setAnswerData] = useState([]);

    useEffect(() => {
        fetch("/assets/answer.json")
            .then(res => res.json())
            .then(data => {
                setAnswerData(data);
            })
            .catch(err => console.error("Error loading answer.json:", err));
    }, []);

    return answerData;
};

export const getMatchedReview = (swipeData, answerData) => {
    if (!swipeData || swipeData.length !== 4 || answerData.length === 0) return "";

    // swipeData에서 direction 값들을 배열로 추출
    const keywords = swipeData
        .sort((a, b) => a.id - b.id) // id 순서로 정렬
        .map(item => item.direction || null);

    // null이 있으면 아직 모든 선택이 완료되지 않음
    if (keywords.some(k => k === null)) {
        return "";
    }

    // answer.js에서 keywords와 일치하는 리뷰 찾기
    const matchedReview = answerData.find(item => {
        return item.keywords.every((keyword, index) => keyword === keywords[index]);
    });

    return matchedReview ? matchedReview.review : "";
};
