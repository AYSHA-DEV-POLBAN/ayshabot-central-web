import React, { useContext, useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import SideBar from '../../../Component/Sidebar';
import Breadcrumbs from "../../../Component/DataBread";
import Header from '../../../Component/Header'
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, IconButton } from '@mui/material';
import '../../../App.css'
import { useNavigate } from 'react-router';
// import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from "react-hook-form";
import FormInputText from '../../../Component/FormInputText';
// import schemacompany from '../shema';
// import client from '../../../global/client';
// import uploadFile from '../../../global/uploadFile';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { AlertContext } from '../../../Context';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import PreviewIcon from "@mui/icons-material/Preview";  
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const DetailInformasi = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [sendData, setData] = useState({})
  const [isSave, setIsSave] = useState(false)
  const { setDataAlert } = useContext(AlertContext)
  const [file, setFile] = useState('')
//   const [companyId, setCompanyId] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [dataDetail, setDataDetail] = useState({})
//   const [filePath, setFilePath] = useState('')
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
      title: isEdit ? "Edit Informasi" : "Detail Informasi",
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


  let methods = useForm({
    // resolver: yupResolver(schemacompany),
    defaultValues: {
      informationName: '',
      desc: '',
      informationStatus: '',
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
  }

  const handleClose = () => {
    if (!isSave) {
    //   navigate('/master-company')
    }
    setOpen(false)
  }
  const onSave = async () => {
//     if(!isSave){
//       setOpen(false)
//     } else{
//       const data = {
//         ...sendData,
//         companyProfile: filePath,
//         createdBy: parseInt(localStorage.getItem('userId')),
//         lastModifiedBy: parseInt(localStorage.getItem('userId')),
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
//         navigate('/master-company')
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

//   const MAX_SIZE_FILE = 3145728;

//   const handleChange = async (e) => {
//     if (e.target.files.length > 0) {
//       const uploadedFile = e.target.files[0];
//       if (uploadedFile.size <= MAX_SIZE_FILE) {
//         if (
//           uploadedFile.type === "image/jpg" ||
//           uploadedFile.type === "image/jpeg" ||
//           uploadedFile.type === "image/png"
//         ) {
//           const tempFilePath = await uploadFile(uploadedFile, 'company');
//           setFilePath(tempFilePath);
//           setFile(URL.createObjectURL(uploadedFile));
//         } else {
//           console.error("Tipe file tidak valid.");
//           setDataAlert({
//                 severity: 'error',
//                 message: "Invalid type file",
//                 open: true
//               })
//         }
//       } else {
//         console.error("File terlalu besar.");
//         setDataAlert({
//           severity: 'error',
//           message: "Company Image can't more than 3MB",
//           open: true
//         })
//       }
//     }
  }


//   const clearPhoto = () => {
//     setFilePath()
//     setFile()
//   }

  const [openSide, setOpenSide] = useState(false);
  const handleDrawerClose = () => { // Fungsi untuk menutup/membuka Sidebar
    setOpenSide(!openSide);
  };

  return (
    // <SideBar>
    <div>
      <SideBar title='Informasi' >
      <Breadcrumbs breadcrumbs={dataBread} />
        <Grid container>
          {/* <Grid item xs={12} sm={8}>
            <Header judul={isEdit ? 'Edit Informasi' : 'Detail Informasi'} />
          </Grid> */}
          {!isEdit && 
            <Grid item xs={12} sm={4} alignSelf='center' sx={{ textAlign: { xs:'start', sm:'end'}}}>
              <Button
                variant='outlined'
                className="button-text"
                startIcon={<EditOutlinedIcon />}
                onClick={() => setIsEdit(true)}
              >
                Edit Informasi
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
                      <Grid item container xs={12}>
                        {isEdit &&
                          <Grid item xs={12} sm={12} mt={2} className='custom-file-upload'>
                            <label className='class-label-upload'>Upload File</label>
                            <input
                              type="file"
                              accept=".pdf"
                              className="custom-file-input"
                              // onChange={handleChange}
                            />
                            {/* {file !== '' ?
                            <IconButton
                              onClick={clearPhoto}>
                              <ClearOutlinedIcon  item xs={2} className='button-clear'
                                // style={{marginLeft: '50px'}}
                              />
                            </IconButton>
                            : ''} */}
                          </Grid>
                        }
                        {isEdit && 
                          <Grid item xs={12} mt={1}>
                            {/* <Typography variant='titleTextWarningUpload'>
                              Single upload file should not be more 3MB. Only the .png/jpg file types are allowed
                            </Typography> */}
                          </Grid>
                        }
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        {isEdit ? (
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
                        ) : (
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail'>Information Name :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='textDetail'>Ini informasi poliklinik</Typography>
                              {/* <Typography variant='inputDetail' style={{ wordBreak: 'break-word' }}>{dataDetail.companyName}</Typography> */}
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        {isEdit ? (
                          <FormInputText
                            focused
                            name='desc'
                            className='input-field-crud'
                            placeholder='e.g Ini adalah fasilitas poliklinik'
                            label='Description *'
                            inputProps={{
                              maxLength: 100,
                            }}
                          />
                        ) : (
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail'>Description :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='textDetail'>Ini informasi poliklinik</Typography>
                              {/* <Typography variant='inputDetail' style={{ wordBreak: 'break-word' }}>{dataDetail.companyEmail}</Typography> */}
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        {isEdit ? ( 
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
                        ) : (
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail'>Information Status :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='textDetail'>Ini informasi poliklinik</Typography>
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

export default DetailInformasi