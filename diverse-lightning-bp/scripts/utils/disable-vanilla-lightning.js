import { world } from "@minecraft/server";

export function disableVanillaLightning() {
    // Block natural lightning strikes
    world.afterEvents.entitySpawn.subscribe((event) => {
        if (event.entity.typeId === "minecraft:lightning_bolt")
            event.entity.remove();
    });
}