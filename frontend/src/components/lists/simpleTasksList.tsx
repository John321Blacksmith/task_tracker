import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { ICategory, ISimpleTask } from '../../models/app_content';
import Button from 'react-bootstrap/Button';
import { STasksFilterQuery } from '../../models/queryModels';
import { useLazyGetTasksQuery } from '../../store/api_hooks/tasks_app';
import { checkTask } from '../../store/reducers';
import SimpleTaskModal from '../modals/simpleTask';
import SimpleTaskFormComponent from '../forms/simpleTaskForm';


const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}


export default function SimpleTasksComponent(props: {categories: ICategory[], tasks: ISimpleTask[]}) {
    // Block of tasks list and filter parameters
    const [sTasks, setSTasks] = useState<ISimpleTask[]>(props.tasks)
    const [showForm, setShowForm] = useState<boolean>(false)
                                                  
    const [filterParam, setFilterParam] = useState<STasksFilterQuery>({priority: '', is_completed: ''})
    
    const [getFilteredTasks, {data, isLoading, isFetching, error}] = useLazyGetTasksQuery()

    useEffect(() => {
        if (data) {
            setSTasks(data)
        }
    }, [sTasks, data, setSTasks])

    return (
        <>  
            <SimpleTaskFormComponent show={showForm} categories={props.categories} setter={setShowForm}/>
            <SimpleTaskModal categories={props.categories}/>
            <div className='position-relative d-flex flex-column simple-tasks-container'>
                <SimpleTasksFilter param={filterParam} paramSetter={setFilterParam} queryHook={getFilteredTasks}/>
                {!!sTasks && <SimpleTasksList tasks={sTasks}/>}
                <Button
                    className='d-flex justify-content-center align-self-center position-sticky'
                    variant='outline-dark'
                    onClick={()=>setShowForm(true)}>+ Add</Button>
                
            </div>
        </>
    )
}



const SimpleTasksFilter = (props: {param: STasksFilterQuery, paramSetter: React.Dispatch<React.SetStateAction<STasksFilterQuery>>, queryHook: Function}) => {

    useEffect(() => {
        if (props.param.is_completed !== '' || props.param.priority !== '') {
        props.queryHook({body: props.param, method: 'GET'})
        }
    }, [props.param, props.paramSetter])

    return (
        <>
            <div className='d-flex justify-content-end filter-dropdowns'>
                <span className='d-flex align-items-center' style={{'color': 'GrayText'}}>Priority: </span>
                <div className='dropdown'>
                    <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownFilter" data-bs-toggle="dropdown" aria-expanded="false">
                        {props.param.priority === '' ? 'all' : props.param.priority}
                    </a>
                    <ul className="dropdown-menu text-small shadow " aria-labelledby="dropdownFilter">
                        {
                            ['', 'high', 'moderate', 'minor']
                            .map((choice)=> {return <><li className="dropdown-item" onClick={() => props.paramSetter({...props.param, priority: choice})}>{choice === '' ? 'all' : choice}</li></>})
                        }
                    </ul>
                </div>
                <span className='d-flex align-items-center' style={{'color': 'GrayText'}}>Status: </span>
                <div className='dropdown'>
                    <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownFilter" data-bs-toggle="dropdown" aria-expanded="false">
                        {
                            (props.param.is_completed === true ? 'complete' : '') ||
                            (props.param.is_completed === false ? 'incomplete' : '') ||
                            (props.param.is_completed === '' ? 'all' : '')
                        }
                    </a>
                    <ul className="dropdown-menu text-small shadow " aria-labelledby="dropdownFilter">
                        <li className="dropdown-item" onClick={() => props.paramSetter({...props.param, is_completed: ''})}>all</li>
                        <li className="dropdown-item" onClick={() => props.paramSetter({...props.param, is_completed: true})}>complete</li>
                        <li className="dropdown-item" onClick={() => props.paramSetter({...props.param, is_completed: false})}>incomplete</li>
                    </ul>
                </div>
            </div>
        </>
    )
}


const SimpleTasksList = (props: {tasks: ISimpleTask[]}) => {
    const dispatch = useDispatch()
    return (
        <>
            <ul className='list-group simple-tasks-list'>
                {
                    !!props.tasks && props.tasks.map((task) => {
                        return (
                            <>
                                <li
                                    key={task.pk}
                                    className='d-flex justify-content-between border rounded my-2 w-70 list-group-item simple-task-item'
                                    onClick={() => dispatch(checkTask({show: true, task: task}))}
                                    >
                                    <p>{task.title}</p>
                                    <p>
                                        {
                                            !!task.due_date &&
                                                (task.due_date instanceof Date) ? task.due_date.toLocaleDateString(undefined, options) : new Date(task.due_date).toLocaleDateString(undefined, options)
                                        }
                                    </p>
                                </li>
                            </>
                        )
                    })
                }
            </ul>
        </>
    )
}