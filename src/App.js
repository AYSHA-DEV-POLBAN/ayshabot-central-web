import logo from './logo.svg';
import './App.css';
import User from './Layout/User';
import Informasi from './Layout/Informasi';
import LogActivity from './Layout/LogActivity';
import Prompting from './Layout/Prompting';
import Dashboard from './Layout/Dashboard';
import CreateUser from './Layout/User/CreateUser';
import CreateInfomasi from './Layout/Informasi/CreateInformasi';
import CreatePrompting from './Layout/Prompting/CreatePrompting';


function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    // <CreateUser />
    // <Informasi />
    <CreateInfomasi />
    // <LogActivity />
    // <Prompting />
    // <CreatePrompting />
    // <Dashboard/>
    // <User />
  );
}

export default App;
