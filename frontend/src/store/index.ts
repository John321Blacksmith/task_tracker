import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { tasksApi } from './api/custom_api';



const rootReducer = combineReducers({
    [tasksApi.reducerPath]: tasksApi.reducer,
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type appDispatch = typeof store.dispatch

export default store;