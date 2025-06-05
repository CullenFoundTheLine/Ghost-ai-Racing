"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
// src/models/Car.ts
const Tire_1 = require("./Tire");
class Car {
    constructor(model, type, weight, baseGrip, crankHP, wheelHP, intensity) {
        this.lastLap = 0;
        this.laps = 0;
        this.parts = [];
        // GHOST telemetry fields
        this.currentSpeed = 0;
        this.tireTemperature = 0;
        this.cornerSpeed = 0;
        this.throttle = 0;
        this.brakeForce = 0;
        this.suspensionLoad = 0;
        this.timeToNextDriver = 0;
        this.timeToLeadDriver = 0;
        this.overrideOn = false;
        this.lapTime = 0;
        this.model = model;
        this.type = type;
        this.weight = weight;
        this.baseGrip = baseGrip;
        this.crankHP = crankHP;
        this.wheelHP = wheelHP;
        this.intensity = intensity;
        this.tire = new Tire_1.Tire("Default", 1.0, 100.0, 5.0);
    }
}
exports.Car = Car;
// Example usage
// const myCar = new Car('Model S', 'Sedan', 2000, 1.2, 500, 400, 0.8);
// myCar.parts.push(new Part('Sport Exhaust', 'Engine', 'power', 50, 100));
// myCar.tire.increaseTemp(10);
// console.log(myCar.tire.getEffectiveGrip()); // Should print the effective grip after temp increase
// myCar.tire.applyWear(5);
// console.log(myCar.tire.getEffectiveGrip()); // Should print the effective grip after wear
// myCar.currentSpeed = 120;
// myCar.cornerSpeed = 80;
// myCar.tireTemperature = myCar.tire.currentTemp;
// console.log(`Current Speed: ${myCar.currentSpeed}, Corner Speed: ${myCar.cornerSpeed}, Tire Temp: ${myCar.tireTemperature}`);
// This code defines a Car class with properties for model, type, weight, grip,
// horsepower, and intensity. It includes telemetry fields for racing simulation.
// The Car can have parts and a tire, with methods to manipulate tire temperature
// and wear. Example usage creates a car, adds a part, modifies tire properties,
// and logs current speed and tire temperature. The Tire class handles grip
// calculations based on temperature and wear, simulating realistic tire behavior
// in a racing context.
