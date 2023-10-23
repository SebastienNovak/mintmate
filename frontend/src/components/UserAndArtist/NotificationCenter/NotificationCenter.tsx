import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    fetchUserNotifications, 
    markAsRead, 
    clearAllNotifications,
    selectAllNotifications,
    selectUnreadNotifications 
} from '../../../store/slices/userAndArtist/notificationCenterSlice';
import { AppDispatch } from '../../../store/store';

const NotificationCenter: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const allNotifications = useSelector(selectAllNotifications);
    const unreadNotifications = useSelector(selectUnreadNotifications);

    useEffect(() => {
        dispatch(fetchUserNotifications());
    }, [dispatch]);

    return (
        <div>
            <h2>Notifications</h2>
            {allNotifications.length === 0 ? (
                <p>No notifications</p>
            ) : (
                <div>
                    {unreadNotifications.map(notification => (
                        <div key={notification.id} style={{ backgroundColor: notification.isRead ? '#f5f5f5' : 'white' }}>
                            <p>{notification.content}</p>
                            {!notification.isRead && (
                                <button onClick={() => dispatch(markAsRead(notification.id))}>
                                    Mark as Read
                                </button>
                            )}
                        </div>
                    ))}
                    <button onClick={() => dispatch(clearAllNotifications())}>
                        Clear All
                    </button>
                </div>
            )}
        </div>
    );
}

export default NotificationCenter;
