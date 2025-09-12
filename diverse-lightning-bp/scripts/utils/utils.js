import { ClientSystemInfo } from "@minecraft/server"

export function determineSimulationDistance() {
    const maxRenderDistance = ClientSystemInfo.maxRenderDistance;
    console.log(maxRenderDistance);
    return 4;
}