import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TutorialType = 'video' | 'article' | 'code-sample' | 'interactive'; 

type Tutorial = {
    id: string;
    title: string;
    description: string;
    type: TutorialType;
    contentUrl: string; // URL for the tutorial content (video link, article link, etc.)
    thumbnailUrl?: string;
    author: string;
    duration?: string;  // Useful for video tutorials, could represent length of time.
    tags: string[];     // To categorize and search tutorials by topic.
    // ... other attributes as needed.
};

type TutorialCenterState = {
    tutorials: Tutorial[];
    selectedTutorial: Tutorial | null; // for viewing details of a selected tutorial
    searchTerm: string; // to search within the tutorials
    loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: TutorialCenterState = {
    tutorials: [],
    selectedTutorial: null,
    searchTerm: '',
    loadingStatus: 'idle',
    error: null
};

const tutorialCenterSlice = createSlice({
    name: 'tutorialCenter',
    initialState,
    reducers: {
        fetchTutorials: (state) => {
            state.loadingStatus = 'loading';
        },
        setTutorials: (state, action: PayloadAction<Tutorial[]>) => {
            state.tutorials = action.payload;
            state.loadingStatus = 'succeeded';
        },
        selectTutorial: (state, action: PayloadAction<string>) => { 
            const tutorial = state.tutorials.find(t => t.id === action.payload);
            state.selectedTutorial = tutorial || null;
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loadingStatus = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    fetchTutorials,
    setTutorials,
    selectTutorial,
    setSearchTerm,
    setError
} = tutorialCenterSlice.actions;

// Selectors
type RootState = {
    tutorialCenter: TutorialCenterState;
};

export const selectAllTutorials = (state: RootState) => state.tutorialCenter.tutorials;
export const selectSelectedTutorial = (state: RootState) => state.tutorialCenter.selectedTutorial;
export const selectSearchTerm = (state: RootState) => state.tutorialCenter.searchTerm;
export const selectFilteredTutorials = (state: RootState) => 
    state.tutorialCenter.tutorials.filter(tutorial => 
        tutorial.title.toLowerCase().includes(state.tutorialCenter.searchTerm.toLowerCase())
    );
export const selectLoadingStatus = (state: RootState) => state.tutorialCenter.loadingStatus;
export const selectError = (state: RootState) => state.tutorialCenter.error;

export default tutorialCenterSlice.reducer;
