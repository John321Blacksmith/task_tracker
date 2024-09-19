import {useState, useEffect} from 'react';
import { SimpleTaskForm } from '../../models/app_content';


export default function PriorityDropdown(props: {priority?: string, setter: React.Dispatch<React.SetStateAction<SimpleTaskForm>>}) {
    const [choiceColor, setColor] = useState<string>('')

    useEffect(()=> {
        if (props.priority === 'high'){
            setColor('red')
        } else if (props.priority === 'moderate') {
            setColor('orange')
        } else if (props.priority === 'minor') {
            setColor('green')
        }
    }, [props.priority, choiceColor])

    return (
        <>
            <div className='d-flex justify-content-end filter-dropdowns'>
                <span className='d-flex align-items-center' style={{'color': 'GrayText'}}>Priority: </span>
                <div className='dropdown'>
                    <a href="#"
                        className="d-flex align-items-center justify-content-center p-3 text-decoration-none dropdown-toggle"
                        id="dropdownFilter"
                        data-bs-toggle="dropdown"
                        style={{"color": choiceColor}}
                        aria-expanded="false">{props.priority}</a>

                    <ul className="dropdown-menu text-small shadow " aria-labelledby="dropdownFilter">
                    {
                        [['', 'grey'], ['high', 'red'], ['moderate', 'orange'], ['minor', 'green']]
                        .map((choice)=> {
                            return (
                                <>
                                    <li className="dropdown-item"
                                        style={{"color": choice[1]}}
                                        value={choice[0]}
                                        onClick={() => props.setter((inp) => ({...inp, priority: choice[0]}))}>{choice[0]}</li>
                                </>
                            )
                        })
                    }
                    </ul>
                </div>
            </div>
        </>
    )
}