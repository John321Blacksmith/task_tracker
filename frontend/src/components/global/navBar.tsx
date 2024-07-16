import '../global/styles/navBar.css';
 

export function AppNavBar () {
  return (
    <>
      <nav className="navbar navbar-expand-lg border">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={()=> {}}>Todo App</a>
          <SearchItemsComponent/>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="dropdown">
             <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
               <img src="https://avatars.githubusercontent.com/u/93776732?v=4" alt="John" width="24" height="24"className="rounded-circle"/>
             </a>
             <ul className="dropdown-menu text-small shadow " aria-labelledby="dropdownUser3">
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


const SearchItemsComponent = () => {
  // this component is responsible
  // for sending a search request
  // for the chosen type of the item
  return (
    <>
      <div className='simple-tasks-search'>
        <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <div className="dropdown">
              <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownSearch" data-bs-toggle="dropdown" aria-expanded="false">
                Among
              </a>
              <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownSearch">
                <li className="dropdown-item">Projects</li>
                <li className="dropdown-item">Tasks</li>
              </ul>
            </div>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </>
  )
}