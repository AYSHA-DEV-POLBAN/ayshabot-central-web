import React, { useContext, useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import SideBar from '../../../Component/Sidebar';
import Breadcrumbs from "../../../Component/DataBread";
import Header from '../../../Component/Header'
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';
import '../../../App.css'
import { useNavigate } from 'react-router';
// import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from "react-hook-form";
import FormInputText from '../../../Component/FormInputText';
// import schemacompany from '../shema';
// import client from '../../../global/client';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { AlertContext } from '../../../Context';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const DetailUser = () => {
  const [dataProject, setDataProject] = useState([]) 
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [sendData, setData] = useState({})
  const [isSave, setIsSave] = useState(false)
  const { setDataAlert } = useContext(AlertContext)
  const [isEdit, setIsEdit] = useState(false)
  const [dataDetail, setDataDetail] = useState({})
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


  const optStatus = [
    {label: "Active"},
    {label: "Non Active"}
  ]

  const optLevel = [
    {label: "Admin"},
    {label: "Operator"}
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


  let methods = useForm({
    // resolver: yupResolver(schemacompany),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      email: '',
      userLevel: '',
      userStatus: '',
    }
  })


  useEffect(() => {
    getDataDetail()
  }, [])

  const getDataDetail = async () => {
    // const id = localStorage.getItem('companyId')
    // setCompanyId(id)
    // const res = await client.requestAPI({
    //   method: 'GET',
    //   endpoint: `/company/${id}`
    // })
    // if (res.data.attributes) {
    //   buildDataComp(res.data.attributes.projects)
    //   const temp = res.data.attributes
    //   delete temp.createdBy
    //   delete temp.createdOn
    //   delete temp.isActive
    //   delete temp.lastModifiedBy
    //   delete temp.lastModifiedOn
    //   for (const property in temp) {
    //     if (property === 'companyProfile') {
    //       const urlMinio = temp[property] ? `${process.env.REACT_APP_BASE_API}/${temp[property]}` : ''
    //       setFilePath(temp[property])
    //       setFile(urlMinio)
    //     } else {
    //       methods.setValue(`${property}`, `${temp[property]}`)
    //       setDataDetail(temp)
    //     }
    //   }
    // }
  }

  const buildDataComp = (dataCom) => {
    let number = 0
    const temp = dataCom.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.projectId,
        ...value
      }
    })
    setDataProject(temp)
  }

  const handleClose = () => {
    if (!isSave) {
      navigate('/user')
    }
    setOpen(false)
  }
  const onSave = async () => {
//     if(!isSave){
//       setOpen(false)
//     } else{
//       const data = {
//         ...sendData,
//       }
//       const res = await client.requestAPI({
//         method: 'PUT',
//         endpoint: `/company/${companyId}`,
//         data
//       })
//       if (!res.isError) {
//         setDataAlert({
//           severity: 'success',
//           open: true,
//           message: res.data.meta.message
//         })
//         navigate('')
//       } else {
//         setDataAlert({
//           severity: 'error',
//           message: res.error.detail,
//           open: true
//         })
//       }
//       setOpen(false)
//     }
//   }

  }

  const [openSide, setOpenSide] = useState(false);
  const handleDrawerClose = () => { // Fungsi untuk menutup/membuka Sidebar
    setOpenSide(!openSide);
  };

  return (
    // <SideBar>
    <div>
      <Header title='User' handleDrawerClose={handleDrawerClose} open={openSide} /> {/* Mengirimkan prop */}
        <SideBar open={openSide} handleDrawerClose={handleDrawerClose}> {/* Mengirimkan prop */}
        
      <Breadcrumbs breadcrumbs={dataBread} />
        <Grid container>
          {/* <Grid item xs={12} sm={8}>
            <Header judul={isEdit ? 'Edit User' : 'Detail User'} />
          </Grid> */}
          {!isEdit && 
            <Grid item xs={12} sm={4} alignSelf='center' sx={{ textAlign: { xs:'start', sm:'end'}}}>
              <Button
                variant='outlined'
                className="button-text"
                startIcon={<EditOutlinedIcon />}
                onClick={() => setIsEdit(true)}
              >
                Edit User
              </Button>
            </Grid>
          }
          <Grid item xs={12}>
            <FormProvider {...methods}>
              {/* <form onSubmit={methods.handleSubmit(confirmSave)}> */}
                <div className='card-container-detail'>
                    <Grid 
                      item 
                      container 
                      columnSpacing={3.79}
                      rowSpacing={3.79}
                      xs={12}
                    >
                      <Grid item xs={12} sm={6}>
                        {isEdit ? (
                          <FormInputText
                            focused
                            name='name'
                            className='input-field-crud'
                            placeholder='e.g Bagas'
                            label='Name *'
                            inputProps={{
                              maxLength: 50,
                            }}
                          />
                        ) : (
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Typography variant='labelHeaderDetail'>Name</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Bagas</Typography>
                              {/* <Typography variant='inputDetail' style={{ wordBreak: 'break-word' }}>{dataDetail.companyName}</Typography> */}
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {isEdit ? (
                          <FormInputText
                            focused
                            name='username'
                            className='input-field-crud'
                            placeholder='e.g bagassss_'
                            label='Username *'
                            inputProps={{
                              maxLength: 100,
                            }}
                          />
                        ) : (
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Typography variant='labelHeaderDetail'>Username</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>bagassss_</Typography>
                              {/* <Typography variant='inputDetail' style={{ wordBreak: 'break-word' }}>{dataDetail.companyEmail}</Typography> */}
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {isEdit ? (
                          <FormInputText
                            focused
                            name='password'
                            className='input-field-crud'
                            placeholder='e.g Abcd123_'
                            label='Password *'
                            inputProps={{
                              maxLength: 25,
                            }}
                          />
                        ) : (
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Typography variant='labelHeaderDetail'>Password</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Abcd123_</Typography>
                              {/* <Typography variant='inputDetail'>{dataDetail.npwp}</Typography> */}
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        {isEdit ? (
                          <FormInputText
                            focused
                            name='email'
                            className='input-field-crud'
                            placeholder='e.g bagass@gmail.com'
                            label='Email *'
                            inputProps={{
                              maxLength: 25,
                            }}
                          />
                        ) : (
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Typography variant='labelHeaderDetail'>Email</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>bagass@gmail.com</Typography>
                              {/* <Typography variant='inputDetail'>{dataDetail.npwp}</Typography> */}
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {isEdit ? ( 
                          <Autocomplete                    
                              disablePortal
                              id="combo-box-demo"
                              name="userLevel"
                              options={optLevel}
                              sx={{ width: "100%", marginTop: "8px" }}
                              // value={selectedRole}
                              // getOptionLabel={(option) => option.name}
                              // onChange={(event, newValue) => setSelectedRoles(newValue)}
                              // isOptionEqualToValue={(option, value) => option.value === value.value}
                              renderInput={(params) => (
                                <TextField 
                                {...params} 
                                InputLabelProps={{ shrink: true }}   
                                label="Level *" 
                                placeholder="Select Status" 
                                // {...register('role')}
                                // error={errors.role !== undefined}
                                // helperText={errors.role ? errors.role.message : ''}
                                />
                              )}
                            />
                        ) : (
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Typography variant='labelHeaderDetail'>User Level</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Admin</Typography>
                              {/* <Typography variant='inputDetail'>{dataDetail.npwp}</Typography> */}
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {isEdit ? (
                          <Autocomplete                    
                              disablePortal
                              id="combo-box-demo"
                              name="userStatus"
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
                        ) : (
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Typography variant='labelHeaderDetail'>User Status</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Active</Typography>
                              {/* <Typography variant='inputDetail'>{dataDetail.npwp}</Typography> */}
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  {isEdit && (
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
                  )}
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

export default DetailUser