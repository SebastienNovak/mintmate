import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../../store';
// Assuming you have an API utility, replace `api` with your actual API calls.
// import api from 'path_to_your_api_utility';

// MOCK API UTILITY (add this at the top or import from another file)
const api = {
    getUserPublicProfile: async (userId: string) => {
        return {
            data: {
                userId: userId, // Using the passed userId here
                username: 'sampleUser',
                bio: 'Sample bio',
                profileImage: 'path_to_image',
                playlists: [],
                badges: [],
                reviews: [],
            }
        };
    }
}

// Types

type Badge = {
    id: string;
    name: string;
    icon: string;
};

type Review = {
    id: string;
    content: string;
    rating: number;
    date: Date;
};

type Playlist = {
    id: string;
    name: string;
    tracks: string[]; // array of track IDs
};

type UserPublicProfile = {
    userId: string;
    username: string;
    bio: string;
    profileImage: string;
    playlists: Playlist[];
    badges: Badge[];
    reviews: Review[];
    error?: string; // Add this field to handle errors
};

// Initial State
const initialState: UserPublicProfile = {
    userId: '',
    username: '',
    bio: '',
    profileImage: '',
    playlists: [],
    badges: [],
    reviews: [],
    error: undefined,
};

// Slice
const userPublicProfileSlice = createSlice({
    name: 'userPublicProfile',
    initialState,
    reducers: {
        fetchPublicProfileStart: (state) => {
            state.error = undefined; // Reset error state when starting a fetch
        },
        fetchPublicProfileSuccess: (_, action: PayloadAction<UserPublicProfile>) => {
            return action.payload;
        },
        fetchPublicProfileFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload; // Save the error message to state
        },
        // ... other reducers ...
    },
});

export const {
    fetchPublicProfileStart,
    fetchPublicProfileSuccess,
    fetchPublicProfileFailure,
} = userPublicProfileSlice.actions;

// Thunks

export const fetchUserPublicProfile = (userId: string) => async (dispatch: Dispatch) => {
    dispatch(fetchPublicProfileStart());
    try {
        const response = await api.getUserPublicProfile(userId);  // Using the userId parameter here
        dispatch(fetchPublicProfileSuccess(response.data));
    } catch (error) {
        if (error instanceof Error) {
            dispatch(fetchPublicProfileFailure(error.message));
        } else {
            dispatch(fetchPublicProfileFailure('An unknown error occurred.'));
        }
    }
};

// Selectors
export const selectUserPublicProfile = (state: RootState) => state.userPublicProfile;
export const selectUserPlaylists = (state: RootState) => state.userPublicProfile.playlists;

export default userPublicProfileSlice.reducer;
