// src/models/Track.ts

export class Track {
  name: string;
  length: number; // in kilometers
  cornerCount: number;
  difficulty: number; // 1 to 10 scale
  regulationSet: string; // e.g. "FIA", "Drift", "TimeAttack"
  surfaceType: string; // e.g. "asphalt", "wet", "mixed"

  constructor(
    name: string,
    length: number,
    cornerCount: number,
    difficulty: number,
    regulationSet: string,
    surfaceType: string
  ) {
    this.name = name;
    this.length = length;
    this.cornerCount = cornerCount;
    this.difficulty = difficulty;
    this.regulationSet = regulationSet;
    this.surfaceType = surfaceType;
  }

  isHighSpeed(): boolean {
    return this.cornerCount < 10 && this.length > 3;
  }

  isTechnical(): boolean {
    return this.cornerCount >= 12 || this.difficulty >= 7;
  }
}
// This class represents a racing track in the simulation.
// It includes properties for the track's name, length, corner count, difficulty,
// regulation set, and surface type.
// Methods allow checking if the track is high-speed or technical based on its
// characteristics. High-speed tracks have fewer corners and longer lengths,
// while technical tracks have more corners or higher difficulty ratings.