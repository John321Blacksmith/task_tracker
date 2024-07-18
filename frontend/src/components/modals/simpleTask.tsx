import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { RootState } from '../../store/index';
import { closeTask } from '../../store/reducers'; 
import { SimpleTask } from '../../models/app_content';


export default function SimpleTaskModal () {
    // A modal which represents
    // simple task details
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state.taskModal.modalState)
    const [formData, setData] = useState<SimpleTask>({title: state.task?.title, description: state.task?.description, due_date: state.task?.due_date, is_completed: state.task?.is_completed})
    const options: Intl.DateTimeFormatOptions = {'weekday': 'long', 'day': 'numeric', 'month': 'long'}
    return (
        <>
            {
                !!state.task &&
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
                                            state.task.due_date instanceof Date ?
                                                state.task.due_date.toLocaleDateString(undefined, options) :
                                                new Date(state.task.due_date).toLocaleDateString(undefined, options)
                                            }/>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                    </Modal>
            }
       </>  
    )
}