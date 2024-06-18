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
      minWidth: 240,
    },
    {
      field: 'answer',
      headerName: 'Answer',
      flex: 1 ,
      minWidth: 100
    },
    {
      field: 'bill',
      headerName: 'Bill',
      flex: 1 ,
      minWidth: 100
    },
  ];

  useEffect(() => {
    getDataNumberPerDay()
    getHistoryPerDay()
    getHistoryPerMonth()
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
        no: number + (index + 1),
        id: value.id,
        phoneNumber: value.client_id,
        question: value.question_client,
        answer: value.response_system,
        bill: value.bill,
      }
    })    

    if (filter.sortName && filter.sortType) {
      temp.sort((a, b) => {
        const valueA = (typeof a[filter.sortName] === 'string') ? a[filter.sortName].toLowerCase() : '';
        const valueB = (typeof b[filter.sortName] === 'string') ? b[filter.sortName].toLowerCase() : '';
        if (filter.sortType === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
    }

    setData([...temp])
    setTotalData(resData.data.length)
  }

  const onFilter = (dataFilter) => {
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName: dataFilter.sorting.field !== '' ? dataFilter.sorting[0].field : 'question',
      sortType: dataFilter.sorting.sort !== '' ? dataFilter.sorting[0].sort : 'asc',
      search: filter.search
    })
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
          

            <Grid container style={{ marginTop: '20px', marginLeft: '10px', maxWidth: '100%' }}>
              {/* <Grid item md={12} sm={12} xs={12} className='data-table-container'> */}
                <DataTable
                data={data}
                columns={columns}
                onFilter={(dataFilter => onFilter(dataFilter))}
                totalData={totalData}
                getRowHeight={() => 'auto'} getEstimatedRowHeight={() => 200}
                hideAddButton={true}
                autoHeight
                autoWidth
              />
              {/* </Grid> */}
            </Grid>
        </Grid>
      </SideBar>
    </div>
  )
}

export default Dashboard