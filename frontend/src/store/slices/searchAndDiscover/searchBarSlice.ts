import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

// Types
type SearchResult = {
    id: string;
    title: string;
    description: string;
    // Add any other relevant fields for search results
};

type SearchBarState = {
    query: string;
    results: SearchResult[];
    isLoading: boolean;
    error: string | null;
};

// Initial State
const initialState: SearchBarState = {
    query: '',
    results: [],
    isLoading: false,
    error: null
};

// Slice
const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        startSearch: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setSearchResults: (state, action: PayloadAction<SearchResult[]>) => {
            state.results = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

export const {
    setQuery,
    startSearch,
    setSearchResults,
    setError
} = searchBarSlice.actions;

// Thunks (you'd typically have API calls here)
// Here's an example thunk for executing a search:
export const executeSearch = (query: string) => async (dispatch: Dispatch) => {
    dispatch(startSearch());
    try {
        // Simulating an API call (replace this with a real API call)
        const response = await fetch(`YOUR_API_ENDPOINT?query=${query}`);
        const data = await response.json();
        dispatch(setSearchResults(data.results)); // Adjust as per your API response structure
    } catch (error) {
        dispatch(setError('An error occurred while executing the search.'));
    }
};

// Selectors
type RootState = {
    searchBar: SearchBarState;
};

export const selectQuery = (state: RootState) => state.searchBar.query;
export const selectResults = (state: RootState) => state.searchBar.results;
export const selectIsLoading = (state: RootState) => state.searchBar.isLoading;
export const selectError = (state: RootState) => state.searchBar.error;

export default searchBarSlice.reducer;
