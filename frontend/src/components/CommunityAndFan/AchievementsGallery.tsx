import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAchievementsStart,
    fetchAchievementsSuccess,
    fetchAchievementsFailure,
    selectAchievements,
    selectAchievementsLoading,
    selectAchievementsError,
    Achievement
} from '../../store/slices/communityAndFan/achievementsGallerySlice'; // Adjust the path accordingly

const AchievementsGallery: React.FC = () => {
    const dispatch = useDispatch();
    const achievements = useSelector(selectAchievements);
    const loading = useSelector(selectAchievementsLoading);
    const error = useSelector(selectAchievementsError);

    // Mock function for fetching achievements; replace with actual API call.
    const fetchUserAchievements = async (): Promise<Achievement[]> => {
        const mockAchievements: Achievement[] = [
            {
                id: '1',
                title: 'First Login',
                description: 'Logged in for the first time',
                imageUrl: 'url-to-image1',
                unlockedAt: '2023-01-01T12:00:00Z'
            },
            {
                id: '2',
                title: '10th Purchase',
                description: 'Completed 10 purchases',
                imageUrl: 'url-to-image2',
                unlockedAt: '2023-02-01T12:00:00Z'
            },
            // ... more mock data
        ];

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockAchievements);
            }, 1000);
        });
    };

    useEffect(() => {
        dispatch(fetchAchievementsStart());

        fetchUserAchievements()
            .then(data => dispatch(fetchAchievementsSuccess(data)))
            .catch(err => dispatch(fetchAchievementsFailure(err.message)));
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>My Achievements</h1>
            <ul>
                {achievements.map(achievement => (
                    <li key={achievement.id}>
                        <h3>{achievement.title}</h3>
                        <img src={achievement.imageUrl} alt={achievement.title} />
                        <p>{achievement.description}</p>
                        <p>Unlocked at: {new Date(achievement.unlockedAt).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AchievementsGallery;
