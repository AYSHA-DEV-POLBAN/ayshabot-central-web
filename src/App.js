// import logo from './logo.svg';
// import './App.css';
// import User from './Layout/User';
// import Informasi from './Layout/Informasi';
// import LogActivity from './Layout/LogActivity';
// import Prompting from './Layout/Prompting';
// import Dashboard from './Layout/Dashboard';
// import CreateUser from './Layout/User/CreateUser';
// import CreateInfomasi from './Layout/Informasi/CreateInformasi';
// import CreatePrompting from './Layout/Prompting/CreatePrompting';


// function App() {
//   return (
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Edit <code>src/App.js</code> and save to reload.
//     //     </p>
//     //     <a
//     //       className="App-link"
//     //       href="https://reactjs.org"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       Learn React
//     //     </a>
//     //   </header>
//     // </div>

//     // <CreateUser />
//     // <Informasi />
//     <CreateInfomasi />
//     // <LogActivity />
//     // <Prompting />
//     // <CreatePrompting />
//     // <Dashboard/>
//     // <User />
//   );
// }

// export default App;




import './App.css';
import React, { Suspense, useEffect, useState} from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import globalTheme from './Theme';
import { closedRoutes, finalRoutes } from './routes';
// import { AlertContext } from './context';

const App = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // const userId = localStorage.getItem("userId") || null
  // useEffect(() => {
    // if (!userId) {
      // navigate('/login')
    // }
  // }, [userId])
  
  // useEffect(() => {
    // const isRememberMe = localStorage.getItem("rememberMe");
    // const clearLocalStorage = () => {
      // localStorage.clear();
    // };

    // if (isRememberMe === "false") {
      // window.addEventListener("unload", clearLocalStorage);
      // return () => {
        // window.removeEventListener("unload", clearLocalStorage);
      // };
    // }
  // }, []);

  const [dataAlert, setDataAlert] = useState({
    severity: 'warning',
    message: '',
    open: false,
  })

  const onCloseAlert = () => {
    setDataAlert((prevState) => ({
      ...prevState,
      open: false,
    }))
  }
  const value = { dataAlert, setDataAlert, onCloseAlert };

  useEffect(() => {
    onCloseAlert();
  }, [location])

  return (
    <ThemeProvider theme={globalTheme}>
      {/* <AlertContext.Provider value={value}> */}
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            {closedRoutes().map((res, idx) => {
              return <Route path={res.path} element={res.element} key={`${idx + 1}-route-path`} />
            })}
          </Routes>
        </Suspense>
      {/* </AlertContext.Provider> */}
    </ThemeProvider>
  );
}

export default App;