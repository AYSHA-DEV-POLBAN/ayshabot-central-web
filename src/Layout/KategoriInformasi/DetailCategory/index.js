import React, { useContext, useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import SideBar from '../../../Component/Sidebar';
import Breadcrumbs from "../../../Component/DataBread";
import { Typography } from '@mui/material';
import '../../../App.css'
import { useNavigate } from 'react-router';
import client from '../../../Global/client';

const DetailCategory = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [idDetail, setDataDetail] = useState({})
  const [dataDetail, setDetail] = useState({})
  const dataBread = [
    {
      href: "/",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/category_information",
      title: "Category Information",
      current: false,
    },
    {
      href: "/category_information/detail",
      title: "Detail Category Information",
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
        endpoint: `/category-information/get_category_information_by_id/${id}`
      })
      console.log(res)
      if (res.data) {
        setDetail(res.data) 
      }
  }


  return (
    <div>
      <SideBar title='Category Information' >
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
                        <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Category Name :</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='labelHeaderDetail' style={{ wordBreak: 'break-word' }}>{dataDetail.name_category_information}</Typography>
                      </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Grid container>
                      <Grid item xs={6} sm={6}>
                        <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Description :</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='labelHeaderDetail' style={{ wordBreak: 'break-word' }}>{dataDetail.description_category_information}</Typography>
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

export default DetailCategory