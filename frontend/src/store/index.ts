import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { tasksApi } from './api/api_init';
import modalState from './reducers';


const rootReducer = combineReducers({
    [tasksApi.reducerPath]: tasksApi.reducer,
    taskModal: modalState
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type appDispatch = typeof store.dispatch

export default store;