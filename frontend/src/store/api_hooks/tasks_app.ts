import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import{ SimpleTask, TasksResponse } from '../../models/app_content';


export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000'
    }),
    endpoints: (builder) => ({
        getTasks: builder.query<SimpleTask[], void>({
            query: () => ({
                url: `/tasks/simple-tasks/`,
                method: 'GET'
            }),
            transformResponse: (response: TasksResponse) => response.results
        },
    )})
})


export const {
    useGetTasksQuery
} = tasksApi