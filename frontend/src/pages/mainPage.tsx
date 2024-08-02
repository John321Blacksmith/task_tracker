import React, {useState, useEffect} from 'react';
import { ICategory, SimpleTask, SimpleTasksResponse } from '../models/app_content';
import SimpleTasksList from '../components/lists/simpleTasksList';
import { useGetSimpleTasksQuery } from '../store/api/custom_api';


export default function MainPage() {
    // this component represents
    // a start page for the user
    // so he can do some stuff
    // over his tasks or projects
    const {data, error} = useGetSimpleTasksQuery()
    const [sTasksData, setData] = useState<SimpleTasksResponse>()

    useEffect(() => {
        if (data){
            setData(data)
        }
    }, [data])

    return (
        <>
            {!!sTasksData && <SimpleTasksList tasks={sTasksData.results}/>}
        </>
    )
}
