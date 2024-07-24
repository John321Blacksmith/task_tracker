import React, {useState, useEffect} from 'react';
import { ICategory, ISimpleTask } from '../models/app_content';
import { useGetTasksQuery } from '../store/api/api_init';
import SimpleTasksList from '../components/lists/simpleTasksList';


export default function MainPage() {
    // this component represents
    // a start page for the user
    // so he can do some stuff
    // over his tasks or projects
    const {data, error} = useGetTasksQuery({ body: { priority: '', is_completed: '' }, method: 'GET' })
    const [sTasksData, setData] = useState<ISimpleTask[]>([])

    const [ready, setReady] = useState<boolean>(false)

    useEffect(() => {
        if (data){
            setData(data)
        }
    }, [data])

    return (
        <>
            {!!sTasksData && <SimpleTasksList categories={[]} tasks={sTasksData}/>}
        </>
    )
}
