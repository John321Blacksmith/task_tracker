import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import {usePostSimpleTasksMutation} from '../../store/api/hooks';
import { PostSimpleTasksApiArg, SimpleTasksList } from '../../store/api/hooks';
import PriorityDropdown from '../global/dropdown';


export default function SimpleTaskFormComponent (props: {categories: {pk: number, title: string}[], show: boolean, setter: any}){
	const [input, setInput] = useState<SimpleTasksList>({title: '',
														 description: '',
														 category: {pk: 0, title: ''},
														 due_date: '',
														 is_completed: false,
														 priority: 'minor'})
	const [createTask, {data, error}] = usePostSimpleTasksMutation()

	useEffect(()=> {
		if (props.show === false) {
			setInput({
				title: '',
				description: '',
				category: {pk: 0, title: ''},
				due_date: '',
				is_completed: false,
				priority: 'minor'
			})
		}
	}, [props.show])

	const createTaskHandler = () => {
		if (input) {
			createTask({simpleTasksList: input})
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
							<Form.Group>
								<Form.Label>Category</Form.Label>
								<CategoryList categories={props.categories} setter={setInput}/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<div className='d-flex justify-content-between btn-group'>
							<button className='d-flex justify-content-center btn btn-danger mx-3 rounded option-btn' onClick={()=> props.setter(false)}>Cancel</button>
							<button className='d-flex justify-content-center btn btn-success mx-3 rounded option-btn' onClick={createTaskHandler}>Create</button>
						</div>
					</Modal.Footer>
				</Modal>
			</>
		)
}


const CategoryList = (props: {categories: {pk: number, title: string}[], setter: React.Dispatch<React.SetStateAction<SimpleTasksList>>}) => {

	return (
		<>
			<Form.Control list='simple-task-categories' onChange={(ev) => props.setter((inp) => ({...inp, category: {pk: 0, title: ev.target.value}}))}/>
				<datalist id='simple-task-categories'>
					{
						!!props.categories &&
							props.categories.map((cat) => {
								return (
									<>
										<option key={cat.pk} value={cat.title}/>
									</>
								)
							})
					}
				</datalist>
		</>
	)
}