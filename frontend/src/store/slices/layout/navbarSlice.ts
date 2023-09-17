import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Link = {
    id: string;
    title: string;
    url: string;
    roles: string[];  // User roles that can view this link.
};

type User = {
    id: string;
    name: string;
    avatarUrl?: string;
    // ... other user properties
};

type NavbarState = {
    links: Link[];
    currentUser: User | null;
    isMobileViewOpen: boolean;
    searchQuery: string;
};

const initialState: NavbarState = {
    links: [],  // You can initialize with some default links if needed.
    currentUser: null,
    isMobileViewOpen: false,
    searchQuery: ''
};

const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setLinks: (state, action: PayloadAction<Link[]>) => {
            state.links = action.payload;
        },
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload;
        },
        toggleMobileView: (state) => {
            state.isMobileViewOpen = !state.isMobileViewOpen;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        }
    }
});

export const {
    setLinks,
    setCurrentUser,
    toggleMobileView,
    setSearchQuery
} = navbarSlice.actions;

// Selectors
type RootState = {
    navbar: NavbarState;
};

export const selectNavbarLinks = (state: RootState) => state.navbar.links;
export const selectCurrentUser = (state: RootState) => state.navbar.currentUser;
export const selectIsMobileViewOpen = (state: RootState) => state.navbar.isMobileViewOpen;
export const selectSearchQuery = (state: RootState) => state.navbar.searchQuery;

export default navbarSlice.reducer;
