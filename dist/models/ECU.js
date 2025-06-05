"use strict";
// src/models/ECU.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECU = void 0;
/**
 * Represents the Engine Control Unit for a car,
 * including safety and performance toggles.
 */
class ECU {
    constructor(tractionControl = true, abs = true, stabilityControl = true, oversteerAssist = false, launchControl = false) {
        this.tractionControl = tractionControl;
        this.abs = abs;
        this.stabilityControl = stabilityControl;
        this.oversteerAssist = oversteerAssist;
        this.launchControl = launchControl;
    }
    /**
     * Toggle exactly one boolean setting. Only these keys are allowed.
     */
    toggleSetting(setting) {
        this[setting] = !this[setting];
    }
    /**
     * Return a list of all currently enabled boolean settings.
     */
    getActiveSettings() {
        const active = [];
        if (this.tractionControl)
            active.push('tractionControl');
        if (this.abs)
            active.push('abs');
        if (this.stabilityControl)
            active.push('stabilityControl');
        if (this.oversteerAssist)
            active.push('oversteerAssist');
        if (this.launchControl)
            active.push('launchControl');
        return active;
    }
}
exports.ECU = ECU;
// This class represents an ECU (Electronic Control Unit) in the racing simulation.
// It includes properties for various electronic aids like traction control, ABS,
// stability control, oversteer assist, and launch control.
