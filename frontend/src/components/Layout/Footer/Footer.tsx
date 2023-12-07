import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setLinks,
    updateCopyrightYear,
    selectFooterLinks,
    selectFooterViewMode,
    selectCopyrightYear,
    Link
} from '../../../store/slices/layout/footerSlice'; // Update path accordingly

import './styles.scss';

const mockLinks: Link[] = [
    { id: '1', title: 'About', url: '/about', roles: ['user', 'admin'] },
    { id: '2', title: 'FAQ', url: '/faq', roles: ['user', 'admin'] },
    { id: '3', title: 'Partnerships', url: '/partnerships', roles: ['user', 'admin'] },
    { id: '4', title: 'Support/Contact', url: '/support', roles: ['user', 'admin'] },
    { id: '5', title: 'Privacy Policy', url: '/privacy', roles: ['user', 'admin'] },
    { id: '6', title: 'Terms of Service', url: '/terms', roles: ['user', 'admin'] },
    { id: '7', title: 'Affiliates/Referral', url: '/affiliates', roles: ['user', 'admin'] }
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
        <footer className='footer'>
            <div className="footer-content">
                <div className="links-container">
                    {viewMode === 'full' && (
                        <ul>
                            {links.map(link => (
                                <li key={link.id}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                    {viewMode === 'compact' && (
                        <div>
                            {/* Maybe just show the main links or a summarized version */}
                        </div>
                    )}
                </div>
                <div className="trademark-container">
                    <p>&copy; {copyrightYear} Mint Mate</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
