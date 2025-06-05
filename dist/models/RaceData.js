"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaceData = void 0;
class RaceData {
    constructor(lapTime, averageSpeed, maxSpeed, tireWear, throttleUsage, brakeUsage, driverMistakes, stabilityScore, timeToNextDriver, timeToLeadDriver) {
        this.lapTime = lapTime;
        this.averageSpeed = averageSpeed;
        this.maxSpeed = maxSpeed;
        this.tireWear = tireWear;
        this.throttleUsage = throttleUsage;
        this.brakeUsage = brakeUsage;
        this.driverMistakes = driverMistakes;
        this.stabilityScore = stabilityScore;
        this.timeToNextDriver = timeToNextDriver;
        this.timeToLeadDriver = timeToLeadDriver;
    }
    getPerformanceRating() {
        return (100 -
            this.lapTime * 0.2 +
            this.averageSpeed * 0.3 -
            this.tireWear * 0.1 -
            this.driverMistakes * 2 +
            this.stabilityScore * 1.5);
    }
}
exports.RaceData = RaceData;
