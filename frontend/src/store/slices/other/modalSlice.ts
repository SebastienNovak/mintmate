import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types

export type ModalKeys = 'INFO_MODAL' | 'CONFIRM_MODAL'; // Add more keys as necessary

type ModalState<T = unknown> = { 
    isVisible: boolean;
    modalType?: ModalKeys;
    modalProps?: T;
};

// Initial State
const initialState: ModalState = {
    isVisible: false
};

// Slice
const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal: <T>(state: ModalState<T>, action: PayloadAction<{ modalType: ModalKeys, modalProps?: T }>) => { 
            state.isVisible = true;
            state.modalType = action.payload.modalType;
            state.modalProps = action.payload.modalProps;
        },
        hideModal: (state: ModalState) => {
            state.isVisible = false;
            state.modalType = undefined;
            state.modalProps = undefined;
        }
    }
});

export const {
    showModal,
    hideModal
} = modalSlice.actions;

// Selectors
type RootState = {
    modal: ModalState;
};

export const selectIsModalVisible = (state: RootState) => state.modal.isVisible;
export const selectModalType = (state: RootState) => state.modal.modalType;
export const selectModalProps = (state: RootState) => state.modal.modalProps;

export default modalSlice.reducer;
