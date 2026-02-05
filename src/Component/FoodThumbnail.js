// Star.svg는 public/assets/Star.svg에 있으므로 /assets/Star.svg로 참조

import { motion } from 'framer-motion';
import { EnterFromTop } from '../Animation_Variants/variants';

const FoodThumbnail = () => {
    return (
        <motion.div class="w-[343px] rounded-[16px] bg-white px-1 py-1 absolute"
            variants={EnterFromTop}
            custom={30}
            initial="hidden"
            animate="show"
        >
        <div class="flex items-start gap-5">
          <div class="h-[71px] w-[74px] shrink-0 overflow-hidden rounded-[12px] bg-slate-200">
            <img
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop"
              alt="burger"
              class="h-full w-full object-cover"
            />
          </div>
      
          <div class="min-w-0 flex-1">
            <p class="text-[14px] leading-[1.25] text-slate-900 mt-[4px]">
              <span class="font-semibold">잠깐!</span>
              <span class="ml-1 font-semibold text-sky-500">3일전</span>에 드셨던
            </p>
      
            <p class="mt-[2px] text-[14px] font-extrabold leading-[1.2] text-slate-900">
              송파구 햄버거점<span class="font-medium">의 평가는 어떠신가요?</span>
            </p>
      
            <div class="flex gap-2 mt-[4px]">
                <img src="/assets/Star.svg" className="h-[23px] w-[23px]" alt="star" />
                <img src="/assets/Star.svg" className="h-[23px] w-[23px]" alt="star" />
                <img src="/assets/Star.svg" className="h-[23px] w-[23px]" alt="star" />
                <img src="/assets/Star.svg" className="h-[23px] w-[23px]" alt="star" />
                <img src="/assets/Star.svg" className="h-[23px] w-[23px]" alt="star" />
            </div>
          </div>
        </div>
      </motion.div>
      
    )
}
export default FoodThumbnail;