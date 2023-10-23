import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    markAsRead, 
    toggleDropdown, 
    clearNotifications, 
    selectNotifications, 
    selectUnreadCount, 
    selectDropdownState 
} from '../../../store/slices/notifications/notificationDropdownSlice';

const NotificationDropdown: React.FC = () => {
    const dispatch = useDispatch();

    const notifications = useSelector(selectNotifications);
    const unreadCount = useSelector(selectUnreadCount);
    const isOpen = useSelector(selectDropdownState);

    const handleToggleDropdown = () => {
        dispatch(toggleDropdown());
    };

    const handleMarkAsRead = (id: number) => {
        dispatch(markAsRead(id));
    };

    const handleClearNotifications = () => {
        dispatch(clearNotifications());
    };

    return (
        <div className="notification-dropdown">
            <button onClick={handleToggleDropdown}>
                Notifications {unreadCount > 0 && `(${unreadCount} unread)`}
            </button>
            
            {isOpen && (
                <div className="dropdown-content">
                    {notifications.length === 0 ? (
                        <p>No notifications</p>
                    ) : (
                        <ul>
                            {notifications.map(notification => (
                                <li key={notification.id} className={notification.read ? '' : 'unread'}>
                                    {notification.message}
                                    {!notification.read && (
                                        <button onClick={() => handleMarkAsRead(notification.id)}>Mark as read</button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                    {notifications.length > 0 && (
                        <button onClick={handleClearNotifications}>Clear all notifications</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
