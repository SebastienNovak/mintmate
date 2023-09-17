import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    category: string;
};

type Review = {
    productId: number;
    userId: string;
    rating: number;  // Scale of 1-5
    comment: string;
    reviewDate: Date;
};

type ProductPageState = {
    productList: Product[];
    reviews: Review[];
    currentProduct: Product | null;
    loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: ProductPageState = {
    productList: [],
    reviews: [],
    currentProduct: null,
    loadingStatus: 'idle',
    error: null
};

const productPageSlice = createSlice({
    name: 'productPage',
    initialState,
    reducers: {
        loadProducts: (state, action: PayloadAction<Product[]>) => {
            state.productList = action.payload;
            state.loadingStatus = 'succeeded';
        },
        viewProduct: (state, action: PayloadAction<number>) => {
            const product = state.productList.find(p => p.id === action.payload);
            state.currentProduct = product || null;
        },
        addReview: (state, action: PayloadAction<Review>) => {
            state.reviews.push(action.payload);
        },
        addToCart: (state, action: PayloadAction<number>) => {
            const product = state.productList.find(p => p.id === action.payload);
            if (product && product.stock > 0) {
                product.stock -= 1;
            }
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loadingStatus = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    loadProducts,
    viewProduct,
    addReview,
    addToCart,
    setError
} = productPageSlice.actions;

// Selectors
type RootState = {
    productPage: ProductPageState;
};

export const selectProductList = (state: RootState) => state.productPage.productList;
export const selectCurrentProduct = (state: RootState) => state.productPage.currentProduct;
export const selectReviewsForProduct = (state: RootState, productId: number) => 
    state.productPage.reviews.filter(r => r.productId === productId);
export const selectLoadingStatus = (state: RootState) => state.productPage.loadingStatus;
export const selectError = (state: RootState) => state.productPage.error;

export default productPageSlice.reducer;
