import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types:
type Tutor = {
    id: string;
    name: string;
    instruments: string[];  // List of instruments the tutor can teach
    bio: string;            // Short bio or description about the tutor
    availability: string[]; // Array of available time slots, e.g., ['10:00am', '11:00am']
    // ... any other tutor properties
};

type Lesson = {
    lessonId: string;
    studentId: string;  // ID of the student booking the lesson
    tutorId: string;    // ID of the selected tutor
    timeSlot: string;   // Selected time slot
    feedback?: string;  // Feedback from the student after the lesson
    status: 'booked' | 'completed' | 'cancelled';
};

type MusicLessonState = {
    tutors: Tutor[];
    lessons: Lesson[];
    loading: boolean;
    error: string | null;
};

const initialState: MusicLessonState = {
    tutors: [],
    lessons: [],
    loading: false,
    error: null,
};

const musicLessonSlice = createSlice({
    name: 'musicLesson',
    initialState,
    reducers: {
        fetchTutorsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchTutorsSuccess: (state, action: PayloadAction<Tutor[]>) => {
            state.tutors = action.payload;
            state.loading = false;
        },
        fetchTutorsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        bookLesson: (state, action: PayloadAction<{ studentId: string, tutorId: string, timeSlot: string }>) => {
            const newLesson: Lesson = {
                lessonId: new Date().toISOString(), // Generate a unique ID
                studentId: action.payload.studentId,
                tutorId: action.payload.tutorId,
                timeSlot: action.payload.timeSlot,
                status: 'booked',
            };
            state.lessons.push(newLesson);
        },
        completeLesson: (state, action: PayloadAction<string>) => {
            const lesson = state.lessons.find(l => l.lessonId === action.payload);
            if (lesson) {
                lesson.status = 'completed';
            }
        },
        cancelLesson: (state, action: PayloadAction<string>) => {
            const lesson = state.lessons.find(l => l.lessonId === action.payload);
            if (lesson) {
                lesson.status = 'cancelled';
            }
        },
        provideFeedback: (state, action: PayloadAction<{ lessonId: string, feedback: string }>) => {
            const lesson = state.lessons.find(l => l.lessonId === action.payload.lessonId);
            if (lesson && lesson.status === 'completed') {
                lesson.feedback = action.payload.feedback;
            }
        },
        // ... other actions as needed
    }
});

export const {
    fetchTutorsStart,
    fetchTutorsSuccess,
    fetchTutorsFailure,
    bookLesson,
    completeLesson,
    cancelLesson,
    provideFeedback
} = musicLessonSlice.actions;

// Selectors
type RootState = {
    musicLesson: MusicLessonState;
};

export const selectTutors = (state: RootState) => state.musicLesson.tutors;
export const selectLessons = (state: RootState) => state.musicLesson.lessons;
export const selectLoading = (state: RootState) => state.musicLesson.loading;
export const selectError = (state: RootState) => state.musicLesson.error;

export default musicLessonSlice.reducer;
