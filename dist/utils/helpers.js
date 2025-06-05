"use strict";
// src/utils/helpers.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatNumber = formatNumber;
exports.calculateVariance = calculateVariance;
exports.clamp = clamp;
exports.formatTime = formatTime;
exports.getRandomInt = getRandomInt;
/**
 * Formats a number to a fixed decimal string.
 * @param value - The number to format.
 * @param decimals - Number of decimal places (default 2).
 */
function formatNumber(value, decimals = 2) {
    return value.toFixed(decimals);
}
/**
 * Calculates variance of an array of numbers.
 * @param arr - Array of numbers.
 */
function calculateVariance(arr) {
    if (arr.length === 0)
        return 0;
    const mean = arr.reduce((sum, v) => sum + v, 0) / arr.length;
    const variance = arr.reduce((sum, v) => sum + (v - mean) ** 2, 0) / arr.length;
    return variance;
}
/**
 * Clamps a number between a minimum and maximum value.
 * @param value - The number to clamp.
 * @param min - Minimum allowed value.
 * @param max - Maximum allowed value.
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
/**
 * Converts a time in seconds to a formatted string (MM:SS).
 * @param seconds - Time in seconds.
 */
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    // Manual zero-padding instead of padStart
    const minutesStr = minutes < 10 ? '0' + minutes : String(minutes);
    const secsStr = secs < 10 ? '0' + secs : String(secs);
    return `${minutesStr}:${secsStr}`;
}
/**
 * Generates a random integer between min and max (inclusive).
 * @param min - Minimum value.
 * @param max - Maximum value.
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
