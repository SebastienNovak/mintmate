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

export type DiscoveryFeedState = {
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
            // Expanded sample content, replace this with actual fetched content
            { id: '1', title: 'Sample Title 1', description: 'Sample Description 1', imageUrl: 'https://example.com/image1.jpg', type: 'article', date: '2023-08-14' },
            { id: '2', title: 'Sample Title 2', description: 'Sample Description 2', imageUrl: 'https://example.com/image2.jpg', type: 'video', date: '2023-08-13' },
            { id: '3', title: 'Sample Title 3', description: 'Sample Description 3', imageUrl: 'https://example.com/image3.jpg', type: 'image', date: '2023-08-12' },
            { id: '4', title: 'Sample Title 4', description: 'Sample Description 4', imageUrl: 'https://example.com/image4.jpg', type: 'article', date: '2023-08-11' },
            { id: '5', title: 'Sample Title 5', description: 'Sample Description 5', imageUrl: 'https://example.com/image5.jpg', type: 'video', date: '2023-08-10' },
            { id: '6', title: 'Sample Title 6', description: 'Sample Description 6', imageUrl: 'https://example.com/image6.jpg', type: 'image', date: '2023-08-09' },
            { id: '7', title: 'Sample Title 7', description: 'Sample Description 7', imageUrl: 'https://example.com/image7.jpg', type: 'article', date: '2023-08-08' },
            { id: '8', title: 'Sample Title 8', description: 'Sample Description 8', imageUrl: 'https://example.com/image8.jpg', type: 'video', date: '2023-08-07' },
            { id: '9', title: 'Sample Title 9', description: 'Sample Description 9', imageUrl: 'https://example.com/image9.jpg', type: 'image', date: '2023-08-06' },
            { id: '10', title: 'Sample Title 10', description: 'Sample Description 10', imageUrl: 'https://example.com/image10.jpg', type: 'article', date: '2023-08-05' },
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
