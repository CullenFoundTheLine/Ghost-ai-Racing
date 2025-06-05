// src/main.ts

import { Car } from './models/Car';
import { Driver } from './models/Driver';
import { ECU } from './models/ECU';
import { Tire } from './models/Tire';
import { Part } from './models/Part';
import { Track } from './models/Track';
import { RaceData } from './models/RaceData';

import { GhostMind } from './ai/GhostMind';
import { GhostMemory } from './ai/GhostMemory';
import { GhostVoice } from './ai/GhostVoice';
import { GhostAdvisor } from './ai/GhostAdvisor';
import { Learning } from './ai/learning';

import { TelemetryAnalyzer, TelemetryData } from './data/telemetry';
import { fetchLiveTelemetry } from './api/hardwareIntegration';
import { FIA_REGULATIONS } from './data/trackRules';

async function main() {
  // Initialize core objects
  const ecu = new ECU(true, true, true, false, false);
  const tire = new Tire('Default', 1.0, 100.0, 5.0);
  const car = new Car('Supra MK4', 'Sports', 1400, 0.9, 550, 500, 0.8);
  car.tire = tire; // assign tire to car
  
  const driver = new Driver('Cullen', 50, 0.7, 0.8);
  const track = new Track('Tsukuba Circuit', 2.0, 13, 6, 'FIA', 'asphalt');

  // Initialize AI modules
  const memory = new GhostMemory();
  const mind = new GhostMind(memory, FIA_REGULATIONS);
  const voice = new GhostVoice();
  const advisor = new GhostAdvisor();
  const learner = new Learning();

  // Fetch mock telemetry
  const telemetryData: TelemetryData[] = await fetchLiveTelemetry();
  const raceData: RaceData = TelemetryAnalyzer.analyze(telemetryData);

  // Store lap time in memory
  memory.saveLapTime(raceData.lapTime);
  memory.storeDriverLap(driver.name, raceData.lapTime);

  // Advisor provides advice to driver
  const upgradeAdvice = advisor.explainUpgradeForDriver(car, new Part('Turbocharger', 'Engine', 'power', 50, 100));
  console.log('[Advisor to Driver]:', upgradeAdvice);

  // Advisor provides coaching advice
  const coachAdvice = advisor.explainForCoach(driver, memory);
  console.log('[Advisor to Coach]:', coachAdvice);

  // AI builds decision
  const decision = mind.decideAction(
    45, // cornerAngle
    raceData.maxSpeed, // speed
    true, // driftPossible
    'aggressive', // drivingStyle
    new Map([['Tires', tire.durability], ['Suspension', 80]]), // partHealth
    raceData.tireWear // tireTemp
  );

  voice.giveCommand(decision);

  // Learning from the advisor's suggestion
  const learnedAction = learner.determineAction(upgradeAdvice);
  voice.giveCommand(learnedAction);

  console.log('Simulation complete.');
}

// Run main
main().catch(error => console.error(error));
// This code initializes a racing simulation environment with a car, driver, track, and AI modules.
// It fetches mock telemetry data, analyzes it, and provides advice on car upgrades and coaching.
// The AI makes decisions based on telemetry and driver behavior, and the learning module processes advice.
// The simulation is run in an asynchronous main function, which handles errors gracefully.
// The GhostMind, GhostMemory, GhostVoice, and GhostAdvisor classes are used to simulate AI behavior,
// while the Car, Driver, ECU, Tire, Part, Track, and RaceData models represent the racing entities.
// The TelemetryAnalyzer processes telemetry data to extract    