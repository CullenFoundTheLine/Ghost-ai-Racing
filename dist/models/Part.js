"use strict";
// src/models/Part.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Part = void 0;
class Part {
    constructor(name, category, effectType, value, durability) {
        this.installed = false;
        this.name = name;
        this.category = category;
        this.effectType = effectType;
        this.value = value;
        this.durability = durability;
    }
    applyEffect(carStat) {
        return carStat + this.value;
    }
    degrade() {
        if (this.durability > 0) {
            this.durability -= 1;
        }
    }
    isBroken() {
        return this.durability <= 0;
    }
}
exports.Part = Part;
