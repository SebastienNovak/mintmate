import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPublicProfile, selectUserPublicProfile } from '../../../store/slices/userAndArtist/userPublicProfileSlice';
import { AppDispatch } from '../../../store/store'; // Assuming you have a store setup and exported AppDispatch type

interface UserPublicProfileProps {
    userId: string;
}

const UserPublicProfile: React.FC<UserPublicProfileProps> = ({ userId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector(selectUserPublicProfile);

    useEffect(() => {
        dispatch(fetchUserPublicProfile(userId));
    }, [dispatch, userId]);

    return (
        <div>
            <h2>{profile.username}'s Public Profile</h2>
            {profile.error && <div>Error: {profile.error}</div>}
            <img src={profile.profileImage} alt={`${profile.username}'s profile`} />
            <div><strong>Bio:</strong> {profile.bio}</div>
            <div>
                <h3>Playlists:</h3>
                <ul>
                    {profile.playlists.map(playlist => (
                        <li key={playlist.id}>{playlist.name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Badges:</h3>
                <ul>
                    {profile.badges.map(badge => (
                        <li key={badge.id}>
                            {badge.name} <img src={badge.icon} alt={badge.name} />
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Reviews:</h3>
                <ul>
                    {profile.reviews.map(review => (
                        <li key={review.id}>
                            {review.rating} stars on {review.date.toLocaleDateString()}: {review.content}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UserPublicProfile;
