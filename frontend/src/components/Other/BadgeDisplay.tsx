import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchBadgesStart,
    fetchBadgesSuccess,
    fetchBadgesFailure,
    selectAllBadges,
    selectBadgeStatus,
    selectBadgeError
} from '../../store/slices/other/badgeDisplaySlice';

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

// mockBadgeAPI.js
const mockFetchBadgesAPI = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (response.status !== 200) {
        throw new Error('Failed to fetch badges.');
    }

    const data = await response.json();

    // Map the mock data to represent our badges
    return data.slice(0, 5).map((post: Post) => ({
        id: post.id.toString(),
        name: `Badge ${post.id}`,
        description: post.title,
        imageUrl: `https://placeimg.com/64/64/any?${post.id}`,  // Placeholder images
    }));
};

const BadgeDisplay: React.FC = () => {
    const dispatch = useDispatch();
    const badges = useSelector(selectAllBadges);
    const status = useSelector(selectBadgeStatus);
    const error = useSelector(selectBadgeError);

    useEffect(() => {
        const fetchBadges = async () => {
            dispatch(fetchBadgesStart());
            try {
                const badgesFromAPI = await mockFetchBadgesAPI();
                dispatch(fetchBadgesSuccess(badgesFromAPI));
            } catch (err) {
                dispatch(fetchBadgesFailure('Failed to fetch badges.'));
            }
        };

        fetchBadges();
    }, [dispatch]);

    return (
        <div>
            <h2>User Badges</h2>
            
            {status === 'loading' && <p>Loading badges...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            
            <div className="badges-container">
                {badges.map(badge => (
                    <div key={badge.id} className="badge-card">
                        <img src={badge.imageUrl} alt={badge.name} />
                        <h3>{badge.name}</h3>
                        <p>{badge.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BadgeDisplay;
