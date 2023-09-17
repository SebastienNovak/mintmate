import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';

// MOCK API UTILITY
const api = {
    fetchArtistPortfolio: async (artistId: string) => {
        return {
            data: {
                artistId,
                name: 'John Doe',
                artworks: [
                    { artworkId: '1', title: 'Sunset', description: 'Oil on Canvas', price: 200 },
                    // ... other artworks
                ],
                bio: 'An artist from New York.',
            },
        };
    },
};

// Types
export type Artwork = {
    artworkId: string;
    title: string;
    description: string;
    price: number;
};

type ArtistPortfolio = {
    artistId: string;
    name: string;
    artworks: Artwork[];
    bio: string;
};

// Initial State
const initialState: ArtistPortfolio = {
    artistId: '',
    name: '',
    artworks: [],
    bio: '',
};

// Slice
const artistPortfolioSlice = createSlice({
    name: 'artistPortfolio',
    initialState,
    reducers: {
        fetchPortfolioSuccess: (state, action: PayloadAction<ArtistPortfolio>) => {
            // Use Immer to modify the state directly
            Object.assign(state, action.payload);
        },
        addArtwork: (state, action: PayloadAction<Artwork>) => {
            state.artworks.push(action.payload);
        },
        removeArtwork: (state, action: PayloadAction<string>) => {
            const index = state.artworks.findIndex(art => art.artworkId === action.payload);
            if (index !== -1) {
                state.artworks.splice(index, 1);
            }
        },
        updateBio: (state, action: PayloadAction<string>) => {
            state.bio = action.payload;
        },
    },
});

export const {
    fetchPortfolioSuccess,
    addArtwork,
    removeArtwork,
    updateBio,
} = artistPortfolioSlice.actions;

// Thunks
export const fetchArtistPortfolio = (artistId: string) => async (dispatch: Dispatch) => {
    try {
        const response = await api.fetchArtistPortfolio(artistId);
        dispatch(fetchPortfolioSuccess(response.data));
    } catch (error) {
        console.error('Error fetching artist portfolio:', error);
    }
};

// Selectors
type RootState = {
    artistPortfolio: ArtistPortfolio;
};

export const selectArtistPortfolio = (state: RootState) => state.artistPortfolio;
export const selectArtworks = (state: RootState) => state.artistPortfolio.artworks;

export default artistPortfolioSlice.reducer;
