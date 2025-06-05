"use strict";
// src/models/Driver.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
class Driver {
    constructor(name, experience, aggression, focus) {
        this.fatigue = 0; // increases with laps/time
        this.mistakes = 0; // how many notable errors in a session
        this.name = name;
        this.experience = experience;
        this.aggression = aggression;
        this.focus = focus;
    }
    makeMistake() {
        this.mistakes += 1;
        this.focus -= 0.05;
        if (this.focus < 0)
            this.focus = 0;
    }
    recoverFocus() {
        this.focus += 0.02;
        if (this.focus > 1)
            this.focus = 1;
    }
    increaseFatigue() {
        this.fatigue += 0.1;
        if (this.fatigue > 1)
            this.fatigue = 1;
    }
    resetSessionStats() {
        this.mistakes = 0;
        this.fatigue = 0;
    }
}
exports.Driver = Driver;
// This class represents a driver in the racing simulation.
// It includes attributes for the driver's name, experience level, aggression,
// focus, fatigue, and mistakes made during a session.
// Methods allow the driver to make mistakes, recover focus, increase fatigue,
// and reset session stats.
