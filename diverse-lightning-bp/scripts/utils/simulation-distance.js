import { world } from "@minecraft/server"

const POSSIBLE_SIMULATION_DISTANCES = [12,10,8,6,4];
let SIMULATION_DISTANCE;

world.afterEvents.playerSpawn.subscribe((event) => {
    const playerDimension = event.player.dimension;
    if (playerDimension.id !== "minecraft:overworld") {
        return;
    }
    const playerLocation = event.player.location;

    for (const simulationDistance of POSSIBLE_SIMULATION_DISTANCES) {
        let testSpawnEntityResult;
        try {
            const testLocationX = playerLocation.x + (simulationDistance * 16);
            const testLocationY = playerDimension.getTopmostBlock({x: testLocationX, z: playerLocation.z}).y;
            const testLocation = { x: testLocationX , y: testLocationY, z: playerLocation.z };
            testSpawnEntityResult = playerDimension.spawnEntity("minecraft:pig", testLocation);
            console.log(testSpawnEntityResult, simulationDistance);
        } catch (error) {
            testSpawnEntityResult = null;
            continue;
        }
        if (testSpawnEntityResult !== null) {
            SIMULATION_DISTANCE = simulationDistance;
            break;
        }
    }
});

export function getSimulationDistance() {
    return SIMULATION_DISTANCE !== undefined ? SIMULATION_DISTANCE : -1;
}