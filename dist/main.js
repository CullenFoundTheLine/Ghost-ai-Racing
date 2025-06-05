"use strict";
// src/main.ts
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("./data/storage");
const telemetry_1 = require("./data/telemetry");
const GhostMemory_1 = require("./ai/GhostMemory");
const GhostVoice_1 = require("./ai/GhostVoice");
const GhostAdvisor_1 = require("./ai/GhostAdvisor");
const learning_1 = require("./ai/learning");
const GhostMind_1 = require("./ai/GhostMind");
const trackRules_1 = require("./data/trackRules");
const Car_1 = require("./models/Car");
const Driver_1 = require("./models/Driver");
const ECU_1 = require("./models/ECU");
const Tire_1 = require("./models/Tire");
const Part_1 = require("./models/Part");
const Track_1 = require("./models/Track");
async function main() {
    // Initialize storage & AI modules
    const storageService = new storage_1.StorageService();
    const memory = new GhostMemory_1.GhostMemory();
    const voice = new GhostVoice_1.GhostVoice();
    const advisor = new GhostAdvisor_1.GhostAdvisor();
    const learner = new learning_1.Learning();
    const mind = new GhostMind_1.GhostMind(memory, trackRules_1.FIA_REGULATIONS);
    // Load previous run (if any) and recycle if under 60s
    const lastRun = storageService.loadData('latestRace');
    if (lastRun) {
        console.log('[Storage] Loaded last run:', lastRun);
        if (lastRun.lapTime < 60) {
            storageService.deleteData('latestRace');
            console.log('[Storage] Recycled data for latestRace (lapTime < 60s)');
        }
    }
    // Construct car, driver, and track (Silverstone)
    const ecu = new ECU_1.ECU(true, true, true, false, false);
    const tire = new Tire_1.Tire('Pirelli P Zero', 1.1, 100.0, 5.0);
    const car = new Car_1.Car('Silverstone GT3', 'GT3', 1400, 0.75, 520, 480, 0.85);
    car.tire = tire;
    const driver = new Driver_1.Driver('Cullen', 65, 0.7, 0.9);
    const track = new Track_1.Track('Silverstone Circuit', 5.891, 18, 5, 'FIA', 'asphalt');
    console.log(`\n=== Real‐World Test: Maggotts–Becketts at ${track.name} ===`);
    console.log(`Car: ${car.model} | Driver: ${driver.name}\n`);
    // Telemetry snapshots (timestamps spaced by 100ms)
    // These points represent the car approaching, apexing, and exiting Maggotts–Becketts:
    const baseTime = Date.now();
    const maggottsTelemetry = [
        // 1) Approach: Exiting Hangar Straight, ~250 km/h, getting hard on brakes
        {
            speed: 250,
            engineRPM: 9200,
            gear: 7,
            throttlePosition: 0.3,
            brakePressure: 0.7,
            tireTemps: { frontLeft: 85, frontRight: 85, rearLeft: 83, rearRight: 83 },
            timestamp: new Date(baseTime + 0).toISOString(),
        },
        // 2) Maggotts entry: Tight left‐right, speed ~180, brake easing
        {
            speed: 180,
            engineRPM: 7800,
            gear: 6,
            throttlePosition: 0.2,
            brakePressure: 0.2,
            tireTemps: { frontLeft: 90, frontRight: 92, rearLeft: 88, rearRight: 89 },
            timestamp: new Date(baseTime + 100).toISOString(),
        },
        // 3) Becketts apex: Speed ~160, throttle back to ~50%, slight brake
        {
            speed: 160,
            engineRPM: 7500,
            gear: 6,
            throttlePosition: 0.5,
            brakePressure: 0.1,
            tireTemps: { frontLeft: 95, frontRight: 96, rearLeft: 92, rearRight: 93 },
            timestamp: new Date(baseTime + 200).toISOString(),
        },
        // 4) Becketts exit: Flatten throttle, speed climbs to ~220
        {
            speed: 220,
            engineRPM: 8800,
            gear: 7,
            throttlePosition: 0.9,
            brakePressure: 0,
            tireTemps: { frontLeft: 100, frontRight: 102, rearLeft: 98, rearRight: 99 },
            timestamp: new Date(baseTime + 300).toISOString(),
        },
        // 5) Post‐Becketts: Back on full throttle, speed ~280
        {
            speed: 280,
            engineRPM: 9500,
            gear: 7,
            throttlePosition: 1.0,
            brakePressure: 0,
            tireTemps: { frontLeft: 105, frontRight: 106, rearLeft: 102, rearRight: 103 },
            timestamp: new Date(baseTime + 400).toISOString(),
        },
    ];
    console.log(`[Telemetry] Prepared ${maggottsTelemetry.length} points for Maggotts–Becketts.`);
    // Analyze the full array into RaceData
    const raceData = telemetry_1.TelemetryAnalyzer.analyze(maggottsTelemetry);
    console.log('\n=== Telemetry Analysis Results ===');
    console.log(`Lap Time (segment): ${(raceData.lapTime).toFixed(2)}s (estimated)`);
    console.log(`Average Speed: ${raceData.averageSpeed.toFixed(1)} km/h`);
    console.log(`Max Speed: ${raceData.maxSpeed.toFixed(1)} km/h`);
    console.log(`Tire Wear (Δ avg temps): ${raceData.tireWear.toFixed(1)}°C`);
    console.log(`Stability Score: ${raceData.stabilityScore.toFixed(1)}\n`);
    // Save & record memory as before
    storageService.saveData('latestRace', raceData);
    console.log('[Storage] Saved latestRace.json');
    memory.saveLapTime(raceData.lapTime);
    memory.storeDriverLap(driver.name, raceData.lapTime);
    console.log(`[Memory] Recorded lap time: ${raceData.lapTime.toFixed(2)}s\n`);
    // Advisor advice based on this segment
    // Corrected Part instantiation: third argument must be a string attribute
    const brakePad = new Part_1.Part('High‐Performance Brake Pads', 'Brakes', 'braking', 2, 1200);
    const upgradeAdvice = advisor.explainUpgradeForDriver(car, brakePad);
    console.log('[Advisor → Driver]:', upgradeAdvice);
    const coachAdvice = advisor.explainForCoach(driver, memory);
    console.log('\n[Advisor → Coach]:', coachAdvice);
    // Now feed each point into GhostMind to get per‐point feedback
    console.log('\n=== GhostMind Feedback at Each Point ===');
    maggottsTelemetry.forEach((point, idx) => {
        const avgTireTemp = parseFloat(((point.tireTemps.frontLeft +
            point.tireTemps.frontRight +
            point.tireTemps.rearLeft +
            point.tireTemps.rearRight) /
            4).toFixed(1));
        // Choose a corner angle: Maggotts left ≈ 40°, Becketts right ≈ 50°
        let cornerAngle = 0;
        if (idx === 0)
            cornerAngle = 0; // straight (Hangar)
        if (idx === 1)
            cornerAngle = 40; // Maggotts entry
        if (idx === 2)
            cornerAngle = 50; // Becketts apex
        if (idx === 3)
            cornerAngle = 20; // Exit kink
        if (idx === 4)
            cornerAngle = 0; // Straight out of Becketts
        // Determine driftPossible: only in transitional mid‐corner if speeds < 170 and angle ~50
        const driftPossible = idx === 2 && point.speed < 170;
        // Driving style: assume aggressive through Maggotts–Becketts
        const drivingStyle = 'aggressive';
        const decision = mind.decideAction(cornerAngle, point.speed, driftPossible, drivingStyle, new Map([
            ['Tires', tire.durability - idx * 2], // assume slight wear after each point
            ['Suspension', 90 - idx * 3], // progressive suspension load
        ]), avgTireTemp);
        console.log(`Point ${idx + 1}: speed=${point.speed} km/h, cornerAngle=${cornerAngle}°, tireAvg=${avgTireTemp}°C → Decision: ${decision}`);
        voice.giveCommand(decision);
        console.log('');
    });
    console.log('--- Real‐World Maggotts–Becketts Test Complete ---');
}
main().catch((err) => console.error(err));
// This code initializes a racing simulation environment with a car, driver, track, and AI modules.
// It fetches mock telemetry data, analyzes it, and provides advice on car upgrades and coaching.
// The AI makes decisions based on telemetry and driver behavior, and the learning module processes advice.
// The simulation is run in an asynchronous main function, which handles errors gracefully.
// The GhostMind, GhostMemory, GhostVoice, and GhostAdvisor classes are used to simulate AI behavior,
// while the Car, Driver, ECU, Tire, Part, Track, and RaceData models represent the racing entities.
// The TelemetryAnalyzer processes telemetry data to extract
