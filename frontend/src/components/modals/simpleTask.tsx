import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { RootState } from '../../store/index';
import { closeTask } from '../../store/reducers';
import { SimpleTasksList } from '../../store/api/hooks';
import PriorityDropdown from '../global/dropdown';


export default function SimpleTaskModal (props: {categories: string[]}) {
    // A modal which represents
    // simple task details
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state.taskModal.modalState)
    const [input, setInput] = useState<SimpleTasksList>({
                                                        title: '', 
                                                        description: '', 
                                                        due_date: '', 
                                                        category: state.task.category,
                                                        is_completed: false,
                                                        priority: 'minor'})
    
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

    useEffect(()=>{console.log(input.category)}, [input])

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
                                <select onChange={(ev) => setInput((inp) => ({...inp, category: ev.target.value}))}>
                                    {
                                        props.categories.map((cat) => {
                                            return (
                                                <>
                                                    <option key={cat}></option>
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
                        <button className='d-flex justify-content-center btn btn-danger mx-3 rounded option-btn'>Cancel</button>
                        <button className='d-flex justify-content-center btn btn-success mx-3 rounded option-btn'>Save</button>
                    </div>
                </Modal.Footer>
            </Modal>
       </>  
    )
}