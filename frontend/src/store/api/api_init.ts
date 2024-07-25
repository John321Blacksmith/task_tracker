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
