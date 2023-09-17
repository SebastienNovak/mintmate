import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    fetchCollaborationRequests, 
    respondToCollaborationRequest, 
    selectAllCollaborationRequests 
} from '../../store/slices/userAndArtist/artistCollaborationRequestsSlice'; // Adjust path as needed
import { AppDispatch } from '../../store/store';

type ArtistCollaborationRequestsProps = {
    artistId: string;
};

const ArtistCollaborationRequests: React.FC<ArtistCollaborationRequestsProps> = ({ artistId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const collaborationRequests = useSelector(selectAllCollaborationRequests);

    useEffect(() => {
        dispatch(fetchCollaborationRequests(artistId));
    }, [artistId, dispatch]);

    const handleResponse = (requestId: string, status: 'accepted' | 'declined') => {
        dispatch(respondToCollaborationRequest(requestId, status));
    };

    return (
        <div>
            <h2>Collaboration Requests</h2>
            {collaborationRequests.map(request => (
                <div key={request.requestId}>
                    <p>From: {request.fromArtistName}</p>
                    <p>Message: {request.message}</p>
                    <p>Status: {request.status}</p>
                    {request.status === 'pending' && (
                        <div>
                            <button onClick={() => handleResponse(request.requestId, 'accepted')}>
                                Accept
                            </button>
                            <button onClick={() => handleResponse(request.requestId, 'declined')}>
                                Decline
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ArtistCollaborationRequests;
