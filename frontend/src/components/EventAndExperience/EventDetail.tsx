import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchEventDetailStart,
    fetchEventDetailSuccess,
    clearEventDetail,
    selectEventDetail,
    selectDetailLoading,
    selectDetailError,
    Event as EventType
} from '../../store/slices/eventAndExperience/eventDetailSlice';

type EventDetailProps = {
    eventId: string;
};

const EventDetail: React.FC<EventDetailProps> = ({ eventId }) => {
    const dispatch = useDispatch();
    const event = useSelector(selectEventDetail);
    const loading = useSelector(selectDetailLoading);
    const error = useSelector(selectDetailError);

    useEffect(() => {
        dispatch(fetchEventDetailStart());

        // Mocking an API call here
        setTimeout(() => {
            // Replace this with your actual API fetching logic
            // For now, let's use the mock data for demonstration
            const fetchedEvent: EventType = {
                id: eventId,
                title: "Sample Event",
                date: "2023-08-15",
                description: "This is a sample event description.",
                location: "Sample Location",
                // ... add other fields as necessary
            };
            dispatch(fetchEventDetailSuccess(fetchedEvent));

            // NOTE: Once you integrate an actual API call, you can handle errors 
            // by dispatching fetchEventDetailFailure with the error message.
        }, 1000);

        return () => {
            // Clearing event detail when component is unmounted
            dispatch(clearEventDetail());
        };
    }, [dispatch, eventId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="event-detail-container">
            <h2>{event?.title}</h2>
            <p>Date: {event?.date}</p>
            {event?.time && <p>Time: {event?.time}</p>}
            {event?.description && <p>Description: {event?.description}</p>}
            {event?.location && <p>Location: {event?.location}</p>}
            {event?.attendees && (
                <div>
                    <h3>Attendees:</h3>
                    <ul>
                        {event.attendees.map(attendee => <li key={attendee}>{attendee}</li>)}
                    </ul>
                </div>
            )}
            {/* Add more fields as needed */}
        </div>
    );
};

export default EventDetail;
