import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Track = {
    id: number;
    title: string;
    artist: string;
    duration: number;
    fileUrl: string;
};

type VirtualStudioSession = {
    sessionId: number;
    sessionName: string;
    creator: string;
    participants: string[]; // Array of artist usernames
    tracks: Track[];
    status: 'idle' | 'ongoing' | 'completed';
};

type VirtualStudioSessionsState = {
    currentSession: VirtualStudioSession | null;
    allSessions: VirtualStudioSession[];
    loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: VirtualStudioSessionsState = {
    currentSession: null,
    allSessions: [],
    loadingStatus: 'idle',
    error: null
};

const virtualStudioSessionsSlice = createSlice({
    name: 'virtualStudioSessions',
    initialState,
    reducers: {
        startNewSession: (state, action: PayloadAction<VirtualStudioSession>) => {
            state.allSessions.push(action.payload);
            state.currentSession = action.payload;
            state.loadingStatus = 'succeeded';
        },
        joinSession: (state, action: PayloadAction<{ sessionId: number; participant: string }>) => {
            const session = state.allSessions.find(s => s.sessionId === action.payload.sessionId);
            if (session) {
                session.participants.push(action.payload.participant);
            }
        },
        leaveSession: (state, action: PayloadAction<{ sessionId: number; participant: string }>) => {
            const session = state.allSessions.find(s => s.sessionId === action.payload.sessionId);
            if (session) {
                session.participants = session.participants.filter(p => p !== action.payload.participant);
            }
        },
        addTrackToSession: (state, action: PayloadAction<{ sessionId: number; track: Track }>) => {
            const session = state.allSessions.find(s => s.sessionId === action.payload.sessionId);
            if (session) {
                session.tracks.push(action.payload.track);
            }
        },
        endSession: (state, action: PayloadAction<number>) => {
            const session = state.allSessions.find(s => s.sessionId === action.payload);
            if (session) {
                session.status = 'completed';
            }
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loadingStatus = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    startNewSession,
    joinSession,
    leaveSession,
    addTrackToSession,
    endSession,
    setError
} = virtualStudioSessionsSlice.actions;

// Selectors
type RootState = {
    virtualStudioSessions: VirtualStudioSessionsState;
};

export const selectCurrentSession = (state: RootState) => state.virtualStudioSessions.currentSession;
export const selectAllSessions = (state: RootState) => state.virtualStudioSessions.allSessions;
export const selectLoadingStatus = (state: RootState) => state.virtualStudioSessions.loadingStatus;
export const selectError = (state: RootState) => state.virtualStudioSessions.error;

export default virtualStudioSessionsSlice.reducer;

