import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery, Link, User } from '../../../store/slices/layout/navbarSlice'; // Update path accordingly
import './style.scss';

interface NavbarProps {
    data: {
        links: Link[];
        currentUser: User | null;
        searchQuery: string;
    }
}

const Navbar: React.FC<NavbarProps> = ({ data }) => {
    const dispatch = useDispatch();

    const [navbarLinks, setNavbarLinks] = useState<Link[]>(data.links);

    // Mocked Navbar links (move these to a redux slice or parent component in real-world scenarios)
    useEffect(() => {
        setNavbarLinks([
            { id: '1', title: 'Home', url: '/home', roles: ['user', 'admin'] },
            { id: '2', title: 'Browse', url: '/browse', roles: ['user', 'admin'] },
            { id: '3', title: 'Sell/Host', url: '/sell', roles: ['user', 'admin'] },
            { id: '4', title: 'How It Works', url: '/howitworks', roles: ['user', 'admin'] },
            { id: '5', title: 'Community', url: '/community', roles: ['user', 'admin'] },
            { id: '6', title: 'Blog/News', url: '/blog', roles: ['user', 'admin'] },
            { id: '7', title: 'My Account', url: '/account', roles: ['user', 'admin'] }
        ]);
    }, []);

    return (
        <nav>
            {/* Links */}
            <ul>
                {navbarLinks.map(link => (
                    <li key={link.id}>
                        <a href={link.url}>{link.title}</a>
                    </li>
                ))}
            </ul>

            {/* Search bar */}
            <div>
                <input 
                    type="text"
                    placeholder="Search..."
                    value={data.searchQuery}
                    onChange={e => dispatch(setSearchQuery(e.target.value))}
                />
            </div>

            {/* Current User info */}
            {data.currentUser && (
                <div>
                    {data.currentUser.avatarUrl && (
                        <img src={data.currentUser.avatarUrl} alt={data.currentUser.name} width="40" height="40" />
                    )}
                    <span>{data.currentUser.name}</span>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
