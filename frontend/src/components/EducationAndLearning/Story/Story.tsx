import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchStoriesStart,
    fetchStoriesSuccess,
    fetchStoriesFailure,
    postStory,
    selectStories,
    selectLoading,
    selectError,
    Story
} from '../../../store/slices/educationAndLearning/storySlice';  // Make sure to provide the correct path

const StoriesComponent: React.FC = () => {
    const dispatch = useDispatch();
    const stories = useSelector(selectStories);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const [content, setContent] = useState('');

    // This is just a placeholder mock function
    const fetchStoriesAPI = async (): Promise<Story[]> => {
        // Mocked data for demonstration purposes
        const mockData: Story[] = [
            {
                id: '1',
                userId: 'userA',
                content: 'This is a story from userA',
                timestamp: Date.now() - (10 * 60 * 1000),
                expires: Date.now() + (14 * 60 * 60 * 1000)
            },
            {
                id: '2',
                userId: 'userB',
                content: 'This is a story from userB',
                timestamp: Date.now() - (5 * 60 * 1000),
                expires: Date.now() + (14 * 60 * 60 * 1000)
            }
        ];
        
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockData);
            }, 1000);
        });
    };       

    useEffect(() => {
        // This is just a placeholder; you should replace this with actual API calls
        dispatch(fetchStoriesStart());
        
        // For demonstration purposes, I'm assuming there's a fetchStoriesAPI function
        fetchStoriesAPI()
            .then(data => dispatch(fetchStoriesSuccess(data)))
            .catch(err => dispatch(fetchStoriesFailure(err.message)));
    }, [dispatch]);

    const handleSubmit = () => {
        const timestamp = Date.now();
        const expires = timestamp + (24 * 60 * 60 * 1000); // 24 hours from now

        dispatch(postStory({
            userId: 'currentUser', // replace with actual user ID
            content,
            timestamp,
            expires
        }));
        setContent('');
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            
            <div>
                <h2>Post a Story</h2>
                <input 
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <button onClick={handleSubmit}>Post</button>
            </div>
            
            <div>
                <h2>Stories</h2>
                {stories.map(story => (
                    <div key={story.id}>
                        <p>{story.content}</p>
                        <span>Posted by: {story.userId}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoriesComponent;
