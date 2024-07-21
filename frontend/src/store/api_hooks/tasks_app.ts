import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import{ SimpleTask, TasksResponse, SimpleTaskForm } from '../../models/app_content';
import { STasksFilterQuery } from '../../models/queryModels';


export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000'
    }),
    tagTypes: ["SimpleTask"],
    endpoints: (builder) => ({
        getTasks: builder.query<SimpleTask[], {body: STasksFilterQuery, method: string}>({
            query: (param) => ({
                url: `/tasks/simple-tasks/?priority=${param.body.priority}&is_completed=${param.body.is_completed}`,
                method: param.method,
            }),
            providesTags: ["SimpleTask"],
            transformResponse: (response: TasksResponse) => response.results
        }),
        modifyTask: builder.mutation<SimpleTask, {body: SimpleTaskForm, method: string, pk: string}>({
            query: (param) => ({
                url: `/tasks/simple-tasks/${param.pk}`,
                method: param.method,
                body: param.body
            }),
        }),
        createTask: builder.mutation<SimpleTask, {body: SimpleTaskForm, method: string}>({
            query: (param) => ({
                url: `tasks/simple-tasks/`,
                method: param.method,
                body: param.body
            }),
            invalidatesTags: ["SimpleTask"],
        }),
    })
})


export const {
    useGetTasksQuery,
    useLazyGetTasksQuery,
    useModifyTaskMutation,
    useCreateTaskMutation,
} = tasksApi