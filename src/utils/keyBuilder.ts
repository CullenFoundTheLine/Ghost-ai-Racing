// src/utils/keyBuilder.ts

/**
 * Builds a unique memory key based on type, source, and date.
 * Ensures consistent formatting throughout Ghost’s memory.
 * @param type - Type/category of data (e.g., "TELEMETRY", "LAP", "ISSUE").
 * @param source - Source or context (e.g., track name or driver name).
 * @param timestamp - ISO string or custom descriptor.
 */
export function buildKey(type: string, source: string, timestamp: string): string {
  // Replace spaces with underscores and uppercase everything
  const formattedType = type.toUpperCase().replace(/\s+/g, '_');
  const formattedSource = source.toUpperCase().replace(/\s+/g, '_');
  const formattedTime = timestamp.toUpperCase().replace(/\s+/g, '_');

  return `${formattedType}_${formattedSource}_${formattedTime}`;
}
/**
 * Builds a key for telemetry data.
 * @param trackName - Name of the track.
 * @param timestamp - ISO string or custom descriptor.
 */
export function buildTelemetryKey(trackName: string, timestamp: string): string {
  return buildKey('TELEMETRY', trackName, timestamp);
}   