import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SimpleTask } from '../models/app_content';


// simple task modal init state
const sTaskModalInitState: {
    show: boolean
    task?: SimpleTask
} = {
    show: false
}

const modalSlice = createSlice({
    name: 'sTaskModal',
    initialState: sTaskModalInitState,
    reducers: {
        checkTask: (_, action: PayloadAction<typeof sTaskModalInitState>) => {
            return action.payload
        },
        closeTask: (state) => {
            state.show = false
        }
    }
})

export const {
    checkTask,
    closeTask
} = modalSlice.actions


export default combineReducers({
    modalState: modalSlice.reducer,
})