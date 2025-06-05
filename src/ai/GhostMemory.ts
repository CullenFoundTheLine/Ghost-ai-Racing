// src/ai/GhostMemory.ts

type Feedback = {
  driver: string;
  note: string;
  timestamp: string;
};

export class GhostMemory {
  private issueLog: string[] = [];
  private decisionHistory: string[] = [];
  private fixSuggestions: Map<string, string> = new Map();
  private lapTimes: number[] = [];
  private driverLapHistory: Map<string, number[]> = new Map();
  private driverHabits: Map<string, string> = new Map();
  private feedbackList: Feedback[] = [];
  private contextMemory: Map<string, any> = new Map();
  private recycledKeys: Set<string> = new Set();
  private issues: { issueType: string; details: Record<string, any>; timestamp: string }[] = [];

  /**
   * Record a high‐level issue with cause and a suggested fix.
   */
  recordIssue(issue: string, cause: string, suggestion: string): void {
    const entry = `${issue} | Cause: ${cause} | Suggestion: ${suggestion}`;
    this.issueLog.push(entry);
    this.fixSuggestions.set(issue, suggestion);
  }

  /**
   * Log a decision string (e.g., "DRIFT_ATTACK", "HARD_BRAKE").
   */
  logDecision(decision: string): void {
    this.decisionHistory.push(decision);
  }

  /**
   * Store a raw lap time.
   */
  saveLapTime(time: number): void {
    this.lapTimes.push(time);
  }

  /**
   * Store a lap time for a specific driver.
   */
  storeDriverLap(driver: string, time: number): void {
    if (!this.driverLapHistory.has(driver)) {
      this.driverLapHistory.set(driver, []);
    }
    this.driverLapHistory.get(driver)!.push(time);
  }

  /**
   * Record a driving habit (e.g., "late braking", "wide entry").
   */
  storeHabit(driver: string, habit: string): void {
    this.driverHabits.set(driver, habit);
  }

  /**
   * Add a Feedback entry (driver, note, timestamp).
   */
  addFeedback(feedback: Feedback): void {
    this.feedbackList.push(feedback);
  }

  /**
   * Remember arbitrary context under a given key, unless it's already recycled.
   */
  rememberContext(key: string, data: any): void {
    if (!this.recycledKeys.has(key)) {
      this.contextMemory.set(key, data);
    }
  }

  /**
   * Retrieve stored context by key (or undefined if not found).
   */
  retrieveContext(key: string): any {
    return this.contextMemory.get(key);
  }

  /**
   * Recycle (forget) a context entry by key.
   */
  recycle(key: string): void {
    this.recycledKeys.add(key);
    this.contextMemory.delete(key);
  }

  /**
   * Get all recorded issues.
   */
  getAllIssues(): string[] {
    return this.issueLog;
  }

  /**
   * Get a specific fix suggestion by issue.
   */
  getFixSuggestion(issue: string): string | undefined {
    return this.fixSuggestions.get(issue);
  }

  /**
   * Calculate the average lap time across all saved laps.
   * Returns 0 if no lap times recorded.
   */
  public getAverageLapTime(): number {
    if (this.lapTimes.length === 0) return 0;
    const sum = this.lapTimes.reduce((acc, t) => acc + t, 0);
    return sum / this.lapTimes.length;
  }

  /**
   * Get the latest recorded habit for a specific driver.
   * Returns undefined if no habit recorded.
   */
  public getDriverHabit(driver: string): string | undefined {
    return this.driverHabits.get(driver);
  }

  /**
   * Log an issue or event for later analysis.
   * @param issueType A short string describing the issue (e.g. 'Tire overheating')
   * @param details   An object with relevant details (e.g. { tireTemp, speed, cornerAngle })
   */
  public logIssue(issueType: string, details: Record<string, any>): void {
    if (!this.issues) this.issues = [];
    this.issues.push({ issueType, details, timestamp: new Date().toISOString() });
  }

  public getIssues() {
    return this.issues;
  }
}
