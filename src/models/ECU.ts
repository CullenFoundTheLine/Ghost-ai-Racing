// src/models/ECU.ts

/**
 * Represents the Engine Control Unit for a car,
 * including safety and performance toggles.
 */
export class ECU {
  tractionControl: boolean;
  abs: boolean;
  stabilityControl: boolean;
  oversteerAssist: boolean;
  launchControl: boolean;

  constructor(
    tractionControl: boolean = true,
    abs: boolean = true,
    stabilityControl: boolean = true,
    oversteerAssist: boolean = false,
    launchControl: boolean = false
  ) {
    this.tractionControl = tractionControl;
    this.abs = abs;
    this.stabilityControl = stabilityControl;
    this.oversteerAssist = oversteerAssist;
    this.launchControl = launchControl;
  }

  /**
   * Toggle exactly one boolean setting. Only these keys are allowed.
   */
  public toggleSetting(
    setting: 'tractionControl' | 'abs' | 'stabilityControl' | 'oversteerAssist' | 'launchControl'
  ): void {
    this[setting] = !this[setting];
  }

  /**
   * Return a list of all currently enabled boolean settings.
   */
  public getActiveSettings(): string[] {
    const active: string[] = [];
    if (this.tractionControl) active.push('tractionControl');
    if (this.abs) active.push('abs');
    if (this.stabilityControl) active.push('stabilityControl');
    if (this.oversteerAssist) active.push('oversteerAssist');
    if (this.launchControl) active.push('launchControl');
    return active;
  }
}
// This class represents an ECU (Electronic Control Unit) in the racing simulation.
// It includes properties for various electronic aids like traction control, ABS,
// stability control, oversteer assist, and launch control.