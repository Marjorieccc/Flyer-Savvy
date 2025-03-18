/**
 * Represents a product search term that the user has previously searched for
 */
export type RecentSearch = string;

/**
 * Search state for managing context across the application
 */
export interface SearchState {
  searchTerm: string;
  recentSearches: RecentSearch[];
  isLoading: boolean;
}
