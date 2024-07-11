import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../global/styles/navBar.css';


// export function AppNavBar() {
//   return (
//     <Navbar collapseOnSelect expand="lg" className='navbar'>
//       <Container className='d-flex flex-direction-row'>
//         <Navbar.Brand href="#home">Tasks Manager</Navbar.Brand>
//         <Nav className="me-auto">
//             <NavDropdown title="Dropdown" id="dropdown-border-top">
//               <NavDropdown.Item>
//                 <img src="https://avatars.githubusercontent.com/u/93776732?v=4" alt="John" width="24" height="24"className="rounded-circle"/>
//               </NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//             </NavDropdown>
//         </Nav>         
//         </Container>
//     </Navbar>
//   );
// }


//   <Nav>
//     <div className="dropdown border-top">
//       <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
//         <img src="https://avatars.githubusercontent.com/u/93776732?v=4" alt="John" width="24" height="24"className="rounded-circle"/>
//       </a>
//       <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
//         <li><a className="dropdown-item" href="#">Settings</a></li>
//         <li><a className="dropdown-item" href="#">Profile</a></li>
//         <li><hr className="dropdown-divider"/></li>
//         <li><a className="dropdown-item" href="#">Sign out</a></li>
//       </ul>
//     </div>
//   </Nav>


export function AppNavBar () {
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
          </div>
          <div className="dropdown border-top">
             <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
               <img src="https://avatars.githubusercontent.com/u/93776732?v=4" alt="John" width="24" height="24"className="rounded-circle"/>
             </a>
             <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
               <li><a className="dropdown-item" href="#">Settings</a></li>
               <li><a className="dropdown-item" href="#">Profile</a></li>
               <li><hr className="dropdown-divider"/></li>
               <li><a className="dropdown-item" href="#">Sign out</a></li>
             </ul>
           </div>
        </div>
      </nav>
    </>
  )
}