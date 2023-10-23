import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    toggleNavbar,
    setActiveItem,
    selectIsVisible,
    selectMenuItems,
    selectActiveItem
} from '../../../store/slices/responsive/mobileNavbarSlice';

const MobileNavbar: React.FC = () => {
    const dispatch = useDispatch();
    const isVisible = useSelector(selectIsVisible);
    const menuItems = useSelector(selectMenuItems);
    const activeItem = useSelector(selectActiveItem);

    const handleToggleNavbar = () => {
        dispatch(toggleNavbar());
    };

    const handleMenuItemClick = (itemId: string) => {
        dispatch(setActiveItem(itemId));
        dispatch(toggleNavbar()); // Optionally close the navbar after selecting an item
    };

    return (
        <div>
            <button onClick={handleToggleNavbar}>
                {isVisible ? 'Close' : 'Open'} Menu
            </button>
            {isVisible && (
                <ul>
                    {menuItems.map(item => (
                        <li key={item.id}>
                            <button 
                                onClick={() => handleMenuItemClick(item.id)}
                                style={{ fontWeight: item === activeItem ? 'bold' : 'normal' }}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MobileNavbar;
