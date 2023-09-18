import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NavLink = {
    id: string;
    title: string;
    url: string;
    icon?: string;
};

export type NavSection = {
    id: string;
    title: string;
    links: NavLink[];
};

type SidebarState = {
    sections: NavSection[];
    isVisible: boolean;
    activeLink: string | null; // ID of the active link
};

const initialState: SidebarState = {
    sections: [],
    isVisible: true,
    activeLink: null
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setSections: (state, action: PayloadAction<NavSection[]>) => {
            state.sections = action.payload;
        },
        toggleVisibility: (state) => {
            state.isVisible = !state.isVisible;
        },
        setActiveLink: (state, action: PayloadAction<string>) => {
            state.activeLink = action.payload;
        }
    }
});

export const {
    setSections,
    toggleVisibility,
    setActiveLink
} = sidebarSlice.actions;

// Selectors
type RootState = {
    sidebar: SidebarState;
};

export const selectSidebarSections = (state: RootState) => state.sidebar.sections;
export const selectSidebarVisibility = (state: RootState) => state.sidebar.isVisible;
export const selectActiveLink = (state: RootState) => state.sidebar.activeLink;

export default sidebarSlice.reducer;
