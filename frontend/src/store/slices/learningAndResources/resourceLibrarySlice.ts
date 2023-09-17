import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ResourceType = 'article' | 'video' | 'pdf' | 'tutorial'; // extend as needed

type Resource = {
    id: string;
    title: string;
    description: string;
    type: ResourceType;
    url: string; // URL to the resource, could be a download link, video embed link, etc.
    // ... other attributes, like thumbnail, author, publication date, etc.
};

type ResourceLibraryState = {
    resources: Resource[];
    selectedResource: Resource | null; // for displaying details of a selected resource
    searchTerm: string; // to search within the library
    loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: ResourceLibraryState = {
    resources: [],
    selectedResource: null,
    searchTerm: '',
    loadingStatus: 'idle',
    error: null
};

const resourceLibrarySlice = createSlice({
    name: 'resourceLibrary',
    initialState,
    reducers: {
        fetchResources: (state) => {
            state.loadingStatus = 'loading';
        },
        setResources: (state, action: PayloadAction<Resource[]>) => {
            state.resources = action.payload;
            state.loadingStatus = 'succeeded';
        },
        selectResource: (state, action: PayloadAction<string>) => { // action payload is resource ID
            const resource = state.resources.find(r => r.id === action.payload);
            state.selectedResource = resource || null;
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loadingStatus = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    fetchResources,
    setResources,
    selectResource,
    setSearchTerm,
    setError
} = resourceLibrarySlice.actions;

// Selectors
type RootState = {
    resourceLibrary: ResourceLibraryState;
};

export const selectAllResources = (state: RootState) => state.resourceLibrary.resources;
export const selectSelectedResource = (state: RootState) => state.resourceLibrary.selectedResource;
export const selectSearchTerm = (state: RootState) => state.resourceLibrary.searchTerm;
export const selectFilteredResources = (state: RootState) => 
    state.resourceLibrary.resources.filter(resource => 
        resource.title.includes(state.resourceLibrary.searchTerm)
    );
export const selectLoadingStatus = (state: RootState) => state.resourceLibrary.loadingStatus;
export const selectError = (state: RootState) => state.resourceLibrary.error;

export default resourceLibrarySlice.reducer;
