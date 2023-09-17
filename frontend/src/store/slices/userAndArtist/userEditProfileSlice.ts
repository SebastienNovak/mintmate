import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';

// MOCK API UTILITY
const api = {
    fetchEditableProfile: async (userId: string): Promise<{ data: UserEditableProfile }> => {
        return {
            data: {
                userId: userId,
                email: 'sampleEmail@example.com',
                preferences: {
                    theme: 'light',
                    notifications: true
                }
            }
        };
    },
    submitProfileChanges: async (profile: UserEditableProfile): Promise<{ data: UserEditableProfile }> => {
        return {
            data: profile
        };
    }
};

// Types

type UserPreferences = {
    theme: 'dark' | 'light';
    notifications: boolean;
};

type UserEditableProfile = {
    userId: string;
    email: string;
    preferences: UserPreferences;
    error?: string;
};

// Initial State
const initialEditState: UserEditableProfile = {
    userId: '',
    email: '',
    preferences: {
        theme: 'light',
        notifications: false
    },
    error: undefined
};

// Slice
const userEditProfileSlice = createSlice({
    name: 'userEditProfile',
    initialState: initialEditState,
    reducers: {
        fetchEditProfileStart: (state) => {
            state.error = undefined;
        },
        fetchEditProfileSuccess: (_, action: PayloadAction<UserEditableProfile>) => {
            return action.payload;
        },
        fetchEditProfileFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        submitProfileChangesStart: (state) => {
            state.error = undefined;
        },
        submitProfileChangesSuccess: (_, action: PayloadAction<UserEditableProfile>) => {
            return action.payload;
        },
        submitProfileChangesFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    },
});

export const {
    fetchEditProfileStart,
    fetchEditProfileSuccess,
    fetchEditProfileFailure,
    submitProfileChangesStart,
    submitProfileChangesSuccess,
    submitProfileChangesFailure,
} = userEditProfileSlice.actions;

// Thunks

export const fetchEditableProfile = (userId: string) => async (dispatch: Dispatch) => {
    dispatch(fetchEditProfileStart());
    try {
        const response = await api.fetchEditableProfile(userId);
        dispatch(fetchEditProfileSuccess(response.data));
    } catch (error) {
        if (error instanceof Error) {
            dispatch(fetchEditProfileFailure(error.message));
        } else {
            dispatch(fetchEditProfileFailure('An unknown error occurred.'));
        }
    }
};

export const submitProfileChanges = (profile: UserEditableProfile) => async (dispatch: Dispatch) => {
    dispatch(submitProfileChangesStart());
    try {
        const response = await api.submitProfileChanges(profile);
        dispatch(submitProfileChangesSuccess(response.data));
    } catch (error) {
        if (error instanceof Error) {
            dispatch(submitProfileChangesFailure(error.message));
        } else {
            dispatch(submitProfileChangesFailure('An unknown error occurred.'));
        }
    }
};

// Selectors
type RootState = {
    userEditProfile: UserEditableProfile;
};

export const selectEditableProfile = (state: RootState) => state.userEditProfile;

export default userEditProfileSlice.reducer;
