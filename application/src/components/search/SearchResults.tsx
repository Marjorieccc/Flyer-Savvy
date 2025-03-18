// src/components/search/SearchResults.tsx
"use client";

import { FaHistory, FaEllipsisV } from "react-icons/fa";
import styles from "./SearchResults.module.sass";
import { RecentSearch } from "@/types/client/search";

interface SearchResultsProps {
  id?: string;
  recentSearches: RecentSearch[];
  onSelectSearch: (text: string) => void;
}

/**
 * Dropdown component that displays recent searches
 *
 * @param {string} id - Optional ID for accessibility
 * @param {RecentSearch[]} recentSearches - List of user's recent searches
 * @param {(text: string) => void} onSelectSearch - Callback when user selects a search term
 */
function SearchResults({
  id,
  recentSearches,
  onSelectSearch,
}: SearchResultsProps) {
  // If no recent searches, show a message
  if (recentSearches.length === 0) {
    return (
      <div id={id} className={styles.searchResults} role="listbox">
        <div className={styles.noResults}>
          <p>No recent searches</p>
        </div>
      </div>
    );
  }

  return (
    <div id={id} className={styles.searchResults} role="listbox">
      {/* Recent searches section */}
      <div className={styles.section}>
        <h3 className={styles.sectionHeading}>
          <FaHistory size={12} className={styles.sectionIcon} />
          Recent searches
        </h3>
        <ul className={styles.resultsList}>
          {recentSearches.map((search, index) => (
            <li key={`search-${index}`} className={styles.resultItem}>
              <button
                className={styles.resultButton}
                onClick={() => onSelectSearch(search)}
                role="option"
              >
                <div className={styles.resultContent}>
                  <span className={styles.resultText}>{search}</span>
                </div>
              </button>
              <button
                className={styles.optionsButton}
                aria-label={`More options for ${search}`}
              >
                <FaEllipsisV aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchResults;
