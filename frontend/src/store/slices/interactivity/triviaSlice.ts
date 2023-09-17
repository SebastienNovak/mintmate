import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
type Question = {
    id: string;
    text: string;
    options: string[];
    correctAnswerIndex: number;
};

type TriviaState = {
    questions: Question[];
    currentQuestionIndex: number | null;
    userAnswers: (number | null)[];
    score: number;
    loading: boolean;
    error: string | null;
};

const initialState: TriviaState = {
    questions: [],
    currentQuestionIndex: null,
    userAnswers: [],
    score: 0,
    loading: false,
    error: null
};

const triviaSlice = createSlice({
    name: 'trivia',
    initialState,
    reducers: {
        setQuestions: (state, action: PayloadAction<Question[]>) => {
            state.questions = action.payload;
            state.currentQuestionIndex = 0;
            state.userAnswers = new Array(action.payload.length).fill(null);
        },
        answerQuestion: (state, action: PayloadAction<number>) => {
            if (state.currentQuestionIndex !== null) {
                state.userAnswers[state.currentQuestionIndex] = action.payload;
                const question = state.questions[state.currentQuestionIndex];
                if (question.correctAnswerIndex === action.payload) {
                    state.score += 1;
                }
                state.currentQuestionIndex += 1;
            }
        },
        resetTrivia: (state) => {
            state.currentQuestionIndex = null;
            state.userAnswers = [];
            state.score = 0;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    }
});

export const {
    setQuestions,
    answerQuestion,
    resetTrivia,
    setLoading,
    setError
} = triviaSlice.actions;

// Selectors
type RootState = {
    trivia: TriviaState;
};

export const selectQuestions = (state: RootState) => state.trivia.questions;
export const selectCurrentQuestion = (state: RootState) => state.trivia.currentQuestionIndex !== null 
    ? state.trivia.questions[state.trivia.currentQuestionIndex]
    : null;
export const selectScore = (state: RootState) => state.trivia.score;
export const selectLoadingStatus = (state: RootState) => state.trivia.loading;
export const selectError = (state: RootState) => state.trivia.error;

export default triviaSlice.reducer;
