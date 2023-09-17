import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

// Types
type Content = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    type: 'article' | 'video' | 'image'; // Can be expanded
    date: string;
};

type DiscoveryFeedState = {
    content: Content[];
    isLoading: boolean;
    error: string | null;
};

// Initial State
const initialState: DiscoveryFeedState = {
    content: [],
    isLoading: false,
    error: null
};

// Slice
const discoveryFeedSlice = createSlice({
    name: 'discoveryFeed',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setContent: (state, action: PayloadAction<Content[]>) => {
            state.content = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearFeed: (state) => {
            state.content = [];
        }
    }
});

export const {
    startLoading,
    setContent,
    setError,
    clearFeed
} = discoveryFeedSlice.actions;

// Thunks (you'd typically have API calls here)
// Here's an example thunk for fetching content:

export const fetchDiscoveryContent = () => async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
        // Simulate an API call - replace with your actual API call
        const response = await new Promise<Content[]>(resolve => setTimeout(() => resolve([
            // Sample content, replace this with actual fetched content
            {
                id: '1',
                title: 'Sample Title',
                description: 'Sample Description',
                imageUrl: 'https://example.com/image.jpg',
                type: 'article',
                date: '2023-08-14'
            }
        ]), 1000));
        
        dispatch(setContent(response));
    } catch (error) {
        dispatch(setError('An error occurred while fetching content.'));
    }
};

// Selectors
type RootState = {
    discoveryFeed: DiscoveryFeedState;
};

export const selectContent = (state: RootState) => state.discoveryFeed.content;
export const selectIsLoading = (state: RootState) => state.discoveryFeed.isLoading;
export const selectError = (state: RootState) => state.discoveryFeed.error;

export default discoveryFeedSlice.reducer;
