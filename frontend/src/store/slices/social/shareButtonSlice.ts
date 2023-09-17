import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
type ShareButtonState = {
    hasShared: boolean;    // if the content has been shared
    isLoading: boolean;    // to show a loading state during API call or share process
    error: string | null;  // to store any error message
};

// Initial State
const initialState: ShareButtonState = {
    hasShared: false,
    isLoading: false,
    error: null
};

// Slice
const shareButtonSlice = createSlice({
    name: 'shareButton',
    initialState,
    reducers: {
        shareRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        shareSuccess: (state) => {
            state.hasShared = true;
            state.isLoading = false;
            state.error = null;
        },
        shareError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        resetShareState: (state) => {
            state.hasShared = false;
            state.error = null;
        }
    }
});

export const {
    shareRequest,
    shareSuccess,
    shareError,
    resetShareState
} = shareButtonSlice.actions;

// Thunks (if necessary, these can be used to dispatch actions and handle async logic)
// For this example, we won't connect to an actual API but you can extend these thunks to do so.
/*
export const shareContent = (entityId: string, platform: 'twitter' | 'facebook' | 'linkedin') => async (dispatch: any) => {
    try {
        dispatch(shareRequest());
        // Call your API endpoint or sharing service
        // await yourAPI.shareContent(entityId, platform);
        dispatch(shareSuccess());
    } catch (error) {
        dispatch(shareError(error.message));
    }
};
*/

// Selectors
type RootState = {
    shareButton: ShareButtonState;
};

export const selectHasShared = (state: RootState) => state.shareButton.hasShared;
export const selectShareButtonLoading = (state: RootState) => state.shareButton.isLoading;
export const selectShareButtonError = (state: RootState) => state.shareButton.error;

export default shareButtonSlice.reducer;
