export const motion = {
    spring: {
        ui: { type: "tween", duration: 0.9,ease: [0.19, 1, 0.22, 1]},
        // ui: { type: "spring", stiffness: 220, damping: 40, mass: 2 },
    },
    card_animation: {
        ui: { type: "spring", stiffness: 220, damping: 40, mass: 2 },
    },
    elasticity: {
        ui: { type: "spring", stiffness: 720, damping: 40, mass: 2, bounce: 12.2 },
    }
};