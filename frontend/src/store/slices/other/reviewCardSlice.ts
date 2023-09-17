import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Review = {
    id: string;
    userId: string;
    reviewText: string;
    rating: number;
    date: Date;
};

type ReviewState = Review[];

const initialState: ReviewState = [];

const reviewCardSlice = createSlice({
    name: 'reviewCard',
    initialState,
    reducers: {
        addReview: (state, action: PayloadAction<Review>) => {
            state.push(action.payload);
        },
        editReview: (state, action: PayloadAction<Review>) => {
            const index = state.findIndex(review => review.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteReview: (state, action: PayloadAction<string>) => {
            return state.filter(review => review.id !== action.payload);
        }
    }
});

export const {
    addReview,
    editReview,
    deleteReview
} = reviewCardSlice.actions;

// Selectors
type RootState = {
    reviewCard: ReviewState;
};

export const selectAllReviews = (state: RootState) => state.reviewCard;
export const selectReviewById = (state: RootState, reviewId: string) => state.reviewCard.find(review => review.id === reviewId);

export default reviewCardSlice.reducer;
