import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchPostsStart, 
    fetchPostsSuccess, 
    fetchPostsFailure, 
    CollaborationPost,
    selectAllPosts,
    selectLoading,
    selectError,
    updatePostStatus
} from '../../store/slices/collaborationAndNetworking/collaborationBoardSlice'; // Adjust the path accordingly

const CollaborationBoard: React.FC = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    // Mock function to fetch collaboration posts. Replace with actual API call.
    const fetchCollaborationPosts = async (): Promise<CollaborationPost[]> => {
        const mockPosts: CollaborationPost[] = [
            // ... mock data
        ];

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockPosts);
            }, 1000);
        });
    };

    useEffect(() => {
        dispatch(fetchPostsStart());

        fetchCollaborationPosts()
            .then(data => dispatch(fetchPostsSuccess(data)))
            .catch(err => dispatch(fetchPostsFailure(err.message)));
    }, [dispatch]);

    return (
        <div>
            <h1>Collaboration Board</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                        <p>By: {post.authorName}</p>
                        <p>Type: {post.collaborationType}</p>
                        <p>Posted on: {post.timestamp.toLocaleDateString()}</p>
                        <p>Status: {post.status}</p>
                        <p>Responses: {post.responses}</p>
                        {post.status === 'open' && (
                            <button onClick={() => dispatch(updatePostStatus({ id: post.id, status: 'closed' }))}>
                                Close Post
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CollaborationBoard;
