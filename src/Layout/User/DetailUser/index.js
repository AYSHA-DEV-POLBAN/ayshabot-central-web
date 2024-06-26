import React, { useContext, useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import SideBar from '../../../Component/Sidebar';
import Breadcrumbs from "../../../Component/DataBread";
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';
import '../../../App.css'
import { useNavigate } from 'react-router';
import client from '../../../Global/client';
import { AlertContext } from '../../../Context';

const DetailUser = () => {
  const { setDataAlert } = useContext(AlertContext)
  const [isEdit, setIsEdit] = useState(false)
  const [dataDetail, setDataDetail] = useState({})
  const [detail, setDetail] = useState({})
  const dataBread = [
    {
      href: "/",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/user",
      title: "User",
      current: false,
    },
    {
      href: "/user/detail",
      title: isEdit ? "Edit User" : "Detail User",
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
      endpoint: `/users/get_user_by_id/${id}`
    })
    console.log(res)
    if (res.data) {
      setDetail(res.data) 
    }
  }
  


  return (
    <div>
      <SideBar title='User' > 
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
                              <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Name</Typography>
                            </Grid>
                            <Grid item xs={6}>
                            <Typography variant='labelHeaderDetail' style={{ wordBreak: 'break-word' }}>{detail.name}</Typography>
                                {/* <Typography>Bagas</Typography> */}
                              {/* <Typography variant='inputDetail' style={{ wordBreak: 'break-word' }}>{dataDetail.companyName}</Typography> */}
                            </Grid>
                          </Grid>
                      </Grid>
                      
                      <Grid item xs={12} sm={12}>
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Email</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {/* <Typography>bagass@gmail.com</Typography> */}
                              <Typography variant='labelHeaderDetail'>{detail.email}</Typography>
                            </Grid>
                          </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail' fontWeight={'bold'}>User Level</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {/* <Typography>Admin</Typography> */}
                              <Typography variant='labelHeaderDetail'>{detail.role_id === 1 ? "Superadmin" : "Operator"}</Typography>
                            </Grid>
                          </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail' fontWeight={'bold'}>User Status</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {/* <Typography>Active</Typography> */}
                              <Typography variant='labelHeaderDetail'>{detail.status === 1 ? "Active" : "Non-Active"}</Typography>
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

export default DetailUser