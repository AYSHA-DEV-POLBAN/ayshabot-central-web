import Grid from '@mui/material/Grid';
import React from 'react';
import conversation from '../../assets/conversation.png'
import Login from './login';
import "../../App.css";
import { Hidden, Typography } from '@mui/material';

const LoginScreen = () => {
  const [currentStat, setStat] = React.useState('login')

  const changeStat = (stat) => {
    setStat(stat)
  }
  const renderComponent = (stat) => {
    let dom = null
    if (stat === 'login') {
      dom = <Login changeStat={changeStat} />
    } 
    return dom
  }
  return(
      <Grid container height="100vh">
        <Grid container height="100%">
          <Grid item xs={12} sm={6} height="100%" display="flex" flexDirection="column">
            <Grid item xs={12}>
              <Grid item xs={12} 
                paddingLeft={{xs:3, md:12, lg:25}} 
                paddingRight={{xs:3, md:12, lg:25}} 
                marginTop={{xs: -4, sm: 0}}
                paddingBottom={12}
              >
                {renderComponent(currentStat)}
              </Grid>
            </Grid>

            <Grid item xs={12} paddingLeft={1.875} display="flex" alignItems="flex-end">
              <Typography className='text-files-sizes' color='#8a8a8a' fontSize="0.875rem">
                &copy; {new Date().getFullYear()} RS Islam Aysha Bogor
              </Typography>
            </Grid>
          </Grid>
          <Hidden smDown>
          <Grid item xs={6} height="100%" style={{
            backgroundColor: '#146C94',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
            }}>
            <img alt="rightimage" src={conversation} style={
              { 
                width: '60%', 
                minHeight: '60%', 
                objectFit: 'cover',
              }
            }/>
          </Grid>
          </Hidden>
        </Grid>
      </Grid>
  )
}

export default LoginScreen