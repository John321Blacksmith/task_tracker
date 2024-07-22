import React, {useState, useEffect} from 'react';
import { SimpleTaskForm } from '../../models/app_content';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useCreateTaskMutation} from '../../store/api_hooks/tasks_app';
import PriorityDropdown from '../global/dropdown';


export default function SimpleTaskFormComponent (props: {show: boolean, setter: any}){
	const [input, setInput] = useState<SimpleTaskForm>({title: '', description: '', due_date: '', priority: ''})
	const [createTask, {data, error}] = useCreateTaskMutation()

	const createTaskHandler = () => {
		if (input) {
			createTask({body: input, method: 'POST'})
		} else if (error) {
			return <><div><p>Invalid data</p></div></>
		}
	}
	
	return (
			<>
				<Modal show={props.show} onHide={() => props.setter(false)}>
					<Modal.Header>
						<Modal.Title>New Task</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Control placeholder='Title' onChange={(ev) => setInput((inp) => ({...inp, title: ev.target.value}))}/>
							</Form.Group>
							<Form.Group>
								<Form.Control placeholder='Description' as='textarea' onChange={(ev) => setInput((inp) => ({...inp, description: ev.target.value}))}/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Due Date</Form.Label>
								<Form.Control type='date' onChange={(ev) => setInput((inp) => ({...inp, date: ev.target.value}))}/>
							</Form.Group>
							<Form.Group>
								<PriorityDropdown choice={input.priority} setter={setInput}/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<div className='btn-group'>
						<button className='btn btn-primary' onClick={()=> props.setter(false)}>Cancel</button>
						<button className='btn btn-primary' onClick={createTaskHandler}>Create</button>
					</div>
				</Modal>
			</>
		)
}