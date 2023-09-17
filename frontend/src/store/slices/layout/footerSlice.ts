import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Link = {
    id: string;
    title: string;
    url: string;
    roles: string[];  // User roles that can view this link.
};

type FooterState = {
    copyrightYear: number;
    links: Link[];
    viewMode: 'compact' | 'full';
};

const initialState: FooterState = {
    copyrightYear: new Date().getFullYear(),
    links: [],  // You can initialize with some default links if needed.
    viewMode: 'full'
};

const footerSlice = createSlice({
    name: 'footer',
    initialState,
    reducers: {
        setLinks: (state, action: PayloadAction<Link[]>) => {
            state.links = action.payload;
        },
        toggleViewMode: (state) => {
            state.viewMode = state.viewMode === 'full' ? 'compact' : 'full';
        },
        updateCopyrightYear: (state) => {
            state.copyrightYear = new Date().getFullYear();
        }
    }
});

export const {
    setLinks,
    toggleViewMode,
    updateCopyrightYear
} = footerSlice.actions;

// Selectors
type RootState = {
    footer: FooterState;
};

export const selectFooterLinks = (state: RootState) => state.footer.links;
export const selectFooterViewMode = (state: RootState) => state.footer.viewMode;
export const selectCopyrightYear = (state: RootState) => state.footer.copyrightYear;

export default footerSlice.reducer;
