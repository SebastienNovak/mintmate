import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchTutorsStart,
    fetchTutorsSuccess,
    fetchTutorsFailure,
    bookLesson,
    completeLesson,
    cancelLesson,
    provideFeedback,
    selectTutors,
    selectLessons,
    selectLoading,
    selectError
} from '../../store/slices/educationAndLearning/musicLessonsSlice';

const MusicLessons: React.FC = () => {
    const dispatch = useDispatch();
    const tutors = useSelector(selectTutors);
    const lessons = useSelector(selectLessons);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const [feedbackLessonId, setFeedbackLessonId] = useState<string | null>(null);
    const [feedbackText, setFeedbackText] = useState('');

    const currentUserId = 'currentUser'; // Fetch this from wherever you store user state

    const fetchTutorsAPI = () => {
        return fetch('/api/tutors')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });
    };
    
    useEffect(() => {
        dispatch(fetchTutorsStart());
        // For example purposes, let's assume you have an API function named fetchTutorsAPI
        fetchTutorsAPI()
            .then(response => {
                dispatch(fetchTutorsSuccess(response.data)); // Dispatch the success action with the received data
            })
            .catch(error => {
                dispatch(fetchTutorsFailure(error.message)); // Dispatch the failure action with the error message
            });
    }, [dispatch]);

    const handleBookLesson = (tutorId: string, timeSlot: string) => {
        dispatch(bookLesson({ studentId: currentUserId, tutorId, timeSlot }));
    };

    const handleCompleteLesson = (lessonId: string) => {
        dispatch(completeLesson(lessonId));
    };

    const handleCancelLesson = (lessonId: string) => {
        dispatch(cancelLesson(lessonId));
    };

    const handleProvideFeedback = (lessonId: string) => {
        setFeedbackLessonId(lessonId);
    };

    const handleSubmitFeedback = () => {
        if (feedbackLessonId) {
            dispatch(provideFeedback({ lessonId: feedbackLessonId, feedback: feedbackText }));
            setFeedbackLessonId(null);
            setFeedbackText('');
        }
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <div>
                <h2>Tutors</h2>
                {tutors.map(tutor => (
                    <div key={tutor.id}>
                        <h3>{tutor.name}</h3>
                        <p>{tutor.bio}</p>
                        <ul>
                            {tutor.availability.map(timeSlot => (
                                <li key={timeSlot}>
                                    {timeSlot}
                                    <button onClick={() => handleBookLesson(tutor.id, timeSlot)}>Book</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div>
                <h2>My Lessons</h2>
                {lessons.filter(lesson => lesson.studentId === currentUserId).map(lesson => (
                    <div key={lesson.lessonId}>
                        <p>Tutor: {lesson.tutorId}</p>
                        <p>Time: {lesson.timeSlot}</p>
                        <p>Status: {lesson.status}</p>
                        <button onClick={() => handleCompleteLesson(lesson.lessonId)}>Mark as Completed</button>
                        <button onClick={() => handleCancelLesson(lesson.lessonId)}>Cancel Lesson</button>
                        {lesson.status === 'completed' && !lesson.feedback && (
                            <button onClick={() => handleProvideFeedback(lesson.lessonId)}>
                                Provide Feedback
                            </button>
                        )}
                        {feedbackLessonId === lesson.lessonId && (
                            <div>
                                <textarea value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)}></textarea>
                                <button onClick={handleSubmitFeedback}>Submit Feedback</button>
                            </div>
                        )}
                        {lesson.feedback && <p>Feedback: {lesson.feedback}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MusicLessons;
