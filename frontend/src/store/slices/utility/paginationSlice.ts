import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
type PaginationState = {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
};

// Initial State
const initialState: PaginationState = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0
};

// Slice
const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.itemsPerPage = action.payload;
        },
        setTotalItems: (state, action: PayloadAction<number>) => {
            state.totalItems = action.payload;
        },
        nextPage: (state) => {
            if (state.currentPage < Math.ceil(state.totalItems / state.itemsPerPage)) {
                state.currentPage += 1;
            }
        },
        prevPage: (state) => {
            if (state.currentPage > 1) {
                state.currentPage -= 1;
            }
        }
    }
});

export const { setCurrentPage, setItemsPerPage, setTotalItems, nextPage, prevPage } = paginationSlice.actions;

// Selectors
type RootState = {
    pagination: PaginationState;
};

export const selectCurrentPage = (state: RootState) => state.pagination.currentPage;
export const selectItemsPerPage = (state: RootState) => state.pagination.itemsPerPage;
export const selectTotalItems = (state: RootState) => state.pagination.totalItems;
export const selectTotalPages = (state: RootState) => Math.ceil(state.pagination.totalItems / state.pagination.itemsPerPage);

export default paginationSlice.reducer;
