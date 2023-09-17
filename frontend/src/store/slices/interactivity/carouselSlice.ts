import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CarouselItem = {
    id: string;
    contentUrl: string;
    description?: string;
};

type CarouselState = {
    items: CarouselItem[];
    currentIndex: number;
    autoplay: boolean;
};

const initialState: CarouselState = {
    items: [],
    currentIndex: 0,
    autoplay: false
};

const carouselSlice = createSlice({
    name: 'carousel',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<CarouselItem[]>) => {
            state.items = action.payload;
            state.currentIndex = 0;  // reset index when items change
        },
        nextItem: (state) => {
            if (state.currentIndex < state.items.length - 1) {
                state.currentIndex += 1;
            } else {
                state.currentIndex = 0;  // wrap around to the beginning
            }
        },
        previousItem: (state) => {
            if (state.currentIndex > 0) {
                state.currentIndex -= 1;
            } else {
                state.currentIndex = state.items.length - 1;  // wrap around to the end
            }
        },
        setCurrentIndex: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0 && action.payload < state.items.length) {
                state.currentIndex = action.payload;
            }
        },
        toggleAutoplay: (state) => {
            state.autoplay = !state.autoplay;
        }
    }
});

export const {
    setItems,
    nextItem,
    previousItem,
    setCurrentIndex,
    toggleAutoplay
} = carouselSlice.actions;

// Selectors
type RootState = {
    carousel: CarouselState;
};

export const selectCarouselItems = (state: RootState) => state.carousel.items;
export const selectCurrentItem = (state: RootState) => state.carousel.items[state.carousel.currentIndex];
export const selectAutoplayStatus = (state: RootState) => state.carousel.autoplay;

export default carouselSlice.reducer;
