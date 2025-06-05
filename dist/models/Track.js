"use strict";
// src/models/Track.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = void 0;
class Track {
    constructor(name, length, cornerCount, difficulty, regulationSet, surfaceType) {
        this.name = name;
        this.length = length;
        this.cornerCount = cornerCount;
        this.difficulty = difficulty;
        this.regulationSet = regulationSet;
        this.surfaceType = surfaceType;
    }
    isHighSpeed() {
        return this.cornerCount < 10 && this.length > 3;
    }
    isTechnical() {
        return this.cornerCount >= 12 || this.difficulty >= 7;
    }
}
exports.Track = Track;
// This class represents a racing track in the simulation.
// It includes properties for the track's name, length, corner count, difficulty,
// regulation set, and surface type.
// Methods allow checking if the track is high-speed or technical based on its
// characteristics. High-speed tracks have fewer corners and longer lengths,
// while technical tracks have more corners or higher difficulty ratings.
