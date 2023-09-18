import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchRecommendedSongs, 
    setRecommendedSongs, 
    clearRecommendations, 
    setError,
    selectRecommendedSongs, 
    selectLoadingStatus, 
    selectError, 
    Song
} from '../../store/slices/music/personalizedRecommendationsSlice';  // Replace with your actual path

const PersonalizedRecommendations: React.FC = () => {
    const dispatch = useDispatch();

    const recommendedSongs = useSelector(selectRecommendedSongs);
    const loadingStatus = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    const fetchRecommendations = useCallback(async () => {
        try {
            dispatch(fetchRecommendedSongs());

            // Mock API call
            const response: Song[] = [
                // ... mock song data here
            ];

            dispatch(setRecommendedSongs(response));
        } catch (e) {
            if (typeof e?.toString === 'function') {
                dispatch(setError(e.toString()));
            } else {
                dispatch(setError('An unknown error occurred'));
            }
        }
    }, [dispatch]);

    useEffect(() => {
        fetchRecommendations();
    }, [fetchRecommendations]);

    const handleClearRecommendations = () => {
        dispatch(clearRecommendations());
    };

    if (loadingStatus === 'loading') {
        return <p>Loading recommendations...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="recommendations">
            <h2>Your Personalized Recommendations</h2>
            <ul>
                {recommendedSongs.map(song => (
                    <li key={song.id}>
                        {song.title} by {song.artist} - {song.duration}
                    </li>
                ))}
            </ul>
            {recommendedSongs.length > 0 && (
                <button onClick={handleClearRecommendations}>Clear Recommendations</button>
            )}
        </div>
    );
};

export default PersonalizedRecommendations;
