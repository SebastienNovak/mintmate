import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
export type SubscriptionDetails = {
    planId: string;          // ID representing the specific subscription plan
    startDate: string;       // Subscription start date
    endDate: string;         // Subscription end date or renewal date
    isActive: boolean;       // If the subscription is currently active
};

type SubscriptionManagementState = {
    subscription: SubscriptionDetails | null;    // Details of the user's subscription
    status: 'idle' | 'loading' | 'succeeded' | 'failed';   // Status of any async operations
    error: string | null;                       // Any errors that might occur
};

// Initial State
const initialState: SubscriptionManagementState = {
    subscription: null,
    status: 'idle',
    error: null
};

// Slice
const subscriptionManagementSlice = createSlice({
    name: 'subscriptionManagement',
    initialState,
    reducers: {
        startSubscription: (state, action: PayloadAction<SubscriptionDetails>) => {
            state.subscription = action.payload;
            state.status = 'loading';
        },
        subscriptionSuccess: (state, action: PayloadAction<SubscriptionDetails>) => {
            state.subscription = action.payload;
            state.status = 'succeeded';
        },
        subscriptionFailure: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        endSubscription: (state) => {
            state.subscription = null;
            state.status = 'idle';
        }
    }
});

export const {
    startSubscription,
    subscriptionSuccess,
    subscriptionFailure,
    endSubscription
} = subscriptionManagementSlice.actions;

// Selectors
type RootState = {
    subscriptionManagement: SubscriptionManagementState;
};

export const selectSubscriptionDetails = (state: RootState) => state.subscriptionManagement.subscription;
export const selectSubscriptionStatus = (state: RootState) => state.subscriptionManagement.status;
export const selectSubscriptionError = (state: RootState) => state.subscriptionManagement.error;

export default subscriptionManagementSlice.reducer;
