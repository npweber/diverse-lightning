import { clientSystemInfo } from "@minecraft/server"

export function determineSimulationDistance() {
    console.log(clientSystemInfo);
    return 4;
}