import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SimpleTasksListRead } from '../store/api/hooks';


// simple task modal init state
const sTaskModalInitState: {
    show: boolean
    task: SimpleTasksListRead
} = {
    show: false,
    task: {
        id: 0,
        title: '',
        description: '',
        due_date: '',
        category: {pk: 0, title: ''},
        created_at: '',
        is_completed: false,
        priority: 'minor',
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