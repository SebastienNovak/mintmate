import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setLinks,
    toggleViewMode,
    updateCopyrightYear,
    selectFooterLinks,
    selectFooterViewMode,
    selectCopyrightYear,
    Link
} from '../../store/slices/layout/footerSlice'; // Update path accordingly

const mockLinks: Link[] = [
    {
        id: '1',
        title: 'Privacy Policy',
        url: 'http://example.com/privacy',
        roles: ['user', 'admin']  // Simulating user roles
    },
    {
        id: '2',
        title: 'Terms of Service',
        url: 'http://example.com/terms',
        roles: ['user']
    },
    // ... Add more mock links as desired
];

// Simulated role of the logged-in user
const currentUserRole = 'user';

const Footer: React.FC = () => {
    const dispatch = useDispatch();

    const links = useSelector(selectFooterLinks).filter(link => link.roles.includes(currentUserRole));
    const viewMode = useSelector(selectFooterViewMode);
    const copyrightYear = useSelector(selectCopyrightYear);

    useEffect(() => {
        dispatch(setLinks(mockLinks));
        // Optionally update the copyright year on component mount
        dispatch(updateCopyrightYear());
    }, [dispatch]);

    return (
        <footer>
            {viewMode === 'full' && (
                <div>
                    <ul>
                        {links.map(link => (
                            <li key={link.id}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {viewMode === 'compact' && (
                <div>
                    {/* Maybe just show the main links or a summarized version */}
                </div>
            )}
            <div>
                <button onClick={() => dispatch(toggleViewMode())}>
                    Toggle View
                </button>
                <p>&copy; {copyrightYear} MyWebsiteName</p>
            </div>
        </footer>
    );
};

export default Footer;
