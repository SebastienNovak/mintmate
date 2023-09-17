import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCollaborationsStart,
    fetchCollaborationsSuccess,
    fetchCollaborationsFailure,
    selectAllCollaborations,
    selectCollaborationStatus,
    selectCollaborationError
} from '../../store/slices/other/collaborationCardSlice';

type Post = {
    id: number;
    title: string;
    body: string;
    // Add other expected fields if any
};

// mockCollaborationAPI.js (You can define this in a separate file if needed)
const mockFetchCollaborationsAPI = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (response.status !== 200) {
        throw new Error('Failed to fetch collaborations.');
    }

    const data = await response.json();

    // Map the mock data to represent our collaborations
    return data.slice(0, 5).map((post: Post) => ({
        id: post.id.toString(),
        title: post.title,
        description: post.body,
        collaborators: [{ id: '1', name: 'John Doe', avatarUrl: 'https://placeimg.com/64/64/people' }],
        dateCreated: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
    }));
};

const CollaborationCard: React.FC = () => {
    const dispatch = useDispatch();
    const collaborations = useSelector(selectAllCollaborations);
    const status = useSelector(selectCollaborationStatus);
    const error = useSelector(selectCollaborationError);

    useEffect(() => {
        const fetchCollaborations = async () => {
            dispatch(fetchCollaborationsStart());
            try {
                const collaborationsFromAPI = await mockFetchCollaborationsAPI();
                dispatch(fetchCollaborationsSuccess(collaborationsFromAPI));
            } catch (err) {
                dispatch(fetchCollaborationsFailure('Failed to fetch collaborations.'));
            }
        };

        fetchCollaborations();
    }, [dispatch]);

    return (
        <div>
            <h2>Collaborations</h2>

            {status === 'loading' && <p>Loading collaborations...</p>}
            {status === 'failed' && <p>Error: {error}</p>}

            <div className="collaborations-container">
                {collaborations.map(collab => (
                    <div key={collab.id} className="collaboration-card">
                        <h3>{collab.title}</h3>
                        <p>{collab.description}</p>
                        <div>
                            Collaborators: 
                            {collab.collaborators.map(user => (
                                <div key={user.id} className="collaborator">
                                    <img src={user.avatarUrl} alt={user.name} />
                                    <span>{user.name}</span>
                                </div>
                            ))}
                        </div>
                        <small>Created: {new Date(collab.dateCreated).toLocaleDateString()}</small>
                        <small>Last Updated: {new Date(collab.lastUpdated).toLocaleDateString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollaborationCard;
