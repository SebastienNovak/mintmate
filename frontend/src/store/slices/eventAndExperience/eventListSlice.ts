import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Event type:
type Event = {
    id: string;
    title: string;
    description?: string;
    date: string; // Date in format YYYY-MM-DD
    time?: string; // Optional time for the event, format HH:mm
    location?: string; // Location of the event
    attendees?: string[]; // List of attendees' names or user IDs
};

type EventListState = {
    events: Event[];
    loading: boolean;
    error: string | null;
};

const initialState: EventListState = {
    events: [],
    loading: false,
    error: null,
};

const eventListSlice = createSlice({
    name: 'eventList',
    initialState,
    reducers: {
        fetchEventsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchEventsSuccess: (state, action: PayloadAction<Event[]>) => {
            state.events = action.payload;
            state.loading = false;
        },
        fetchEventsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        addEvent: (state, action: PayloadAction<Event>) => {
            state.events.push(action.payload);
        },
        removeEvent: (state, action: PayloadAction<string>) => {
            state.events = state.events.filter(event => event.id !== action.payload);
        },
        // ... You can add more actions to update or modify the event list as needed
    }
});

export const {
    fetchEventsStart,
    fetchEventsSuccess,
    fetchEventsFailure,
    addEvent,
    removeEvent
} = eventListSlice.actions;

// Selectors
type RootState = {
    eventList: EventListState;
};

export const selectAllEvents = (state: RootState) => state.eventList.events;
export const selectEventsLoading = (state: RootState) => state.eventList.loading;
export const selectEventsError = (state: RootState) => state.eventList.error;

export default eventListSlice.reducer;
