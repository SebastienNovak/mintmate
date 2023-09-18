import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types

export type Event = {
    id: string;
    title: string;
    description?: string;
    date: string; // Date in format YYYY-MM-DD
    time?: string; // Optional time for the event, format HH:mm
    location?: string; // Location of the event
    attendees?: string[]; // List of attendees' names or user IDs
    // ... any other event-related details you need
};

type EventCalendarState = {
    events: Event[];
    selectedDate: string | null; // Currently selected date on the calendar, null if none selected
    loading: boolean;
    error: string | null;
};

const initialState: EventCalendarState = {
    events: [],
    selectedDate: null,
    loading: false,
    error: null,
};

const eventCalendarSlice = createSlice({
    name: 'eventCalendar',
    initialState,
    reducers: {
        fetchEventsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchEventsSuccess: (state, action: PayloadAction<Event[]>) => {
            state.events = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchEventsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        addEvent: (state, action: PayloadAction<Event>) => {
            state.events.push(action.payload);
        },
        removeEvent: (state, action: PayloadAction<string>) => { // Payload is event id
            state.events = state.events.filter(event => event.id !== action.payload);
        },
        selectDate: (state, action: PayloadAction<string>) => {
            state.selectedDate = action.payload;
        }
    }
});

export const {
    fetchEventsStart,
    fetchEventsSuccess,
    fetchEventsFailure,
    addEvent,
    removeEvent,
    selectDate
} = eventCalendarSlice.actions;

// Selectors
type RootState = {
    eventCalendar: EventCalendarState;
};

export const selectEvents = (state: RootState) => state.eventCalendar.events;
export const selectSelectedDate = (state: RootState) => state.eventCalendar.selectedDate;
export const selectLoading = (state: RootState) => state.eventCalendar.loading;
export const selectError = (state: RootState) => state.eventCalendar.error;

export default eventCalendarSlice.reducer;
