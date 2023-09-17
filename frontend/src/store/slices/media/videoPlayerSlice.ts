import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type VideoPlayerState = {
    videoUrl: string | null;
    isPlaying: boolean;
    currentTime: number;  // Current time in the video, in seconds
    duration: number;  // Duration of the video, in seconds
    volume: number;  // Between 0 and 1
    loadingStatus: 'idle' | 'loading' | 'playing' | 'paused' | 'failed';
    error: string | null;
};

const initialState: VideoPlayerState = {
    videoUrl: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.5,
    loadingStatus: 'idle',
    error: null
};

const videoPlayerSlice = createSlice({
    name: 'videoPlayer',
    initialState,
    reducers: {
        loadVideo: (state, action: PayloadAction<string>) => {
            state.videoUrl = action.payload;
            state.loadingStatus = 'loading';
        },
        play: (state) => {
            state.isPlaying = true;
            state.loadingStatus = 'playing';
        },
        pause: (state) => {
            state.isPlaying = false;
            state.loadingStatus = 'paused';
        },
        updateCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload;
        },
        setDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loadingStatus = 'failed';
            state.error = action.payload;
        },
        reset: (state) => {
            state.videoUrl = null;
            state.isPlaying = false;
            state.currentTime = 0;
            state.duration = 0;
            state.loadingStatus = 'idle';
            state.error = null;
        }
    }
});

export const {
    loadVideo,
    play,
    pause,
    updateCurrentTime,
    setDuration,
    setVolume,
    setError,
    reset
} = videoPlayerSlice.actions;

// Selectors
type RootState = {
    videoPlayer: VideoPlayerState;
};

export const selectVideoUrl = (state: RootState) => state.videoPlayer.videoUrl;
export const selectIsPlaying = (state: RootState) => state.videoPlayer.isPlaying;
export const selectCurrentTime = (state: RootState) => state.videoPlayer.currentTime;
export const selectDuration = (state: RootState) => state.videoPlayer.duration;
export const selectVolume = (state: RootState) => state.videoPlayer.volume;
export const selectLoadingStatus = (state: RootState) => state.videoPlayer.loadingStatus;
export const selectError = (state: RootState) => state.videoPlayer.error;

export default videoPlayerSlice.reducer;
