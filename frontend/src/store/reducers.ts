import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SimpleTaskForm, ISimpleTask } from '../models/app_content';


// simple task modal init state
const sTaskModalInitState: {
    show: boolean
    task: ISimpleTask
} = {
    show: false,
    task: {
        pk: '',
        title: '',
        description: '',
        due_date: '',
        category: '',
        created_at: '',
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