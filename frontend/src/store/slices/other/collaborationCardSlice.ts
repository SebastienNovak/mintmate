import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
type User = {
    id: string;
    name: string;
    avatarUrl: string;
};

type Collaboration = {
    id: string;
    title: string;
    description: string;
    collaborators: User[];
    dateCreated: string;
    lastUpdated: string;
};

type CollaborationCardState = {
    collaborations: Collaboration[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

// Initial State
const initialState: CollaborationCardState = {
    collaborations: [],
    status: 'idle',
    error: null
};

// Slice
const collaborationCardSlice = createSlice({
    name: 'collaborationCard',
    initialState,
    reducers: {
        fetchCollaborationsStart: (state) => {
            state.status = 'loading';
        },
        fetchCollaborationsSuccess: (state, action: PayloadAction<Collaboration[]>) => {
            state.collaborations = action.payload;
            state.status = 'succeeded';
        },
        fetchCollaborationsFailure: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        addCollaboration: (state, action: PayloadAction<Collaboration>) => {
            state.collaborations.push(action.payload);
        },
        removeCollaboration: (state, action: PayloadAction<string>) => {
            state.collaborations = state.collaborations.filter(collab => collab.id !== action.payload);
        },
        updateCollaboration: (state, action: PayloadAction<Collaboration>) => {
            const index = state.collaborations.findIndex(collab => collab.id === action.payload.id);
            if (index !== -1) {
                state.collaborations[index] = action.payload;
            }
        }
    }
});

export const {
    fetchCollaborationsStart,
    fetchCollaborationsSuccess,
    fetchCollaborationsFailure,
    addCollaboration,
    removeCollaboration,
    updateCollaboration
} = collaborationCardSlice.actions;

// Selectors
type RootState = {
    collaborationCard: CollaborationCardState;
};

export const selectAllCollaborations = (state: RootState) => state.collaborationCard.collaborations;
export const selectCollaborationStatus = (state: RootState) => state.collaborationCard.status;
export const selectCollaborationError = (state: RootState) => state.collaborationCard.error;

export default collaborationCardSlice.reducer;
