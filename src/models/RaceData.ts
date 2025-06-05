export class RaceData {
  lapTime: number;
  averageSpeed: number;
  maxSpeed: number;
  tireWear: number;
  throttleUsage: number;
  brakeUsage: number;
  driverMistakes: number;
  stabilityScore: number;
  timeToNextDriver: number;
  timeToLeadDriver: number;

  constructor(
    lapTime: number,
    averageSpeed: number,
    maxSpeed: number,
    tireWear: number,
    throttleUsage: number,
    brakeUsage: number,
    driverMistakes: number,
    stabilityScore: number,
    timeToNextDriver: number,
    timeToLeadDriver: number
  ) {
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

  getPerformanceRating(): number {
    return (
      100 -
      this.lapTime * 0.2 +
      this.averageSpeed * 0.3 -
      this.tireWear * 0.1 -
      this.driverMistakes * 2 +
      this.stabilityScore * 1.5
    );
  }
}