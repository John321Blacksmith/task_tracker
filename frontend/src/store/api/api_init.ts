import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import{ ISimpleTask, ICategory, SimpleTaskForm, SimpleTasksResponse } from '../../models/app_content';
import { STasksFilterQuery } from '../../models/queryModels';


export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000'
    }),
    endpoints: () => ({}),
    
})




// tagTypes: ["ISimpleTask"],
//     endpoints: (builder) => ({
//         getTasks: builder.query<ISimpleTask[], {body: STasksFilterQuery, method: string}>({
//             query: (param) => ({
//                 url: `/tasks/simple-tasks/?priority=${param.body.priority}&is_completed=${param.body.is_completed}`,
//                 method: param.method,
//             }),
//             transformResponse: (response: ISimpleTask[]) => response,
//             providesTags: ["ISimpleTask"]
//         }),
//         modifyTask: builder.mutation<ISimpleTask, {body: SimpleTaskForm, method: string, pk: string}>({
//             query: (param) => ({
//                 url: `/tasks/simple-tasks/${param.pk}`,
//                 method: param.method,
//                 body: param.body
//             }),
//         }),
//         createTask: builder.mutation<ISimpleTask, {body: SimpleTaskForm, method: string}>({
//             query: (param) => ({
//                 url: `tasks/simple-tasks/`,
//                 method: param.method,
//                 body: param.body
//             }),
//             invalidatesTags: ["ISimpleTask"],
//         }),
//     })