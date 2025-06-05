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

    // timeToNextDriver / timeToLeadDriver require leaderboard integration
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
    const total = data.reduce((sum, d) => sum + d.speed, 0);
    return total / Math.max(data.length, 1);
  }

  private static calculateMaxSpeed(data: TelemetryData[]): number {
    return Math.max(...data.map((d) => d.speed));
  }

  private static calculateTireWear(data: TelemetryData[]): number {
    // Simplified: difference between max and min average tire temp
    const avgTemps = data.map((d) => {
      const temps = Object.values(d.tireTemps);
      const sum = temps.reduce((s, val) => s + val, 0);
      return sum / temps.length;
    });
    return Math.max(...avgTemps) - Math.min(...avgTemps);
  }

  private static calculateThrottleUsage(data: TelemetryData[]): number {
    return data.reduce((sum, d) => sum + d.throttlePosition, 0) / Math.max(data.length, 1);
  }

  private static calculateBrakeUsage(data: TelemetryData[]): number {
    return data.reduce((sum, d) => sum + d.brakePressure, 0) / Math.max(data.length, 1);
  }

  private static identifyMistakes(data: TelemetryData[]): number {
    // Placeholder logic: count times when brake > 0.8 at high speed
    return data.filter((d) => d.brakePressure > 0.8 && d.speed > 180).length;
  }

  private static calculateStability(data: TelemetryData[]): number {
    const speeds = data.map((d) => d.speed);
    const mean = speeds.reduce((s, v) => s + v, 0) / Math.max(speeds.length, 1);
    const variance =
      speeds.reduce((s, v) => s + (v - mean) ** 2, 0) / Math.max(speeds.length, 1);
    return 100 - Math.sqrt(variance); // higher is more stable
  }
}
// Example usage
// const telemetryData: TelemetryData[] = [
//   {
//     speed: 100,
//     engineRPM: 5000,
//     gear: 3,
//     throttlePosition: 0.8,
//     brakePressure: 0.1,
//     tireTemps: { frontLeft: 85, frontRight: 87, rearLeft: 80, rearRight: 82 },
//     timestamp: new Date().toISOString(),
//   },
//   {
//     speed: 120,
//     engineRPM: 6000,
//     gear: 4,
//     throttlePosition: 0.9,
//     brakePressure: 0.2,
//     tireTemps: { frontLeft: 88, frontRight: 90, rearLeft: 83, rearRight: 85 },
//     timestamp: new Date(new Date().getTime() + 5000).toISOString(),
//   }
// ];
// ];