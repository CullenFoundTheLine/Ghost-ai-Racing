// src/data/trackRules.ts

/**
 * Regulations for different racing series.
 */
export interface Regulations {
  maxSpeedLimit: number;    // km/h
  minCornerSpeed: number;   // km/h
  allowedDriftAngle: number; // degrees
  penaltyThreshold: {
    speed: number;
    angle: number;
  };
}

export const FIA_REGULATIONS: Regulations = {
  maxSpeedLimit: 300,
  minCornerSpeed: 50,
  allowedDriftAngle: 35,
  penaltyThreshold: {
    speed: 320,
    angle: 45,
  },
};

export const DRIFT_REGULATIONS: Regulations = {
  maxSpeedLimit: 200,
  minCornerSpeed: 40,
  allowedDriftAngle: 60,
  penaltyThreshold: {
    speed: 220,
    angle: 70,
  },
};
