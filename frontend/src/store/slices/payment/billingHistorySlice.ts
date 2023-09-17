import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
export type Transaction = {
    id: string;
    date: string;
    amount: number;
    description: string;
    status: 'completed' | 'pending' | 'failed';
};

type BillingHistoryState = {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
};

// Initial State
const initialState: BillingHistoryState = {
    transactions: [],
    loading: false,
    error: null
};

// Slice
const billingHistorySlice = createSlice({
    name: 'billingHistory',
    initialState,
    reducers: {
        fetchTransactionsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchTransactionsSuccess: (state, action: PayloadAction<Transaction[]>) => {
            state.transactions = action.payload;
            state.loading = false;
        },
        fetchTransactionsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const {
    fetchTransactionsStart,
    fetchTransactionsSuccess,
    fetchTransactionsFailure
} = billingHistorySlice.actions;

// Selectors
type RootState = {
    billingHistory: BillingHistoryState;
};

export const selectTransactions = (state: RootState) => state.billingHistory.transactions;
export const selectLoadingStatus = (state: RootState) => state.billingHistory.loading;
export const selectError = (state: RootState) => state.billingHistory.error;

export default billingHistorySlice.reducer;
