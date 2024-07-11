import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { SimpleTask } from '../../models/app_content';  
import './styles/simpleTasksList.css';


export default function SimpleTasksList(props: {tasks: SimpleTask[]}) {
    return (
        <>
            <div className='simple-tasks-search'>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            <div className='simple-tasks-container'>
                <ul className='d-flex  simple-tasks-list'>
                    {
                        !!props.tasks && props.tasks.map((task) => {
                            return (
                                <>
                                    <li className='d-flex justify-content-between simple-task-item'>
                                        <p>{task.title}</p>
                                        <p>{task.due_date.toString()}</p>
                                    </li>
                                </>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}
