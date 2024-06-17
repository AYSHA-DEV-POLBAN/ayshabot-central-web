import React, { useState, useEffect, useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import SideBar from '../../Component/Sidebar';
import BreadCumbComp from '../../Component/DataBread';
import client from '../../Global/client';
import DataTable from '../../Component/DataTable';
import { useNavigate } from "react-router";


const Dashboard = () => {

  const [dataNumber, setDataNumber] = useState([]);
  const [dataHistoryPerDay, setDataHistoryPerDay] = useState([]);
  const [dataHistoryPerMonth, setDataHistoryPerMonth] = useState([]);
  const navigate = useNavigate();
  const dataBread = [
    {
      href: "/",
      title: "Dashboard",
      current: false,
    },
  ];

  useEffect(() => {
    getDataNumberPerDay()
    getHistoryPerDay()
    getHistoryPerMonth()
  }, [])

  const getDataNumberPerDay = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/client/count-day`
    })
    setDataNumber(res.data)
  } 
  
  const getHistoryPerDay = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/conversation/count-day`
    })
    setDataHistoryPerDay(res.data.conversationCount)
  } 

  const getHistoryPerMonth = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/conversation/count-month`
    })
    setDataHistoryPerMonth(res.data)
  } 


  const [openSide, setOpenSide] = useState(false);
  const handleDrawerClose = () => {
    setOpenSide(!openSide);
  };

  return (
    <div>
      <SideBar title='Dashboard' >
        <Grid container style={{marginTop: '20px', marginLeft: '10px'}}>
          <BreadCumbComp breadcrumbs={dataBread} />
          <Grid container spacing={2}>
          <Grid item md={3.8} sm={6} xs={12} marginLeft={1} className='card-container'>
              <Grid container direction="column">
                <Grid item>
                  <Typography fontWeight={'bold'} fontSize={20}>Total Question Per Day</Typography>
                </Grid>
                <Grid item>
                  <Typography textAlign={'center'} fontSize={100}>{dataHistoryPerDay !== null ? dataHistoryPerDay : 'Loading...'}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={3.8} sm={6} xs={12} marginLeft={1} className='card-container'>
              <Grid container direction="column">
                <Grid item>
                  <Typography fontWeight={'bold'} fontSize={20}>Total Number Per Day</Typography>
                </Grid>
                <Grid item>
                  <Typography textAlign={'center'} fontSize={100}>{dataNumber !== null ? dataNumber : 'Loading...'}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={3.8} sm={6} xs={12} marginLeft={1} className='card-container'>
              <Grid container direction="column">
                <Grid item>
                  <Typography fontWeight={'bold'} fontSize={20}>Total Question Per Month</Typography>
                </Grid>
                <Grid item>
                  <Typography textAlign={'center'} fontSize={100}>{dataHistoryPerMonth !== null ? dataHistoryPerMonth : 'Loading...'}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SideBar>
    </div>
  )
}

export default Dashboard