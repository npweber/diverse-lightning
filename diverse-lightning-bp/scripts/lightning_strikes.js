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

let weatherObjective = world.scoreboard.getObjective("weather");
if (!weatherObjective)
    weatherObjective = world.scoreboard.addObjective("weather");
    
system.runInterval(() => {
    world.scoreboard.getParticipants().forEach((participant) => {
        const isThunderstorm = weatherObjective.getScore(participant);
        if (isThunderstorm) {
            const SIMULATION_BOUNDING_BOX_SIDE_LENGTH = getSimulationDistance(participant) * 2;
            const chunksSimulated = Math.pow(SIMULATION_BOUNDING_BOX_SIDE_LENGTH, 2);
            shouldStrikeLightningInChunks(chunksSimulated).forEach((chunkIndex) => {
                const lightningVariantChoice = weightedRandom(LIGHTNING_VARIANTS.map(variant => variant.chance));
                const lightningVariant = LIGHTNING_VARIANTS[lightningVariantChoice].name;
                console.log(`${lightningVariant} strike in chunk ${chunkIndex}`);
            });
        }
    });
}, 1);

world.afterEvents.weatherChange.subscribe((event) => {
    const isThunderstorm = event.newWeather === WeatherType.Thunder ? 1 : 0;
    world.scoreboard.getParticipants().forEach((participant) => weatherObjective.setScore(participant, isThunderstorm));
});

world.afterEvents.playerSpawn.subscribe((event) => {
    if (!weatherObjective.hasParticipant(event.player)) {
        weatherObjective.addParticipant(event.player);
        weatherObjective.setScore(event.player, 0);
    }
});

function shouldStrikeLightningInChunks(chunksSimulated) {
    const shouldStrikeLightningInChunks = [];
    for (let i = 0; i < chunksSimulated; i++)
        if (weightedRandom([99.999, 0.001]) === 1) 
            shouldStrikeLightningInChunks.push(i);
    return shouldStrikeLightningInChunks;
}

console.log("Lightning strikes script loaded!");