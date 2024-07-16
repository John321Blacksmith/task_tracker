import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import{ SimpleTask, TasksResponse } from '../../models/app_content';
import { STasksFilterQuery } from '../../models/queryModels';


export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000'
    }),
    endpoints: (builder) => ({
        getTasks: builder.query<SimpleTask[], {body: STasksFilterQuery, method: string}>({
            query: (param) => ({
                url: `/tasks/simple-tasks/?priority=${param.body.priority}&is_completed=${param.body.is_completed}`,
                method: param.method,
            }),
            transformResponse: (response: TasksResponse) => response.results
        },
    )})
})


export const {
    useGetTasksQuery,
    useLazyGetTasksQuery,
} = tasksApi