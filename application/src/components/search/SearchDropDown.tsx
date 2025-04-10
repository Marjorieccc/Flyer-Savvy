"use client";

import { FaHistory, FaEllipsisV } from "react-icons/fa";
import styles from "./SearchDropDown.module.scss";
import { RecentSearch } from "@/types/client/search";
import { useEffect, useRef } from "react";
import useKeyboardNavigation from "@/hook/useKeyboardNavigation";

interface SearchDropDownProps {
  id: string;
  recentSearches: RecentSearch[];
  performSearch: (text: string) => void;
}

/**
 * Dropdown component that displays recent searches
 * @param {string} id - Dropdown id
 * @param {RecentSearch[]} recentSearches - List of recent searches
 * @param {(text: string) => void} performSearch - Callback to perform search
 */
export default function SearchDropDown({
  id,
  recentSearches,
  performSearch,
}: SearchDropDownProps) {
  // Reference to the list container for keyboard navigation
  const listRef = useRef<HTMLUListElement>(null);

  // Set up keyboard navigation
  const { focusedIndex, setFocusedItem, handleKeyDown } =
    useKeyboardNavigation<RecentSearch>({
      items: recentSearches,
      onSelect: (item) => {
        performSearch(item);
      },
    });

  // Focus the selected item when it changes
  useEffect(() => {
    if (focusedIndex >= 0 && listRef.current) {
      const buttons = listRef.current.querySelectorAll<HTMLButtonElement>(
        'button[role="option"]'
      );
      if (buttons[focusedIndex]) {
        buttons[focusedIndex].focus();
      }
    }
  }, [focusedIndex]);

  function handleSelectSearch(text: string) {
    performSearch(text);
  }
  function handleMouseEnter(index: number) {
    setFocusedItem(index);
  }

  // If no recent searches, show a message
  if (recentSearches.length === 0) {
    return (
      <div
        id={id}
        className={styles.searchDropdown}
        role="listbox"
        aria-label="Recent searches"
      >
        <div className={styles.noResults}>
          <p>No recent searches</p>
        </div>
      </div>
    );
  }

  return (
    <div
      id={id}
      className={styles.searchDropdown}
      role="listbox"
      aria-label="Recent searches"
      onKeyDown={handleKeyDown}
    >
      {/* Recent searches section */}
      <div className={styles.section}>
        <h3 className={styles.sectionHeading}>
          <FaHistory size={12} className={styles.sectionIcon} />
          Recent searches
        </h3>
        <ul className={styles.resultsList} ref={listRef}>
          {recentSearches.map((search, index) => (
            <li key={`search-${index}`} className={styles.resultItem}>
              <button
                className={`${styles.resultButton} ${
                  focusedIndex === index ? styles.focused : ""
                }`}
                onClick={() => handleSelectSearch(search)}
                onMouseEnter={() => handleMouseEnter(index)}
                role="option"
                aria-selected={focusedIndex === index ? "true" : "false"}
                tabIndex={focusedIndex === index ? 0 : -1}
              >
                <FaHistory size={12} className={styles.sectionIcon} />
                <span
                  className={`${styles.resultContent} ${styles.resultText}`}
                >
                  {search}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
