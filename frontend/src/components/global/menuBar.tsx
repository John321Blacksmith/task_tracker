import './styles/menuBar.css';


export default function AppMenu() {

  return (
    <>
    <div className='menu-bar'>
      <div className="bg-light">
        <ul className="nav nav-flush flex-column mb-auto text-center menu-options">
          <li className='nav-link py-3 border-top'>
            Projects
          </li>
          <li className='nav-link py-3 border-top'>
            Workspaces
          </li>
        </ul>
      </div>
    </div>
    </>
  );
}
