import { world } from "@minecraft/server"

world.afterEvents.playerSpawn.subscribe((event) => {
    const maxRenderDistance = event.player.getClientSystemInfo().maxRenderDistance;
    const playerDimension = event.player.getDimension();
    const playerLocation = event.player.location;
        
    let testLocationSimulated = { x: playerLocation.x + (maxRenderDistance * 16), y: playerLocation.y, z: playerLocation.z };

    console.log(testLocationSimulated);
});