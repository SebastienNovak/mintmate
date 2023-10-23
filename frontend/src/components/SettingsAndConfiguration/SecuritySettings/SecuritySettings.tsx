import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    toggleTwoFactorAuthentication,
    toggleEmailAlerts,
    addRecentActivity,
    incrementActiveSessions,
    decrementActiveSessions,
    selectTwoFactorAuthentication,
    selectEmailAlerts,
    selectRecentActivity,
    selectActiveSessions,
} from '../../../store/slices/settingsAndConfiguration/securitySettingsSlice';

const SecuritySettings: React.FC = () => {
    const dispatch = useDispatch();
    
    const twoFactorAuthenticationEnabled = useSelector(selectTwoFactorAuthentication);
    const emailAlerts = useSelector(selectEmailAlerts);
    const recentActivity = useSelector(selectRecentActivity);
    const activeSessions = useSelector(selectActiveSessions);

    const simulateRecentActivity = () => {
        const now = new Date();
        dispatch(addRecentActivity({
            activity: "Simulated activity",
            date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
        }));
    };

    return (
        <div className="security-settings">
            <h2>Security Settings</h2>

            <div>
                <label>
                    <input 
                        type="checkbox" 
                        checked={twoFactorAuthenticationEnabled} 
                        onChange={() => dispatch(toggleTwoFactorAuthentication())} 
                    />
                    Two-Factor Authentication
                </label>
            </div>

            <div>
                <label>
                    <input 
                        type="checkbox" 
                        checked={emailAlerts} 
                        onChange={() => dispatch(toggleEmailAlerts())} 
                    />
                    Email Alerts for Unusual Activity
                </label>
            </div>

            <h3>Recent Activity</h3>
            <ul>
                {recentActivity.map((activityItem, index) => (
                    <li key={index}>
                        {activityItem.activity} on {activityItem.date}
                    </li>
                ))}
            </ul>

            {/* Button to simulate a recent activity */}
            <button onClick={simulateRecentActivity}>
                Add Simulated Recent Activity
            </button>

            <div>
                <h3>Active Sessions: {activeSessions}</h3>
                <button onClick={() => dispatch(incrementActiveSessions())}>
                    Increment Sessions (simulated)
                </button>
                <button onClick={() => dispatch(decrementActiveSessions())}>
                    Decrement Sessions (simulated)
                </button>
            </div>
        </div>
    );
};

export default SecuritySettings;
