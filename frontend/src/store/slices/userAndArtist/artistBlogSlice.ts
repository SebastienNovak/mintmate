import { createSlice, PayloadAction, Dispatch, ThunkAction, Action, ThunkDispatch } from '@reduxjs/toolkit';

// MOCK API UTILITY
const api = {
    fetchArtistBlogPosts: async (artistId: string): Promise<{ data: BlogPost[] }> => {
        // For demonstration purposes, we'll pretend the data is filtered by artistId
        const allPosts = [
            {
                postId: '1',
                artistId: '1',
                title: 'My Journey in Art',
                content: 'This is the content of the blog post.',
                date: '2023-08-14'
            },
            {
                postId: '2',
                artistId: '2',
                title: 'Another Artist Journey',
                content: 'This is another content of the blog post.',
                date: '2023-08-15'
            }
            // ... other blog posts
        ];
        
        const filteredPosts = allPosts.filter(post => post.artistId === artistId);
        
        return {
            data: filteredPosts
        };
    },
    createBlogPost: async (title: string, content: string): Promise<BlogPost> => {
        return {
            postId: (Math.random() * 1000).toFixed(0), // Just a mockup to generate a random id
            title: title,
            content: content,
            date: new Date().toISOString().split('T')[0]
        };
    },
    //... rest of the code remains unchanged
};


// Types
type BlogPost = {
    postId: string;
    title: string;
    content: string;
    date: string;
};

// Initial State
const initialState: BlogPost[] = [];

// Slice
const artistBlogSlice = createSlice({
    name: 'artistBlog',
    initialState,
    reducers: {
        fetchBlogPostsSuccess: (_, action: PayloadAction<BlogPost[]>) => {
            return action.payload;
        },
        addBlogPost: (state, action: PayloadAction<BlogPost>) => {
            state.push(action.payload);
        }
    }
});

export const {
    fetchBlogPostsSuccess,
    addBlogPost
} = artistBlogSlice.actions;

// Thunks
export const fetchArtistBlogPosts = (artistId: string) => async (dispatch: Dispatch) => {
    try {
        const response = await api.fetchArtistBlogPosts(artistId);
        dispatch(fetchBlogPostsSuccess(response.data));
    } catch (error) {
        console.error('Error fetching artist blog posts:', error);
    }
};

export const createNewBlogPost = (title: string, content: string): ThunkAction<void, RootState, unknown, Action<string>> => 
    async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        try {
            const newPost = await api.createBlogPost(title, content);
            dispatch(addBlogPost(newPost));
        } catch (error) {
            console.error('Error creating new blog post:', error);
        }
    };

// Selectors
type RootState = {
    artistBlog: BlogPost[];
};

export const selectAllBlogPosts = (state: RootState) => state.artistBlog;

export default artistBlogSlice.reducer;
