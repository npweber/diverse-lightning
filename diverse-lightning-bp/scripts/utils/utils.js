import { clientSystemInfo } from "@minecraft/server"

export function determineSimulationDistance() {
    const maxRenderDistance = clientSystemInfo.maxRenderDistance;
    console.log(maxRenderDistance);
    return 4;
}