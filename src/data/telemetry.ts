// src/data/telemetry.ts

import { RaceData } from '../models/RaceData';

/**
 * TelemetryData represents raw data captured from sensors or simulations.
 */
export interface TelemetryData {
  speed: number;
  engineRPM: number;
  gear: number;
  throttlePosition: number; // 0 to 1
  brakePressure: number;    // 0 to 1
  tireTemps: { [position: string]: number }; // e.g., { frontLeft: 85, rearRight: 90 }
  timestamp: string;        // ISO string
}

/**
 * TelemetryAnalyzer processes raw TelemetryData[]
 * and converts it into a RaceData instance for evaluation.
 */
export class TelemetryAnalyzer {
  public static analyze(data: TelemetryData[]): RaceData {
    // Safety: if empty, return a default RaceData
    if (data.length === 0) {
      return new RaceData(0, 0, 0, 0, 0, 0, 0, 100, 0, 0);
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

    return new RaceData(
      lapTime,
      averageSpeed,
      maxSpeed,
      tireWear,
      throttleUsage,
      brakeUsage,
      driverMistakes,
      stabilityScore,
      timeToNextDriver,
      timeToLeadDriver
    );
  }

  private static calculateLapTime(data: TelemetryData[]): number {
    const start = new Date(data[0].timestamp).getTime();
    const end = new Date(data[data.length - 1].timestamp).getTime();
    return (end - start) / 1000; // convert ms to seconds
  }

  private static calculateAverageSpeed(data: TelemetryData[]): number {
    const total = data.reduce((sum: number, d: TelemetryData) => sum + d.speed, 0);
    return total / Math.max(data.length, 1);
  }

  private static calculateMaxSpeed(data: TelemetryData[]): number {
    return Math.max(...data.map((d: TelemetryData) => d.speed));
  }

  private static calculateTireWear(data: TelemetryData[]): number {
    // Simplified: difference between max and min average tire temp
    const avgTemps = data.map((d: TelemetryData) => {
      const temps: number[] = Object.values(d.tireTemps);
      const sum = temps.reduce((s: number, val: number) => s + val, 0);
      return sum / temps.length;
    });
    return Math.max(...avgTemps) - Math.min(...avgTemps);
  }

  private static calculateThrottleUsage(data: TelemetryData[]): number {
    return data.reduce((sum: number, d: TelemetryData) => sum + d.throttlePosition, 0) / Math.max(data.length, 1);
  }

  private static calculateBrakeUsage(data: TelemetryData[]): number {
    return data.reduce((sum: number, d: TelemetryData) => sum + d.brakePressure, 0) / Math.max(data.length, 1);
  }

  private static identifyMistakes(data: TelemetryData[]): number {
    // Placeholder logic: count times when brake > 0.8 and speed > 180
    return data.filter((d: TelemetryData) => d.brakePressure > 0.8 && d.speed > 180).length;
  }

  private static calculateStability(data: TelemetryData[]): number {
    const speeds: number[] = data.map((d: TelemetryData) => d.speed);
    const mean: number = speeds.reduce((s: number, v: number) => s + v, 0) / Math.max(speeds.length, 1);
    const variance: number =
      speeds.reduce((s: number, v: number) => s + (v - mean) ** 2, 0) / Math.max(speeds.length, 1);
    return 100 - Math.sqrt(variance); // higher is more stable
  }
}

// Ensure this file is treated as a module.
export {};
