import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    modalType: '',
    isModalOpen: false,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers : {
        openModal: (state, action : PayloadAction<string>) => {
            state.isModalOpen = false;
            state.modalType = action.payload;
            state.isModalOpen = true;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        }
    }
})

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;