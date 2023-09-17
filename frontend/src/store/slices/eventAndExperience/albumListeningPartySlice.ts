import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
type Track = {
    id: number;
    title: string;
    duration: number; // Duration in seconds
};

type PartyMember = {
    userId: number;
    username: string;
    isListening: boolean;
};

type AlbumListeningPartyState = {
    currentTrack: Track | null;
    albumTracks: Track[];
    currentTrackTime: number; // Current time in the track, in seconds
    partyMembers: PartyMember[];
    isLive: boolean; // Indicates if the listening party is ongoing
    chatMessages: {
        userId: number;
        message: string;
        timestamp: Date;
    }[];
};

const initialState: AlbumListeningPartyState = {
    currentTrack: null,
    albumTracks: [],
    currentTrackTime: 0,
    partyMembers: [],
    isLive: false,
    chatMessages: []
};

const albumListeningPartySlice = createSlice({
    name: 'albumListeningParty',
    initialState,
    reducers: {
        setCurrentTrack: (state, action: PayloadAction<Track>) => {
            state.currentTrack = action.payload;
        },
        setAlbumTracks: (state, action: PayloadAction<Track[]>) => {
            state.albumTracks = action.payload;
        },
        updateTrackTime: (state, action: PayloadAction<number>) => {
            state.currentTrackTime = action.payload;
        },
        addPartyMember: (state, action: PayloadAction<PartyMember>) => {
            state.partyMembers.push(action.payload);
        },
        removePartyMember: (state, action: PayloadAction<number>) => { // action payload is userId
            state.partyMembers = state.partyMembers.filter(member => member.userId !== action.payload);
        },
        toggleLiveStatus: (state) => {
            state.isLive = !state.isLive;
        },
        addChatMessage: (state, action: PayloadAction<{ userId: number; message: string; timestamp: Date }>) => {
            state.chatMessages.push(action.payload);
        }
    }
});

export const {
    setCurrentTrack,
    setAlbumTracks,
    updateTrackTime,
    addPartyMember,
    removePartyMember,
    toggleLiveStatus,
    addChatMessage
} = albumListeningPartySlice.actions;

// Selectors
type RootState = {
    albumListeningParty: AlbumListeningPartyState;
};

export const selectCurrentTrack = (state: RootState) => state.albumListeningParty.currentTrack;
export const selectAlbumTracks = (state: RootState) => state.albumListeningParty.albumTracks;
export const selectPartyMembers = (state: RootState) => state.albumListeningParty.partyMembers;
export const selectIsLive = (state: RootState) => state.albumListeningParty.isLive;
export const selectChatMessages = (state: RootState) => state.albumListeningParty.chatMessages;

export default albumListeningPartySlice.reducer;
