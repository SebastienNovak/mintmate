import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types

type Track = {
    id: number;
    title: string;
    artist: string;
    duration: number;  // Duration in seconds
    fileUrl: string;
    coverImageUrl?: string;
    // ... other track details
};

type TrackPlayerState = {
    currentTrack: Track | null;
    playlist: Track[];
    isPlaying: boolean;
    currentTime: number;  // Current time in the track, in seconds
    volume: number;  // Between 0 and 1
    repeatMode: 'off' | 'track' | 'playlist';
    shuffle: boolean;
    loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

// Initial State

const initialState: TrackPlayerState = {
    currentTrack: null,
    playlist: [],
    isPlaying: false,
    currentTime: 0,
    volume: 0.5,
    repeatMode: 'off',
    shuffle: false,
    loadingStatus: 'idle',
    error: null
};

// Slice

const trackPlayerSlice = createSlice({
    name: 'trackPlayer',
    initialState,
    reducers: {
        loadTrack: (state, action: PayloadAction<Track>) => {
            state.currentTrack = action.payload;
            state.loadingStatus = 'loading';
        },
        play: (state) => {
            state.isPlaying = true;
        },
        pause: (state) => {
            state.isPlaying = false;
        },
        skipToNext: (state) => {
            const currentTrackIndex = state.playlist.findIndex(track => track.id === state.currentTrack?.id);
            if (currentTrackIndex !== -1 && currentTrackIndex < state.playlist.length - 1) {
                state.currentTrack = state.playlist[currentTrackIndex + 1];
            } else if (state.repeatMode === 'playlist') {
                state.currentTrack = state.playlist[0]; // Start from the beginning
            }
        },
        skipToPrevious: (state) => {
            const currentTrackIndex = state.playlist.findIndex(track => track.id === state.currentTrack?.id);
            if (currentTrackIndex > 0) {
                state.currentTrack = state.playlist[currentTrackIndex - 1];
            } else if (state.repeatMode === 'playlist') {
                state.currentTrack = state.playlist[state.playlist.length - 1]; // Move to the last track
            }
        },
        updateCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
        setRepeatMode: (state, action: PayloadAction<'off' | 'track' | 'playlist'>) => {
            state.repeatMode = action.payload;
        },
        toggleShuffle: (state) => {
            state.shuffle = !state.shuffle;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loadingStatus = 'failed';
            state.error = action.payload;
        }
    }
});

// Actions & Selectors

export const {
    loadTrack,
    play,
    pause,
    skipToNext,
    skipToPrevious,
    updateCurrentTime,
    setVolume,
    setRepeatMode,
    toggleShuffle,
    setError
} = trackPlayerSlice.actions;

// Selectors
type RootState = {
    trackPlayer: TrackPlayerState;
};

export const selectCurrentTrack = (state: RootState) => state.trackPlayer.currentTrack;
export const selectIsPlaying = (state: RootState) => state.trackPlayer.isPlaying;
export const selectCurrentTime = (state: RootState) => state.trackPlayer.currentTime;
export const selectVolume = (state: RootState) => state.trackPlayer.volume;
export const selectRepeatMode = (state: RootState) => state.trackPlayer.repeatMode;
export const selectShuffle = (state: RootState) => state.trackPlayer.shuffle;
export const selectLoadingStatus = (state: RootState) => state.trackPlayer.loadingStatus;
export const selectError = (state: RootState) => state.trackPlayer.error;

export default trackPlayerSlice.reducer;
