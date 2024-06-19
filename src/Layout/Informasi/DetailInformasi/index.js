import React, { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import SideBar from '../../../Component/Sidebar';
import Breadcrumbs from "../../../Component/DataBread";
import { Typography } from '@mui/material';
import '../../../App.css'
import { useNavigate } from 'react-router';
import client from '../../../Global/client';

const DetailInformasi = () => {
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
      href: "/informasi",
      title: "Informasi",
      current: false,
    },
    {
      href: "/informasi/detail",
      title: "Detail Informasi",
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
      endpoint: `/information/get_information_by_id/${id}`
    })

    if (res.data) {
      setDetail(res.data) 
    }
  }
  

  const [openSide, setOpenSide] = useState(false);
  const handleDrawerClose = () => {
    setOpenSide(!openSide);
  };

  return (
    // <SideBar>
    <div>
      <SideBar title='Informasi' >
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
                              <Typography variant='labelHeaderDetail'  fontWeight={'bold'}>Information Name :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant='labelHeaderDetail' style={{ wordBreak: 'break-word' }}>{detail.title_information}</Typography>
                            </Grid>
                          </Grid>
                      </Grid>
                      
                      <Grid item xs={12} sm={12}>
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail'  fontWeight={'bold'}>Category Information :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant='labelHeaderDetail' style={{ wordBreak: 'break-word' }}>{detail.CategoryInformation.name_category_information}</Typography>
                            </Grid>
                          </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Name File :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant='labelHeaderDetail'>{detail.file_path_information}</Typography>
                            </Grid>
                          </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Description :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant='labelHeaderDetail' style={{ wordBreak: 'break-word' }}>{detail.description_information}</Typography>
                            </Grid>
                          </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Information Status :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant='labelHeaderDetail'>{detail.status_information}</Typography>
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

export default DetailInformasi