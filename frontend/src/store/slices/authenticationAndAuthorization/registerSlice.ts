import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RegisterState = {
    isRegistered: boolean;  // Whether the user has been registered successfully
    loading: boolean;  // Represents the loading state during registration
    error: string | null;  // Captures any error messages
    userInfo: {
        id?: number;
        username?: string;
        email?: string;
        //... other user fields
    } | null;  // Stores user-related details upon successful registration
};

const initialState: RegisterState = {
    isRegistered: false,
    loading: false,
    error: null,
    userInfo: null
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action: PayloadAction<{user: { id: number, username: string, email: string/*, ... other user fields*/ }}>) => {
            state.isRegistered = true;
            state.loading = false;
            state.userInfo = action.payload.user;
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.isRegistered = false;
            state.error = action.payload;
        },
        resetRegisterState: (state) => {
            state.isRegistered = initialState.isRegistered;
            state.loading = initialState.loading;
            state.error = initialState.error;
            state.userInfo = initialState.userInfo;
        },
    }
});

export const {
    registerStart,
    registerSuccess,
    registerFailure,
    resetRegisterState
} = registerSlice.actions;

// Selectors
type RootState = {
    register: RegisterState;
};

export const selectIsRegistered = (state: RootState) => state.register.isRegistered;
export const selectLoading = (state: RootState) => state.register.loading;
export const selectError = (state: RootState) => state.register.error;
export const selectUserInfo = (state: RootState) => state.register.userInfo;

export default registerSlice.reducer;
