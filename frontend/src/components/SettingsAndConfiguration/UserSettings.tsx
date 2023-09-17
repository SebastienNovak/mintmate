import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setTheme,
    setLanguage,
    toggleNotifications,
    setProfileVisibility,
    selectTheme,
    selectLanguage,
    selectNotificationsStatus,
    selectProfileVisibility,
} from '../../store/slices/settingsAndConfiguration/userSettingsSlice';

const UserSettings: React.FC = () => {
    const dispatch = useDispatch();
    
    const theme = useSelector(selectTheme);
    const language = useSelector(selectLanguage);
    const notificationsEnabled = useSelector(selectNotificationsStatus);
    const profileVisibility = useSelector(selectProfileVisibility);

    return (
        <div className="user-settings">
            <h2>User Settings</h2>

            <div>
                <label>Theme: 
                    <select 
                        value={theme} 
                        onChange={(e) => dispatch(setTheme(e.target.value as 'light' | 'dark'))}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </label>
            </div>

            <div>
                <label>Language: 
                    <select 
                        value={language} 
                        onChange={(e) => dispatch(setLanguage(e.target.value as 'en' | 'fr' | 'es' | 'de'))}
                    >
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                        <option value="de">German</option>
                    </select>
                </label>
            </div>

            <div>
                <label>
                    <input 
                        type="checkbox" 
                        checked={notificationsEnabled} 
                        onChange={() => dispatch(toggleNotifications())} 
                    />
                    Enable Notifications
                </label>
            </div>

            <div>
                <label>Profile Visibility: 
                    <select 
                        value={profileVisibility} 
                        onChange={(e) => dispatch(setProfileVisibility(e.target.value as 'public' | 'private'))}
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </label>
            </div>

        </div>
    );
};

export default UserSettings;
