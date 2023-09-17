import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LoginState = {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    user: {
        id?: number;
        username?: string;
        email?: string;
        //... other user fields
    } | null;
};

const initialState: LoginState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    user: null
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<{user: { id: number, username: string, email: string/*, ... other user fields*/ }}>) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload.user;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
        resetLoginState: (state) => {
            state.isAuthenticated = initialState.isAuthenticated;
            state.loading = initialState.loading;
            state.error = initialState.error;
            state.user = initialState.user;
        },
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    resetLoginState
} = loginSlice.actions;

// Selectors
type RootState = {
    login: LoginState;
};

export const selectIsAuthenticated = (state: RootState) => state.login.isAuthenticated;
export const selectLoading = (state: RootState) => state.login.loading;
export const selectError = (state: RootState) => state.login.error;
export const selectUser = (state: RootState) => state.login.user;

export default loginSlice.reducer;
