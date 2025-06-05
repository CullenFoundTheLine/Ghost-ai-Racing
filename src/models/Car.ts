// src/models/Car.ts
import { Tire } from './Tire';
import { Part } from './Part';

export class Car {
  model: string;
  type: string;
  weight: number;
  baseGrip: number;
  crankHP: number;
  wheelHP: number;
  intensity: number;
  lastLap: number = 0;
  laps: number = 0;
  parts: Part[] = [];
  tire: Tire;

  // GHOST telemetry fields
  currentSpeed: number = 0;
  tireTemperature: number = 0;
  cornerSpeed: number = 0;
  throttle: number = 0;
  brakeForce: number = 0;
  suspensionLoad: number = 0;
  timeToNextDriver: number = 0;
  timeToLeadDriver: number = 0;
  overrideOn: boolean = false;
  lapTime: number = 0;

  constructor(
    model: string,
    type: string,
    weight: number,
    baseGrip: number,
    crankHP: number,
    wheelHP: number,
    intensity: number
  ) {
    this.model = model;
    this.type = type;
    this.weight = weight;
    this.baseGrip = baseGrip;
    this.crankHP = crankHP;
    this.wheelHP = wheelHP;
    this.intensity = intensity;
    this.tire = new Tire("Default", 1.0, 100.0, 5.0);
  }
}
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
