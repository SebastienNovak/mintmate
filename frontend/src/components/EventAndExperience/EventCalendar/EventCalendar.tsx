import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchEventsStart,
    fetchEventsSuccess,
    fetchEventsFailure,
    addEvent,
    removeEvent,
    selectDate,
    selectEvents,
    selectSelectedDate,
    selectLoading,
    selectError,
    Event as EventType
} from '../../../store/slices/eventAndExperience/eventCalendarSlice';

const EventCalendar: React.FC = () => {
    const dispatch = useDispatch();
    const events = useSelector(selectEvents);
    const selectedDate = useSelector(selectSelectedDate);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        dispatch(fetchEventsStart());
    
        // Mocking an API call here
        setTimeout(() => {
            // Replace this with your API fetching logic
            if (Math.random() < 0.2) { // 20% chance to throw an error
                dispatch(fetchEventsFailure("Failed to fetch events!"));
            } else {
                const fetchedEvents: EventType[] = [
                    // Example events can be added here
                ];
                dispatch(fetchEventsSuccess(fetchedEvents));
            }
        }, 1000);
    }, [dispatch]);

    const handleAddEvent = () => {
        if (title && date) {
            dispatch(addEvent({
                id: Date.now().toString(),
                title,
                description,
                date,
                time,
                location,
                // Add any other properties if needed
            }));
            setTitle('');
            setDescription('');
            setDate('');
            setTime('');
            setLocation('');
        }
    };

    return (
        <div className="event-calendar-container">
            <h2>Event Calendar</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    <div className="events-list">
                        <h3>Events:</h3>
                        <ul>
                            {events
                                .filter(event => !selectedDate || event.date === selectedDate)
                                .map(event => (
                                    <li key={event.id}>
                                        <h4>{event.title}</h4>
                                        <p>Date: {event.date}</p>
                                        {event.time && <p>Time: {event.time}</p>}
                                        {event.description && <p>Description: {event.description}</p>}
                                        {event.location && <p>Location: {event.location}</p>}
                                        <button onClick={() => dispatch(removeEvent(event.id))}>Remove</button>
                                    </li>
                                ))}
                        </ul>
                    </div>

                    <div className="add-event-form">
                        <h3>Add Event:</h3>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Event Title"
                        />
                        <input
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Description"
                        />
                        <input
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                        <input
                            type="time"
                            value={time}
                            onChange={e => setTime(e.target.value)}
                        />
                        <input
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            placeholder="Location"
                        />
                        <button onClick={handleAddEvent}>Add Event</button>
                    </div>

                    <div className="filter-by-date">
                        <h3>Filter by Date:</h3>
                        <input
                            type="date"
                            value={selectedDate || ''}
                            onChange={e => dispatch(selectDate(e.target.value))}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default EventCalendar;
