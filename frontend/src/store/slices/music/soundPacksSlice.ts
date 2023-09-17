import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types

type Sound = {
    id: number;
    name: string;
    duration: string;  // Format: "03:45"
    fileUrl: string;
    // ... other sound details
};

type SoundPack = {
    id: number;
    title: string;
    description: string;
    sounds: Sound[];
    coverImageUrl: string;
    // ... other sound pack details
};

type SoundPackState = {
    currentSoundPack: SoundPack | null;
    soundPacksList: SoundPack[];
    loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

// Initial State

const initialState: SoundPackState = {
    currentSoundPack: null,
    soundPacksList: [],
    loadingStatus: 'idle',
    error: null
};

// Slice

const soundPackSlice = createSlice({
    name: 'soundPack',
    initialState,
    reducers: {
        fetchSoundPacks: (state) => {
            state.loadingStatus = 'loading';
        },
        setSoundPacks: (state, action: PayloadAction<SoundPack[]>) => {
            state.soundPacksList = action.payload;
            state.loadingStatus = 'succeeded';
        },
        setCurrentSoundPack: (state, action: PayloadAction<SoundPack>) => {
            state.currentSoundPack = action.payload;
        },
        clearCurrentSoundPack: (state) => {
            state.currentSoundPack = null;
        },
        addSoundToSoundPack: (state, action: PayloadAction<{ soundPackId: number, sound: Sound }>) => {
            const soundPack = state.soundPacksList.find(sp => sp.id === action.payload.soundPackId);
            if (soundPack) {
                soundPack.sounds.push(action.payload.sound);
            }
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loadingStatus = 'failed';
            state.error = action.payload;
        }
    }
});

// Actions & Selectors

export const {
    fetchSoundPacks,
    setSoundPacks,
    setCurrentSoundPack,
    clearCurrentSoundPack,
    addSoundToSoundPack,
    setError
} = soundPackSlice.actions;

// Selectors
type RootState = {
    soundPack: SoundPackState;
};

export const selectCurrentSoundPack = (state: RootState) => state.soundPack.currentSoundPack;
export const selectSoundPacksList = (state: RootState) => state.soundPack.soundPacksList;
export const selectLoadingStatus = (state: RootState) => state.soundPack.loadingStatus;
export const selectError = (state: RootState) => state.soundPack.error;

export default soundPackSlice.reducer;
