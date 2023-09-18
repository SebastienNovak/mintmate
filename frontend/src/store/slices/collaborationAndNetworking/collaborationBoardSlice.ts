import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types:

export type CollaborationPost = {
    id: string;
    title: string;
    description: string;
    authorId: string;
    authorName: string;
    timestamp: Date; // When the post was created
    collaborationType: 'offer' | 'request'; // Whether the user is offering or requesting collaboration
    status: 'open' | 'closed';
    responses: number; // Number of responses or interested collaborators
};

type CollaborationBoardState = {
    posts: CollaborationPost[];
    loading: boolean;
    error: string | null;
};

const initialState: CollaborationBoardState = {
    posts: [],
    loading: false,
    error: null,
};

const collaborationBoardSlice = createSlice({
    name: 'collaborationBoard',
    initialState,
    reducers: {
        fetchPostsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchPostsSuccess: (state, action: PayloadAction<CollaborationPost[]>) => {
            state.posts = action.payload;
            state.loading = false;
        },
        fetchPostsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        addNewPost: (state, action: PayloadAction<CollaborationPost>) => {
            state.posts.push(action.payload);
        },
        updatePostStatus: (state, action: PayloadAction<{ id: string, status: 'open' | 'closed' }>) => {
            const post = state.posts.find(p => p.id === action.payload.id);
            if (post) post.status = action.payload.status;
        }
    }
});

export const {
    fetchPostsStart,
    fetchPostsSuccess,
    fetchPostsFailure,
    addNewPost,
    updatePostStatus
} = collaborationBoardSlice.actions;

// Selectors
type RootState = {
    collaborationBoard: CollaborationBoardState;
};

export const selectAllPosts = (state: RootState) => state.collaborationBoard.posts;
export const selectPostById = (state: RootState, postId: string) => state.collaborationBoard.posts.find(post => post.id === postId);
export const selectLoading = (state: RootState) => state.collaborationBoard.loading;
export const selectError = (state: RootState) => state.collaborationBoard.error;

export default collaborationBoardSlice.reducer;
