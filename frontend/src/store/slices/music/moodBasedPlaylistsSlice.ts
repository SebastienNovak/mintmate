import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types

type Song = {
    id: number;
    title: string;
    artist: string;
    duration: string;  // Format: "03:45"
    // ... other song details
};

type Playlist = {
    mood: string;  // e.g., "Happy", "Sad", etc.
    songs: Song[];
};

type MoodBasedPlaylistsState = {
    playlists: Playlist[];
    loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

// Initial State

const initialState: MoodBasedPlaylistsState = {
    playlists: [],
    loadingStatus: 'idle',
    error: null
};

// Slice

const moodBasedPlaylistsSlice = createSlice({
    name: 'moodBasedPlaylists',
    initialState,
    reducers: {
        fetchPlaylists: (state) => { 
            state.loadingStatus = 'loading';
        },
        setPlaylists: (state, action: PayloadAction<Playlist[]>) => {
            state.playlists = action.payload;
            state.loadingStatus = 'succeeded';
        },
        addPlaylist: (state, action: PayloadAction<Playlist>) => {
            state.playlists.push(action.payload);
        },
        removePlaylist: (state, action: PayloadAction<string>) => { // Assuming the action payload is the mood
            state.playlists = state.playlists.filter(playlist => playlist.mood !== action.payload);
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loadingStatus = 'failed';
            state.error = action.payload;
        }
    }
});

// Actions & Selectors

export const {
    fetchPlaylists,
    setPlaylists,
    addPlaylist,
    removePlaylist,
    setError
} = moodBasedPlaylistsSlice.actions;

// Selectors
type RootState = {
    moodBasedPlaylists: MoodBasedPlaylistsState;
};

export const selectPlaylists = (state: RootState) => state.moodBasedPlaylists.playlists;
export const selectLoadingStatus = (state: RootState) => state.moodBasedPlaylists.loadingStatus;
export const selectError = (state: RootState) => state.moodBasedPlaylists.error;

export default moodBasedPlaylistsSlice.reducer;
