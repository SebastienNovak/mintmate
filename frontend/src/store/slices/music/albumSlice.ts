import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Album = {
    id: number;
    title: string;
    artist: string;
    coverImageUrl: string;
    tracks: string[];
    // ... other album details
};

type AlbumState = {
    currentAlbum: Album | null;
    albumList: Album[];
    currentAlbumIdWhileLoading?: number; // Adding the property here
    loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: AlbumState = {
    currentAlbum: null,
    albumList: [],
    loadingStatus: 'idle',
    error: null,
    // currentAlbumIdWhileLoading: undefined  // This line can be left out since it's optional
};

const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        fetchAlbum: (state, action: PayloadAction<number>) => { 
            state.loadingStatus = 'loading';
            state.currentAlbumIdWhileLoading = action.payload;  // Just an example
        },
        fetchAlbums: (state) => {
            state.loadingStatus = 'loading';
        },
        setAlbum: (state, action: PayloadAction<Album>) => {
            state.currentAlbum = action.payload;
            state.loadingStatus = 'succeeded';
        },
        setAlbums: (state, action: PayloadAction<Album[]>) => {
            state.albumList = action.payload;
            state.loadingStatus = 'succeeded';
        },
        clearAlbum: (state) => {
            state.currentAlbum = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loadingStatus = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    fetchAlbum,
    fetchAlbums,
    setAlbum,
    setAlbums,
    clearAlbum,
    setError
} = albumSlice.actions;

// Selectors
type RootState = {
    album: AlbumState;
};

export const selectCurrentAlbum = (state: RootState) => state.album.currentAlbum;
export const selectAlbumList = (state: RootState) => state.album.albumList;
export const selectLoadingStatus = (state: RootState) => state.album.loadingStatus;
export const selectError = (state: RootState) => state.album.error;

export default albumSlice.reducer;
