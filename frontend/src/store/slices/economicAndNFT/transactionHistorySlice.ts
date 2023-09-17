import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types:

type Transaction = {
    id: string;
    timestamp: Date;
    type: 'purchase' | 'sale' | 'transfer' | 'receive';
    amount: number; // Could be in Ethereum, a token value, or another currency
    asset: string; // This could represent the asset involved, e.g., an NFT or cryptocurrency
    from: string; // Originating account/address
    to: string; // Destination account/address
    status: 'pending' | 'completed' | 'failed';
};

type TransactionHistoryState = {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
};

const initialState: TransactionHistoryState = {
    transactions: [],
    loading: false,
    error: null,
};

const transactionHistorySlice = createSlice({
    name: 'transactionHistory',
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
            state.loading = false;
            state.error = action.payload;
        },
        addNewTransaction: (state, action: PayloadAction<Transaction>) => {
            state.transactions.unshift(action.payload); // Add the new transaction at the beginning
        }
    }
});

export const {
    fetchTransactionsStart,
    fetchTransactionsSuccess,
    fetchTransactionsFailure,
    addNewTransaction
} = transactionHistorySlice.actions;

// Selectors
type RootState = {
    transactionHistory: TransactionHistoryState;
};

export const selectTransactions = (state: RootState) => state.transactionHistory.transactions;
export const selectTransactionsLoading = (state: RootState) => state.transactionHistory.loading;
export const selectTransactionsError = (state: RootState) => state.transactionHistory.error;

export default transactionHistorySlice.reducer;
