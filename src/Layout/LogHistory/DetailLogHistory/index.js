import React, { useContext, useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import SideBar from '../../../Component/Sidebar';
import Breadcrumbs from "../../../Component/DataBread";
import { Typography } from '@mui/material';
import '../../../App.css'
import { useNavigate } from 'react-router';
import { AlertContext } from '../../../Context';
import client from '../../../Global/client';

const DetailLogHistory = () => {
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
      href: "/logHistory",
      title: "Log History",
      current: false,
    },
    {
      href: "/logHistory/detail",
      title: "Detail Log History",
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
      endpoint: `/log-history/get_log_history_by_id/${id}`
    })

    if (res.data) {
      // Format the createdAt date
      const formattedDate = new Date(res.data.createdAt).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      });
  
      setDetail({ ...res.data, createdAt: formattedDate });
    }
  }

  return (
    <div>
      <SideBar title='Log History' >
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
                    <Grid item xs={12} sm={6}>
                        <Grid container>
                          <Grid item xs={6} sm={6}>
                            <Typography variant='labelHeaderDetail' fontWeight={'bold'}>User :</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant='labelHeaderDetail' style={{ wordBreak: 'break-word' }}>{detail.user_id}</Typography>
                          </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container>
                          <Grid item xs={6} sm={6}>
                            <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Date :</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant='labelHeaderDetail' style={{ wordBreak: 'break-word' }}>{detail.createdAt}</Typography>
                          </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container>
                          <Grid item xs={6} sm={6}>
                            <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Action :</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant='labelHeaderDetail'>{detail.action_name}</Typography>
                          </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container>
                          <Grid item xs={6} sm={6}>
                            <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Table :</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant='labelHeaderDetail'>{detail.table_name}</Typography>
                          </Grid>
                        </Grid>
                    </Grid>
                    
                    <Grid item xs={12} sm={12}>
                        <Grid container>
                          <Grid item xs={6} sm={2.9}>
                            <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Action Data :</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant='labelHeaderDetail'>{detail.action_data}</Typography>
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

export default DetailLogHistory