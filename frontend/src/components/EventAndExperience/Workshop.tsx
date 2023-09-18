import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchWorkshopsStart,
    fetchWorkshopsSuccess,
    fetchWorkshopsFailure,
    enterWorkshop,
    submitAssignment,
    selectCurrentWorkshop,
    selectAllWorkshops,
    selectWorkshopLoading,
    selectWorkshopError
} from '../../store/slices/eventAndExperience/workshopSlice';

// Mock function for fetching workshops from an API
const fetchWorkshopsAPI = () => {
    const API_URL = 'https://your-api-endpoint.com/workshops'; // Replace with your actual API endpoint
    return fetch(API_URL).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch workshops');
        }
    });
};

const Workshop: React.FC = () => {
    const dispatch = useDispatch();
    const currentWorkshop = useSelector(selectCurrentWorkshop);
    const allWorkshops = useSelector(selectAllWorkshops);
    const loading = useSelector(selectWorkshopLoading);
    const error = useSelector(selectWorkshopError);

    const [submission, setSubmission] = useState('');

    useEffect(() => {
        dispatch(fetchWorkshopsStart());

        fetchWorkshopsAPI()
            .then(data => {
                dispatch(fetchWorkshopsSuccess(data));
            })
            .catch(error => {
                dispatch(fetchWorkshopsFailure(error.message));
            });
    }, [dispatch]);

    const handleEnterWorkshop = (workshopId: string) => {
        dispatch(enterWorkshop(workshopId));
    };

    const handleSubmitAssignment = (userId: string, assignmentId: string) => {
        if (submission.trim()) {
            dispatch(submitAssignment({ userId, assignmentId, submission }));
            setSubmission('');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="workshop-container">
            <h2>Workshops</h2>

            {currentWorkshop ? (
                <div className="current-workshop">
                    <h3>{currentWorkshop.title}</h3>
                    <p>{currentWorkshop.description}</p>
                    <a href={currentWorkshop.contentUrl} target="_blank" rel="noopener noreferrer">Workshop Content</a>
                    <ul>
                        {currentWorkshop.assignments.map(assignment => (
                            <li key={assignment.assignmentId}>
                                <h4>{assignment.title}</h4>
                                <p>{assignment.description}</p>
                                <input 
                                    type="text"
                                    value={submission}
                                    onChange={e => setSubmission(e.target.value)}
                                    placeholder="Enter your submission..."
                                />
                                {/* Here, replace 'user123' with the actual userId */}
                                <button onClick={() => handleSubmitAssignment('user123', assignment.assignmentId)}>Submit</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h3>All Workshops</h3>
                    <ul>
                        {allWorkshops.map(workshop => (
                            <li key={workshop.id}>
                                {workshop.title} - Date: {new Date(workshop.date).toLocaleDateString()}
                                <button onClick={() => handleEnterWorkshop(workshop.id)}>Enter</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Workshop;
