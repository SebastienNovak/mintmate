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
} from '../../../store/slices/eventAndExperience/workshopSlice';

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

    if (loading) return <div className="loading-section">Loading...</div>;
    if (error) return <div className="error-section">Error: {error}</div>;

    return (
        <div className="workshop-container">
            <h2 className="workshop-header">Workshops</h2>

            {currentWorkshop ? (
                <div className="current-workshop">
                    <h3>{currentWorkshop.title}</h3>
                    <p>{currentWorkshop.description}</p>
                    <a href={currentWorkshop.contentUrl} target="_blank" rel="noopener noreferrer" className="workshop-link">Workshop Content</a>
                    <ul className="assignment-list">
                        {currentWorkshop.assignments.map(assignment => (
                            <li key={assignment.assignmentId}>
                                <h4>{assignment.title}</h4>
                                <p>{assignment.description}</p>
                                <input 
                                    type="text"
                                    value={submission}
                                    onChange={e => setSubmission(e.target.value)}
                                    placeholder="Enter your submission..."
                                    className="submission-input"
                                />
                                <button onClick={() => handleSubmitAssignment("user_id_placeholder", assignment.assignmentId)} className="submit-btn">
                                    Submit
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="workshop-list">
                    {allWorkshops.map(workshop => (
                        <div key={workshop.id} className="workshop-item">
                            <h3>{workshop.title}</h3>
                            <p>{workshop.description}</p>
                            <button onClick={() => handleEnterWorkshop(workshop.id)} className="enter-btn">
                                Enter Workshop
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Workshop;
