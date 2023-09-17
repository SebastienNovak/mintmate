import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
// type PaymentData = {
//     amount: number;  // Amount to charge
//     paymentMethodId: string;  // This ID is often provided by payment processors after tokenizing card data.
// };

type PaymentGatewayState = {
    paymentStatus: 'idle' | 'pending' | 'completed' | 'failed';
    error: string | null;
};

// Initial State
const initialState: PaymentGatewayState = {
    paymentStatus: 'idle',
    error: null
};

// Slice
const paymentGatewaySlice = createSlice({
    name: 'paymentGateway',
    initialState,
    reducers: {
        initiatePayment: (state) => {
            state.paymentStatus = 'pending';
        },
        paymentSuccess: (state) => {
            state.paymentStatus = 'completed';
        },
        paymentFailure: (state, action: PayloadAction<string>) => {
            state.paymentStatus = 'failed';
            state.error = action.payload;
        },
        resetPaymentStatus: (state) => {
            state.paymentStatus = 'idle';
            state.error = null;
        }
    }
});

export const {
    initiatePayment,
    paymentSuccess,
    paymentFailure,
    resetPaymentStatus
} = paymentGatewaySlice.actions;

// Selectors
type RootState = {
    paymentGateway: PaymentGatewayState;
};

export const selectPaymentStatus = (state: RootState) => state.paymentGateway.paymentStatus;
export const selectPaymentError = (state: RootState) => state.paymentGateway.error;

export default paymentGatewaySlice.reducer;
