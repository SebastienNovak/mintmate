import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types:

type Owner = {
    id: string;
    name: string;
    avatarUrl: string;
};

export type NFT = {
    id: string;
    title: string;
    imageUrl: string;
    owner: Owner;
    price: number; // In Ethereum or another relevant currency
};

type NFTGalleryState = {
    nfts: NFT[];
    loading: boolean;
    error: string | null;
};

const initialState: NFTGalleryState = {
    nfts: [],
    loading: false,
    error: null,
};

const nftGallerySlice = createSlice({
    name: 'nftGallery',
    initialState,
    reducers: {
        fetchNFTsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchNFTsSuccess: (state, action: PayloadAction<NFT[]>) => {
            state.nfts = action.payload;
            state.loading = false;
        },
        fetchNFTsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    fetchNFTsStart,
    fetchNFTsSuccess,
    fetchNFTsFailure,
} = nftGallerySlice.actions;

// Selectors
type RootState = {
    nftGallery: NFTGalleryState;
};

export const selectNFTs = (state: RootState) => state.nftGallery.nfts;
export const selectGalleryLoading = (state: RootState) => state.nftGallery.loading;
export const selectGalleryError = (state: RootState) => state.nftGallery.error;

export default nftGallerySlice.reducer;
