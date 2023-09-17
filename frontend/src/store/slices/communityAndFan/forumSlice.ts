import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types:

type Topic = {
    id: string;
    title: string;
    description: string;
    postCount: number;
};

type Post = {
    id: string;
    topicId: string;
    userId: string;
    content: string;
    timestamp: string; // ISO date string
    commentCount: number;
};

type Comment = {
    id: string;
    postId: string;
    userId: string;
    content: string;
    timestamp: string; // ISO date string
};

type ForumState = {
    topics: Topic[];
    posts: Post[];
    comments: Comment[];
    loading: boolean;
    error: string | null;
};

const initialState: ForumState = {
    topics: [],
    posts: [],
    comments: [],
    loading: false,
    error: null,
};

const forumSlice = createSlice({
    name: 'forum',
    initialState,
    reducers: {
        fetchTopicsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchTopicsSuccess: (state, action: PayloadAction<Topic[]>) => {
            state.topics = action.payload;
            state.loading = false;
        },
        fetchTopicsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload);
        },
        addComment: (state, action: PayloadAction<Comment>) => {
            state.comments.push(action.payload);
        }
    }
});

export const {
    fetchTopicsStart,
    fetchTopicsSuccess,
    fetchTopicsFailure,
    addPost,
    addComment
} = forumSlice.actions;

// Selectors
type RootState = {
    forum: ForumState;
};

export const selectTopics = (state: RootState) => state.forum.topics;
export const selectPostsByTopicId = (state: RootState, topicId: string) => state.forum.posts.filter(post => post.topicId === topicId);
export const selectCommentsByPostId = (state: RootState, postId: string) => state.forum.comments.filter(comment => comment.postId === postId);
export const selectLoading = (state: RootState) => state.forum.loading;
export const selectError = (state: RootState) => state.forum.error;

export default forumSlice.reducer;
