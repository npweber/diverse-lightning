import { world, system, WeatherType } from "@minecraft/server"
import { weightedRandom } from "./utils/random.js"
import { getSimulationDistance } from "./utils/simulation-distance.js"

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
        const SIMULATION_BOUNDING_BOX_SIDE_LENGTH = getSimulationDistance() * 2;
        const chunksSimulated = Math.pow(SIMULATION_BOUNDING_BOX_SIDE_LENGTH, 2);
        shouldStrikeLightningInChunks(chunksSimulated).forEach((chunkIndex) => {
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

world.afterEvents.playerSpawn.subscribe((event) => {
    const playerDimension = event.player.dimension;
    if (playerDimension.id !== "minecraft:overworld") {
        return;
    }

    playerDimension.runCommand("weather query").then((result) => {
        console.log(result);
    });
});

function shouldStrikeLightningInChunks(chunksSimulated) {
    console.log(`Simulating ${chunksSimulated} chunks`);
    const shouldStrikeLightningInChunks = [];
    for (let i = 0; i < chunksSimulated; i++)
        if (weightedRandom([99.999, 0.001]) === 1) 
            shouldStrikeLightningInChunks.push(i);
    return shouldStrikeLightningInChunks;
}

console.log("Lightning strikes script loaded!");