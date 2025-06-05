"use strict";
// src/ai/GhostMind.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.GhostMind = void 0;
/**
 * GhostMind is the decision engine. It takes current telemetry and returns:
 *   - 'DRIFT_ATTACK'   when conditions (corner, speed, style) allow drifting
 *   - 'HARD_BRAKE'     when approaching a very steep corner at high speed
 *   - 'COOL_DOWN'      when tires or parts are too hot/worn
 *   - 'MAINTAIN'       otherwise
 */
class GhostMind {
    constructor(memory, rules) {
        this.memory = memory;
        this.rules = rules;
    }
    decideAction(cornerAngle, speed, driftPossible, drivingStyle, partHealth, tireTemp) {
        var _a, _b;
        // 1) Tire overheat has absolute priority
        if (tireTemp > 95) {
            this.memory.logIssue('Tire overheating', {
                tireTemp,
                speed,
                cornerAngle,
            });
            return 'COOL_DOWN';
        }
        // 2) If conditions allow drifting, and driver is aggressive, do it immediately
        //    (e.g. Becketts apex: speed ~160, cornerAngle ~50°, driftPossible true)
        if (driftPossible && drivingStyle === 'aggressive') {
            this.memory.logIssue('Initiating drift', { speed, cornerAngle });
            return 'DRIFT_ATTACK';
        }
        // 3) If corner is very steep (> 30°) and speed > 150, brake hard
        //    (e.g. Maggotts entry: 180 km/h, 40°)
        if (cornerAngle > 30 && speed > 150) {
            this.memory.logIssue('High speed into sharp corner', {
                speed,
                cornerAngle,
            });
            return 'HARD_BRAKE';
        }
        // 4) If parts (tires or suspension) are too worn, cool down
        const tireHealth = (_a = partHealth.get('Tires')) !== null && _a !== void 0 ? _a : 100;
        const suspensionHealth = (_b = partHealth.get('Suspension')) !== null && _b !== void 0 ? _b : 100;
        if (tireHealth < 60 || suspensionHealth < 50) {
            this.memory.logIssue('Part health low', { tireHealth, suspensionHealth });
            return 'COOL_DOWN';
        }
        // 5) Otherwise, maintain pace
        return 'MAINTAIN';
    }
}
exports.GhostMind = GhostMind;
