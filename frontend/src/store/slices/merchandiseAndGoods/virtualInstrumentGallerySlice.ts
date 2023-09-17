import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type VirtualInstrument = {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
    category: 'string' | 'wind' | 'percussion' | 'keyboard' | 'other';
    sampleAudioUrl: string;
};

type VirtualInstrumentGalleryState = {
    instrumentList: VirtualInstrument[];
    currentInstrument: VirtualInstrument | null;
    playingSample: string | null;  // URL of the currently playing sample
    loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: VirtualInstrumentGalleryState = {
    instrumentList: [],
    currentInstrument: null,
    playingSample: null,
    loadingStatus: 'idle',
    error: null
};

const virtualInstrumentGallerySlice = createSlice({
    name: 'virtualInstrumentGallery',
    initialState,
    reducers: {
        loadInstruments: (state, action: PayloadAction<VirtualInstrument[]>) => {
            state.instrumentList = action.payload;
            state.loadingStatus = 'succeeded';
        },
        viewInstrument: (state, action: PayloadAction<number>) => {
            const instrument = state.instrumentList.find(i => i.id === action.payload);
            state.currentInstrument = instrument || null;
        },
        playSample: (state, action: PayloadAction<string>) => {
            state.playingSample = action.payload;
        },
        stopSample: (state) => {
            state.playingSample = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loadingStatus = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    loadInstruments,
    viewInstrument,
    playSample,
    stopSample,
    setError
} = virtualInstrumentGallerySlice.actions;

// Selectors
type RootState = {
    virtualInstrumentGallery: VirtualInstrumentGalleryState;
};

export const selectInstrumentList = (state: RootState) => state.virtualInstrumentGallery.instrumentList;
export const selectCurrentInstrument = (state: RootState) => state.virtualInstrumentGallery.currentInstrument;
export const selectPlayingSample = (state: RootState) => state.virtualInstrumentGallery.playingSample;
export const selectLoadingStatus = (state: RootState) => state.virtualInstrumentGallery.loadingStatus;
export const selectError = (state: RootState) => state.virtualInstrumentGallery.error;

export default virtualInstrumentGallerySlice.reducer;
