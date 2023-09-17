import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';

// Types
type SearchResult = {
    id: string;
    title: string;
    description: string;
    // Add any other relevant fields for search results
};

type PaginationInfo = {
    currentPage: number;
    totalResults: number;
    resultsPerPage: number;
};

type SearchResultsState = {
    results: SearchResult[];
    pagination: PaginationInfo;
    isLoading: boolean;
    error: string | null;
};

type RootAction = ReturnType<typeof searchResultsSlice.actions[keyof typeof searchResultsSlice.actions]>;

// Define the AppThunk type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  RootAction
>;

// Initial State
const initialState: SearchResultsState = {
    results: [],
    pagination: {
        currentPage: 1,
        totalResults: 0,
        resultsPerPage: 10,
    },
    isLoading: false,
    error: null
};

// Slice
const searchResultsSlice = createSlice({
    name: 'searchResults',
    initialState,
    reducers: {
        startFetchingResults: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setSearchResults: (state, action: PayloadAction<{results: SearchResult[], totalResults: number}>) => {
            state.results = action.payload.results;
            state.pagination.totalResults = action.payload.totalResults;
            state.isLoading = false;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

export const {
    startFetchingResults,
    setSearchResults,
    setPage,
    setError
} = searchResultsSlice.actions;

// Thunks

export const fetchSearchResults = (query: string, page: number = 1): AppThunk => async dispatch => {
    dispatch(startFetchingResults());
    try {
        // Replace this URL with your actual API endpoint
        const url = `https://api.example.com/search?q=${encodeURIComponent(query)}&page=${page}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Server responded with an error");
        }

        const data = await response.json();

        dispatch(setSearchResults({ results: data.results, totalResults: data.total }));
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setError(`An error occurred while fetching the search results: ${error.message}`));
        } else {
            dispatch(setError(`An unexpected error occurred while fetching the search results`));
        }
    }
};

// Selectors
type RootState = {
    searchResults: SearchResultsState;
};

export const selectResults = (state: RootState) => state.searchResults.results;
export const selectPaginationInfo = (state: RootState) => state.searchResults.pagination;
export const selectIsLoading = (state: RootState) => state.searchResults.isLoading;
export const selectError = (state: RootState) => state.searchResults.error;

export default searchResultsSlice.reducer;
