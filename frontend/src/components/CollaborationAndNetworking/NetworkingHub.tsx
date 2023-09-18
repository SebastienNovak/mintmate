import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchProfilesStart, 
    // fetchProfilesSuccess, 
    // fetchProfilesFailure, 
    connectWithUser,
    sendMessage,
    endorseSkill,
    selectAllProfiles,
    selectLoading,
    selectError,
    selectCurrentUser
} from '../../store/slices/collaborationAndNetworking/networkingHubSlice';

const NetworkingHub: React.FC = () => {
    const dispatch = useDispatch();
    const profiles = useSelector(selectAllProfiles);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const currentUser = useSelector(selectCurrentUser);
    
    const [messageContent, setMessageContent] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');

    useEffect(() => {
        dispatch(fetchProfilesStart());

        // TODO: Replace with actual API call
        // fetchProfiles()
        //     .then(data => dispatch(fetchProfilesSuccess(data)))
        //     .catch(err => dispatch(fetchProfilesFailure(err.message)));
    }, [dispatch]);

    return (
        <div>
            <h1>Networking Hub</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {profiles.map(profile => (
                <div key={profile.userId}>
                    <h3>{profile.name}</h3>
                    <p>Profession: {profile.profession}</p>
                    <p>Skills: {profile.skills.join(', ')}</p>

                    {currentUser && currentUser.userId !== profile.userId && (
                        <div>
                            {!currentUser.connections.includes(profile.userId) && (
                                <button onClick={() => dispatch(connectWithUser({ currentUserId: currentUser.userId, targetUserId: profile.userId }))}>
                                    Connect
                                </button>
                            )}

                            <div>
                                <textarea value={messageContent} onChange={(e) => setMessageContent(e.target.value)} placeholder="Send a message"></textarea>
                                <button onClick={() => {
                                    dispatch(sendMessage({ senderId: currentUser.userId, recipientId: profile.userId, content: messageContent }));
                                    setMessageContent('');
                                }}>Send</button>
                            </div>

                            <div>
                                <label>Endorse Skill:</label>
                                <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
                                    {profile.skills.map(skill => (
                                        <option key={skill} value={skill}>{skill}</option>
                                    ))}
                                </select>
                                <button onClick={() => {
                                    dispatch(endorseSkill({ endorserId: currentUser.userId, targetUserId: profile.userId, skill: selectedSkill }));
                                    setSelectedSkill('');
                                }}>Endorse</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default NetworkingHub;
