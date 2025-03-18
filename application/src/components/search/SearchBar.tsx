"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import SearchResults from "./SearchResults";
import styles from "./SearchBar.module.sass";
import { RecentSearch } from "@/types/client/search";
import { useRouter } from "next/navigation";
import { loadSearch, saveSearch, search } from "@/service/api/searchService";

function SearchBar() {
  // State for search input and UI
  const [inputState, setInputState] = useState({
    searchTerm: "",
    isFocused: false,
    showResults: false,
  });
  // State for recent searches by users
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  const searchRef = useRef<HTMLDivElement>(null); //Reference for detecting outside clicks
  // const router = useRouter();

  // Load the recent searches from user's localStorage
  useEffect(() => setRecentSearches(loadSearch()), []);

  // Close search results when clicking outside
  useEffect(function addOutsideClickHandler() {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setInputState((prev) => ({ ...prev, showResults: false }));
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return function cleanup() {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const inputHandlers = {
    change: (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputState((prev) => ({ ...prev, searchTerm: e.target.value }));
    },

    focus: () => {
      setInputState((prev) => ({
        ...prev,
        isFocused: true,
        showResults: true,
      }));
    },

    blur: () => {
      setInputState((prev) => ({ ...prev, isFocused: false }));
    },

    clear: () => {
      setInputState((prev) => ({ ...prev, searchTerm: "" }));
    },

    keyDown: (e: KeyboardEvent<HTMLInputElement>) => {
      if (inputState.showResults && e.key === "Escape") {
        setInputState((prev) => ({ ...prev, showResults: false }));
      }
    },
  };

  // Search handling
  function performSearch(term: string) {
    if (!term.trim()) return;

    const updatedSearches = saveSearch(term);
    setRecentSearches(updatedSearches);
    // router.push(`/products?q=${encodeURIComponent(term)}`);
    setInputState((prev) => ({ ...prev, showResults: false }));
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    performSearch(inputState.searchTerm);
  }

  function handleSelectSearch(text: string) {
    setInputState((prev) => ({ ...prev, searchTerm: text }));
    performSearch(text);
  }

  return (
    <div className={styles.searchBarContainer} ref={searchRef}>
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <div
          className={`${styles.searchInputWrapper} ${
            inputState.isFocused ? styles.focused : ""
          }`}
          aria-expanded={inputState.showResults}
        >
          {/* Search input field */}
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Type the product you are looking for"
            value={inputState.searchTerm}
            onChange={inputHandlers.change}
            onFocus={inputHandlers.focus}
            onBlur={inputHandlers.blur}
            onKeyDown={inputHandlers.keyDown}
            aria-label="Search for products"
            aria-controls={
              inputState.showResults ? "search-results" : undefined
            }
          />
          {/* Cancel Input button */}
          {inputState.searchTerm && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={inputHandlers.clear}
              aria-label="Clear search"
            >
              <FaTimes aria-hidden="true" />
            </button>
          )}
          {/* Search button */}
          <button
            type="submit"
            className={styles.searchButton}
            aria-label="Search"
          >
            <FaSearch aria-hidden="true" />
          </button>
        </div>
      </form>

      {inputState.showResults && (
        <SearchResults
          id="search-results"
          recentSearches={recentSearches}
          onSelectSearch={(text) => {
            handleSelectSearch(text);
          }}
        />
      )}
    </div>
  );
}

export default SearchBar;
