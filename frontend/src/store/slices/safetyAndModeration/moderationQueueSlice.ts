import { ThunkAction } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
type RootAction = ReturnType<typeof moderationQueueSlice.actions[keyof typeof moderationQueueSlice.actions]>;


type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    RootAction
>;

type ModerationItem = {
    id: string;
    title: string;
    content: string;
    authorId: string;
    dateSubmitted: string;
    // Any other relevant fields for moderation items
};

type PaginationInfo = {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
};

type ModerationQueueState = {
    items: ModerationItem[];
    pagination: PaginationInfo;
    isLoading: boolean;
    error: string | null;
};

// Initial State
const initialState: ModerationQueueState = {
    items: [],
    pagination: {
        currentPage: 1,
        totalItems: 0,
        itemsPerPage: 10,
    },
    isLoading: false,
    error: null
};

// Slice
const moderationQueueSlice = createSlice({
    name: 'moderationQueue',
    initialState,
    reducers: {
        startFetchingItems: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setModerationItems: (state, action: PayloadAction<{ items: ModerationItem[], totalItems: number }>) => {
            state.items = action.payload.items;
            state.pagination.totalItems = action.payload.totalItems;
            state.isLoading = false;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

export const {
    startFetchingItems,
    setModerationItems,
    setPage,
    setError
} = moderationQueueSlice.actions;

// Thunks
export const fetchModerationItems = (page: number = 1): AppThunk => async dispatch => {
    dispatch(startFetchingItems());
    try {
        // Replace this URL with your actual API endpoint for the moderation queue
        const url = `https://api.yoursite.com/moderation?page=${page}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Server responded with an error");
        }

        const data = await response.json();

        dispatch(setModerationItems({ items: data.items, totalItems: data.total }));
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setError(`An error occurred while fetching the moderation items: ${error.message}`));
        } else {
            dispatch(setError(`An unexpected error occurred while fetching the moderation items`));
        }
    }
};

// Selectors
type RootState = {
    moderationQueue: ModerationQueueState;
};

export const selectModerationItems = (state: RootState) => state.moderationQueue.items;
export const selectPaginationInfo = (state: RootState) => state.moderationQueue.pagination;
export const selectIsLoading = (state: RootState) => state.moderationQueue.isLoading;
export const selectError = (state: RootState) => state.moderationQueue.error;

export default moderationQueueSlice.reducer;
