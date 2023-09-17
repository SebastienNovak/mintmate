import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    toggleSidebar,
    setActiveItem,
    selectIsSidebarVisible,
    selectSidebarItems,
    selectActiveSidebarItem
} from '../../store/slices/responsive/tabletSidebarSlice';

const TabletSidebar: React.FC = () => {
    const dispatch = useDispatch();
    const isSidebarVisible = useSelector(selectIsSidebarVisible);
    const sidebarItems = useSelector(selectSidebarItems);
    const activeSidebarItem = useSelector(selectActiveSidebarItem);

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    };

    const handleSidebarItemClick = (itemId: string) => {
        dispatch(setActiveItem(itemId));
    };

    return (
        <div>
            <button onClick={handleToggleSidebar}>
                {isSidebarVisible ? 'Hide' : 'Show'} Sidebar
            </button>
            {isSidebarVisible && (
                <div className="sidebar">
                    <ul>
                        {sidebarItems.map(item => (
                            <li key={item.id}>
                                <button 
                                    onClick={() => handleSidebarItemClick(item.id)}
                                    style={{ fontWeight: item === activeSidebarItem ? 'bold' : 'normal' }}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TabletSidebar;
