import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';

// MOCK API UTILITY
const api = {
  getUserPrivateProfile: async (userId: string): Promise<{ data: UserPrivateProfile }> => {
      return {
          data: {
              userId: userId,
              email: 'sampleEmail@example.com',
              preferences: {
                  theme: 'dark',  // TypeScript now knows this is 'dark' | 'light'
                  notifications: true
              }
          }
      };
  }
};

// Types

type UserPreferences = {
    theme: 'dark' | 'light';
    notifications: boolean;
};

type UserPrivateProfile = {
    userId: string;
    email: string;
    preferences: UserPreferences;
    error?: string; // To handle any errors
};

// Initial State
const initialPrivateState: UserPrivateProfile = {
    userId: '',
    email: '',
    preferences: {
        theme: 'light',
        notifications: false
    },
    error: undefined
};

// Slice
const userPrivateProfileSlice = createSlice({
    name: 'userPrivateProfile',
    initialState: initialPrivateState,
    reducers: {
        fetchPrivateProfileStart: (state) => {
            state.error = undefined; // Reset error when starting a fetch
        },
        fetchPrivateProfileSuccess: (_, action: PayloadAction<UserPrivateProfile>) => {
            return action.payload;
        },
        fetchPrivateProfileFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload; // Save error to state
        },
        // ... other reducers ...
    },
});

export const {
    fetchPrivateProfileStart,
    fetchPrivateProfileSuccess,
    fetchPrivateProfileFailure,
} = userPrivateProfileSlice.actions;

// Thunks

export const fetchUserPrivateProfile = (userId: string) => async (dispatch: Dispatch) => {
    dispatch(fetchPrivateProfileStart());
    try {
        const response = await api.getUserPrivateProfile(userId);
        dispatch(fetchPrivateProfileSuccess(response.data));
    } catch (error) {
        if (error instanceof Error) {
            dispatch(fetchPrivateProfileFailure(error.message));
        } else {
            dispatch(fetchPrivateProfileFailure('An unknown error occurred.'));
        }
    }
};

// Selectors
type RootState = {
    userPrivateProfile: UserPrivateProfile;
    // Add other slices if they exist
};

export const selectUserPrivateProfile = (state: RootState) => state.userPrivateProfile;
export const selectUserPreferences = (state: RootState) => state.userPrivateProfile.preferences;

export default userPrivateProfileSlice.reducer;
