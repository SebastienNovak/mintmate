import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
type RefundRequest = {
    orderId: string;
    reason: string; // Reason for the refund request
};

type RefundRequestAction = PayloadAction<RefundRequest>;  // <-- Add this line

type RefundRequestState = {
    refundStatus: 'idle' | 'pending' | 'completed' | 'failed';
    error: string | null;
};

// Initial State
const initialState: RefundRequestState = {
    refundStatus: 'idle',
    error: null
};

// Slice
const refundRequestSlice = createSlice({
    name: 'refundRequest',
    initialState,
    reducers: {
        initiateRefund: (state, action: RefundRequestAction) => {
            console.log(action.payload);
            state.refundStatus = 'pending';
            state.error = null;
        },
        refundSuccess: (state) => {
            state.refundStatus = 'completed';
            state.error = null;
        },
        refundFailure: (state, action: PayloadAction<string>) => {
            state.refundStatus = 'failed';
            state.error = action.payload;
        },
        resetRefundStatus: (state) => {
            state.refundStatus = 'idle';
            state.error = null;
        }
    }
});

export const {
    initiateRefund,
    refundSuccess,
    refundFailure,
    resetRefundStatus
} = refundRequestSlice.actions;

// Selectors
type RootState = {
    refundRequest: RefundRequestState;
};

export const selectRefundStatus = (state: RootState) => state.refundRequest.refundStatus;
export const selectRefundError = (state: RootState) => state.refundRequest.error;

export default refundRequestSlice.reducer;
