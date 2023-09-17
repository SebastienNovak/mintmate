import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types:

type UserProfile = {
    userId: string;
    name: string;
    profession: string;
    skills: string[];  // e.g., ['Singing', 'Songwriting']
    endorsements: { skill: string, endorsedBy: string }[];  // User ID of endorser
    connections: string[];  // Array of user IDs representing connections
    messages: { senderId: string, content: string, timestamp: Date }[];
};

type NetworkingHubState = {
    profiles: UserProfile[];
    currentUser: string | null;  // The ID of the currently logged-in user
    loading: boolean;
    error: string | null;
};

const initialState: NetworkingHubState = {
    profiles: [],
    currentUser: null,
    loading: false,
    error: null,
};

const networkingHubSlice = createSlice({
    name: 'networkingHub',
    initialState,
    reducers: {
        fetchProfilesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProfilesSuccess: (state, action: PayloadAction<UserProfile[]>) => {
            state.profiles = action.payload;
            state.loading = false;
        },
        fetchProfilesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        connectWithUser: (state, action: PayloadAction<{ currentUserId: string, targetUserId: string }>) => {
            const currentUser = state.profiles.find(p => p.userId === action.payload.currentUserId);
            const targetUser = state.profiles.find(p => p.userId === action.payload.targetUserId);
            if (currentUser && targetUser && !currentUser.connections.includes(targetUser.userId)) {
                currentUser.connections.push(targetUser.userId);
            }
        },
        sendMessage: (state, action: PayloadAction<{ senderId: string, recipientId: string, content: string }>) => {
            const recipient = state.profiles.find(p => p.userId === action.payload.recipientId);
            if (recipient) {
                recipient.messages.push({
                    senderId: action.payload.senderId,
                    content: action.payload.content,
                    timestamp: new Date(),
                });
            }
        },
        endorseSkill: (state, action: PayloadAction<{ endorserId: string, targetUserId: string, skill: string }>) => {
            const targetUser = state.profiles.find(p => p.userId === action.payload.targetUserId);
            if (targetUser && targetUser.skills.includes(action.payload.skill)) {
                targetUser.endorsements.push({
                    skill: action.payload.skill,
                    endorsedBy: action.payload.endorserId,
                });
            }
        }
    }
});

export const {
    fetchProfilesStart,
    fetchProfilesSuccess,
    fetchProfilesFailure,
    connectWithUser,
    sendMessage,
    endorseSkill
} = networkingHubSlice.actions;

// Selectors
type RootState = {
    networkingHub: NetworkingHubState;
};

export const selectAllProfiles = (state: RootState) => state.networkingHub.profiles;
export const selectProfileById = (state: RootState, userId: string) => state.networkingHub.profiles.find(profile => profile.userId === userId);
export const selectCurrentUser = (state: RootState) => state.networkingHub.profiles.find(profile => profile.userId === state.networkingHub.currentUser);
export const selectLoading = (state: RootState) => state.networkingHub.loading;
export const selectError = (state: RootState) => state.networkingHub.error;

export default networkingHubSlice.reducer;
