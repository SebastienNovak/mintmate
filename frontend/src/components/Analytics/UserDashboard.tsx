import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUserDataStart,
    markUserNotificationAsRead,
    resetUserDashboardState,
    selectUserProfile,
    selectUserActivities,
    selectUserNotifications,
    selectUserDashboardLoading,
    selectUserDashboardError
} from '../../store/slices/analytics/userDashboardSlice';

const UserDashboard: React.FC = () => {
    const dispatch = useDispatch();

    const userProfile = useSelector(selectUserProfile);
    const userActivities = useSelector(selectUserActivities);
    const notifications = useSelector(selectUserNotifications);
    const loading = useSelector(selectUserDashboardLoading);
    const error = useSelector(selectUserDashboardError);

    useEffect(() => {
        dispatch(fetchUserDataStart());

        return () => {
            dispatch(resetUserDashboardState());
        };
    }, [dispatch]);

    const handleNotificationRead = (notificationId: string) => {
        dispatch(markUserNotificationAsRead(notificationId));
    };

    return (
        <div>
            <h1>User Dashboard</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {userProfile && (
                <div>
                    <h2>{userProfile.username}</h2>
                    <img src={userProfile.profilePictureUrl} alt="User profile" />
                    <p>Email: {userProfile.email}</p>
                    <p>Joined: {userProfile.joinDate}</p>
                    <p>Bio: {userProfile.bio}</p>
                </div>
            )}

            <h3>Recent Activities</h3>
            <ul>
                {userActivities.map(activity => (
                    <li key={activity.id}>
                        <img src={activity.thumbnailUrl} alt={activity.contentTitle} />
                        <p>{activity.contentTitle}</p>
                        <p>{activity.date}</p>
                    </li>
                ))}
            </ul>

            <h3>Notifications</h3>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.id}>
                        <p>{notification.message}</p>
                        <p>{notification.date}</p>
                        {!notification.read && (
                            <button onClick={() => handleNotificationRead(notification.id)}>Mark as read</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard;
