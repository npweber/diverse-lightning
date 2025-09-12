import { world, system, WeatherType } from "@minecraft/server"
import { weightedRandom } from "./utils/random.js"
import "./utils/simulation-distance.js"

const LIGHTNING_VARIANTS = [
        {
            name: "red_lightning",
            chance: 20
        },
        {
            name: "blue_lightning",
            chance: 30
        },
        {
            name: "white_lightning",
            chance: 30
        },
        {
            name: "purple_lightning",
            chance: 20
        }
]

let isThunderstorm = false;

system.runInterval(() => {
    if (isThunderstorm) {
        shouldStrikeLightningInChunks().forEach((chunkIndex) => {
            const lightningVariantChoice = weightedRandom(LIGHTNING_VARIANTS.map(variant => variant.chance));
            const lightningVariant = LIGHTNING_VARIANTS[lightningVariantChoice].name;
            console.log(`${lightningVariant} strike in chunk ${chunkIndex}`);
        });
    }
}, 1);

world.afterEvents.weatherChange.subscribe((event) => {
    if (event.newWeather === WeatherType.Thunder) 
        isThunderstorm = true;
    else
        isThunderstorm = false;
});

function shouldStrikeLightningInChunks() {
    const shouldStrikeLightningInChunks = [];
    for (let i = 0; i < CHUNKS_SIMULATED; i++)
        if (weightedRandom([99.999, 0.001]) === 1) 
            shouldStrikeLightningInChunks.push(i);
    return shouldStrikeLightningInChunks;
}

console.log("Lightning strikes script loaded!");