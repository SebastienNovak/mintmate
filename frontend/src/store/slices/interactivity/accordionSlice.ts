import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AccordionItem = {
    id: string;
    title: string;
    content: string;
    isExpanded: boolean;
};

type AccordionState = {
    items: AccordionItem[];
};

const initialState: AccordionState = {
    items: []
};

const accordionSlice = createSlice({
    name: 'accordion',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<AccordionItem[]>) => {
            state.items = action.payload;
        },
        toggleItemExpansion: (state, action: PayloadAction<string>) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item) {
                item.isExpanded = !item.isExpanded;
            }
        },
        expandAll: (state) => {
            state.items.forEach(item => item.isExpanded = true);
        },
        collapseAll: (state) => {
            state.items.forEach(item => item.isExpanded = false);
        }
    }
});

export const {
    setItems,
    toggleItemExpansion,
    expandAll,
    collapseAll
} = accordionSlice.actions;

// Selectors
type RootState = {
    accordion: AccordionState;
};

export const selectAccordionItems = (state: RootState) => state.accordion.items;
export const selectExpandedItems = (state: RootState) => state.accordion.items.filter(item => item.isExpanded);

export default accordionSlice.reducer;
