import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { ICategory, SimpleTask } from '../../models/app_content';
import { useLazyGetFilteredTasksQuery } from '../../store/api/custom_api';
import Button from 'react-bootstrap/Button';
import { SimpleTaskArgs } from '../../models/queryModels';
import SimpleTaskModal from '../modals/simpleTask';
import SimpleTaskFormComponent from '../forms/simpleTaskForm';


export default function SimpleTasksComponent(props: {tasks: SimpleTask[]}) {
    // Block of tasks list and filter parameters
    const [sTasks, setSTasks] = useState<SimpleTask[]>(props.tasks)
    const [showForm, setShowForm] = useState<boolean>(false)
    const [filterState, setFilterState] = useState<{active: boolean, params: SimpleTaskArgs}>({active: false, params: {dueDate: '', category: '', priority: '', is_completed: ''}})
    const [modalState, showSimpleTaskModal] = useState<{show: boolean, id?: number | string}>({show: false, id: ''})
    const [getFilteredTasks, {data: tasks, isLoading, isFetching, error: listErr}] = useLazyGetFilteredTasksQuery()
    const [categories, setCategories] = useState<ICategory[]>([])
    
    useEffect(()=> {
        if (tasks) {
            setSTasks(tasks.results)
        }
    }, [tasks])
                                                               
    return (
        <>  
            <SimpleTaskFormComponent categories={categories} show={showForm} priority={filterState.params.priority} formSetter={setShowForm}/>
            <SimpleTaskModal id={modalState.id} show={modalState.show} modalSetter={showSimpleTaskModal} categorySetter={setCategories}/>
            <div className='position-relative d-flex flex-column simple-tasks-container'>
                <SimpleTasksFilter filter={filterState} paramSetter={setFilterState} getFilteredTasks={getFilteredTasks}/>
                {!!sTasks && <SimpleTasksListComponent modalSetter={showSimpleTaskModal} tasks={sTasks}/>}
                <Button
                    className='d-flex justify-content-center align-self-center position-sticky'
                    variant='outline-dark'
                    onClick={()=>setShowForm(true)}>+ Add</Button>
            </div>
        </>
    )
}


const SimpleTasksFilter = (props: {
                                    filter: {active: boolean, params: SimpleTaskArgs},
                                    paramSetter: React.Dispatch<React.SetStateAction<{active: boolean, params: SimpleTaskArgs}>>
                                    getFilteredTasks: Function}) => {

    useEffect(() => {
        if (props.filter.active) {
            props.getFilteredTasks(props.filter.params)
        }
    }, [props.filter.active, props.filter.params, props.paramSetter])
    

    useEffect(() => {
        if (props.filter.params.is_completed !== '' || props.filter.params.priority !== '') {
            props.paramSetter({active: true, params: props.filter.params})
        }
    }, [props.filter.params, props.filter.active])


    return (
        <>
            <div className='d-flex justify-content-end filter-dropdowns'>
                <span className='d-flex align-items-center' style={{'color': 'GrayText'}}>Priority: </span>
                <div className='dropdown'>
                    <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownFilter" data-bs-toggle="dropdown" aria-expanded="false">
                        {props.filter.params.priority === '' ? 'all' : props.filter.params.priority}
                    </a>
                    <ul className="dropdown-menu text-small shadow " aria-labelledby="dropdownFilter">
                        {
                            ['', 'high', 'moderate', 'minor']
                            .map((choice)=> {return <><li className="dropdown-item" onClick={() => props.paramSetter((inp) => ({...inp, params: {...props.filter.params, priority: choice}}))}>{choice === '' ? 'all' : choice}</li></>})
                        }
                    </ul>
                </div>
                <span className='d-flex align-items-center' style={{'color': 'GrayText'}}>Status: </span>
                <div className='dropdown'>
                    <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownFilter" data-bs-toggle="dropdown" aria-expanded="false">
                        {
                            (props.filter.params.is_completed === 'true' ? 'complete' : '') ||
                            (props.filter.params.is_completed === 'false' ? 'incomplete' : '') ||
                            (props.filter.params.is_completed === '' ? 'all' : '')
                        }
                    </a>
                    <ul className="dropdown-menu text-small shadow " aria-labelledby="dropdownFilter">
                        {
                            [['all', ''], ['complete', 'true'], ['incomplete', 'false']]
                            .map((choice) => {return <><li className="dropdown-item" onClick={() => props.paramSetter((inp) => ({...inp, params: {...props.filter.params, is_completed: choice[1]}}))}>{choice[0]}</li></>})
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}


const SimpleTasksListComponent = (props: {modalSetter: React.Dispatch<React.SetStateAction<{show: boolean, id?: number | string}>>, tasks: SimpleTask[]}) => {
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
                                    onClick={() => props.modalSetter({id: task.id, show: true})}
                                    >
                                    <p>{task.title}</p>
                                    {
                                        task.is_completed === false ? 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='orange' className="bi bi-lightning-fill" viewBox="0 0 16 16">
                                                <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z"/>
                                            </svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-check-lg" viewBox="0 0 16 16">
                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                            </svg>
                                    }
                                </li>
                            </>
                        )
                    })
                }
            </ul>
        </>
    )
}