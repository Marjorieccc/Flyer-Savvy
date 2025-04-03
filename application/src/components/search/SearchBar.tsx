"use client";

import { useState, useRef, useEffect, KeyboardEvent, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaTimes } from "react-icons/fa";

import { RecentSearch } from "@/types/client/search";
import { loadSearch, search } from "@/service/api/searchService";
import SearchDropDown from "./SearchDropDown";
import styles from "./SearchBar.module.scss";

function SearchBar() {
  const [inputState, setInputState] = useState({
    searchTerm: "",
    isFocused: false,
    showResults: false,
  });
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  const clickOutsideRef = useRef<HTMLDivElement>(null); //Reference for detecting outside clicks
  // const router = useRouter();

  // Load the recent searches from user's localStorage
  useEffect(() => setRecentSearches(loadSearch()), []);

  // Close search results when clicking outside
  useEffect(function addOutsideClickHandler() {
    function handleClickOutside(event: MouseEvent) {
      if (
        clickOutsideRef.current &&
        !clickOutsideRef.current.contains(event.target as Node)
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

    search: (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Submit search from Search bar.");
      performSearch(inputState.searchTerm);
    },

    cancel: () => {
      setInputState({
        searchTerm: "",
        showResults: false,
        isFocused: false,
      });
    },
  };

  // Search handling
  function performSearch(term: string) {
    if (!term.trim()) return;

    const searchQuery = search(term);
    setRecentSearches(searchQuery.recentSearches);
    console.log(`redirectURL: ${searchQuery.searchURL}`);
    // router.push(redirectURL);

    setInputState((prev) => ({
      ...prev,
      searchTerm: term,
      showResults: false,
    }));
  }

  return (
    <div
      className={`${styles.searchBarContainer} ${
        inputState.showResults ? styles.showingDropdown : ""
      }`}
      ref={clickOutsideRef}
    >
      <form className={styles.searchForm} onSubmit={inputHandlers.search}>
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
            placeholder="What are you looking for?"
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
          {/* Clear Input button */}
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

        {/* Cancel button for mobile view */}
        {inputState.showResults && (
          <button
            type="button"
            className={styles.cancelButton}
            onClick={inputHandlers.cancel}
          >
            Cancel
          </button>
        )}
      </form>

      {inputState.showResults && (
        <SearchDropDown
          id="recent-search"
          recentSearches={recentSearches}
          performSearch={(text) => {
            performSearch(text);
          }}
        />
      )}
    </div>
  );
}

export default SearchBar;
