import { EnterFromBottom } from "../Animation_Variants/variants";
import { motion } from "framer-motion";

const TOGGLES = [
    {
        id: 1,
        name: [null,'none','none'],
        selected: false
    },
    {
        id: 2,
        name: "카테고리 2", 
        selected: false
    },
    {
        id: 3,
        name: "카테고리 3",
        selected: false
    },
    {
        id: 4,
        name: "카테고리 4",
        selected: false
    },
]

const ToggleItem = ({ item }) => {
    return (
        <div className="w-[7px] h-[7px] bg-[#017BD9] rounded-full">
        </div>
    )
}

const SelectedToggles = () => {
    return (
        <motion.div className="w-[343px] h-[22px] top-[48px] flex flex-row justify-center items-center gap-[16px] overflow-hidden absolute"
            variants={EnterFromBottom}
            custom={30}
            initial="hidden"
            animate="show"
        >
            {TOGGLES.map((item) => (
                <ToggleItem key={item.id} item={item} />
            ))}
        </motion.div>
    )
}

export default SelectedToggles;