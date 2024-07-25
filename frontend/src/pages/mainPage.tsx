import React, {useState, useEffect} from 'react';
import { ICategory, ISimpleTask } from '../models/app_content';
import { SimpleTasksListRead, useGetSimpleTasksQuery, GetSimpleTasksApiResponse } from '../store/api/hooks';
import SimpleTasksList from '../components/lists/simpleTasksList';


export default function MainPage() {
    // this component represents
    // a start page for the user
    // so he can do some stuff
    // over his tasks or projects
    const {data, error} = useGetSimpleTasksQuery({})
    const [sTasksData, setData] = useState<GetSimpleTasksApiResponse>()


    useEffect(() => {
        if (data){
            setData(data)
        }
    }, [data])



    return (
        <>
            {!!sTasksData && <SimpleTasksList categories={sTasksData.results.categories} tasks={sTasksData.results.tasks}/>}
        </>
    )
}
