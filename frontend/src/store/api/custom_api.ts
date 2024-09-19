import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import{ SimpleTask, SimpleTaskDetails,
    SimpleTaskForm, SimpleTasksResponse } from '../../models/app_content';
import { SimpleTaskArgs } from '../../models/queryModels';


export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000'
    }),
    tagTypes: ['SimpleTask'],
    endpoints: (builder) => ({
        getSimpleTasks: builder.query<SimpleTasksResponse, void>({
            query: () => ({
                url: `tasks/simple-tasks/`,
                method: 'GET',
            }),
            providesTags: ['SimpleTask'],
        }),

        getFilteredTasks: builder.query<SimpleTasksResponse, SimpleTaskArgs>({
            query: (params) => ({
                url: `tasks/simple-tasks/?due_date=${params.dueDate}&category=${params.category}&priority=${params.priority}&is_completed=${params.is_completed}`,
                method: 'GET',
            }),
            providesTags: ['SimpleTask'],
        }),

        getSimpleTaskById: builder.query<SimpleTaskDetails, {id?: number | string}>({
            query: (params) => ({
                url: `tasks/simple-tasks/${params.id}/`,
                method: 'GET'
            }),
        }),

        postSimpleTasks: builder.mutation<SimpleTask, SimpleTaskForm>({
            query: (params) => ({
                url: `tasks/simple-tasks/`,
                body: params,
                method: 'POST',
            }),
            invalidatesTags: ['SimpleTask'],
        }),

        patchSimpleTask: builder.mutation<SimpleTask, {id?: number | string, body: SimpleTaskForm}>({
            query: (params) => ({
                url: `tasks/simple-tasks/${params.id}/`,
                body: params.body,
                method: 'PATCH'
            }),
            invalidatesTags: ['SimpleTask'],
        }),

        deleteSimpleTask: builder.mutation<{status: string}, {id?: number | string}>({
            query: (params) => ({
                url: `tasks/simple-tasks/${params.id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['SimpleTask'],
        }),
        
    })
})
 

export const {
    // simple tasks crud
    useGetSimpleTasksQuery,
    useLazyGetFilteredTasksQuery,
    useLazyGetSimpleTaskByIdQuery,
    usePostSimpleTasksMutation,
    usePatchSimpleTaskMutation,
    useDeleteSimpleTaskMutation,

} = tasksApi
