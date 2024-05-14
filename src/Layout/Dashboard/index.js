import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@mui/material';
import SideBar from '../../Component/Sidebar';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import Header from '../../Component/Header';


const Dashboard = () => {


  const [data, setData] = useState([]);
  const [idHapus,setidHapus] = useState();
  const [totalData, setTotalData] = useState();
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'taskName',
    sortType: 'asc',
    search: ''
  })


  useEffect(() => {
    // getData()
  }, [filter])

  const getData = async () => {
    // const res = await client.requestAPI({
    //   method: 'GET',
    //   endpoint: `/backlog?page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}&search=${filter.search}`
    // })
    // rebuildData(res)
  }  

  const onFilter = (dataFilter) => {
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName: dataFilter.sorting.field !== '' ? dataFilter.sorting[0].field : 'taskName',
      sortType: dataFilter.sorting.sort !== '' ? dataFilter.sorting[0].sort : 'asc',
      search: filter.search
    })
  }

  return (
    <div>
      <SideBar>
        <Header judul='Dashboard' />
        <Grid container>
          <Grid container item md={4} sm={6} xs={12} className='card-container'>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={500}
              height={300}
            />
          </Grid>
          <Grid container item md={4} sm={6} xs={12} marginLeft={3} className='card-container'>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'series A' },
                    { id: 1, value: 15, label: 'series B' },
                    { id: 2, value: 20, label: 'series C' },
                  ],
                },
              ]}
              width={400}
              height={200}
            />
          </Grid>
        </Grid>
      </SideBar>
    </div>
  )
}

export default Dashboard