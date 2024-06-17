import React, { useContext, useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import SideBar from '../../../Component/Sidebar';
import Breadcrumbs from "../../../Component/DataBread";
import { Typography } from '@mui/material';
import '../../../App.css'
import { useNavigate } from 'react-router';
import { AlertContext } from '../../../Context';
import client from '../../../Global/client';

const DetailPrompting = () => {
  const navigate = useNavigate()
  const [dataDetail, setDataDetail] = useState({})
  const [detail, setDetail] = useState({})
  const dataBread = [
    {
      href: "/",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/command",
      title: "Command",
      current: false,
    },
    {
      href: "/command/detail",
      title: "Detail Command",
      current: true,
    },
  ];

  useEffect(() => {
    getDataDetail()
  }, [])

  const getDataDetail = async () => {
    const id = localStorage.getItem('id')
    setDataDetail(id)
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/command/get_command_by_id/${id}`
    })
    if (res.data) {
      setDetail(res.data) 
    }
  }

  return (
    <div>
      <SideBar title='Command' >
      <Grid style={{marginTop:'20px', marginLeft:'10px'}}>
        <Breadcrumbs breadcrumbs={dataBread} />
          <Grid container>
            <Grid item xs={12}>
              <div className='card-container-detail'>
                  <Grid 
                    item 
                    container 
                    columnSpacing={3.79}
                    rowSpacing={3.79}
                    xs={12}
                  >
                    <Grid item xs={12} sm={12}>
                        <Grid container>
                          <Grid item xs={6} sm={6}>
                            <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Command Name :</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant='labelHeaderDetail' style={{ wordBreak: 'break-word' }}>{detail.name_command}</Typography>
                          </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Grid container>
                          <Grid item xs={6} sm={6}>
                            <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Command Response :</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant='labelHeaderDetail' style={{ wordBreak: 'break-word' }}>{detail.response_command}</Typography>
                          </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Grid container>
                          <Grid item xs={6} sm={6}>
                            <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Command Status :</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant='labelHeaderDetail'>{detail.status_command}</Typography>
                          </Grid>
                        </Grid>
                    </Grid>
                  </Grid>
              </div>
            </Grid>
          </Grid>
      </Grid>
      </SideBar>
    </div>
  )

}

export default DetailPrompting