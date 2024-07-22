import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SimpleTaskForm } from '../models/app_content';


// simple task modal init state
const sTaskModalInitState: {
    show: boolean
    task: SimpleTaskForm
} = {
    show: false,
    task: {
        title: '',
        description: '',
        due_date: '',
        category: '',
        is_completed: false,
        priority: '',
    }
}

const modalSlice = createSlice({
    name: 'sTaskModal',
    initialState: sTaskModalInitState,
    reducers: {
        checkTask: (_, action: PayloadAction<typeof sTaskModalInitState>) => {
            return action.payload
        },
        closeTask: (_) => {
            return sTaskModalInitState
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