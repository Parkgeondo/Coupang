const Review = () => {
    return (
        <div class="w-[343px] h-[476px] rounded-[16px] bg-white flex flex-col items-center [perspective:9000px] overflow-hidden">
             <p className="text-[#222B32] text-base font-bold text-center mt-[20px]">
             사용자님의 후기 말투를 기반으로
             <br />
             AI 후기를 작성했어요!
            </p>
            <textarea className="w-[290px] h-[300px] mt-[20px] rounded-[6px] border border-[#E1E2E6] p-[16px] text-[#222B32] text-base font-medium resize-none"/>
        </div>
    )
}
export default Review;