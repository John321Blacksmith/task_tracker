import React, {useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { SimpleTask } from '../../models/app_content';
import { STasksFilterQuery } from '../../models/queryModels';
import { useLazyGetTasksQuery } from '../../store/api_hooks/tasks_app';
import './styles/simpleTasksList.css';


const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}


const ContentSpinner = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}


export default function SimpleTasksComponent(props: {tasks: SimpleTask[]}) {
    // Block of tasks list and filter parameters
    const [sTasks, setSTasks] = useState<SimpleTask[]>(props.tasks)

    const [filterParam, setFilterParam] = useState<STasksFilterQuery>({priority: '', is_completed: ''})
    
    const [getFilteredTasks, {data, isLoading, isFetching, error}] = useLazyGetTasksQuery()

    useEffect(() => {
        if (data) {
            setSTasks(data)
        }
    }, [sTasks, data, setSTasks])

    return (
        <>
            <div className='position-relative d-flex flex-column simple-tasks-container'>
                <div className='simple-tasks-list'>
                    <SimpleTasksFilter param={filterParam} paramSetter={setFilterParam} queryHook={getFilteredTasks}/>
                </div>
                {!!sTasks && <SimpleTasksList tasks={sTasks}/>}
                <button className='btn btn-primary d-flex align-self-center'>+ Add</button>
            </div>
        </>
    )
}



const SimpleTasksFilter = (props: {param: STasksFilterQuery, paramSetter: React.Dispatch<React.SetStateAction<STasksFilterQuery>>, queryHook: Function}) => {

    useEffect(() => {
        if (props.param) {
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


const SimpleTasksList = (props: {tasks: SimpleTask[]}) => {
    return (
        <>
            <ul>
                {
                    !!props.tasks && props.tasks.map((task) => {
                        return (
                            <>
                                <li
                                    key={task.pk}
                                    className='d-flex justify-content-between border rounded my-2 w-70 simple-task-item'
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