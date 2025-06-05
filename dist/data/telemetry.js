"use strict";
// src/data/telemetry.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryAnalyzer = void 0;
const RaceData_1 = require("../models/RaceData");
/**
 * TelemetryAnalyzer processes raw TelemetryData[]
 * and converts it into a RaceData instance for evaluation.
 */
class TelemetryAnalyzer {
    static analyze(data) {
        // Safety: if empty, return a default RaceData
        if (data.length === 0) {
            return new RaceData_1.RaceData(0, 0, 0, 0, 0, 0, 0, 100, 0, 0);
        }
        const lapTime = TelemetryAnalyzer.calculateLapTime(data);
        const averageSpeed = TelemetryAnalyzer.calculateAverageSpeed(data);
        const maxSpeed = TelemetryAnalyzer.calculateMaxSpeed(data);
        const tireWear = TelemetryAnalyzer.calculateTireWear(data);
        const throttleUsage = TelemetryAnalyzer.calculateThrottleUsage(data);
        const brakeUsage = TelemetryAnalyzer.calculateBrakeUsage(data);
        const driverMistakes = TelemetryAnalyzer.identifyMistakes(data);
        const stabilityScore = TelemetryAnalyzer.calculateStability(data);
        // timeToNextDriver and timeToLeadDriver require leaderboard integration
        const timeToNextDriver = 0;
        const timeToLeadDriver = 0;
        return new RaceData_1.RaceData(lapTime, averageSpeed, maxSpeed, tireWear, throttleUsage, brakeUsage, driverMistakes, stabilityScore, timeToNextDriver, timeToLeadDriver);
    }
    static calculateLapTime(data) {
        const start = new Date(data[0].timestamp).getTime();
        const end = new Date(data[data.length - 1].timestamp).getTime();
        return (end - start) / 1000; // convert ms to seconds
    }
    static calculateAverageSpeed(data) {
        const total = data.reduce((sum, d) => sum + d.speed, 0);
        return total / Math.max(data.length, 1);
    }
    static calculateMaxSpeed(data) {
        return Math.max(...data.map((d) => d.speed));
    }
    static calculateTireWear(data) {
        // Simplified: difference between max and min average tire temp
        const avgTemps = data.map((d) => {
            const temps = Object.values(d.tireTemps);
            const sum = temps.reduce((s, val) => s + val, 0);
            return sum / temps.length;
        });
        return Math.max(...avgTemps) - Math.min(...avgTemps);
    }
    static calculateThrottleUsage(data) {
        return data.reduce((sum, d) => sum + d.throttlePosition, 0) / Math.max(data.length, 1);
    }
    static calculateBrakeUsage(data) {
        return data.reduce((sum, d) => sum + d.brakePressure, 0) / Math.max(data.length, 1);
    }
    static identifyMistakes(data) {
        // Placeholder logic: count times when brake > 0.8 and speed > 180
        return data.filter((d) => d.brakePressure > 0.8 && d.speed > 180).length;
    }
    static calculateStability(data) {
        const speeds = data.map((d) => d.speed);
        const mean = speeds.reduce((s, v) => s + v, 0) / Math.max(speeds.length, 1);
        const variance = speeds.reduce((s, v) => s + (v - mean) ** 2, 0) / Math.max(speeds.length, 1);
        return 100 - Math.sqrt(variance); // higher is more stable
    }
}
exports.TelemetryAnalyzer = TelemetryAnalyzer;
