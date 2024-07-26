import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { ICategory, ISimpleTask } from '../../models/app_content';
import Button from 'react-bootstrap/Button';
import { STasksFilterQuery } from '../../models/queryModels';
import { SimpleTasksList, useLazyGetSimpleTasksQuery, GetSimpleTasksApiArg } from '../../store/api/hooks';
import { checkTask } from '../../store/reducers';
import SimpleTaskModal from '../modals/simpleTask';
import SimpleTaskFormComponent from '../forms/simpleTaskForm';
import { SimpleTasksListRead } from '../../store/api/hooks';


const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}


export default function SimpleTasksComponent(props: {categories: {pk: number, title: string}[], tasks: SimpleTasksListRead[]}) {
    // Block of tasks list and filter parameters
    const [sTasks, setSTasks] = useState<SimpleTasksListRead[]>([])
    const [showForm, setShowForm] = useState<boolean>(false)
                                                  
    const [filterParam, setFilterParam] = useState<GetSimpleTasksApiArg>({priority: undefined, isCompleted: ''})
    
    const [getFilteredTasks, {data, isLoading, isFetching, error}] = useLazyGetSimpleTasksQuery()
    
    useEffect(()=> {
        if (data) {
            setSTasks(data.results.tasks)
        }
    }, [data])


    return (
        <>  
            <SimpleTaskFormComponent categories={props.categories} show={showForm} setter={setShowForm}/>
            <SimpleTaskModal categories={props.categories}/>
            <div className='position-relative d-flex flex-column simple-tasks-container'>
                <SimpleTasksFilter param={filterParam} paramSetter={setFilterParam} queryHook={getFilteredTasks}/>
                {!!sTasks && <SimpleTasksListComponent tasks={sTasks}/>}
                <Button
                    className='d-flex justify-content-center align-self-center position-sticky'
                    variant='outline-dark'
                    onClick={()=>setShowForm(true)}>+ Add</Button>
            </div>
        </>
    )
}



const SimpleTasksFilter = (props: {param: GetSimpleTasksApiArg, paramSetter: React.Dispatch<React.SetStateAction<GetSimpleTasksApiArg>>, queryHook: Function}) => {

    useEffect(() => {
        if (props.param) {
        props.queryHook(props.param)
        }
    }, [props.param, props.paramSetter])

    return (
        <>
            <div className='d-flex justify-content-end filter-dropdowns'>
                <span className='d-flex align-items-center' style={{'color': 'GrayText'}}>Priority: </span>
                <div className='dropdown'>
                    <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownFilter" data-bs-toggle="dropdown" aria-expanded="false">
                        {props.param.priority === undefined ? 'all' : props.param.priority}
                    </a>
                    <ul className="dropdown-menu text-small shadow " aria-labelledby="dropdownFilter">
                        {
                            [undefined, 'high', 'moderate', 'minor']
                            .map((choice)=> {return <><li className="dropdown-item" onClick={() => props.paramSetter({...props.param, priority: choice})}>{choice === undefined ? 'all' : choice}</li></>})
                        }
                    </ul>
                </div>
                <span className='d-flex align-items-center' style={{'color': 'GrayText'}}>Status: </span>
                <div className='dropdown'>
                    <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownFilter" data-bs-toggle="dropdown" aria-expanded="false">
                        {
                            (props.param.isCompleted === 'true' ? 'complete' : '') ||
                            (props.param.isCompleted === 'false' ? 'incomplete' : '') ||
                            (props.param.isCompleted === '' ? 'all' : '')
                        }
                    </a>
                    <ul className="dropdown-menu text-small shadow " aria-labelledby="dropdownFilter">
                        <li className="dropdown-item" onClick={() => props.paramSetter({...props.param, isCompleted: ''})}>all</li>
                        <li className="dropdown-item" onClick={() => props.paramSetter({...props.param, isCompleted: 'true'})}>complete</li>
                        <li className="dropdown-item" onClick={() => props.paramSetter({...props.param, isCompleted: 'false'})}>incomplete</li>
                    </ul>
                </div>
            </div>
        </>
    )
}


const SimpleTasksListComponent = (props: {tasks: SimpleTasksListRead[]}) => {
    const dispatch = useDispatch()
    return (
        <>
            <ul className='list-group simple-tasks-list'>
                {
                    !!props.tasks && props.tasks.map((task) => {
                        return (
                            <>
                                <li
                                    key={task.id}
                                    className='d-flex justify-content-between border rounded my-2 w-70 list-group-item simple-task-item'
                                    onClick={() => dispatch(checkTask({show: true, task: {...task, category: {pk: task.category.pk, title: task.category.title}}}))}
                                    >
                                    <p>{task.title}</p>
                                    <p>{task.due_date}</p>
                                </li>
                            </>
                        )
                    })
                }
            </ul>
        </>
    )
}