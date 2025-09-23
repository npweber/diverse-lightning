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
        try {
            const testLocationX = playerLocation.x + (simulationDistance * 16) - 2;
            const testLocationY = playerDimension.getTopmostBlock({x: testLocationX, z: playerLocation.z}).y + 1;
            const testLocation = { x: testLocationX , y: testLocationY, z: playerLocation.z };
            let testSpawnEntityResult = playerDimension.spawnEntity("minecraft:pig", testLocation);
            if (testSpawnEntityResult !== null) {
                SIMULATION_DISTANCE = simulationDistance;
                testSpawnEntityResult.remove();
                break;
            }
        } catch (error) {
            if (error.name === "LocationInUnloadedChunkError") 
                continue;
            else
                console.error(`Error spawning entity to test simulation distance "simulationDistance: ${simulationDistance}":\n ${error}`);
        }
    }
    console.log(`Simulation distance: ${SIMULATION_DISTANCE}`);
});

export function getSimulationDistance() {
    return SIMULATION_DISTANCE !== undefined ? SIMULATION_DISTANCE : -1;
}