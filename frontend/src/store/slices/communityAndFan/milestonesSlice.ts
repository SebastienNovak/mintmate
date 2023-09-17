import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types:

type MilestoneStatus = 'planned' | 'in-progress' | 'completed';

type Milestone = {
    id: string;
    projectId: string;
    title: string;
    description: string;
    dueDate: string; // ISO date string format
    status: MilestoneStatus;
};

type MilestonesState = {
    milestones: Milestone[];
    loading: boolean;
    error: string | null;
};

const initialState: MilestonesState = {
    milestones: [],
    loading: false,
    error: null,
};

const milestonesSlice = createSlice({
    name: 'milestones',
    initialState,
    reducers: {
        fetchMilestonesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchMilestonesSuccess: (state, action: PayloadAction<Milestone[]>) => {
            state.milestones = action.payload;
            state.loading = false;
        },
        fetchMilestonesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateMilestoneStatus: (state, action: PayloadAction<{ milestoneId: string, status: MilestoneStatus }>) => {
            const milestone = state.milestones.find(m => m.id === action.payload.milestoneId);
            if (milestone) {
                milestone.status = action.payload.status;
            }
        }
    }
});

export const {
    fetchMilestonesStart,
    fetchMilestonesSuccess,
    fetchMilestonesFailure,
    updateMilestoneStatus
} = milestonesSlice.actions;

// Selectors
type RootState = {
    milestones: MilestonesState;
};

export const selectMilestonesByProjectId = (state: RootState, projectId: string) => state.milestones.milestones.filter(m => m.projectId === projectId);
export const selectMilestoneById = (state: RootState, milestoneId: string) => state.milestones.milestones.find(m => m.id === milestoneId);
export const selectLoading = (state: RootState) => state.milestones.loading;
export const selectError = (state: RootState) => state.milestones.error;

export default milestonesSlice.reducer;
