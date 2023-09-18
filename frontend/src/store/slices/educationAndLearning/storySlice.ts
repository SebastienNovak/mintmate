import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types:
export type Story = {
    id: string;
    userId: string;  // ID of the user who posted the story
    content: string; // This could be a URL to an image, video, or just a text message
    timestamp: number; // Unix timestamp of when the story was posted
    expires: number; // Unix timestamp of when the story will expire and no longer be visible
};

type StoryState = {
    stories: Story[];
    loading: boolean;
    error: string | null;
};

const initialState: StoryState = {
    stories: [],
    loading: false,
    error: null,
};

const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        fetchStoriesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchStoriesSuccess: (state, action: PayloadAction<Story[]>) => {
            state.stories = action.payload;
            state.loading = false;
        },
        fetchStoriesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        postStory: (state, action: PayloadAction<Omit<Story, 'id'>>) => {
            const newStory: Story = {
                id: new Date().toISOString(), // Generate a unique ID
                ...action.payload
            };
            state.stories.push(newStory);
        },
        deleteStory: (state, action: PayloadAction<string>) => {
            state.stories = state.stories.filter(story => story.id !== action.payload);
        },
        // ... other actions as needed
    }
});

export const {
    fetchStoriesStart,
    fetchStoriesSuccess,
    fetchStoriesFailure,
    postStory,
    deleteStory
} = storySlice.actions;

// Selectors
type RootState = {
    story: StoryState;
};

export const selectStories = (state: RootState) => state.story.stories;
export const selectLoading = (state: RootState) => state.story.loading;
export const selectError = (state: RootState) => state.story.error;

export default storySlice.reducer;
