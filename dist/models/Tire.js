"use strict";
// src/models/Tire.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tire = void 0;
class Tire {
    constructor(name, grip, durability, heatRate) {
        this.currentTemp = 75; // default resting temp
        this.wear = 0;
        this.name = name;
        this.grip = grip;
        this.durability = durability;
        this.heatRate = heatRate;
    }
    increaseTemp(amount) {
        this.currentTemp += amount;
    }
    applyWear(amount) {
        this.wear += amount;
        if (this.wear > this.durability)
            this.wear = this.durability;
    }
    getEffectiveGrip() {
        const tempPenalty = Math.max(0, (this.currentTemp - 90) * 0.01);
        const wearPenalty = this.wear / this.durability;
        return this.grip * (1 - tempPenalty - wearPenalty);
    }
}
exports.Tire = Tire;
// src/models/Tire.ts
// This class represents a tire in the racing simulation.
// It includes properties for the tire's name, grip, durability, heat rate,
// current temperature, and wear.
// Methods allow the tire to increase temperature, apply wear, and calculate
// effective grip based on current temperature and wear.
// The effective grip decreases with higher temperature and wear, simulating
// real-world tire performance degradation. 
