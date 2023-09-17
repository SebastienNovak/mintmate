import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
type FAQ = {
    id: number;
    question: string;
    answer: string;
    views: number; // for tracking how often an FAQ is viewed
};

type FAQState = {
    faqs: FAQ[];
    searchQuery: string;
    loading: boolean;
    error: string | null;
};

const initialState: FAQState = {
    faqs: [],
    searchQuery: '',
    loading: false,
    error: null
};

const faqSlice = createSlice({
    name: 'faq',
    initialState,
    reducers: {
        setFAQs: (state, action: PayloadAction<FAQ[]>) => {
            state.faqs = action.payload;
        },
        searchFAQs: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        incrementViewCount: (state, action: PayloadAction<number>) => {
            const faq = state.faqs.find(f => f.id === action.payload);
            if (faq) {
                faq.views += 1;
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    }
});

export const {
    setFAQs,
    searchFAQs,
    incrementViewCount,
    setLoading,
    setError
} = faqSlice.actions;

// Selectors
type RootState = {
    faq: FAQState;
};

export const selectFAQs = (state: RootState) => {
    if (state.faq.searchQuery) {
        return state.faq.faqs.filter(f => f.question.includes(state.faq.searchQuery));
    }
    return state.faq.faqs;
};
export const selectLoadingStatus = (state: RootState) => state.faq.loading;
export const selectError = (state: RootState) => state.faq.error;

export default faqSlice.reducer;
