// src/models/Driver.ts

export class Driver {
  name: string;
  experience: number; // 0 to 100 scale
  aggression: number; // 0 = super safe, 1 = risk taker
  focus: number;      // affects consistency, 0 to 1
  fatigue: number = 0; // increases with laps/time
  mistakes: number = 0; // how many notable errors in a session

  constructor(
    name: string,
    experience: number,
    aggression: number,
    focus: number
  ) {
    this.name = name;
    this.experience = experience;
    this.aggression = aggression;
    this.focus = focus;
  }

  makeMistake(): void {
    this.mistakes += 1;
    this.focus -= 0.05;
    if (this.focus < 0) this.focus = 0;
  }

  recoverFocus(): void {
    this.focus += 0.02;
    if (this.focus > 1) this.focus = 1;
  }

  increaseFatigue(): void {
    this.fatigue += 0.1;
    if (this.fatigue > 1) this.fatigue = 1;
  }

  resetSessionStats(): void {
    this.mistakes = 0;
    this.fatigue = 0;
  }
}
// This class represents a driver in the racing simulation.
// It includes attributes for the driver's name, experience level, aggression,
// focus, fatigue, and mistakes made during a session.
// Methods allow the driver to make mistakes, recover focus, increase fatigue,
// and reset session stats.