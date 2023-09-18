import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    startNewSession,
    joinSession,
    leaveSession,
    addTrackToSession,
    endSession,
    setError,
    selectCurrentSession,
    selectAllSessions,
    selectLoadingStatus,
    selectError,
    VirtualStudioSession,
    Track
} from '../../store/slices/music/virtualStudioSessionsSlice';  // Replace with your actual path

    const VirtualStudioSessions: React.FC = () => {
    const dispatch = useDispatch();

    const currentSession = useSelector(selectCurrentSession);
    const allSessions = useSelector(selectAllSessions);
    const loadingStatus = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    // State for form inputs
    const [sessionName, setSessionName] = useState('');
    const [creator, setCreator] = useState('');
    const [trackName, setTrackName] = useState('');

    const handleNewSession = useCallback(() => {
        const newSession: VirtualStudioSession = {  // Explicit type declaration
            sessionId: Date.now(),
            sessionName,
            creator,
            participants: [creator],
            tracks: [],
            status: 'ongoing' as const  // Use const assertion
        };
        dispatch(startNewSession(newSession));
    }, [dispatch, sessionName, creator]);
    
    const handleLeaveSession = useCallback((sessionId: number) => {
        const participant = prompt("Enter your artist name to leave:");
        if (participant) {
            dispatch(leaveSession({ sessionId, participant }));
        }
    }, [dispatch]);

    const handleAddTrackToSession = useCallback((sessionId: number) => {
        const trackTitle = prompt("Enter the name of the track to add:");
        if (trackTitle) {
            const newTrack: Track = {
                id: Date.now(), // This is a simplistic way to get a unique ID, consider using a more robust method
                title: trackTitle,
                artist: 'Unknown', // You might want a more elaborate way to get this data
                duration: 0, // You might want to prompt the user for this or get it from the file's metadata
                fileUrl: '' // You'll likely want to prompt the user for a file or use a file input
            };
            dispatch(addTrackToSession({ sessionId, track: newTrack }));
        }
    }, [dispatch]);
    

    const handleEndSession = useCallback((sessionId: number) => {
        if (window.confirm("Are you sure you want to end this session?")) {
            dispatch(endSession(sessionId));
        }
    }, [dispatch]);

    const handleJoinSession = useCallback((sessionId: number) => {
        const participant = prompt("Enter your artist name to join:");
        if (participant) {
            dispatch(joinSession({ sessionId, participant }));
        }
    }, [dispatch]);

    const handleError = useCallback(() => {
        dispatch(setError('Some error message here.'));
    }, [dispatch]);

    return (
        <div>
            <h2>Virtual Studio Sessions</h2>
            {loadingStatus === 'loading' && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            
            <div>
                <h3>Create New Session</h3>
                <input
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                    placeholder="Session Name"
                />
                <input
                    value={creator}
                    onChange={(e) => setCreator(e.target.value)}
                    placeholder="Creator Name"
                />
                <button onClick={handleNewSession}>Start Session</button>
            </div>

            <div>
                <h3>All Sessions</h3>
                <ul>
                    {allSessions.map(session => (
                        <li key={session.sessionId}>
                            <h4>{session.sessionName} by {session.creator}</h4>
                            <p>Status: {session.status}</p>
                            <p>Participants: {session.participants.join(', ')}</p>
                            <button onClick={() => handleJoinSession(session.sessionId)}>Join Session</button>
                            <button onClick={() => handleLeaveSession(session.sessionId)}>Leave Session</button>
                            <input
                                value={trackName}
                                onChange={(e) => setTrackName(e.target.value)}
                                placeholder="Track Name"
                            />
                            <button onClick={() => handleAddTrackToSession(session.sessionId)}>Add Track</button>   
                            <button onClick={() => handleEndSession(session.sessionId)}>End Session</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Display and interact with the current session */}
            {currentSession && (
                <div>
                    <h3>Current Session: {currentSession.sessionName}</h3>
                    {/* Display session details and interactions */}
                </div>
            )}
            <button onClick={handleError}>Trigger Error</button>
        </div>
    );
};

export default VirtualStudioSessions;
