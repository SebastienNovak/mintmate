import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
type TooltipState = {
  isVisible: boolean;
  content?: string;
  position?: { x: number; y: number };
};

// Initial State
const initialState: TooltipState = {
  isVisible: false
};

// Slice
const tooltipsSlice = createSlice({
  name: 'tooltips',
  initialState,
  reducers: {
    showTooltip: (state, action: PayloadAction<{ content: string; position: { x: number; y: number } }>) => {
      state.isVisible = true;
      state.content = action.payload.content;
      state.position = action.payload.position;
    },
    hideTooltip: (state) => {
      state.isVisible = false;
      state.content = undefined;
      state.position = undefined;
    }
  }
});

export const { showTooltip, hideTooltip } = tooltipsSlice.actions;

// Selectors
type RootState = {
  tooltips: TooltipState;
};

export const selectIsTooltipVisible = (state: RootState) => state.tooltips.isVisible;
export const selectTooltipContent = (state: RootState) => state.tooltips.content;
export const selectTooltipPosition = (state: RootState) => state.tooltips.position;

export default tooltipsSlice.reducer;
