
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';

// MOCK API UTILITY
const api = {
    fetchArtistDiary: async (artistId: string) => {
        // For now, simply returning entries if artistId matches a certain value
        if (artistId === '1') {
            return {
                data: [
                    {
                        diaryEntryId: '1',
                        date: '2023-08-01',
                        content: 'Today I began a new painting, inspired by the sea.',
                    },
                    // ... other diary entries for artist with id '1'
                ]
            };
        } else {
            // Return an empty array or different entries for different artist IDs
            return { data: [] };
        }
    },
    addDiaryEntry: async (entry: DiaryEntry) => {
        // In a real scenario, you'd add the entry to a database and return it.
        return { data: entry };
    },
};


// Types
export type DiaryEntry = {
    diaryEntryId: string;
    date: string;
    content: string;
};

// Initial State
const initialState: DiaryEntry[] = [];

// Slice
const artistDiarySlice = createSlice({
    name: 'artistDiary',
    initialState,
    reducers: {
        fetchDiarySuccess: (_, action: PayloadAction<DiaryEntry[]>) => {
            return action.payload;
        },
        addEntry: (state, action: PayloadAction<DiaryEntry>) => {
            state.push(action.payload);
        },
        editEntry: (state, action: PayloadAction<DiaryEntry>) => {
            const index = state.findIndex(entry => entry.diaryEntryId === action.payload.diaryEntryId);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        removeEntry: (state, action: PayloadAction<string>) => {
            const index = state.findIndex(entry => entry.diaryEntryId === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
    },
});

export const {
    fetchDiarySuccess,
    addEntry,
    editEntry,
    removeEntry,
} = artistDiarySlice.actions;

// Thunks
export const fetchArtistDiary = (artistId: string) => async (dispatch: Dispatch) => {
    try {
        const response = await api.fetchArtistDiary(artistId);
        dispatch(fetchDiarySuccess(response.data));
    } catch (error) {
        console.error('Error fetching artist diary:', error);
    }
};

export const createDiaryEntry = (entry: DiaryEntry) => async (dispatch: Dispatch) => {
    try {
        const response = await api.addDiaryEntry(entry);
        dispatch(addEntry(response.data));
    } catch (error) {
        console.error('Error adding diary entry:', error);
    }
};

// Selectors
type RootState = {
    artistDiary: DiaryEntry[];
};

export const selectAllDiaryEntries = (state: RootState) => state.artistDiary;

export default artistDiarySlice.reducer;
