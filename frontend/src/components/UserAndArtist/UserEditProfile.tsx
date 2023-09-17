import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchEditableProfile,
    submitProfileChanges,
    selectEditableProfile
} from '../../store/slices/userAndArtist/userEditProfileSlice';
import { AppDispatch } from '../../store/store';

interface UserEditProfileProps {
    userId: string;
}

const UserEditProfile: React.FC<UserEditProfileProps> = ({ userId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector(selectEditableProfile);
    const [editedProfile, setEditedProfile] = useState(profile);

    useEffect(() => {
        dispatch(fetchEditableProfile(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        setEditedProfile(profile);
    }, [profile]);

    const handleSubmit = () => {
        dispatch(submitProfileChanges(editedProfile));
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedProfile({
            ...editedProfile,
            email: event.target.value
        });
    };

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEditedProfile({
            ...editedProfile,
            preferences: {
                ...editedProfile.preferences,
                theme: event.target.value as 'dark' | 'light'
            }
        });
    };

    const handleNotificationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedProfile({
            ...editedProfile,
            preferences: {
                ...editedProfile.preferences,
                notifications: event.target.checked
            }
        });
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            {profile.error && <div>Error: {profile.error}</div>}
            <div>
                <label>
                    Email: 
                    <input 
                        type="email" 
                        value={editedProfile.email} 
                        onChange={handleEmailChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Theme: 
                    <select 
                        value={editedProfile.preferences.theme} 
                        onChange={handleThemeChange}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Notifications: 
                    <input 
                        type="checkbox" 
                        checked={editedProfile.preferences.notifications} 
                        onChange={handleNotificationsChange}
                    />
                </label>
            </div>
            <button onClick={handleSubmit}>Save Changes</button>
        </div>
    );
}

export default UserEditProfile;
