import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';

// MOCK API UTILITY
const api = {
    fetchCollaborationRequests: async (artistId: string): Promise<{ data: CollaborationRequest[] }> => {
        // In a real-world scenario, you'd fetch these from a database using the artistId.
        return {
            data: [
                {
                    requestId: '1',
                    fromArtistId: artistId, // Use the artistId here
                    fromArtistName: 'John Doe',
                    message: `I love your work! Would you be interested in a collaboration with artist ${artistId}?`, // Also, use the artistId in the message
                    status: 'pending' // e.g. 'pending', 'accepted', 'declined'
                },
                // ... other collaboration requests
            ]
        };
    },    
    respondToRequest: async (requestId: string, status: 'accepted' | 'declined'): Promise<{ requestId: string, status: 'accepted' | 'declined' }> => {
        // For simplicity, just updating status. In a real scenario, you'd update the database.
        return {
            requestId: requestId,
            status: status
        };
    }
};


// Types
type CollaborationRequest = {
    requestId: string;
    fromArtistId: string;
    fromArtistName: string;
    message: string;
    status: 'pending' | 'accepted' | 'declined';
};

// Initial State
const initialState: CollaborationRequest[] = [];

// Slice
const artistCollaborationRequestsSlice = createSlice({
    name: 'artistCollaborationRequests',
    initialState,
    reducers: {
        fetchRequestsSuccess: (_, action: PayloadAction<CollaborationRequest[]>) => {
            return action.payload;
        },
        updateRequestStatus: (state, action: PayloadAction<{ requestId: string, status: 'accepted' | 'declined' }>) => {
            const request = state.find(req => req.requestId === action.payload.requestId);
            if (request) {
                request.status = action.payload.status;
            }
        }
    },
});

export const {
    fetchRequestsSuccess,
    updateRequestStatus
} = artistCollaborationRequestsSlice.actions;

// Thunks
export const fetchCollaborationRequests = (artistId: string) => async (dispatch: Dispatch) => {
    try {
        const response = await api.fetchCollaborationRequests(artistId);
        dispatch(fetchRequestsSuccess(response.data));
    } catch (error) {
        console.error('Error fetching collaboration requests:', error);
    }
};

export const respondToCollaborationRequest = (requestId: string, status: 'accepted' | 'declined') => async (dispatch: Dispatch) => {
    try {
        await api.respondToRequest(requestId, status);
        dispatch(updateRequestStatus({ requestId, status }));
    } catch (error) {
        console.error('Error responding to collaboration request:', error);
    }
};

// Selectors
type RootState = {
    artistCollaborationRequests: CollaborationRequest[];
};

export const selectAllCollaborationRequests = (state: RootState) => state.artistCollaborationRequests;

export default artistCollaborationRequestsSlice.reducer;
