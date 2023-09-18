import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    sendMentorshipRequest,
    respondToRequest,
    provideFeedback,
    selectUsers,
    selectMentorshipRequests,
    selectLoading,
    selectError
} from '../../store/slices/educationAndLearning/mentorshipSlice';

// This is a mock function for fetching users. Replace with your actual API call.
const fetchUsersAPI = () => {
    const API_URL = 'https://your-api-endpoint.com/users'; // Replace with your actual API endpoint
    return fetch(API_URL).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch users');
        }
    });
};

const Mentorship: React.FC = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const mentorshipRequests = useSelector(selectMentorshipRequests);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const [feedbackForm, setFeedbackForm] = useState<{ requestId: string | null, feedback: string }>({
        requestId: null,
        feedback: ''
    });
    
    const currentUserId = 'currentUserId'; // Replace this with the actual current user ID

    useEffect(() => {
        dispatch(fetchUsersStart());

        fetchUsersAPI()
            .then(data => dispatch(fetchUsersSuccess(data)))
            .catch(err => dispatch(fetchUsersFailure(err.message)));
    }, [dispatch]);

    const handleSendRequest = (mentorId: string) => {
        dispatch(sendMentorshipRequest({ menteeId: currentUserId, mentorId }));
    };

    const handleRespondToRequest = (requestId: string, status: 'accepted' | 'declined') => {
        dispatch(respondToRequest({ requestId, status }));
    };

    const handleOpenFeedbackForm = (requestId: string) => {
        setFeedbackForm({
            requestId,
            feedback: ''
        });
    };

    const handleProvideFeedback = () => {
        if (feedbackForm.requestId) {
            dispatch(provideFeedback({
                requestId: feedbackForm.requestId,
                feedback: feedbackForm.feedback
            }));
            setFeedbackForm({
                requestId: null,
                feedback: ''
            });
        }
    };

    // ... Render logic ...

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="mentorship-container">
            <h2>Mentors</h2>
            <ul>
                {users.filter(u => u.isMentor).map(mentor => (
                    <li key={mentor.id}>
                        {mentor.name}
                        <button onClick={() => handleSendRequest(mentor.id)}>Request Mentorship</button>
                    </li>
                ))}
            </ul>
    
            <h2>Mentorship Requests</h2>
            <ul>
                {mentorshipRequests.map(request => (
                    <li key={request.requestId}>
                        {/* ... (existing request listing logic) */}
                        
                        {/* Logic for mentors to accept or decline requests */}
                        {request.status === 'pending' && request.mentorId === currentUserId && (
                            <>
                                <button onClick={() => handleRespondToRequest(request.requestId, 'accepted')}>Accept</button>
                                <button onClick={() => handleRespondToRequest(request.requestId, 'declined')}>Decline</button>
                            </>
                        )}
    
                        {/* Feedback form for completed requests */}
                        {request.status === 'completed' && request.menteeId === currentUserId && (
                            feedbackForm.requestId === request.requestId ? (
                                <div>
                                    <textarea
                                        value={feedbackForm.feedback}
                                        onChange={(e) => setFeedbackForm(prev => ({ ...prev, feedback: e.target.value }))}
                                        placeholder="Provide your feedback here..."
                                    />
                                    <button onClick={handleProvideFeedback}>Submit Feedback</button>
                                </div>
                            ) : (
                                <button onClick={() => handleOpenFeedbackForm(request.requestId)}>Provide Feedback</button>
                            )
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Mentorship;
