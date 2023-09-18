import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Region = 'US' | 'EU' | 'ASIA' | 'AFRICA';  // Extend this list as needed

export type Content = {
    title: string;
    description: string;
    imageUrl?: string;
    // ... other content attributes
};

type RegionSpecificContentState = {
    currentRegion: Region;
    content: Content | null;
    loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: RegionSpecificContentState = {
    currentRegion: 'US',  // default to US
    content: null,
    loadingStatus: 'idle',
    error: null
};

const regionSpecificContentSlice = createSlice({
    name: 'regionSpecificContent',
    initialState,
    reducers: {
        setRegion: (state, action: PayloadAction<Region>) => {
            state.currentRegion = action.payload;
        },
        fetchContentForRegion: (state) => {
            state.loadingStatus = 'loading';
        },
        setContentForRegion: (state, action: PayloadAction<Content>) => {
            state.content = action.payload;
            state.loadingStatus = 'succeeded';
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loadingStatus = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    setRegion,
    fetchContentForRegion,
    setContentForRegion,
    setError
} = regionSpecificContentSlice.actions;

// Selectors
type RootState = {
    regionSpecificContent: RegionSpecificContentState;
};

export const selectCurrentRegion = (state: RootState) => state.regionSpecificContent.currentRegion;
export const selectRegionSpecificContent = (state: RootState) => state.regionSpecificContent.content;
export const selectLoadingStatus = (state: RootState) => state.regionSpecificContent.loadingStatus;
export const selectError = (state: RootState) => state.regionSpecificContent.error;

export default regionSpecificContentSlice.reducer;
