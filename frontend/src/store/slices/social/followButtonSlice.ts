import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
type FollowButtonState = {
    isFollowing: boolean;  // if currently following
    isLoading: boolean;    // to show a loading state during API call
    error: string | null;  // to store any error message
};

// Initial State
const initialState: FollowButtonState = {
    isFollowing: false,
    isLoading: false,
    error: null
};

// Slice
const followButtonSlice = createSlice({
    name: 'followButton',
    initialState,
    reducers: {
        followRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        followSuccess: (state) => {
            state.isFollowing = true;
            state.isLoading = false;
            state.error = null;
        },
        unfollowSuccess: (state) => {
            state.isFollowing = false;
            state.isLoading = false;
            state.error = null;
        },
        followError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        resetError: (state) => {
            state.error = null;
        }
    }
});

export const {
    followRequest,
    followSuccess,
    unfollowSuccess,
    followError,
    resetError
} = followButtonSlice.actions;

// Thunks (if necessary, these can be used to dispatch actions and handle async logic)
// For this example, we won't connect to an actual API but you can extend these thunks to do so.
/*
export const followEntity = (entityId: string) => async (dispatch: any) => {
    try {
        dispatch(followRequest());
        // Call your API endpoint to follow the entity
        // await yourAPI.follow(entityId);
        dispatch(followSuccess());
    } catch (error) {
        dispatch(followError(error.message));
    }
};
*/

// Selectors
type RootState = {
    followButton: FollowButtonState;
};

export const selectIsFollowing = (state: RootState) => state.followButton.isFollowing;
export const selectFollowButtonLoading = (state: RootState) => state.followButton.isLoading;
export const selectFollowButtonError = (state: RootState) => state.followButton.error;

export default followButtonSlice.reducer;
