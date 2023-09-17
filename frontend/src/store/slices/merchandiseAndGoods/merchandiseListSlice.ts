import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Merchandise = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;  // Number of items in stock
    imageUrl: string;
};

type SoldMerchandise = {
    merchandiseId: number;
    buyer: string;  // Username of the person who bought the merchandise
    purchaseDate: Date;
};

type MerchandiseListState = {
    merchandiseList: Merchandise[];
    soldItems: SoldMerchandise[];
    loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: MerchandiseListState = {
    merchandiseList: [],
    soldItems: [],
    loadingStatus: 'idle',
    error: null
};

const merchandiseListSlice = createSlice({
    name: 'merchandiseList',
    initialState,
    reducers: {
        addMerchandise: (state, action: PayloadAction<Merchandise>) => {
            state.merchandiseList.push(action.payload);
        },
        buyMerchandise: (state, action: PayloadAction<{ merchandiseId: number, buyer: string }>) => {
            const merchandise = state.merchandiseList.find(m => m.id === action.payload.merchandiseId);
            if (merchandise && merchandise.stock > 0) {
                merchandise.stock -= 1;
                state.soldItems.push({
                    merchandiseId: action.payload.merchandiseId,
                    buyer: action.payload.buyer,
                    purchaseDate: new Date()
                });
            }
        },
        restockMerchandise: (state, action: PayloadAction<{ merchandiseId: number, quantity: number }>) => {
            const merchandise = state.merchandiseList.find(m => m.id === action.payload.merchandiseId);
            if (merchandise) {
                merchandise.stock += action.payload.quantity;
            }
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loadingStatus = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    addMerchandise,
    buyMerchandise,
    restockMerchandise,
    setError
} = merchandiseListSlice.actions;

// Selectors
type RootState = {
    merchandiseList: MerchandiseListState;
};

export const selectMerchandiseList = (state: RootState) => state.merchandiseList.merchandiseList;
export const selectSoldItems = (state: RootState) => state.merchandiseList.soldItems;
export const selectLoadingStatus = (state: RootState) => state.merchandiseList.loadingStatus;
export const selectError = (state: RootState) => state.merchandiseList.error;

export default merchandiseListSlice.reducer;
