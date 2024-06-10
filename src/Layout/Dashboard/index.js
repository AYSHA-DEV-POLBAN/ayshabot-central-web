import React, { useState, useEffect, useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import SideBar from '../../Component/Sidebar';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import Header from '../../Component/Header';
import BreadCumbComp from '../../Component/DataBread';


const Dashboard = () => {


  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState();
  const dataBread = [
    {
      href: "/",
      title: "Dashboard",
      current: false,
    },
  ];

  useEffect(() => {
    // getData()
  }, [])

  const getData = async () => {
    // const res = await client.requestAPI({
    //   method: 'GET',
    //   endpoint: `/backlog?page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}&search=${filter.search}`
    // })
    // rebuildData(res)
  }  

  const [openSide, setOpenSide] = useState(false);
  const handleDrawerClose = () => { // Fungsi untuk menutup/membuka Sidebar
    setOpenSide(!openSide);
  };

  return (
    <div>
      <SideBar title='Dashboard' >
        <BreadCumbComp breadcrumbs={dataBread} />
        <Grid container style={{marginTop: '20px'}}>
          <Grid container item md={5} sm={6} xs={6} className='card-container'>
            <Typography>Lorem</Typography>
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
          <Grid container item md={6} sm={6} xs={6} marginLeft={3} className='card-container'>
          <Typography>Lorem</Typography>
          <div style={{marginTop: '60px'}}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'series A' },
                    { id: 1, value: 15, label: 'series B' },
                    { id: 2, value: 20, label: 'series C' },
                    { id: 3, value: 20, label: 'series D' },
                  ],
                },
              ]}
              width={400}
              height={200}
            />
            </div>
          </Grid>
        </Grid>
      </SideBar>
    </div>
  )
}

export default Dashboard