import { motion, AnimatePresence } from 'framer-motion';
import { useRipple } from '../Utile/Ripple';

const RIPPLE_EXPAND = { duration: 1.4, ease: 'easeOut' };
/** exit는 배열에서 빠질 때 — 천천히 투명해짐 */
const RIPPLE_EXIT = { duration: 0.75, ease: [0.4, 0, 0.2, 1] };

/**
 * 버튼마다 useRipple 인스턴스를 갖도록 분리 — 물결·눌림(scale)이 서로 공유되지 않음
 */
const RippleButton = ({ children, onClick, className = '', rippleClassName = 'bg-[#252A2C]', disabled, ...motionProps }) => {
  const { ripples, scale, createRipple, removeRipple } = useRipple();

  const handlePointerDown = (e) => {
    if (disabled) return;
    createRipple(e);
  };
  const handlePointerUpOrLeave = () => {
    if (disabled) return;
    removeRipple();
  };

  return (
    <motion.button
      type="button"
      style={{ scale }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUpOrLeave}
      onPointerLeave={handlePointerUpOrLeave}
      onClick={onClick}
      className={`relative h-[55px] w-full overflow-hidden rounded-[4px] py-0 font-bold disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
      {...motionProps}
    >
      <AnimatePresence initial={false}>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className={`pointer-events-none absolute h-[600px] w-[600px] rounded-full ${rippleClassName}`}
            initial={{ scale: 0.1, opacity: 0.15 }}
            animate={{ scale: 2.5, opacity: 0.08 }}
            transition={RIPPLE_EXPAND}
            exit={{
              scale: 2.6,
              opacity: 0,
              transition: RIPPLE_EXIT,
            }}
            style={{ left: ripple.x, top: ripple.y }}
          />
        ))}
      </AnimatePresence>
      <span className="relative z-[1]">{children}</span>
    </motion.button>
  );
};

export default RippleButton;
