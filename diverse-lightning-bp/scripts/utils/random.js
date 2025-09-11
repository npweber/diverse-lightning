// Weighted random selection
export function weightedRandom(weights) {
    const total = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * total;
    
    for (let i = 0; i < weights.length; i++) {
        random -= weights[i];
        if (random <= 0) return i;
    }
    return weights.length - 1;
}