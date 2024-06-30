import React, { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import SideBar from '../../../Component/Sidebar';
import Breadcrumbs from "../../../Component/DataBread";
import { Typography } from '@mui/material';
import '../../../App.css'
import client from '../../../Global/client';

const DetailHistoryConversation = () => {
  const [dataDetail, setDataDetail] = useState({})
  const [detail, setDetail] = useState({})
  const dataBread = [
    {
      href: "/",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/history_conversation",
      title: "History Conversation",
      current: false,
    },
    {
      href: "/history_conversation/detail",
      title: "Detail History Conversation",
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
      endpoint: `/conversation/get_conversation_by_id/${id}`
    })
    console.log(res)
    if (res.data) {
      setDetail({...res.data, whatsapp: res.data.Client.whatsapp_number}) 
    }
  }


  return (
    <div>
      <SideBar title='History Conversation' >
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
                              <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Phone Number :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {/* <Typography variant='textDetail'>0812342131234</Typography> */}
                              <Typography variant='labelHeaderDetail' style={{ wordBreak: 'break-word' }}>{detail.whatsapp}</Typography>
                            </Grid>
                          </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Question :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {/* <Typography variant='textDetail'>ada poliklinik mata?</Typography> */}
                              <Typography variant='labelHeaderDetail' style={{ wordBreak: 'break-word' }}>{detail.question_client}</Typography>
                            </Grid>
                          </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Answer :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {/* <Typography variant='textDetail'>Di sini ada poliklinik mata</Typography> */}
                              <Typography variant='labelHeaderDetail'>{detail.response_system}</Typography>
                            </Grid>
                          </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Chunk Relevant :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {/* <Typography variant='textDetail'>poliklinik mata</Typography> */}
                              <Typography variant='labelHeaderDetail'>{detail.chunk_relevant}</Typography>
                            </Grid>
                          </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail' fontWeight={'bold'}>Bill :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {/* <Typography variant='textDetail'>$0.02</Typography> */}
                              <Typography variant='labelHeaderDetail'>{detail.bill}</Typography>
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

export default DetailHistoryConversation