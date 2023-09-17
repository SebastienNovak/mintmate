import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setReactionRequest,
    setReactionSuccess,
    removeReactionSuccess,
    setReactionError,
    selectCurrentReaction,
    selectReactionButtonLoading,
    selectReactionButtonError,
    // setReaction, // Uncomment this if you use thunks
} from '../../store/slices/social/reactionButtonSlice';

const ReactionButton: React.FC<{ entityId: string }> = () => {
    const dispatch = useDispatch();
    const currentReaction = useSelector(selectCurrentReaction);
    const isLoading = useSelector(selectReactionButtonLoading);
    const error = useSelector(selectReactionButtonError);

    const handleReactionClick = (reaction: 'like' | 'dislike') => {
        dispatch(setReactionRequest());
        
        // Simulating an API call:
        setTimeout(() => {
            if (Math.random() > 0.7) { // 30% chance to get an error
                dispatch(setReactionError("Failed to set reaction!"));
                return;
            }
            
            if (currentReaction === reaction) {
                dispatch(removeReactionSuccess());
            } else {
                dispatch(setReactionSuccess(reaction));
            }
        }, 1000);
        
        // If using thunks to make a real API call:
        // dispatch(setReaction(entityId, reaction));
    };

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!isLoading && !error && (
                <div>
                    <button 
                        onClick={() => handleReactionClick('like')} 
                        style={currentReaction === 'like' ? { background: 'green' } : {}}
                    >
                        Like
                    </button>
                    <button 
                        onClick={() => handleReactionClick('dislike')} 
                        style={currentReaction === 'dislike' ? { background: 'red' } : {}}
                    >
                        Dislike
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReactionButton;
