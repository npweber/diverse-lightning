import { world } from "@minecraft/server";

// Disable vanilla lightning strikes
export function disableVanillaLightning() {
    world.afterEvents.entitySpawn.subscribe((event) => {
        if (event.entity.typeId === "minecraft:lightning_bolt")
            event.entity.remove();
    });
}