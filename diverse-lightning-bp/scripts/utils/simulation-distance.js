const POSSIBLE_SIMULATION_DISTANCES = [12,10,8,6,4];

export function getSimulationDistance(player) {
    let simulationDistance = -1;
    const playerDimension = player.dimension;
    if (playerDimension.id === "minecraft:overworld") {
        const playerLocation = player.location;
        for (const testSimulationDistance of POSSIBLE_SIMULATION_DISTANCES) {
            try {
                const testLocationX = playerLocation.x + (testSimulationDistance * 16) - 2;
                const testLocationY = playerDimension.getTopmostBlock({x: testLocationX, z: playerLocation.z}).y + 1;
                const testLocation = { x: testLocationX , y: testLocationY, z: playerLocation.z };
                const testSpawnEntityResult = playerDimension.spawnEntity("minecraft:pig", testLocation);
                if (testSpawnEntityResult !== null) {
                    simulationDistance = testSimulationDistance;
                    testSpawnEntityResult.remove();
                    break;
                }
            } catch (error) {
                if (error.name === "LocationInUnloadedChunkError") 
                    continue;
                else
                    console.error(`Error spawning entity to test simulation distance "testSimulationDistance: ${testSimulationDistance}":\n ${error}`);
            }
        }
    }
    return simulationDistance;
}