import React from 'react';
import { useGetTasksQuery } from '../store/api_hooks/tasks_app';
import SimpleTasksList from '../components/lists/simpleTasksList';


export default function MainPage() {
    // this component represents
    // a start page for the user
    // so he can do some stuff
    // over his tasks or projects
    const {data} = useGetTasksQuery({ body: { priority: '', is_completed: '' }, method: 'GET' })
    
    return (
        <>
            {!!data && <SimpleTasksList tasks={data}/>}
        </>
    )
}
