import { RecentSearch } from "@/types/client/search";
import { isBrowser } from "@/helpers/checkBrowser";
import { SearchQuery } from "@/types/client/search";

/**
 * Performs the product search
 * @param {string} searchTerm - The term to search for
 * @returns {SearchQuery} User's recent search list and search results redirect URL
 */
export function search(searchTerm: string): SearchQuery {
  // Save the search term to history
  const recentSearch: RecentSearch[] = saveSearch(searchTerm);
  return {
    recentSearches: recentSearch,
    searchURL: `/products?q=${encodeURIComponent(searchTerm)}`,
  };
}

/**
 * Load the user recent searches from localStorage
 * @returns {RecentSearch[]} the most recent searches
 */
export function loadSearch(): RecentSearch[] {
  // Return empty array if running on server
  if (!isBrowser()) return [];

  const recentSearchesJSON = localStorage.getItem("recentSearches");
  return recentSearchesJSON ? JSON.parse(recentSearchesJSON) : [];
}

/**
 * Save the recent search to localStorage
 * @param {string}searchTerm - The term to search for
 * @returns {RecentSearch} - the 5 most recent search terms
 */
export function saveSearch(searchTerm: string): RecentSearch[] {
  // Get the recent search terms from local storage
  const recentSearches = loadSearch();

  // Check if this search term already exists and delete it
  const existTermIndex = recentSearches.findIndex(
    (search) => search.toLowerCase() === searchTerm.toLowerCase()
  );
  if (existTermIndex !== -1) recentSearches.splice(existTermIndex, 1);

  // Add the new search and keep only the 5 most recent searches
  recentSearches.unshift(searchTerm);
  const updatedRecentSearches = recentSearches.slice(0, 5);

  // Save the updated search back to localStorage
  localStorage.setItem("recentSearches", JSON.stringify(updatedRecentSearches));

  return updatedRecentSearches;
}
