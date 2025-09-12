import { world } from "@minecraft/server"

const POSSIBLE_SIMULATION_DISTANCES = [12,10,8,6,4];

world.afterEvents.playerSpawn.subscribe((event) => {
    const playerDimension = event.player.dimension;
    const playerLocation = event.player.location;

    for (const simulationDistance of POSSIBLE_SIMULATION_DISTANCES) {
        try {
            const testLocationX = playerLocation.x + (simulationDistance * 16);
            const testLocationY = playerDimension.getTopMostBlock({x: testLocationX, z: playerLocation.z});
            const testLocation = { x: testLocationX , y: testLocationY, z: playerLocation.z };
            playerDimension.spawnEntity("minecraft:pig", testLocation);
        } catch (error) {
            console.log(error);
            console.log(simulationDistance);
            continue;
        }
        console.log(simulationDistance);
    }
});