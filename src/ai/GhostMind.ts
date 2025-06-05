// src/ai/GhostMind.ts

import { GhostMemory } from './GhostMemory';
import { Regulations } from '../data/trackRules';

export class GhostMind {
  private memory: GhostMemory;
  private regulations: Regulations;

  constructor(memory: GhostMemory, regulations: Regulations) {
    this.memory = memory;
    this.regulations = regulations;
  }

  /**
   * Decide an action string based on current conditions:
   *   - cornerAngle (degrees)
   *   - speed (km/h)
   *   - driftPossible (boolean)
   *   - drivingStyle ("aggressive" | "conservative" etc.)
   *   - partHealth (Map<partName, durabilityValue>)
   *   - tireTemp (°C)
   */
  decideAction(
    cornerAngle: number,
    speed: number,
    driftPossible: boolean,
    drivingStyle: string,
    partHealth: Map<string, number>,
    tireTemp: number
  ): string {
    // 1. Tire Overheating check
    if (tireTemp > 95) {
      this.memory.recordIssue(
        'Tire overheating',
        `Temperature ${tireTemp.toFixed(0)}°C > safe limit`,
        'Suggest softer compound or earlier braking.'
      );
      return 'COOL_DOWN';
    }

    // 2. Suspension + Tire health synergy check
    const suspensionHealth = partHealth.get('Suspension') ?? 100;
    const tireHealth = partHealth.get('Tires') ?? 100;
    if (suspensionHealth < 60 && tireHealth < 70) {
      this.memory.recordIssue(
        'Compound wear issue',
        `Suspension ${suspensionHealth}%, Tires ${tireHealth}%`,
        'Upgrade suspension or change driving style.'
      );
    }

    // 3. Drift logic
    if (driftPossible && drivingStyle.toLowerCase() === 'aggressive') {
      return 'DRIFT_ATTACK';
    }

    // 4. Hard braking if too fast into a sharp corner
    if (speed > this.regulations.maxSpeedLimit - 20 && cornerAngle > 30) {
      return 'HARD_BRAKE';
    }

    // Default: keep racing line
    return 'MAINTAIN';
  }
}
