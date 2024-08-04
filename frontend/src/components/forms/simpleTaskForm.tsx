import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import PriorityDropdown from '../global/dropdown';
import { ICategory, SimpleTaskForm } from '../../models/app_content';
import { usePostSimpleTasksMutation } from '../../store/api/custom_api';


export default function SimpleTaskFormComponent (props: {
															categories: ICategory[],
															priority?: string,
															show: boolean,
															formSetter: React.Dispatch<React.SetStateAction<boolean>>},
														){
	const [input, setInput] = useState<SimpleTaskForm>({title: '',
														description: '',
														category: props.categories[0].id,
														due_date: '',
														is_completed: false,
														priority: props.priority})
	 
	const [createTask, {data, error}] = usePostSimpleTasksMutation()

	useEffect(()=> {
		if (props.show === false) {
			setInput({
				title: '',
				description: '',
				category: '',
				due_date: '',
				is_completed: false,
				priority: ''
			})
		}
	}, [props.show])

	useEffect(()=>{
		// success message
		if (data && !error){
			console.log(data)
		}
	}, [data, error])

	const createTaskHandler = () => {
		if (input) {
			console.log(input)
			createTask(input)
		}
	}
 
	return (
			<>
				<Modal show={props.show} onHide={() => props.formSetter(false)}>
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
								<Form.Control
											type='date'
											value={
												input.due_date.toString().substring(0, 10)
											}
											onChange={(ev) => setInput((inp) => ({...inp, due_date: ev.target.value}))}/>
							</Form.Group>
							<Form.Group>
								<PriorityDropdown priority={props.priority} setter={setInput}/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Category</Form.Label>
								<select onChange={(ev) => setInput((inp) => ({...inp, category: ev.target.value}))}>
                                    {
                                        props.categories?.map((cat) => {
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
							<button className='d-flex justify-content-center btn btn-danger mx-3 rounded option-btn' onClick={()=> props.formSetter(false)}>Cancel</button>
							<button className='d-flex justify-content-center btn btn-success mx-3 rounded option-btn' onClick={createTaskHandler}>Create</button>
						</div>
					</Modal.Footer>
				</Modal>
			</>
		)
}


const CategoryList = (props: {categories: ICategory[], setter: React.Dispatch<React.SetStateAction<SimpleTaskForm>>}) => {

	return (
		<>
			<Form.Control list='simple-task-categories' onChange={(ev) => props.setter((inp) => ({...inp, category: ev.target.value}))}/>
				<datalist id='simple-task-categories'>
					{
						!!props.categories &&
							props.categories.map((cat) => {
								return (
									<>
										<option key={cat.id} value={cat.title}/>
									</>
								)
							})
					}
				</datalist>
		</>
	)
}