import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { RootState } from '../../store/index';
import PriorityDropdown from '../global/dropdown';
import { ICategory, SimpleTaskForm } from '../../models/app_content';
import { useLazyGetSimpleTaskByIdQuery, usePatchSimpleTaskMutation, useDeleteSimpleTaskMutation } from '../../store/api/custom_api'


export default function SimpleTaskModal (props: {
                                                    id?: number | string,
                                                    show: boolean,
                                                    priority?: string,
                                                    modalSetter: React.Dispatch<React.SetStateAction<{show: boolean, id?: number | string}>>,
                                                    categorySetter: React.Dispatch<React.SetStateAction<ICategory[]>>
    }) {
    // A modal which represents
    // simple task details
    const [getSimpleTask, {data: task, error: objErr}] = useLazyGetSimpleTaskByIdQuery()
    const [updateTask, {data: updatedTask, error: updErr}] = usePatchSimpleTaskMutation()
    const [deleteTask, {status}] = useDeleteSimpleTaskMutation()
    const [taskStyle, setStyle] = useState<{color: string, status: string}>({color: '', status: ''})
    const [input, setInput] = useState<SimpleTaskForm>({
                                                        title: '',
                                                        description: '',
                                                        due_date: '',
                                                        category: '',
                                                        is_completed: false,
                                                        priority: props.priority})
    
    useEffect(()=> {
        if (props.show){
            getSimpleTask({id: props.id})
        }
    }, [props.show])

    useEffect(() => {
        if (task) {
            setInput({
                title: task.title,
                description: task.description,
                due_date: task.due_date,
                category: task.category,
                is_completed: task.is_completed,
                priority: task.priority
            })
        }
    }, [task])

    // mutation events
    // listening
    useEffect(() => {
        // success message
        if (updatedTask && !updErr) {
            console.log(updatedTask)
        }
    }, [updatedTask, updErr])

    useEffect(()=> {
        if (status) {
            // success message
            console.log(status.toString())
        }
    }, [status])

    useEffect(()=>{
        if (task?.categories) {
            props.categorySetter(task.categories)
        }
    }, [task?.categories])

    useEffect(() => {
        if (task?.is_completed === false) {
            setStyle({color: 'red', status: 'active'})
        } else {
            setStyle({color: 'green', status: 'inactive'})
        }
    }, [task?.is_completed])

    const updateTaskHandler = () => {
        if (input){
            updateTask({id: props.id, body: input})
            props.modalSetter({id: '', show: false})
        }
    }

    const completeTask = () => {
        updateTask({id: props.id, body: {...input, is_completed: true}})
        props.modalSetter({id: '', show: false})
    }

    const deleteTaskHandler = (id?: number | string) => {
        deleteTask({id: id})
        props.modalSetter({id: '', show: false})
    }


    return (
        <>
            <Modal show={props.show} onHide={() => props.modalSetter({id: '', show: false})}>
                <Modal.Header className='d-flex flex-column justify-content-between align-items-end'>
                    <div className='d-flex align-items-center'>
                        <p className='d-flex mb-0 align-items-center' style={{'color': taskStyle.color}}>{taskStyle.status}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill={taskStyle.color} className="d-flex align-items-center bi bi-dot" viewBox="0 0 16 16">
                            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                        </svg>
                    </div>
                    <div className='d-flex'>
                        <PriorityDropdown priority={input.priority} setter={setInput}/>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mx-auto mt-2'>
                            <Form.Control id='title' value={input.title} onChange={(ev) => setInput(inp => ({...inp, title: ev.target.value}))}/>
                        </Form.Group>
                        <Form.Group className='mx-auto mt-2'>
                            <Form.Control id='description' as='textarea' value={input.description} onChange={(ev) => setInput(inp => ({...inp, description: ev.target.value}))}/>
                        </Form.Group>
                           {
                                !!input.due_date ?
                                    <Form.Group className='mx-auto mt-2'>
                                        <Form.Control
                                            id='due_date'
                                            type='date'
                                            value={
                                                    input.due_date.toString().substring(0, 10)
                                            }
                                            onChange={(ev)=> setInput(inp => ({...inp, due_date: ev.target.value}))}
                                            />
                                    </Form.Group> :
                                    <button className='btn btn-light'>Set Due Date</button>
                            }
                        <Form.Group id='category'>
                            <Form.Label>Category</Form.Label>
                                <select value={input.category} onChange={(ev) => setInput((inp) => ({...inp, category: ev.target.value}))}>
                                    {
                                        task?.categories?.map((cat) => {
                                            return (
                                                <>
                                                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex justify-content-between btn-group'>
                        <button className='btn btn-primary' onClick={() => deleteTaskHandler(props.id)}>Delete</button>
                        <button className='d-flex justify-content-center btn btn-danger mx-3 rounded option-btn' onClick={() => props.modalSetter({id: '', show: false})}>Cancel</button>
                        <button className='d-flex justify-content-center btn btn-success mx-3 rounded option-btn' onClick={updateTaskHandler}>Save</button>
                        <button className='btn btn-primary' onClick={completeTask}>Complete</button>

                    </div>
                </Modal.Footer>
            </Modal>
       </>  
    )
}