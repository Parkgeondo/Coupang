import answerData from "../assets/answer/answer.json";

export const useAnswerData = () => {
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
