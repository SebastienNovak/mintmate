import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types:
type User = {
    id: string;
    name: string;
    skills: string[];  // List of skills or domains the user is proficient in
    bio: string;       // Short bio or description
    isMentor: boolean; // Whether the user is available for mentoring
    // ... any other user properties
};

type MentorshipRequest = {
    requestId: string;
    menteeId: string;  // ID of the user seeking mentorship
    mentorId: string;  // ID of the mentor
    status: 'pending' | 'accepted' | 'declined' | 'completed';
    feedback?: string; // Feedback from the mentee after mentorship
};

type MentorshipState = {
    users: User[];
    mentorshipRequests: MentorshipRequest[];
    loading: boolean;
    error: string | null;
};

const initialState: MentorshipState = {
    users: [],
    mentorshipRequests: [],
    loading: false,
    error: null,
};

const mentorshipSlice = createSlice({
    name: 'mentorship',
    initialState,
    reducers: {
        fetchUsersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            state.loading = false;
        },
        fetchUsersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        sendMentorshipRequest: (state, action: PayloadAction<{ menteeId: string, mentorId: string }>) => {
            const newRequest: MentorshipRequest = {
                requestId: new Date().toISOString(), // Generate a unique ID, possibly using a more sophisticated method
                menteeId: action.payload.menteeId,
                mentorId: action.payload.mentorId,
                status: 'pending',
            };
            state.mentorshipRequests.push(newRequest);
        },
        respondToRequest: (state, action: PayloadAction<{ requestId: string, status: 'accepted' | 'declined' }>) => {
            const request = state.mentorshipRequests.find(r => r.requestId === action.payload.requestId);
            if (request) {
                request.status = action.payload.status;
            }
        },
        provideFeedback: (state, action: PayloadAction<{ requestId: string, feedback: string }>) => {
            const request = state.mentorshipRequests.find(r => r.requestId === action.payload.requestId);
            if (request && request.status === 'completed') {
                request.feedback = action.payload.feedback;
            }
        },
        // ... other actions as needed
    }
});

export const {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    sendMentorshipRequest,
    respondToRequest,
    provideFeedback
} = mentorshipSlice.actions;

// Selectors
type RootState = {
    mentorship: MentorshipState;
};

export const selectUsers = (state: RootState) => state.mentorship.users;
export const selectMentorshipRequests = (state: RootState) => state.mentorship.mentorshipRequests;
export const selectLoading = (state: RootState) => state.mentorship.loading;
export const selectError = (state: RootState) => state.mentorship.error;

export default mentorshipSlice.reducer;
