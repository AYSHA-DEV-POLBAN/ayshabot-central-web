import React, { useState, useEffect, useContext } from 'react';
import { Typography, Grid, Button, CircularProgress } from '@mui/material';
import SideBar from '../../Component/Sidebar';
import client from '../../Global/client';
import { AlertContext } from "../../Context";
import BreadCumbComp from '../../Component/DataBread';
import axios from 'axios';

const GenerateQR = () => {
  const dataBread = [
    {
      href: "/",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/generate_qr",
      title: "Generate QR",
      current: false,
    },
  ];

  const [data, setData] = useState([]);
  const { setDataAlert } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [refreshKey, setRefreshKey] = useState(Date.now());
  const [message, setMessage] = useState('');

  useEffect(() => {
    // getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    
    setShowQR(true)
    const res = await axios.get('http://localhost:8002/create-session', {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
    setData(res);
    setMessage(res.data.message)
    setIsLoading(false);
    console.log(res)
  };

  useEffect(() => {
    if (showQR) {
      const timer = setInterval(() => {
        setRefreshKey(Date.now());
      }, 5000);

      return () => clearInterval(timer); 
    }
  }, [showQR]);

  return (
    <div>
      <SideBar title='Generate QR'>
        <Grid style={{ marginTop: '20px', marginLeft: '10px' }}>
          <BreadCumbComp breadcrumbs={dataBread} />

          <Grid container spacing={2} alignItems={'center'}>
            <Grid item md={12} sm={12} xs={12} marginLeft={1} className='card-container'>
              <Grid container direction="column" alignItems={'center'}>
                <Grid item>
                  <Typography fontWeight={'bold'} fontSize={30} marginTop={5}>
                    Scan QR Code Berikut untuk Mengaktifkan Whatsapp Chatbot
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}  style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '20px'
                }}>
                <Button variant="contained" onClick={getData} fullWidth>
                  Generate QR Code
                </Button>
              </Grid>

            {message && (
              <Grid item xs={12} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px'
              }}>
                <Typography variant="body1">{message}</Typography>
              </Grid>
            )}
              {showQR && data && (
                <Grid item xs={12} height="100%" style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '20px'
                }}>
                  <img src={`http://localhost:8002/uploads/qr_wa/qr_code_image.png?timestamp=${refreshKey}`} style={{
                    width: '30%',
                    minHeight: '30%',
                  }} />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </SideBar>
    </div>
  );
}

export default GenerateQR;
