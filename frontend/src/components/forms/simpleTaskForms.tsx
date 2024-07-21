import React, {useState, useEffect} from 'react';
import { SimpleTaskForm } from '../../models/app_content';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import useCreateTaskMutation from '../../store/api_hooks';


export default function SimpleTaskFormComponent (props: {show: boolean, setter: any}){
	const [input, setInput] = useState<SimpleTaskForm>({title: '', description: '', due_date: '', is_completed: false})
	const [createTask, {result, error}] = useCreateTaskMutation()

	const createTaskHandler = () => {
		if (input) {
			createTask(input)
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
								<Form.Label>Title</Form.Label>
								<Form.Control></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Description</Form.Label>
								<Form.Control></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Due Date</Form.Label>
								<Form.Control></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Is Completed</Form.Label>
								<Form.Control></Form.Control>
							</Form.Group>
						</Form>
					</Modal.Body>
					<button className='btn btn-primary' onClick={()=> props.setter(false)}>Cancel</button>
					<button className='btn btn-primary' onClick={createTaskHandler}>Create</button>
				</Modal>
			</>
		)
}