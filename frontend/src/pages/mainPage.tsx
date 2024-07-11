import React from 'react';
import { useGetTasksQuery } from '../store/api_hooks/tasks_app';
import SimpleTasksList from '../components/lists/simpleTasksList';


export default function MainPage() {
    // this component represents
    // a start page for the user
    // so he can do some stuff
    // over his tasks or projects
    
    const {data, error, isLoading, isFetching} = useGetTasksQuery()

    return (
        <>
             {!!data && <SimpleTasksList tasks={data}/>}
        </>
    )
}
