import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
export type Reply = {
    id: string;
    text: string;
    timestamp: Date;
    author: string;
};

export type Comment = {
    id: string;
    text: string;
    timestamp: Date;
    author: string;
    replies: Reply[];
};

type CommentSectionState = {
    comments: Comment[];
    loading: boolean;
    error: string | null;
};

const initialState: CommentSectionState = {
    comments: [],
    loading: false,
    error: null
};

const commentSectionSlice = createSlice({
    name: 'commentSection',
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<Comment>) => {
            state.comments.push(action.payload);
        },
        addReply: (state, action: PayloadAction<{ commentId: string, reply: Reply }>) => {
            const comment = state.comments.find(c => c.id === action.payload.commentId);
            if (comment) {
                comment.replies.push(action.payload.reply);
            }
        },
        deleteComment: (state, action: PayloadAction<string>) => {
            state.comments = state.comments.filter(c => c.id !== action.payload);
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
    addComment,
    addReply,
    deleteComment,
    setLoading,
    setError
} = commentSectionSlice.actions;

// Selectors
type RootState = {
    commentSection: CommentSectionState;
};

export const selectAllComments = (state: RootState) => state.commentSection.comments;
export const selectLoadingStatus = (state: RootState) => state.commentSection.loading;
export const selectError = (state: RootState) => state.commentSection.error;
export const selectRepliesByCommentId = (state: RootState, commentId: string) => 
    state.commentSection.comments.find(comment => comment.id === commentId)?.replies || [];

export default commentSectionSlice.reducer;
