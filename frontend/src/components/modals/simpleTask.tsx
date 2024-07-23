import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { RootState } from '../../store/index';
import { closeTask } from '../../store/reducers';
import { ICategory, SimpleTaskForm } from '../../models/app_content';
import PriorityDropdown from '../global/dropdown';


export default function SimpleTaskModal (props: {categories: ICategory[]}) {
    // A modal which represents
    // simple task details
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state.taskModal.modalState)
    const [input, setInput] = useState<SimpleTaskForm>({
                                                        title: '', 
                                                        description: '', 
                                                        due_date: '', 
                                                        category: '',
                                                        is_completed: false,
                                                        priority: ''})
    
    useEffect(() => {
        if (state.task) {
            setInput({
                title: state.task.title, 
                description: state.task.description, 
                due_date: state.task.due_date, 
                category: state.task.category, 
                is_completed: false,
                priority: state.task.priority})
        }
    }, [state.task])

    return (
        <>
            <Modal show={state.show} onHide={() => dispatch(closeTask())}>
                <Modal.Header className='d-flex flex-column justify-content-between align-items-end'>
                    <div className='d-flex'>
                        <PriorityDropdown choice={input.priority} setter={setInput}/>
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
                                !!state.task.due_date ?
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
                            <Form.Control list='simple-task-categories' onChange={(ev) => setInput((inp) => ({...inp, category: ev.target.value}))}/>
                            <datalist id='simple-task-categories'>
                                {
                                    !!props.categories &&
                                        props.categories.map((cat) => {
                                            return (
                                                <>
                                                    <option key={cat.pk} value={cat.pk}>{cat.title}</option>
                                                </>
                                            )
                                        })
                                }
                            </datalist>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex justify-content-between btn-group'>
                        <button className='d-flex justify-content-center btn btn-danger mx-3 rounded option-btn'>Cancel</button>
                        <button className='d-flex justify-content-center btn btn-success mx-3 rounded option-btn'>Save</button>
                    </div>
                </Modal.Footer>
            </Modal>
       </>  
    )
}