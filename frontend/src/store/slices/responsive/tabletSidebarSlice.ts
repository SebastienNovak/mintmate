import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
type SidebarItem = {
    id: string;
    label: string;
    isActive: boolean;
};

type TabletSidebarState = {
    isVisible: boolean;
    sidebarItems: SidebarItem[];
};

// Initial State
const initialState: TabletSidebarState = {
    isVisible: true, // Assuming sidebar is visible by default on tablets
    sidebarItems: [
        { id: 'dashboard', label: 'Dashboard', isActive: true },
        { id: 'profile', label: 'Profile', isActive: false },
        { id: 'settings', label: 'Settings', isActive: false }
        // ... add other sidebar items as required
    ]
};

// Slice
const tabletSidebarSlice = createSlice({
    name: 'tabletSidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isVisible = !state.isVisible;
        },
        setActiveItem: (state, action: PayloadAction<string>) => {
            state.sidebarItems.forEach(item => {
                item.isActive = item.id === action.payload;
            });
        }
    }
});

export const {
    toggleSidebar,
    setActiveItem
} = tabletSidebarSlice.actions;

// Selectors
type RootState = {
    tabletSidebar: TabletSidebarState;
};

export const selectIsSidebarVisible = (state: RootState) => state.tabletSidebar.isVisible;
export const selectActiveSidebarItem = (state: RootState) => state.tabletSidebar.sidebarItems.find(item => item.isActive);
export const selectSidebarItems = (state: RootState) => state.tabletSidebar.sidebarItems;

export default tabletSidebarSlice.reducer;
