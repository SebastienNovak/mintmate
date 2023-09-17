import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
type ReactionButtonState = {
    reaction: 'like' | 'dislike' | null;  // current reaction
    isLoading: boolean;    // to show a loading state during API call
    error: string | null;  // to store any error message
};

// Initial State
const initialState: ReactionButtonState = {
    reaction: null,
    isLoading: false,
    error: null
};

// Slice
const reactionButtonSlice = createSlice({
    name: 'reactionButton',
    initialState,
    reducers: {
        setReactionRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setReactionSuccess: (state, action: PayloadAction<'like' | 'dislike'>) => {
            state.reaction = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        removeReactionSuccess: (state) => {
            state.reaction = null;
            state.isLoading = false;
            state.error = null;
        },
        setReactionError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        resetError: (state) => {
            state.error = null;
        }
    }
});

export const {
    setReactionRequest,
    setReactionSuccess,
    removeReactionSuccess,
    setReactionError,
    resetError
} = reactionButtonSlice.actions;

// Thunks (if necessary, these can be used to dispatch actions and handle async logic)
// For this example, we won't connect to an actual API but you can extend these thunks to do so.
/*
export const setReaction = (entityId: string, reaction: 'like' | 'dislike') => async (dispatch: any) => {
    try {
        dispatch(setReactionRequest());
        // Call your API endpoint to set the reaction
        // await yourAPI.setReaction(entityId, reaction);
        dispatch(setReactionSuccess(reaction));
    } catch (error) {
        dispatch(setReactionError(error.message));
    }
};
*/

// Selectors
type RootState = {
    reactionButton: ReactionButtonState;
};

export const selectCurrentReaction = (state: RootState) => state.reactionButton.reaction;
export const selectReactionButtonLoading = (state: RootState) => state.reactionButton.isLoading;
export const selectReactionButtonError = (state: RootState) => state.reactionButton.error;

export default reactionButtonSlice.reducer;
