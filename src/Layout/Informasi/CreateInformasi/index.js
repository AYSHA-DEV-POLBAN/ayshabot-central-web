import React, { useContext, useState } from 'react';
import Grid from "@mui/material/Grid";
import SideBar from '../../../Component/Sidebar';
import Breadcrumbs from "../../../Component/DataBread";
import Header from '../../../Component/Header'
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from '@mui/material';
import '../../../App.css'
import { useNavigate } from 'react-router';
// import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from "react-hook-form";
import FormInputText from '../../../Component/FormInputText';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// import schemacompany from '../shema';
// import client from '../../../global/client';
// import uploadFile from '../../../global/uploadFile';
import { AlertContext } from '../../../Context';

const CreateInfomasi = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [sendData, setData] = useState({})
  const [isSave, setIsSave] = useState(false)
  const { setDataAlert } = useContext(AlertContext)
  const [file, setFile] = useState('')
  const [filePath, setFilePath] = useState('')
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
      href: "/informasi/create",
      title: "Create New Informasi",
      current: true,
    },
  ];


  const optStatus = [
    {label: 'Active'},
    {label: 'Non Active'}
  ]

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

  // const MAX_SIZE_FILE = 3145728;
  // const handleChange = async (e) => {
  //   if (e.target.files.length > 0) {
  //     const uploadedFile = e.target.files[0];
  //     if (uploadedFile.size <= MAX_SIZE_FILE) {
  //       if (
  //         uploadedFile.type === "file/pdf"
  //       ) {
  //         const tempFilePath = await uploadFile(uploadedFile, 'company');
  //         setFilePath(tempFilePath);
  //         setFile(URL.createObjectURL(uploadedFile));
  //       } else {
  //         console.error("Tipe file tidak valid.");
  //         setDataAlert({
  //           severity: 'error',
  //           message: "Invalid type file",
  //           open: true
  //         })
  //       }
  //     } else {
  //       console.error("File terlalu besar.");
  //       setDataAlert({
  //         severity: 'error',
  //         message: "Company Image can't more than 3MB",
  //         open: true
  //       })
  //     }
  //   }
  // }


  const [openSide, setOpenSide] = useState(false);
  const handleDrawerClose = () => { // Fungsi untuk menutup/membuka Sidebar
    setOpenSide(!openSide);
  };


  return (
    <div>
      <Header title='Information' handleDrawerClose={handleDrawerClose} open={openSide} /> {/* Mengirimkan prop */}
        <SideBar open={openSide} handleDrawerClose={handleDrawerClose}> {/* Mengirimkan prop */}
      <Breadcrumbs breadcrumbs={dataBread} />
        <Grid container>
          <Grid item xs={12}>
            <FormProvider {...methods}>
              {/* <form onSubmit={methods.handleSubmit(confirmSave)}> */}
                <div className='card-container'>
                    <Grid 
                      item 
                      container 
                      columnSpacing={3.79}
                      rowSpacing={3.79}
                      xs={12}
                    >
                      <Grid item xs={12} sm={12} mt={2} className='custom-file-upload'>
                        <label className='class-label-upload'>Upload File</label>
                        <input
                          type="file"
                          accept=".pdf"
                          className="custom-file-input"
                          name='file'
                          // onChange={handleChange}
                        />
                        {/* {file !== '' ?
                        <IconButton
                          onClick={clearPhoto}>
                          <ClearOutlinedIcon  item xs={2} className='button-clear'
                          />
                        </IconButton>
                        : ''} */}
                      </Grid>
                      <Grid item xs={12} sm={12}>
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
                      <Grid item xs={12} sm={12}>
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
                      <Grid item xs={12} sm={12}>  
                        <Autocomplete                    
                            disablePortal
                            id="combo-box-demo"
                            name="informationStatus"
                            options={optStatus}
                            sx={{ width: "100%", marginTop: "8px" }}
                            // value={selectedRole}
                            // getOptionLabel={(option) => option.name}
                            // onChange={(event, newValue) => setSelectedRoles(newValue)}
                            // isOptionEqualToValue={(option, value) => option.value === value.value}
                            renderInput={(params) => (
                              <TextField 
                              {...params} 
                              InputLabelProps={{ shrink: true }}   
                              label="Status *" 
                              placeholder="Select Status" 
                              // {...register('role')}
                              // error={errors.role !== undefined}
                              // helperText={errors.role ? errors.role.message : ''}
                              />
                            )}
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
      </div>
  )

}

export default CreateInfomasi