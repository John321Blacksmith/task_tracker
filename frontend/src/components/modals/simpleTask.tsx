import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { RootState } from '../../store/index';
import { closeTask } from '../../store/reducers'; 
import { SimpleTaskForm } from '../../models/app_content';
import PriorityDropdown from '../global/dropdown';


export default function SimpleTaskModal (props: {show: boolean, task: SimpleTaskForm, setter: any}) {
    // A modal which represents
    // simple task details
    const dispatch = useDispatch()
    // const props.= useSelector((state: RootState) => state.taskModal.modalState)
    const [input, setInput] = useState<SimpleTaskForm>({
                                                        title: props.task.title, 
                                                        description: props.task.description, 
                                                        due_date: props.task.due_date, 
                                                        category: props.task.category, 
                                                        is_completed: false,
                                                        priority: props.task.priority})

    useEffect(()=> {
        if (input) {
            console.log(input)
        }
    }, [input])

    return (
        <>
            <Modal show={props.show} onHide={() => dispatch(closeTask())}>
                <Modal.Header>{props.task.title}</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={props.task.title} onChange={(ev) => setInput(inp => ({...inp, title: ev.target.value}))}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={props.task.description} onChange={(ev) => setInput(inp => ({...inp, description: ev.target.value}))}/>
                        </Form.Group>

                           {
                                !!props.task.due_date ?
                                    <Form.Group>
                                        <Form.Label>Due date</Form.Label>
                                        <Form.Control
                                            type='date'
                                            value={
                                                    input.due_date.toString().substring(0, 10)
                                            }
                                            onChange={(ev)=> setInput(inp => ({...inp, due_date: ev.target.value}))}
                                            />
                                    </Form.Group> :
                                    <button className='btn btn-light'>Set Due Date</button>
                            }
                        <Form.Group>
                            <PriorityDropdown choice={input.priority} setter={setInput}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
       </>  
    )
}