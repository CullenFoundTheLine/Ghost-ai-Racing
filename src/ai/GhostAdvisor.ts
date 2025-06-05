// src/ai/GhostAdvisor.ts

import { Car } from '../models/Car';
import { Part } from '../models/Part';
import { Driver } from '../models/Driver';
import { GhostMemory } from './GhostMemory';

export class GhostAdvisor {
  /**
   * Suggest a car upgrade to the driver, showing current vs. new horsepower.
   */
  public explainUpgradeForDriver(car: Car, newPart: Part): string {
    // Direct property access since Car has public fields
    const oldHP = car.crankHP;
    const newHP = oldHP + newPart.value; // newPart.value is power gain
    return `Installing the ${newPart.name} will boost your car from ${Math.round(
      oldHP
    )} HP to ${Math.round(
      newHP
    )} HP! You'll feel a huge difference in acceleration and top speed. Ghost recommends this for a thrilling upgrade!`;
  }

  /**
   * Provide coaching advice to the team/coach based on average lap time and driver habits.
   */
  public explainForCoach(driver: Driver, memory: GhostMemory): string {
    const avgLap = memory.getAverageLapTime();
    const habit = memory.getDriverHabit(driver.name) ?? 'no notable habit recorded';
    return `Driver ${driver.name}'s average lap time is ${avgLap.toFixed(
      2
    )} seconds. Recent driving habit: ${habit}. ` +
      `Ghost suggests focusing on corner exit speed and consistency. Reviewing telemetry logs can help tailor your coaching for maximum improvement.`;
  }
}
// This class provides advice to drivers and coaches based on car upgrades and driver habits.
// It suggests upgrades by comparing current and new horsepower, and gives coaching advice based on average lap times and recorded habits.
// The methods use direct property access to retrieve car attributes and memory data, ensuring clarity and simplicity in the advice provided.