import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types:

export type Member = {
    id: string;
    name: string;
    joinDate: string;  // ISO date string representing when the member joined.
    membershipLevel: 'basic' | 'premium' | 'elite';  // Different levels of membership with varied perks.
    profilePictureUrl: string;
};

type FanClubState = {
    members: Member[];
    currentMember: Member | null; // Represents the currently logged-in member.
    activities: string[]; // List of recent activities or events related to the fan club.
    loading: boolean;
    error: string | null;
};

const initialState: FanClubState = {
    members: [],
    currentMember: null,
    activities: [],
    loading: false,
    error: null,
};

const fanClubSlice = createSlice({
    name: 'fanClub',
    initialState,
    reducers: {
        fetchMembersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchMembersSuccess: (state, action: PayloadAction<Member[]>) => {
            state.members = action.payload;
            state.loading = false;
        },
        fetchMembersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        setCurrentMember: (state, action: PayloadAction<Member>) => {
            state.currentMember = action.payload;
        },
        addActivity: (state, action: PayloadAction<string>) => {
            state.activities.push(action.payload);
        },
        upgradeMembership: (state, action: PayloadAction<{ memberId: string, newLevel: 'basic' | 'premium' | 'elite' }>) => {
            const member = state.members.find(m => m.id === action.payload.memberId);
            if (member) {
                member.membershipLevel = action.payload.newLevel;
            }
        }
    }
});

export const {
    fetchMembersStart,
    fetchMembersSuccess,
    fetchMembersFailure,
    setCurrentMember,
    addActivity,
    upgradeMembership
} = fanClubSlice.actions;

// Selectors
type RootState = {
    fanClub: FanClubState;
};

export const selectMembers = (state: RootState) => state.fanClub.members;
export const selectCurrentMember = (state: RootState) => state.fanClub.currentMember;
export const selectActivities = (state: RootState) => state.fanClub.activities;
export const selectLoading = (state: RootState) => state.fanClub.loading;
export const selectError = (state: RootState) => state.fanClub.error;

export default fanClubSlice.reducer;
