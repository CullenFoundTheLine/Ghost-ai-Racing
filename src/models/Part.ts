// src/models/Part.ts

export class Part {
  name: string;
  category: string;
  effectType: string; // e.g. "power", "grip", "weightReduction"
  value: number;      // numerical value it changes (can be + or -)
  durability: number;
  installed: boolean = false;

  constructor(
    name: string,
    category: string,
    effectType: string,
    value: number,
    durability: number
  ) {
    this.name = name;
    this.category = category;
    this.effectType = effectType;
    this.value = value;
    this.durability = durability;
  }

  applyEffect(carStat: number): number {
    return carStat + this.value;
  }

  degrade(): void {
    if (this.durability > 0) {
      this.durability -= 1;
    }
  }

  isBroken(): boolean {
    return this.durability <= 0;
  }
}
