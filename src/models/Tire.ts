// src/models/Tire.ts

export class Tire {
  name: string;
  grip: number;
  durability: number;
  heatRate: number;
  currentTemp: number = 75; // default resting temp
  wear: number = 0;

  constructor(
    name: string,
    grip: number,
    durability: number,
    heatRate: number
  ) {
    this.name = name;
    this.grip = grip;
    this.durability = durability;
    this.heatRate = heatRate;
  }

  increaseTemp(amount: number): void {
    this.currentTemp += amount;
  }

  applyWear(amount: number): void {
    this.wear += amount;
    if (this.wear > this.durability) this.wear = this.durability;
  }

  getEffectiveGrip(): number {
    const tempPenalty = Math.max(0, (this.currentTemp - 90) * 0.01);
    const wearPenalty = this.wear / this.durability;
    return this.grip * (1 - tempPenalty - wearPenalty);
  }
}
// src/models/Tire.ts
// This class represents a tire in the racing simulation.
// It includes properties for the tire's name, grip, durability, heat rate,
// current temperature, and wear.
// Methods allow the tire to increase temperature, apply wear, and calculate
// effective grip based on current temperature and wear.
// The effective grip decreases with higher temperature and wear, simulating
// real-world tire performance degradation. 
