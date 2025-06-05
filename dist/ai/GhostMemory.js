"use strict";
// src/ai/GhostMemory.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.GhostMemory = void 0;
class GhostMemory {
    constructor() {
        this.issueLog = [];
        this.decisionHistory = [];
        this.fixSuggestions = new Map();
        this.lapTimes = [];
        this.driverLapHistory = new Map();
        this.driverHabits = new Map();
        this.feedbackList = [];
        this.contextMemory = new Map();
        this.recycledKeys = new Set();
        this.issues = [];
    }
    /**
     * Record a high‐level issue with cause and a suggested fix.
     */
    recordIssue(issue, cause, suggestion) {
        const entry = `${issue} | Cause: ${cause} | Suggestion: ${suggestion}`;
        this.issueLog.push(entry);
        this.fixSuggestions.set(issue, suggestion);
    }
    /**
     * Log a decision string (e.g., "DRIFT_ATTACK", "HARD_BRAKE").
     */
    logDecision(decision) {
        this.decisionHistory.push(decision);
    }
    /**
     * Store a raw lap time.
     */
    saveLapTime(time) {
        this.lapTimes.push(time);
    }
    /**
     * Store a lap time for a specific driver.
     */
    storeDriverLap(driver, time) {
        if (!this.driverLapHistory.has(driver)) {
            this.driverLapHistory.set(driver, []);
        }
        this.driverLapHistory.get(driver).push(time);
    }
    /**
     * Record a driving habit (e.g., "late braking", "wide entry").
     */
    storeHabit(driver, habit) {
        this.driverHabits.set(driver, habit);
    }
    /**
     * Add a Feedback entry (driver, note, timestamp).
     */
    addFeedback(feedback) {
        this.feedbackList.push(feedback);
    }
    /**
     * Remember arbitrary context under a given key, unless it's already recycled.
     */
    rememberContext(key, data) {
        if (!this.recycledKeys.has(key)) {
            this.contextMemory.set(key, data);
        }
    }
    /**
     * Retrieve stored context by key (or undefined if not found).
     */
    retrieveContext(key) {
        return this.contextMemory.get(key);
    }
    /**
     * Recycle (forget) a context entry by key.
     */
    recycle(key) {
        this.recycledKeys.add(key);
        this.contextMemory.delete(key);
    }
    /**
     * Get all recorded issues.
     */
    getAllIssues() {
        return this.issueLog;
    }
    /**
     * Get a specific fix suggestion by issue.
     */
    getFixSuggestion(issue) {
        return this.fixSuggestions.get(issue);
    }
    /**
     * Calculate the average lap time across all saved laps.
     * Returns 0 if no lap times recorded.
     */
    getAverageLapTime() {
        if (this.lapTimes.length === 0)
            return 0;
        const sum = this.lapTimes.reduce((acc, t) => acc + t, 0);
        return sum / this.lapTimes.length;
    }
    /**
     * Get the latest recorded habit for a specific driver.
     * Returns undefined if no habit recorded.
     */
    getDriverHabit(driver) {
        return this.driverHabits.get(driver);
    }
    /**
     * Log an issue or event for later analysis.
     * @param issueType A short string describing the issue (e.g. 'Tire overheating')
     * @param details   An object with relevant details (e.g. { tireTemp, speed, cornerAngle })
     */
    logIssue(issueType, details) {
        if (!this.issues)
            this.issues = [];
        this.issues.push({ issueType, details, timestamp: new Date().toISOString() });
    }
    getIssues() {
        return this.issues;
    }
}
exports.GhostMemory = GhostMemory;
