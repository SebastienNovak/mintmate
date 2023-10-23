import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setSections,
    toggleVisibility,
    setActiveLink,
    selectSidebarSections,
    selectSidebarVisibility,
    selectActiveLink,
    NavSection
} from '../../../store/slices/layout/sidebarSlice'; // Update path accordingly

const mockSections: NavSection[] = [
    {
        id: '1',
        title: 'Main',
        links: [
            { id: 'link1', title: 'Home', url: '/', icon: '🏠' },
            { id: 'link2', title: 'Profile', url: '/profile', icon: '👤' },
        ]
    },
    {
        id: '2',
        title: 'Settings',
        links: [
            { id: 'link3', title: 'Preferences', url: '/prefs', icon: '⚙️' },
            { id: 'link4', title: 'Log out', url: '/logout', icon: '🚪' },
        ]
    },
    // ... Add more mock sections as desired
];

const Sidebar: React.FC = () => {
    const dispatch = useDispatch();

    const sections = useSelector(selectSidebarSections);
    const isVisible = useSelector(selectSidebarVisibility);
    const activeLink = useSelector(selectActiveLink);

    useEffect(() => {
        dispatch(setSections(mockSections));
    }, [dispatch]);

    if (!isVisible) {
        return null;
    }

    return (
        <aside>
            {sections.map(section => (
                <div key={section.id}>
                    <h3>{section.title}</h3>
                    <ul>
                        {section.links.map(link => (
                            <li key={link.id}>
                                <a 
                                    href={link.url} 
                                    className={link.id === activeLink ? 'active' : ''}
                                    onClick={() => dispatch(setActiveLink(link.id))}
                                >
                                    {link.icon && <span>{link.icon}</span>}
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <button onClick={() => dispatch(toggleVisibility())}>
                Toggle Sidebar
            </button>
        </aside>
    );
};

export default Sidebar;
