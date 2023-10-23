import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchDashboardDataStart,
    markNotificationAsRead,
    resetDashboardState,
    selectArtistProfile,
    selectRecentActivities,
    selectNotifications,
    selectDashboardLoading,
    selectDashboardError
} from '../../../store/slices/analytics/artistDashboardSlice';

const ArtistDashboard: React.FC = () => {
    const dispatch = useDispatch();

    const artistProfile = useSelector(selectArtistProfile);
    const recentActivities = useSelector(selectRecentActivities);
    const notifications = useSelector(selectNotifications);
    const loading = useSelector(selectDashboardLoading);
    const error = useSelector(selectDashboardError);

    useEffect(() => {
        dispatch(fetchDashboardDataStart());

        return () => {
            dispatch(resetDashboardState());
        };
    }, [dispatch]);

    const handleNotificationRead = (notificationId: string) => {
        dispatch(markNotificationAsRead(notificationId));
    };

    return (
        <div>
            <h1>Artist Dashboard</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {artistProfile && (
                <div>
                    <h2>{artistProfile.name}</h2>
                    <img src={artistProfile.avatarUrl} alt="Artist avatar" />
                    <p>{artistProfile.biography}</p>
                    <p>Followers: {artistProfile.followersCount}</p>
                    <p>Total Plays: {artistProfile.totalPlays}</p>
                </div>
            )}

            <h3>Recent Activities</h3>
            <ul>
                {recentActivities.map(activity => (
                    <li key={activity.id}>
                        <img src={activity.thumbnailUrl} alt={activity.title} />
                        <p>{activity.title}</p>
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

export default ArtistDashboard;
