import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
export type CartItem = {
    productId: string;
    name: string;
    price: number;
    quantity: number;
};

type CheckoutState = {
    cart: CartItem[];
    billingInfo: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
        cardNumber: string; // For a real application, never store full card numbers.
        expirationDate: string;
        cvv: string;
    };
    paymentStatus: 'idle' | 'pending' | 'completed' | 'failed';
    error: string | null;
};

// Initial State
const initialState: CheckoutState = {
    cart: [],
    billingInfo: {
        address: '',
        city: '',
        postalCode: '',
        country: '',
        cardNumber: '',
        expirationDate: '',
        cvv: ''
    },
    paymentStatus: 'idle',
    error: null
};

// Slice
const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            // This could be enhanced to increase the quantity if item already exists
            state.cart.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter(item => item.productId !== action.payload);
        },
        updateBillingInfo: (state, action: PayloadAction<Partial<typeof state.billingInfo>>) => {
            state.billingInfo = { ...state.billingInfo, ...action.payload };
        },
        initiatePayment: (state) => {
            state.paymentStatus = 'pending';
        },
        paymentSuccess: (state) => {
            state.paymentStatus = 'completed';
            state.cart = []; // Empty the cart upon successful payment
        },
        paymentFailure: (state, action: PayloadAction<string>) => {
            state.paymentStatus = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    updateBillingInfo,
    initiatePayment,
    paymentSuccess,
    paymentFailure
} = checkoutSlice.actions;

// Selectors
type RootState = {
    checkout: CheckoutState;
};

export const selectCart = (state: RootState) => state.checkout.cart;
export const selectBillingInfo = (state: RootState) => state.checkout.billingInfo;
export const selectPaymentStatus = (state: RootState) => state.checkout.paymentStatus;
export const selectCheckoutError = (state: RootState) => state.checkout.error;

export default checkoutSlice.reducer;
