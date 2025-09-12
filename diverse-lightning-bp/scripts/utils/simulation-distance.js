import { world } from "@minecraft/server"

world.afterEvents.playerSpawn.subscribe((event) => {
    const maxRenderDistance = event.player.clientSystemInfo.maxRenderDistance;
    const playerDimension = event.player.dimension;
    const playerLocation = event.player.location;
        
    let testLocationSimulated = { x: playerLocation.x + (maxRenderDistance * 16), y: playerLocation.y, z: playerLocation.z };

    console.log(testLocationSimulated.x);
});