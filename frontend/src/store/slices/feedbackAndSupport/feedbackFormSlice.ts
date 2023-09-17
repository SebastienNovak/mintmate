import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
type FeedbackFormData = {
    name: string;
    email: string;
    message: string;
};

type FeedbackFormState = {
    formData: FeedbackFormData;
    validationErrors: Partial<FeedbackFormData>;
    loading: boolean;
    submittedSuccessfully: boolean | null; // null means not yet submitted, true means success, false means error
    serverMessage: string | null; // stores success/error message from server
};

const initialState: FeedbackFormState = {
    formData: {
        name: '',
        email: '',
        message: ''
    },
    validationErrors: {},
    loading: false,
    submittedSuccessfully: null,
    serverMessage: null
};

const feedbackFormSlice = createSlice({
    name: 'feedbackForm',
    initialState,
    reducers: {
        updateForm: (state, action: PayloadAction<Partial<FeedbackFormData>>) => {
            state.formData = { ...state.formData, ...action.payload };
        },
        setValidationErrors: (state, action: PayloadAction<Partial<FeedbackFormData>>) => {
            state.validationErrors = action.payload;
        },
        submitStart: (state) => {
            state.loading = true;
        },
        submitSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.submittedSuccessfully = true;
            state.serverMessage = action.payload;
        },
        submitFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.submittedSuccessfully = false;
            state.serverMessage = action.payload;
        },
        resetForm: (state) => {
            Object.assign(state, initialState);
        }
    }
});

export const {
    updateForm,
    setValidationErrors,
    submitStart,
    submitSuccess,
    submitFailure,
    resetForm
} = feedbackFormSlice.actions;

// Selectors
type RootState = {
    feedbackForm: FeedbackFormState;
};

export const selectFormData = (state: RootState) => state.feedbackForm.formData;
export const selectValidationErrors = (state: RootState) => state.feedbackForm.validationErrors;
export const selectIsLoading = (state: RootState) => state.feedbackForm.loading;
export const selectSubmittedSuccessfully = (state: RootState) => state.feedbackForm.submittedSuccessfully;
export const selectServerMessage = (state: RootState) => state.feedbackForm.serverMessage;

export default feedbackFormSlice.reducer;
