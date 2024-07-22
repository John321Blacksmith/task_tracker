import {SimpleTaskForm} from '../../models/app_content';


export default function PriorityDropdown(props: {choice: string, setter: React.Dispatch<React.SetStateAction<SimpleTaskForm>>}) {
    return (
        <>
            <div className='d-flex justify-content-end filter-dropdowns'>
                <span className='d-flex align-items-center' style={{'color': 'GrayText'}}>Priority: </span>
                <div className='dropdown'>
                    <a href="#"
                        className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
                        id="dropdownFilter"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">{props.choice === '' ? 'all' : props.choice}</a>

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