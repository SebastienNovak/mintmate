import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchTopicsStart,
    fetchTopicsSuccess,
    fetchTopicsFailure,
    selectTopics,
    selectPostsByTopicId,
    Topic,
    selectLoading,
    selectError,
    Post
} from '../../store/slices/communityAndFan/forumSlice'; // Adjust the path accordingly
import { RootState } from '../../store/store';

const Forum: React.FC = () => {
    const dispatch = useDispatch();
    const topics = useSelector<RootState, Topic[]>(selectTopics);
    const loading = useSelector<RootState, boolean>(selectLoading);
    const error = useSelector<RootState, string | null>(selectError);
    const postsForSelectedTopic = useSelector<RootState, Post[]>(state => selectPostsByTopicId(state, selectedTopicId || ''));


    const [selectedTopicId, setSelectedTopicId] = React.useState<string | null>(null);

    // Mock function for fetching topics; replace with actual API call.
    const fetchAllTopics = async (): Promise<Topic[]> => {
        const mockTopics: Topic[] = [
            {
                id: '1',
                title: 'General Discussion',
                description: 'Discuss anything related to the fan club!',
                postCount: 5
            },
            // ... more mock data
        ];

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockTopics);
            }, 1000);
        });
    };

    useEffect(() => {
        dispatch(fetchTopicsStart());

        fetchAllTopics()
            .then(data => dispatch(fetchTopicsSuccess(data)))
            .catch(err => dispatch(fetchTopicsFailure(err.message)));
    }, [dispatch]);

    return (
        <div>
            <h1>Fan Club Forum</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <h2>Topics:</h2>
            <ul>
                {topics.map(topic => (
                    <li key={topic.id}>
                        <h3 onClick={() => setSelectedTopicId(topic.id)}>{topic.title}</h3>
                        <p>{topic.description}</p>
                    </li>
                ))}
            </ul>

            {selectedTopicId && (
                <div>
                    <h2>Posts in {topics.find(t => t.id === selectedTopicId)?.title}:</h2>
                    <ul>
                        {postsForSelectedTopic.map(post => (
                            <li key={post.id}>
                                <p>{post.content}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Forum;
