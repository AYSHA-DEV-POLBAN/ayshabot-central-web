import React, { useContext, useState } from 'react';
import Grid from "@mui/material/Grid";
import SideBar from '../../../Component/Sidebar';
// import Breadcrumbs from "../../../Component/BreadCumb";
import Header from '../../../Component/Header'
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Avatar, IconButton } from '@mui/material';
import '../../../App.css'
import { useNavigate } from 'react-router';
// import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from "react-hook-form";
import FormInputText from '../../../Component/FormInputText';
// import schemacompany from '../shema';
// import client from '../../../global/client';
// import uploadFile from '../../../global/uploadFile';
// import { AlertContext } from '../../../context';

const CreateInfomasi = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [sendData, setData] = useState({})
  const [isSave, setIsSave] = useState(false)
//   const { setDataAlert } = useContext(AlertContext)
  const [file, setFile] = useState('')
  const [filePath, setFilePath] = useState('')
//   const dataBread = [
//     {
//       href: "/dashboard",
//       title: "Dashboard",
//       current: false,
//     },
//     {
//       href: "/master-company",
//       title: "Company",
//       current: false,
//     },
//     {
//       href: "/master-company/create",
//       title: "Create New Company",
//       current: true,
//     },
//   ];

  const cancelData = () => {
    setIsSave(false)
    setOpen(true)
  }

  const confirmSave = async (data) => {
    setIsSave(true)
    setOpen(true)
    setData(data)
  }

  const methods = useForm({
    // resolver: yupResolver(schemacompany),
    defaultValues: {
      informationName: '',
      desc: '',
      informationStatus: '',
    }
  })

  const handleClose = () => {
    if (!isSave) {
      navigate('/informasi')
    }
    setOpen(false)
  }
  const onSave = async () => {
    if(!isSave){
      setOpen(false)
    } else{
    //   if(filePath >= MAX_SIZE_FILE){
        
    //     setDataAlert({
    //       severity: 'error',
    //       message: 'Max Image Size is 3 MB',
    //       open: true
    //     })
    //   }
    //   else{
    //     const data = {
    //       ...sendData,
    //       companyProfile: filePath,
    //       createdBy: parseInt(localStorage.getItem('userId')),
    //       lastModifiedBy: parseInt(localStorage.getItem('userId'))
    //     }
    //     const res = await client.requestAPI({
    //       method: 'POST',
    //       endpoint: '/company/addCompany',
    //       data
    //     })
    //     if (!res.isError) {
    //       setDataAlert({
    //         severity: 'success',
    //         open: true,
    //         message: res.data.meta.message
    //       })
    //       setTimeout(() => {
    //         navigate('/master-company')
    //       }, 3000)
    //     } else {
    //       setDataAlert({
    //         severity: 'error',
    //         message: res.error.detail,
    //         open: true
    //       })
    //     }
        setOpen(false)
    //   }
    }
  }


  return (
    <SideBar>
      {/* <Breadcrumbs breadcrumbs={dataBread} /> */}
        <Grid container>
          <Grid item xs={12} sm={6} pb={2}>
            <Header judul='Create New Informasi' />
          </Grid>
          <Grid item xs={12}>
            <FormProvider {...methods}>
            {/* <FormProvider> */}
              {/* <form onSubmit={methods.handleSubmit(confirmSave)}> */}
                <div className='card-container'>
                    <Grid 
                      item 
                      container 
                      columnSpacing={3.79}
                      rowSpacing={3.79}
                      xs={12}
                    >
                        <Grid item xs={12} sm={6}>
                        <FormInputText
                          focused
                          name='informationName'
                          className='input-field-crud'
                          placeholder='e.g Fasilitas Poliklinik'
                          label='Information Name *'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormInputText
                          focused
                          name='desc'
                          className='input-field-crud'
                          placeholder='e.g Ini adalah fasilitas poliklinik'
                          label='Description*'
                          inputProps={{
                            maxLength: 100,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormInputText
                          focused
                          name='informationStatus'
                          className='input-field-crud'
                          placeholder='e.g '
                          label='Information Status*'
                          inputProps={{
                            maxLength: 25,
                          }}
                        />
                      </Grid>
                    </Grid>
                    
                <Grid container spacing={2} justifyContent="flex-end" mt={3.5}>
                <Grid item xs={12} sm={2} textAlign="right">
                  <Button
                    fullWidth
                    variant="cancelButton"
                    onClick={() => cancelData()}
                  >
                    Cancel Data
                  </Button>
                </Grid>
                <Grid item xs={12} sm={2} textAlign="right">
                  <Button 
                    fullWidth
                    variant="saveButton"
                    type="submit"
                  >
                    Save Data
                  </Button>
                </Grid>
              </Grid>
                </div>
              {/* </form> */}
            </FormProvider>
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-delete"
        >
          <DialogTitle id="alert-dialog-title" className='dialog-delete-header'>
            {isSave ? "Save Data" : 'Cancel Data'}
          </DialogTitle>
          <DialogContent className="dialog-delete-content">
            <DialogContentText className='dialog-delete-text-content' id="alert-dialog-description">
              {isSave ? 'Save your progress: Don\'t forget to save your data before leaving' : 'Warning: Canceling will result in data loss without saving!'}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-delete-actions">
            <Button onClick={handleClose} variant='outlined' className="button-text">{isSave ? 'Back' : 'Cancel without saving'}</Button>
            <Button onClick={onSave} variant='saveButton'>{isSave ? 'Save Data' : 'Back'}</Button>
          </DialogActions>
        </Dialog>
    </SideBar>
  )

}

export default CreateInfomasi