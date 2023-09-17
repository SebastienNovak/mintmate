import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types:

type FanArt = {
    id: string;
    title: string;
    artistName: string;
    imageUrl: string;
    description: string;
    submissionDate: string; // ISO date string representing when this fan art was submitted.
    likes: number;
};

type FanArtGalleryState = {
    fanArts: FanArt[];
    loading: boolean;
    error: string | null;
};

const initialState: FanArtGalleryState = {
    fanArts: [],
    loading: false,
    error: null,
};

const fanArtGallerySlice = createSlice({
    name: 'fanArtGallery',
    initialState,
    reducers: {
        fetchFanArtsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchFanArtsSuccess: (state, action: PayloadAction<FanArt[]>) => {
            state.fanArts = action.payload;
            state.loading = false;
        },
        fetchFanArtsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        addFanArt: (state, action: PayloadAction<FanArt>) => {
            state.fanArts.push(action.payload);
        },
        incrementLikes: (state, action: PayloadAction<string>) => {
            const art = state.fanArts.find(a => a.id === action.payload);
            if (art) {
                art.likes += 1;
            }
        }
    }
});

export const {
    fetchFanArtsStart,
    fetchFanArtsSuccess,
    fetchFanArtsFailure,
    addFanArt,
    incrementLikes
} = fanArtGallerySlice.actions;

// Selectors
type RootState = {
    fanArtGallery: FanArtGalleryState;
};

export const selectFanArts = (state: RootState) => state.fanArtGallery.fanArts;
export const selectFanArtsLoading = (state: RootState) => state.fanArtGallery.loading;
export const selectFanArtsError = (state: RootState) => state.fanArtGallery.error;

export default fanArtGallerySlice.reducer;
