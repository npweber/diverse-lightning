import { world, system } from "@minecraft/server";

// Main script entry point for Diverse Lightning addon
console.log("Diverse Lightning addon loaded!");

// Example event listener for world load
world.afterEvents.worldInitialize.subscribe(() => {
    console.log("World initialized - Diverse Lightning ready!");
});

// Example tick event
system.runInterval(() => {
    // Add your custom logic here
}, 20); // Run every second (20 ticks)
