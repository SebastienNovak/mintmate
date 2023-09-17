import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    followRequest,
    followSuccess,
    unfollowSuccess,
    followError,
    selectIsFollowing,
    selectFollowButtonLoading,
    selectFollowButtonError,
    // followEntity, // Uncomment this if you use thunks
} from '../../store/slices/social/followButtonSlice';

const FollowButton: React.FC<{ entityId: string }> = ({ entityId }) => {
    const dispatch = useDispatch();
    const isFollowing = useSelector(selectIsFollowing);
    const isLoading = useSelector(selectFollowButtonLoading);
    const error = useSelector(selectFollowButtonError);

    const handleFollowClick = () => {
        dispatch(followRequest());

        // Simulating an API call:
        mockApiCall(entityId, true).then(success => {
            success
                ? dispatch(followSuccess())
                : dispatch(followError("Failed to follow!"));
        });
    };

    const handleUnfollowClick = () => {
        dispatch(followRequest());

        // Simulating an API call:
        mockApiCall(entityId, false).then(success => {
            success
                ? dispatch(unfollowSuccess())
                : dispatch(followError("Failed to unfollow!"));
        });
    };

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!isLoading && !error && (
                <button onClick={isFollowing ? handleUnfollowClick : handleFollowClick}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
            )}
        </div>
    );
};

// Mock API Call
const mockApiCall = (entityId: string, follow: boolean): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(follow ? `Following entity with ID: ${entityId}` : `Unfollowing entity with ID: ${entityId}`);
            const success = Math.random() > 0.7; // 30% chance to get an error
            resolve(success);
        }, 1000);
    });
};

export default FollowButton;
