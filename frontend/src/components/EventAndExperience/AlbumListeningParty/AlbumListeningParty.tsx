import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setCurrentTrack,
    setAlbumTracks,
    updateTrackTime,
    addPartyMember,
    removePartyMember,
    toggleLiveStatus,
    addChatMessage,
    selectCurrentTrack,
    selectAlbumTracks,
    selectPartyMembers,
    selectIsLive,
    selectChatMessages,
    Track
} from '../../../store/slices/eventAndExperience/albumListeningPartySlice';

const AlbumListeningParty: React.FC = () => {
    const dispatch = useDispatch();

    const currentTrack = useSelector(selectCurrentTrack);
    const albumTracks = useSelector(selectAlbumTracks);
    const partyMembers = useSelector(selectPartyMembers);
    const isLive = useSelector(selectIsLive);
    const chatMessages = useSelector(selectChatMessages);

    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [playbackTime, setPlaybackTime] = useState(0);


    const handleTrackChange = (track: Track) => {
        dispatch(setCurrentTrack(track));
    };

    const handleJoinParty = () => {
        if (username) {
            dispatch(addPartyMember({ userId: Date.now(), username, isListening: true }));
            setUsername('');
        }
    };

    const handlePlaybackChange = (time: number) => {
        setPlaybackTime(time);
        dispatch(updateTrackTime(time));
    };
    

    const handleLeaveParty = (userId: number) => {
        dispatch(removePartyMember(userId));
    };

    const handleToggleLive = () => {
        dispatch(toggleLiveStatus());
    };

    const handleSendMessage = () => {
        if (message) {
            dispatch(addChatMessage({ userId: 0, message, timestamp: new Date() }));
            setMessage('');
        }
    };

    useEffect(() => {
        const fetchAlbumTracks = async () => {
            try {
                const response = await fetch("YOUR_API_ENDPOINT_HERE");
                const data = await response.json();
                dispatch(setAlbumTracks(data));
            } catch (error) {
                console.error("Failed to fetch album tracks:", error);
            }
        };

        fetchAlbumTracks();
    }, [dispatch]);

    return (
        <div className="album-party-container">
            <h2>Album Listening Party</h2>

            <button onClick={handleToggleLive}>
                {isLive ? 'End Party' : 'Start Party'}
            </button>

            <div className="current-track">
                <h3>Now Playing:</h3>
                {currentTrack ? (
                    <div>
                        <span>{currentTrack.title}</span> | Duration: {currentTrack.duration} seconds
                    </div>
                ) : (
                    <div>No track currently playing.</div>
                )}
            </div>

            <div className="album-tracks">
                <h4>Tracks:</h4>
                <ul>
                    {albumTracks.map(track => (
                        <li key={track.id} onClick={() => handleTrackChange(track)}>
                            {track.title} | Duration: {track.duration} seconds
                        </li>
                    ))}
                </ul>
            </div>

            <div className="party-members">
                <h4>Members:</h4>
                <ul>
                    {partyMembers.map(member => (
                        <li key={member.userId.toString()}>
                            {member.username} - {member.isListening ? "Listening" : "Paused"}
                            <button onClick={() => handleLeaveParty(member.userId)}>Leave</button>
                        </li>
                    ))}
                </ul>
                <div className="join-party">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username to join"
                    />
                    <button onClick={handleJoinParty}>Join Party</button>
                </div>
            </div>

            <div className="chat-section">
                <h4>Chat:</h4>
                <ul>
                    {chatMessages.map((chat, index) => (
                        <li key={index}>
                            {chat.message} - {new Date(chat.timestamp).toLocaleTimeString()}
                        </li>
                    ))}
                </ul>
                <div className="send-message">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Send a message"
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
                <div className="playback-slider">
                    <input 
                        type="range" 
                        min="0" 
                        max={currentTrack ? currentTrack.duration : 0} 
                        value={playbackTime} 
                        onChange={e => handlePlaybackChange(Number(e.target.value))}
                    />
                    <span>{playbackTime} / {currentTrack ? currentTrack.duration : 0} seconds</span>
                </div>
            </div>
        </div>
    );
};

export default AlbumListeningParty;
