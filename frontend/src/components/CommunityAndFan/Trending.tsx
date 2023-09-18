import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchTrendingStart, 
    fetchTrendingSuccess, 
    fetchTrendingFailure, 
    selectAllTrendingContent,
    TrendingContent,
    selectLoading,
    selectError,
} from '../../store/slices/communityAndFan/trendingSlice'; // Adjust the path accordingly

const Trending: React.FC = () => {
    const dispatch = useDispatch();
    const trendingContents = useSelector(selectAllTrendingContent);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    // Mock function to fetch trending content. Replace with actual API call.
    const fetchTrendingContents = async (): Promise<TrendingContent[]> => {
        const mockContents: TrendingContent[] = [
            // ... mock data
        ];

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockContents);
            }, 1000);
        });
    };

    useEffect(() => {
        dispatch(fetchTrendingStart());

        fetchTrendingContents()
            .then(data => dispatch(fetchTrendingSuccess(data)))
            .catch(err => dispatch(fetchTrendingFailure(err.message)));
    }, [dispatch]);

    return (
        <div>
            <h1>Trending Now</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <ul>
                {trendingContents.map(content => (
                    <li key={content.id}>
                        <a href={content.link}>
                            {content.imageUrl && <img src={content.imageUrl} alt={content.title} />}
                            <h3>{content.title}</h3>
                            <p>By: {content.author}</p>
                            <p>Posted on: {content.timestamp.toLocaleDateString()}</p>
                            <p>Engagement Score: {content.engagementScore}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Trending;
