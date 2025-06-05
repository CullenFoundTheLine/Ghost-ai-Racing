// src/utils/helpers.ts

/**
 * Formats a number to a fixed decimal string.
 * @param value - The number to format.
 * @param decimals - Number of decimal places (default 2).
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

/**
 * Calculates variance of an array of numbers.
 * @param arr - Array of numbers.
 */
export function calculateVariance(arr: number[]): number {
  if (arr.length === 0) return 0;
  const mean = arr.reduce((sum: number, v: number) => sum + v, 0) / arr.length;
  const variance =
    arr.reduce((sum: number, v: number) => sum + (v - mean) ** 2, 0) / arr.length;
  return variance;
}

/**
 * Clamps a number between a minimum and maximum value.
 * @param value - The number to clamp.
 * @param min - Minimum allowed value.
 * @param max - Maximum allowed value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Converts a time in seconds to a formatted string (MM:SS).
 * @param seconds - Time in seconds.
 */
export function formatTime(seconds: number): string {
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
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Ensure this file is treated as a module.
export {};
