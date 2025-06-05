// src/types/index.ts

import { TelemetryData } from '../data/telemetry';
import { Regulations } from '../data/trackRules';

/**
 * Car interface representing core properties transferred between modules if needed.
 */
export interface CarProps {
  model: string;
  type: string;
  weight: number;
  baseGrip: number;
  crankHP: number;
  wheelHP: number;
  intensity: number;
}

/**
 * Driver interface representing core driver attributes.
 */
export interface DriverProps {
  name: string;
  experience: number;
  aggression: number;
  focus: number;
}

/**
 * TelemetryData is imported for convenience.
 */
export type Telemetry = TelemetryData;

/**
 * RaceData is the processed data from TelemetryAnalyzer.
 */
export type RaceDataType = import('../models/RaceData').RaceData;

/**
 * ECU settings interface.
 */
export interface ECUProps {
  tractionControl: boolean;
  abs: boolean;
  stabilityControl: boolean;
  oversteerAssist: boolean;
  launchControl: boolean;
}

/**
 * Tire properties interface.
 */
export interface TireProps {
  name: string;
  grip: number;
  durability: number;
  heatRate: number;
}

/**
 * Part properties interface.
 */
export interface PartProps {
  name: string;
  category: string;
  effectType: string;
  value: number;
  durability: number;
}

/**
 * Track properties interface.
 */
export interface TrackProps {
  name: string;
  length: number;
  cornerCount: number;
  difficulty: number;
  regulationSet: keyof RegulationSets;
  surfaceType: string;
}

/**
 * Regulations mapping for track-specific rule sets.
 */
export interface RegulationSets {
  FIA: Regulations;
  DRIFT: Regulations;
}
