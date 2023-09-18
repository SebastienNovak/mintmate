import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setLinks,
    setCurrentUser,
    toggleMobileView,
    setSearchQuery,
    selectNavbarLinks,
    selectCurrentUser,
    selectIsMobileViewOpen,
    selectSearchQuery,
    Link,
    User
} from '../../store/slices/layout/navbarSlice'; // Update path accordingly

const mockLinks: Link[] = [
    {
        id: '1',
        title: 'Dashboard',
        url: '/dashboard',
        roles: ['user', 'admin']  // Simulating user roles
    },
    {
        id: '2',
        title: 'Admin',
        url: '/admin',
        roles: ['admin']
    },
    // ... Add more mock links as desired
];

// Simulated logged-in user
const mockCurrentUser: User = {
    id: 'user123',
    name: 'John Doe',
    avatarUrl: 'http://example.com/avatar.jpg',
};

const Navbar: React.FC = () => {
    const dispatch = useDispatch();

    const links = useSelector(selectNavbarLinks);
    const currentUser = useSelector(selectCurrentUser);
    const isMobileViewOpen = useSelector(selectIsMobileViewOpen);
    const searchQuery = useSelector(selectSearchQuery);

    useEffect(() => {
        dispatch(setLinks(mockLinks));
        dispatch(setCurrentUser(mockCurrentUser));
    }, [dispatch]);

    return (
        <nav>
            {/* Mobile view toggle */}
            <button onClick={() => dispatch(toggleMobileView())}>
                {isMobileViewOpen ? 'Close' : 'Menu'}
            </button>

            {/* Links */}
            {isMobileViewOpen && (
                <ul>
                    {links.map(link => (
                        <li key={link.id}>
                            <a href={link.url}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            )}

            {/* Search bar */}
            <div>
                <input 
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={e => dispatch(setSearchQuery(e.target.value))}
                />
            </div>

            {/* Current User info */}
            {currentUser && (
                <div>
                    {currentUser.avatarUrl && (
                        <img src={currentUser.avatarUrl} alt={currentUser.name} width="40" height="40" />
                    )}
                    <span>{currentUser.name}</span>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
