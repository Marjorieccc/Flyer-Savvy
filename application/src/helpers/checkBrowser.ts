/**
 * Check if code is running in browser environment
 * @returns {boolean} a boolean value indicates in browser environment or not
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}
