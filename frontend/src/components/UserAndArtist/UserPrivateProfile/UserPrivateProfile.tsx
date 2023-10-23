import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPrivateProfile, selectUserPrivateProfile } from '../../../store/slices/userAndArtist/userPrivateProfileSlice';
import { AppDispatch } from '../../../store/store'; // Assuming you have a store setup and exported AppDispatch type

interface UserPrivateProfileProps {
    userId: string;
}

const UserPrivateProfile: React.FC<UserPrivateProfileProps> = ({ userId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector(selectUserPrivateProfile);

    useEffect(() => {
        dispatch(fetchUserPrivateProfile(userId));
    }, [dispatch, userId]);

    return (
        <div>
            <h2>Private Profile</h2>
            {profile.error && <div>Error: {profile.error}</div>}
            <div>
                <strong>Email:</strong> {profile.email}
            </div>
            <div>
                <strong>Theme Preference:</strong> {profile.preferences.theme}
            </div>
            <div>
                <strong>Notifications:</strong> {profile.preferences.notifications ? 'Enabled' : 'Disabled'}
            </div>
        </div>
    );
}

export default UserPrivateProfile;
