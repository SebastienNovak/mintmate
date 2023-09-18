import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types:

export type Product = {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    category: string;
};

export type Category = {
    id: string;
    name: string;
};

export type Review = {
    id: string;
    productId: string;
    reviewerName: string;
    content: string;
    rating: number; // 1-5
};

type MarketplaceLandingState = {
    featuredProducts: Product[];
    categories: Category[];
    recentReviews: Review[];
    loading: boolean;
    error: string | null;
};

const initialState: MarketplaceLandingState = {
    featuredProducts: [],
    categories: [],
    recentReviews: [],
    loading: false,
    error: null,
};

const marketplaceLandingSlice = createSlice({
    name: 'marketplaceLanding',
    initialState,
    reducers: {
        fetchDataStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDataSuccess: (state, action: PayloadAction<{ products: Product[], categories: Category[], reviews: Review[] }>) => {
            state.featuredProducts = action.payload.products;
            state.categories = action.payload.categories;
            state.recentReviews = action.payload.reviews;
            state.loading = false;
        },
        fetchDataFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    fetchDataStart,
    fetchDataSuccess,
    fetchDataFailure,
} = marketplaceLandingSlice.actions;

// Selectors
type RootState = {
    marketplaceLanding: MarketplaceLandingState;
};

export const selectFeaturedProducts = (state: RootState) => state.marketplaceLanding.featuredProducts;
export const selectCategories = (state: RootState) => state.marketplaceLanding.categories;
export const selectRecentReviews = (state: RootState) => state.marketplaceLanding.recentReviews;
export const selectLoading = (state: RootState) => state.marketplaceLanding.loading;
export const selectError = (state: RootState) => state.marketplaceLanding.error;

export default marketplaceLandingSlice.reducer;
