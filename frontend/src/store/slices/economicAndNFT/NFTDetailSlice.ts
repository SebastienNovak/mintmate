import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types:

type Owner = {
    id: string;
    name: string;
    avatarUrl: string;
};

type NFTDetail = {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    owner: Owner;
    price: number; // In Ethereum or other relevant currency
    history: Array<{ date: string, event: string }>; // A simple transaction history
};

type NFTDetailState = {
    nftDetail: NFTDetail | null;
    loading: boolean;
    error: string | null;
};

const initialState: NFTDetailState = {
    nftDetail: null,
    loading: false,
    error: null,
};

const nftDetailSlice = createSlice({
    name: 'nftDetail',
    initialState,
    reducers: {
        fetchNFTDetailStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchNFTDetailSuccess: (state, action: PayloadAction<NFTDetail>) => {
            state.nftDetail = action.payload;
            state.loading = false;
        },
        fetchNFTDetailFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    fetchNFTDetailStart,
    fetchNFTDetailSuccess,
    fetchNFTDetailFailure,
} = nftDetailSlice.actions;

// Selectors
type RootState = {
    nftDetail: NFTDetailState;
};

export const selectNFTDetail = (state: RootState) => state.nftDetail.nftDetail;
export const selectLoading = (state: RootState) => state.nftDetail.loading;
export const selectError = (state: RootState) => state.nftDetail.error;

export default nftDetailSlice.reducer;
