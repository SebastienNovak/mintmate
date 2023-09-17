import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
type MenuItem = {
    id: string;
    label: string;
    isActive: boolean;
};

type MobileNavbarState = {
    isVisible: boolean;
    menuItems: MenuItem[];
};

// Initial State
const initialState: MobileNavbarState = {
    isVisible: false,
    menuItems: [
        { id: 'home', label: 'Home', isActive: true },
        { id: 'about', label: 'About', isActive: false },
        { id: 'contact', label: 'Contact', isActive: false }
        // ... add other menu items as required
    ]
};

// Slice
const mobileNavbarSlice = createSlice({
    name: 'mobileNavbar',
    initialState,
    reducers: {
        toggleNavbar: (state) => {
            state.isVisible = !state.isVisible;
        },
        setActiveItem: (state, action: PayloadAction<string>) => {
            state.menuItems.forEach(item => {
                item.isActive = item.id === action.payload;
            });
        }
    }
});

export const {
    toggleNavbar,
    setActiveItem
} = mobileNavbarSlice.actions;

// Selectors
type RootState = {
    mobileNavbar: MobileNavbarState;
};

export const selectIsVisible = (state: RootState) => state.mobileNavbar.isVisible;
export const selectActiveItem = (state: RootState) => state.mobileNavbar.menuItems.find(item => item.isActive);
export const selectMenuItems = (state: RootState) => state.mobileNavbar.menuItems;

export default mobileNavbarSlice.reducer;
