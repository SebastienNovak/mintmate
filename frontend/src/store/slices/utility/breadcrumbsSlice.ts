import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
type Breadcrumb = {
    label: string;
    link?: string;  // optional link associated with the breadcrumb
};

type BreadcrumbsState = Breadcrumb[];

// Initial State
const initialState: BreadcrumbsState = [];

// Slice
const breadcrumbsSlice = createSlice({
    name: 'breadcrumbs',
    initialState,
    reducers: {
        setBreadcrumbs: (_, action: PayloadAction<Breadcrumb[]>) => {
            return action.payload;
        },
        addBreadcrumb: (state, action: PayloadAction<Breadcrumb>) => {
            state.push(action.payload);
        },
        removeLastBreadcrumb: (state) => {
            state.pop();
        },
        clearBreadcrumbs: () => {
            return [];
        }
    }
});

export const { setBreadcrumbs, addBreadcrumb, removeLastBreadcrumb, clearBreadcrumbs } = breadcrumbsSlice.actions;

// Selectors
type RootState = {
    breadcrumbs: BreadcrumbsState;
};

export const selectBreadcrumbs = (state: RootState) => state.breadcrumbs;

export default breadcrumbsSlice.reducer;
