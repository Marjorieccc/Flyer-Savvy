/**
 * Creates a configurable debounced function that can execute at the leading edge,
 * trailing edge, or both.
 *
 * @param {T} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @param {boolean} immediate - If true, execute at the leading edge of the timeout
 * @returns {(...args: Parameters<T>) => void} A debounced version of the provided function
 */
function createDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  immediate: boolean
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | undefined;
  let lastArgs: Parameters<T> | undefined;

  return function (...args: Parameters<T>): void {
    lastArgs = args;

    if (immediate && !timeoutId) func(...args); // Execute immediately for leading debounce

    if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout

    timeoutId = setTimeout(() => {
      if (!immediate && lastArgs) {
        func(...lastArgs);
      }
      timeoutId = undefined;
      lastArgs = undefined;
    }, delay);
  };
}

/**
 * Creates a debounced function that delays execution until after the specified
 * delay has elapsed since the last time it was invoked.
 *
 * @param {T} func - The function to debounce
 * @param {number} delay - The delay in milliseconds (default: 300ms)
 * @returns {(...args: Parameters<T>) => void} A trailing debounced version of the provided function
 */
export function trailingDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  return createDebounce(func, delay, false);
}

/**
 * Creates a debounced function that executes immediately on the first call,
 * then ignores subsequent calls until the specified delay has elapsed.
 *
 * @param {T} func - The function to debounce
 * @param {number} delay - The delay in milliseconds (default: 300ms)
 * @returns {(...args: Parameters<T>) => void} A leading debounced version of the provided function
 */
export function leadingDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  return createDebounce(func, delay, true);
}

/**
 * Creates a debounced function that executes both at the beginning of the
 * call sequence and after the debounce delay.
 *
 * @param {T} func - The function to debounce
 * @param {number} delay - The delay in milliseconds (default: 300ms)
 * @returns {(...args: Parameters<T>) => void} A debounced version that executes at both leading and trailing edges
 */
export function bothDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  const leadingFn = leadingDebounce(func, delay);
  const trailingFn = trailingDebounce(func, delay);

  return function (...args: Parameters<T>): void {
    leadingFn(...args);
    trailingFn(...args);
  };
}
