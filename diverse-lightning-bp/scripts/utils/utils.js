import { world } from "@minecraft/server"

export function determineSimulationDistance() {
    const singlePlayerInWorld = world.getPlayers()[0]
    console.log(singlePlayerInWorld.getClientSystemInfo().maxRenderDistance);
    return 4;
}