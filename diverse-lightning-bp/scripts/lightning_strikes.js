import { world, system, WeatherType } from "@minecraft/server"
import { weightedRandom } from "./utils/random.js"

// Assumed number of chunks loaded in the world,
// based on the default render distance in the settings
const CHUNKS_ASSUMED_LOADED = Math.pow(12 * 2, 2);

let isThunderstorm = false;

system.runInterval(() => {
    if (isThunderstorm) {
        shouldStrikeLightningInChunks().forEach((chunkIndex) => {
            console.log(`Lightning strike in chunk ${chunkIndex}`);
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
    for (let i = 0; i < CHUNKS_ASSUMED_LOADED; i++)
        if (weightedRandom([99.999, 0.001]) === 1) 
            shouldStrikeLightningInChunks.push(i);
    return shouldStrikeLightningInChunks;
}

console.log("Lightning strikes script loaded!");