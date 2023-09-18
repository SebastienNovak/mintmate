import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchVenueEventsStart,
    fetchVenueEventsSuccess,
    fetchVenueEventsFailure,
    enterEvent,
    exitEvent,
    addChatMessage,
    selectCurrentEvent,
    selectUpcomingEvents,
    selectPastEvents,
    selectVenueLoading,
    selectVenueError
} from '../../store/slices/eventAndExperience/virtualVenueSlice';

const VirtualVenue: React.FC = () => {
    const dispatch = useDispatch();
    const currentEvent = useSelector(selectCurrentEvent);
    const upcomingEvents = useSelector(selectUpcomingEvents);
    const pastEvents = useSelector(selectPastEvents);
    const loading = useSelector(selectVenueLoading);
    const error = useSelector(selectVenueError);

    const [message, setMessage] = useState('');

    const fetchEventsAPI = () => {
        return fetch('https://api.yourdomain.com/events') // Replace with your API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }

    useEffect(() => {
        dispatch(fetchVenueEventsStart());
    
        // Replace this with your actual API call
        fetchEventsAPI()
            .then(data => {
                dispatch(fetchVenueEventsSuccess(data));
            })
            .catch(error => {
                dispatch(fetchVenueEventsFailure(error.message));
            });
    }, [dispatch]);

    const handleEnterEvent = (eventId: string) => {
        dispatch(enterEvent(eventId));
    };

    const handleExitEvent = () => {
        dispatch(exitEvent());
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            dispatch(addChatMessage({ author: "User", message, timestamp: new Date().toISOString() }));
            setMessage('');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="virtual-venue-container">
            <h2>Virtual Venue</h2>

            {currentEvent ? (
                <div className="current-event">
                    <h3>Live Now: {currentEvent.title}</h3>
                    <p>Stream: <a href={currentEvent.liveStreamLink} target="_blank" rel="noopener noreferrer">Watch Live Stream</a></p>

                    <div className="chat-section">
                        <h4>Event Chat</h4>
                        <ul>
                            {currentEvent.chatMessages.map((msg, index) => (
                                <li key={index}>
                                    <span>{msg.timestamp} - {msg.author}: </span>
                                    <span>{msg.message}</span>
                                </li>
                            ))}
                        </ul>
                        <div>
                            <input 
                                type="text"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Type a message..."
                            />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </div>

                    <button onClick={handleExitEvent}>Exit Event</button>
                </div>
            ) : (
                <div>
                    <h3>Upcoming Events</h3>
                    <ul>
                        {upcomingEvents.map(event => (
                            <li key={event.id}>
                                {event.title} - Starts at: {new Date(event.startTime).toLocaleTimeString()}
                                <button onClick={() => handleEnterEvent(event.id)}>Enter</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div>
                <h3>Past Events</h3>
                <ul>
                    {pastEvents.map(event => (
                        <li key={event.id}>{event.title} - Ended at: {new Date(event.endTime).toLocaleTimeString()}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VirtualVenue;
