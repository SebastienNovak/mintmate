import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    shareRequest,
    shareSuccess,
    shareError,
    selectHasShared,
    selectShareButtonLoading,
    selectShareButtonError,
    // shareContent, // Uncomment this if you use thunks
} from '../../store/slices/social/shareButtonSlice';

const ShareButton: React.FC<{ entityId: string }> = ({ entityId }) => {
    const dispatch = useDispatch();
    const hasShared = useSelector(selectHasShared);
    const isLoading = useSelector(selectShareButtonLoading);
    const error = useSelector(selectShareButtonError);

    const handleShareClick = () => {
        dispatch(shareRequest());
    
        console.log(`Sharing content with ID: ${entityId}`);  // Use entityId here to acknowledge its use
    
        // Simulating an API call or sharing process:
        setTimeout(() => {
            if (Math.random() > 0.7) { // 30% chance to get an error
                dispatch(shareError(`Failed to share content with ID: ${entityId}!`));  // Use entityId in error for context
                return;
            }
    
            dispatch(shareSuccess());
        }, 1000);
    
        // If using thunks to make a real API call or share process:
        // dispatch(shareContent(entityId, 'twitter')); // or 'facebook', 'linkedin'
    };
    

    return (
        <div>
            {isLoading && <p>Sharing...</p>}
            {error && <p>Error: {error}</p>}
            {!isLoading && !error && (
                <button onClick={handleShareClick} disabled={hasShared}>
                    {hasShared ? 'Shared' : 'Share'}
                </button>
            )}
        </div>
    );
};

export default ShareButton;
