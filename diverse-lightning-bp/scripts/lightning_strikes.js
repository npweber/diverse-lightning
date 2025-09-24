import { world, system, WeatherType } from "@minecraft/server"
import { weightedRandom } from "./utils/random.js"
import { getSimulationDistance } from "./utils/simulation-distance.js"
import { disableVanillaLightning } from "./utils/disable-vanilla-lightning.js"

disableVanillaLightning();

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

world.afterEvents.weatherChange.subscribe((event) => {
    const isThunderstorm = event.newWeather === WeatherType.Thunder ? 1 : 0;
    world.getDimension("minecraft:overworld").getPlayers().forEach((player) => player.setDynamicProperty("isThunderstorm", isThunderstorm));
});

world.afterEvents.playerSpawn.subscribe((event) => {
    if (event.player.getDynamicProperty("isThunderstorm") === undefined)
        event.player.setDynamicProperty("isThunderstorm", 0);
    const simulationDistance = getSimulationDistance(event.player);

    system.runInterval(() => {
        world.getDimension("minecraft:overworld").getPlayers().forEach((player) => {
            if (player.getDynamicProperty("isThunderstorm")) {
                const SIMULATION_BOUNDING_BOX_SIDE_LENGTH = simulationDistance * 2;
                const chunksSimulated = Math.pow(SIMULATION_BOUNDING_BOX_SIDE_LENGTH, 2);
                shouldStrikeLightningInChunks(chunksSimulated).forEach((chunkIndex) => {
                    const lightningVariantChoice = weightedRandom(LIGHTNING_VARIANTS.map(variant => variant.chance));
                    const lightningVariant = LIGHTNING_VARIANTS[lightningVariantChoice].name;
                    console.log(`${lightningVariant} strike in chunk ${chunkIndex}`);
                });
            }
        });
    }, 1);
});

function shouldStrikeLightningInChunks(chunksSimulated) {
    const shouldStrikeLightningInChunks = [];
    for (let i = 0; i < chunksSimulated; i++)
        if (weightedRandom([99.999, 0.001]) === 1) 
            shouldStrikeLightningInChunks.push(i);
    return shouldStrikeLightningInChunks;
}

console.log("Lightning strikes script loaded!");