import React, { useState, useEffect, useContext } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import SideBar from '../../Component/Sidebar';
import BreadCumbComp from '../../Component/DataBread';
import client from '../../Global/client';
import { useNavigate } from "react-router";


const Dashboard = () => {

  const [dataNumber, setDataNumber] = useState([]);
  const [dataHistoryPerDay, setDataHistoryPerDay] = useState([]);
  const [dataHistoryPerMonth, setDataHistoryPerMonth] = useState([]);
  const [dateNumberPerMonth, setDataNumberPerMonth] = useState([])
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState();
  const navigate = useNavigate();
  const dataBread = [
    {
      href: "/",
      title: "Dashboard",
      current: false,
    },
  ];

  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'commandName',
    sortType: 'asc',
    search: ''
  })

  const columns = [
    {
      field: 'no',
      headerName: 'No',
      flex: 0.3,
      sortable: false,
      minWidth:50
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 0.7,
      minWidth: 180,
    },
    {
      field: 'question',
      headerName: 'Question',
      flex: 1,
      minWidth: 300,
    },
    {
      field: 'answer',
      headerName: 'Answer',
      flex: 1 ,
      minWidth: 300
    },
    {
      field: 'bill',
      headerName: 'Bill',
      flex: 1 ,
      minWidth: 80
    },
  ];

  useEffect(() => {
    getDataNumberPerDay()
    getHistoryPerDay()
    getHistoryPerMonth()
    getDataNumberPerMonth()
    getData()
  }, [filter])

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

  const getDataNumberPerMonth = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/client/count-month`
    })
    setDataNumberPerMonth(res.data)
  } 

  const getData = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/conversation/`
    })
    rebuildData(res)
  }

  const rebuildData = (resData) => {
    let temp = []
    let number = filter.page * filter.size
    temp = resData.data.map((value, index) => {
      return {
        no: index + 1,
        id: value.id,
        phoneNumber: value.Client.whatsapp_number,
        question: value.question_client,
        answer: value.response_system,
        bill: value.bill,
      }
    })    
    setData([...temp])
    setTotalData(resData.data.length)
  }

  const showMore = () => {
    navigate("/history_conversation");
  };

  const [openSide, setOpenSide] = useState(false);
  const handleDrawerClose = () => {
    setOpenSide(!openSide);
  };

  return (
    <div>
      <SideBar title='Dashboard' >
        <Grid container style={{marginTop: '20px', marginLeft: '30px'}}>
          <BreadCumbComp breadcrumbs={dataBread} />
          
            <Grid container spacing={3} mt={0.2}>
              <Grid item md={2.8} sm={6} xs={12} mt={2} marginLeft={1} className='card-container'>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography fontWeight={'bold'} fontSize={20}>Total Question Per Day</Typography>
                    </Grid>
                    <Grid item>
                      <Typography textAlign={'center'} fontSize={100}>{dataHistoryPerDay !== null ? dataHistoryPerDay : 'Loading...'}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={2.8} sm={6} xs={12} mt={2} marginLeft={1} className='card-container'>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography fontWeight={'bold'} fontSize={20}>Total Number Per Day</Typography>
                    </Grid>
                    <Grid item>
                      <Typography textAlign={'center'} fontSize={100}>{dataNumber !== null ? dataNumber : 'Loading...'}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={2.8} sm={6} xs={12} mt={2} marginLeft={1} className='card-container'>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography fontWeight={'bold'} fontSize={20}>Total Question Per Month</Typography>
                    </Grid>
                    <Grid item>
                      <Typography textAlign={'center'} fontSize={100}>{dataHistoryPerMonth !== null ? dataHistoryPerMonth : 'Loading...'}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={2.8} sm={6} xs={12} mt={2} marginLeft={1} className='card-container'>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography fontWeight={'bold'} fontSize={20}>Total Number Per Month</Typography>
                    </Grid>
                    <Grid item>
                      <Typography textAlign={'center'} fontSize={100}>{dateNumberPerMonth !== null ? dateNumberPerMonth : 'Loading...'}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
            </Grid>
          

            <Grid container style={{ marginTop: '20px', marginLeft: '10px', maxWidth: '100%' }}>
              <Grid item xs={12} sm={7.5} mt={1}>
                <Typography fontWeight={'bold'} fontSize={24}>History Conversation</Typography>
              </Grid>
              <Grid item xs={12} sm={4} mt={1} alignSelf="center" sx={{textAlign: {xs: "start", sm:"end"}}}>
                <Button
                  variant="contained"
                  onClick={() => showMore()}
                >
                  Show More
                </Button>
              </Grid>

              <Grid container style={{ marginTop: '20px', marginLeft: '10px', maxWidth: '100%' }}>
                <Grid container spacing={2} style={{ fontWeight: 'bold', padding: '10px', borderBottom: '1px solid #ccc' }}>
                  {columns.map((col, index) => (
                    <Grid item key={index} xs={col.flex} style={{ minWidth: col.minWidth }}>
                      {col.headerName}
                    </Grid>
                  ))}
                </Grid>

                {data.slice(-5).map((item, idx) => (
                  <Grid container key={idx} spacing={2} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                    {columns.map((col, index) => (
                      <Grid item key={index} xs={col.flex} style={{ minWidth: col.minWidth }}>
                        {col.field === 'no' ? idx + 1 : item[col.field]}
                      </Grid>
                    ))}
                  </Grid>
                ))}
              </Grid>
              
            </Grid>

        </Grid>
      </SideBar>
    </div>
  )
}

export default Dashboard