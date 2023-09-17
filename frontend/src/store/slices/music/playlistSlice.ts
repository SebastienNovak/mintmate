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
    id: number;
    name: string;
    description: string;
    songs: Song[];
    // ... other playlist details
};

type PlaylistState = {
    currentPlaylist: Playlist | null;
    userPlaylists: Playlist[];
    loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

// Initial State

const initialState: PlaylistState = {
    currentPlaylist: null,
    userPlaylists: [],
    loadingStatus: 'idle',
    error: null
};

// Slice

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        fetchUserPlaylists: (state) => {
            state.loadingStatus = 'loading';
        },
        setUserPlaylists: (state, action: PayloadAction<Playlist[]>) => {
            state.userPlaylists = action.payload;
            state.loadingStatus = 'succeeded';
        },
        setCurrentPlaylist: (state, action: PayloadAction<Playlist>) => {
            state.currentPlaylist = action.payload;
        },
        clearCurrentPlaylist: (state) => {
            state.currentPlaylist = null;
        },
        addSongToPlaylist: (state, action: PayloadAction<{ playlistId: number, song: Song }>) => {
            const playlist = state.userPlaylists.find(pl => pl.id === action.payload.playlistId);
            if (playlist) {
                playlist.songs.push(action.payload.song);
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
    fetchUserPlaylists,
    setUserPlaylists,
    setCurrentPlaylist,
    clearCurrentPlaylist,
    addSongToPlaylist,
    setError
} = playlistSlice.actions;

// Selectors
type RootState = {
    playlist: PlaylistState;
};

export const selectCurrentPlaylist = (state: RootState) => state.playlist.currentPlaylist;
export const selectUserPlaylists = (state: RootState) => state.playlist.userPlaylists;
export const selectLoadingStatus = (state: RootState) => state.playlist.loadingStatus;
export const selectError = (state: RootState) => state.playlist.error;

export default playlistSlice.reducer;
