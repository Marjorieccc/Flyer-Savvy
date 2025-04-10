import { useState, useCallback, KeyboardEvent } from "react";

interface KeyboardNavigationOptions<T> {
  items: T[];
  onSelect?: (item: T, index: number) => void;
  wrapAround?: boolean;
  initialIndex?: number;
  customKeyHandlers?: Record<
    string,
    (e: KeyboardEvent, index: number, items: T[]) => boolean
  >;
}

/**
 * A hook for keyboard navigation through a list of items
 * @param {T[]} items The items to navigate through, assumed items are strings or have a toString method
 * @param {(item: T, index: number) => void;} Callback when an item is selected (e.g. Enter key is pressed)
 * @param {boolean} wrapAround Whether to loop from last to first item and vice versa, @default false
 * @param {number} initialIndex Initial index to focus, @default -1 (no selection)
 * @param {Record<string, (e: KeyboardEvent, index: number, items: T[]) => boolean>;} customKeyHandlers Custom key handlers
 * @returns An object with navigation state and handlers
 */
export default function useKeyboardNavigation<T>({
  items,
  onSelect,
  wrapAround = false,
  initialIndex = -1,
  customKeyHandlers = {},
}: KeyboardNavigationOptions<T>) {
  const [focusedIndex, setFocusedIndex] = useState<number>(initialIndex);

  // Navigate to the next item
  const navigateNext = useCallback(() => {
    setFocusedIndex((prevIndex) => {
      if (prevIndex >= items.length - 1) {
        return wrapAround ? 0 : items.length - 1;
      }
      return prevIndex + 1;
    });
  }, [items.length, wrapAround]);

  // Navigate to the previous item
  const navigatePrevious = useCallback(() => {
    setFocusedIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return wrapAround ? items.length - 1 : 0;
      }
      return prevIndex - 1;
    });
  }, [items.length, wrapAround]);

  // Select the current focused item
  const selectCurrent = useCallback(() => {
    if (focusedIndex >= 0 && focusedIndex < items.length && onSelect) {
      onSelect(items[focusedIndex], focusedIndex);
      return true;
    }
    return false;
  }, [focusedIndex, items, onSelect]);

  // Reset the focused index
  const reset = useCallback(() => {
    setFocusedIndex(initialIndex);
  }, [initialIndex]);

  // Set focus to a specific item by index
  const setFocusedItem = useCallback(
    (index: number) => {
      if (index >= -1 && index < items.length) {
        setFocusedIndex(index);
      }
    },
    [items.length]
  );

  // Handle keyboard events for navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Check for custom key handlers first
      if (
        customKeyHandlers[e.key] &&
        customKeyHandlers[e.key](e, focusedIndex, items)
      ) {
        return;
      }

      // Handle default navigation keys
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          navigateNext();
          break;
        case "ArrowUp":
          e.preventDefault();
          navigatePrevious();
          break;
        case "Enter":
          if (focusedIndex >= 0) {
            e.preventDefault();
            selectCurrent();
          }
          break;
        case "Escape":
          e.preventDefault();
          reset();
          break;
        case "Home":
          e.preventDefault();
          setFocusedIndex(0);
          break;
        case "End":
          e.preventDefault();
          setFocusedIndex(items.length - 1);
          break;
        default:
          // Handle first-letter navigation
          if (e.key.length === 1) {
            const char = e.key.toLowerCase();
            // Try to find the next item that starts with this character
            for (let i = 1; i <= items.length; i++) {
              const index = (focusedIndex + i) % items.length;
              const item = items[index];

              const itemText = String(item).toLowerCase();
              if (itemText.startsWith(char)) {
                e.preventDefault();
                setFocusedIndex(index);
                break;
              }
            }
          }
          break;
      }
    },
    [
      customKeyHandlers,
      focusedIndex,
      items,
      navigateNext,
      navigatePrevious,
      reset,
      selectCurrent,
    ]
  );

  return {
    focusedIndex,
    setFocusedItem,
    handleKeyDown,
    navigateNext,
    navigatePrevious,
    selectCurrent,
    reset,
  };
}
