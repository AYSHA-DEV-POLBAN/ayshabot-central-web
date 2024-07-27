import './App.css';
import React, { Suspense, useEffect, useState} from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import globalTheme from './Theme';
import { FinalRoutes } from './routes';
import { AlertContext } from './Context';
import { Grid, Typography } from '@mui/material';

const App = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const userId = localStorage.getItem("userId") || null
  useEffect(() => {
    if (!userId) {
      navigate('/')
    }
  }, [userId])

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


  const [open, setOpen] = useState(false);
  const handleDrawerClose = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={globalTheme}>
      <AlertContext.Provider value={value}>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            {FinalRoutes().map((res, idx) => {
              return <Route path={res.path} element={res.element} key={`${idx + 1}-route-path`} />
            })}
          </Routes>
        </Suspense>
        <Grid item xs={12} sm={6} justifyContent="center" display="flex" alignItems="flex-end">
          <Typography className='text-files-sizes' color='#8a8a8a' fontSize="0.875rem">
            &copy; {new Date().getFullYear()} RS Islam Aysha Bogor
          </Typography>
        </Grid>
      </AlertContext.Provider>
    </ThemeProvider>
  );
}

export default App;