"use strict";
// src/data/trackRules.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.DRIFT_REGULATIONS = exports.FIA_REGULATIONS = void 0;
exports.FIA_REGULATIONS = {
    maxSpeedLimit: 300,
    minCornerSpeed: 50,
    allowedDriftAngle: 35,
    penaltyThreshold: {
        speed: 320,
        angle: 45,
    },
};
exports.DRIFT_REGULATIONS = {
    maxSpeedLimit: 200,
    minCornerSpeed: 40,
    allowedDriftAngle: 60,
    penaltyThreshold: {
        speed: 220,
        angle: 70,
    },
};
