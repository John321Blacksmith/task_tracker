import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { RootState } from '../../store/index';
import { closeTask } from '../../store/reducers'; 
import { SimpleTaskForm } from '../../models/app_content';


export default function SimpleTaskModal () {
    // A modal which represents
    // simple task details
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state.taskModal.modalState)
    const [input, setInput] = useState<SimpleTaskForm>({title: '', 
                                                        description: '', 
                                                        due_date: '', 
                                                        category: '', 
                                                        is_completed: false})
    const options: Intl.DateTimeFormatOptions = {'weekday': 'long', 'day': 'numeric', 'month': 'long'}

    useEffect(()=> {
        if (state.task?.due_date) {
            console.log(new Date(state.task.due_date).toISOString())
        }
    }, [state.task.due_date])
    return (
        <>
            
                    <Modal show={state.show} onHide={() => dispatch(closeTask())}>
                        <Modal.Header>{state.task.title}</Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control defaultValue={state.task.title}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control defaultValue={state.task.description}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Due date</Form.Label>
                                    <Form.Control
                                        type='date'
                                        value={
                                                (state.task?.due_date instanceof Date) ?
                                                    state.task.due_date?.toLocaleDateString('en-GB', options):
                                                    new Date(state.task?.due_date).toLocaleDateString('en-GB', options)
                                        }
                                        onChange={(ev)=> setInput(inp => ({...inp, due_date: ev.target.value}))}
                                        />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                    </Modal>
            
       </>  
    )
}