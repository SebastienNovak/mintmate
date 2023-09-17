import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types:

type Asset = {
    id: string;
    type: 'cryptocurrency' | 'nft'; 
    name: string; 
    balance: number; // For cryptocurrency, this would be the balance. For NFT, this might be quantity.
    imageUrl?: string; // Relevant mostly for NFTs to show a preview image.
    // Additional properties can be added as necessary.
};

type WalletState = {
    assets: Asset[];
    totalBalance: number; // For representing total cryptocurrency balance.
    loading: boolean;
    error: string | null;
};

const initialState: WalletState = {
    assets: [],
    totalBalance: 0,
    loading: false,
    error: null,
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        fetchAssetsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchAssetsSuccess: (state, action: PayloadAction<Asset[]>) => {
            state.assets = action.payload;
            state.loading = false;
            // Assuming that the totalBalance is the sum of all cryptocurrency type assets.
            state.totalBalance = action.payload
                .filter(asset => asset.type === 'cryptocurrency')
                .reduce((sum, asset) => sum + asset.balance, 0);
        },
        fetchAssetsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        addAsset: (state, action: PayloadAction<Asset>) => {
            state.assets.push(action.payload);
            if (action.payload.type === 'cryptocurrency') {
                state.totalBalance += action.payload.balance;
            }
        },
        updateAsset: (state, action: PayloadAction<Asset>) => {
            const index = state.assets.findIndex(asset => asset.id === action.payload.id);
            if (index !== -1) {
                const prevBalance = state.assets[index].balance;
                state.assets[index] = action.payload;
                if (action.payload.type === 'cryptocurrency') {
                    state.totalBalance += (action.payload.balance - prevBalance);
                }
            }
        },
        removeAsset: (state, action: PayloadAction<string>) => { // The payload is the asset id
            const index = state.assets.findIndex(asset => asset.id === action.payload);
            if (index !== -1) {
                if (state.assets[index].type === 'cryptocurrency') {
                    state.totalBalance -= state.assets[index].balance;
                }
                state.assets.splice(index, 1);
            }
        }
    }
});

export const {
    fetchAssetsStart,
    fetchAssetsSuccess,
    fetchAssetsFailure,
    addAsset,
    updateAsset,
    removeAsset
} = walletSlice.actions;

// Selectors
type RootState = {
    wallet: WalletState;
};

export const selectAssets = (state: RootState) => state.wallet.assets;
export const selectTotalBalance = (state: RootState) => state.wallet.totalBalance;
export const selectWalletLoading = (state: RootState) => state.wallet.loading;
export const selectWalletError = (state: RootState) => state.wallet.error;

export default walletSlice.reducer;
