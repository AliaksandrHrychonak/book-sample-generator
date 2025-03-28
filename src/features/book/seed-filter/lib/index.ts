export const generateRandomSeed = (config: { max: number; min: number; step: number }): number => {
    return Math.floor(Math.random() * ((config.max - config.min) / config.step + 1)) * config.step + config.min;
};
