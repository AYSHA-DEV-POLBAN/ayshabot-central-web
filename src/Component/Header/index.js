import React, { useState, useContext } from "react";
import { Typography, IconButton, Button, Avatar, Menu, MenuItem, ListItemIcon, Divider, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Alert,DialogActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import { useForm, FormProvider, Controller } from "react-hook-form";
import client from "../../Global/client";
import { AlertContext } from "../../Context";
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';
import axios from "axios";

const Header = ({ title, open }) => {
  const name = localStorage.getItem("name");
  console.log(name)
  const navigate = useNavigate();
  const { setDataAlert } = useContext(AlertContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openChange, setOpenChange] = useState(false);
  const [sendData, setSendData] = useState({});
  const [isSave, setIsSave] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const openMenu = Boolean(anchorEl);
  const [alertState, setAlertState] = useState({
    open: false,
    message: '',
    severity: '',
  });

  const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const changePass = () => {
    setOpenChange(true);
  };

  const cancelChange = () => {
    setOpenChange(false);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const methods = useForm({
    defaultValues: {
      password_old: '',
      password_new: '',
      password_new_confirmation: '',
    }
  });

  const confirmSave = (data) => {
    setSendData(data);
    setIsSave(true);
    setOpenConfirm(true);
  };

  const onSave = async () => {
    setOpenConfirm(false);

    if (isSave) {
      const data = {
        ...sendData,
      };
      console.log(localStorage.getItem("id_login"))
      const id = localStorage.getItem("id_login");
      const token = localStorage.getItem("token")
      const res = await axios.put(`http://localhost:8001/api/v1/users/change_password/${id}`, sendData, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${token}`
        },
      });
      if (!res.isError) {
        if(res.data.message == "Update Password User Successfully"){
          setDataAlert({
            severity: 'success',
            open: true,
            message: res.status
          });
          navigate("/")
        }
        else{
          setAlertState({
            open: true,
            message: res.data.message,
            severity: 'error',
          });
        }
        console.log("ya")
        console.log("ini", res)

      } else {
        setAlertState({
          open: true,
          message: 'Failed to change password',
          severity: 'error',
        });
      }
    }
  };

  return (
    <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ position: 'sticky', top: 0, zIndex: 1100, width: { xs: '110%', sm: '103.95%' }, height: '70px', backgroundColor: '#146C94', alignItems: 'center', padding: '0 16px' }}>
      <Grid item xs={11} sm={11} display={'flex'} alignItems="center">
        <Grid container className="containerHeader">
          <Grid item xs={12} sx={{marginLeft: `${open ? 0 : -15}px`, transition: 'margin-left 0.3s ease, width 0.3s ease', padding: '0 0', marginTop: '-30px'}}>
            <Typography variant="headerCardMenu" padding={1} sx={{ paddingBottom: '0', marginTop: '-30px' }}>
              {`${title}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={1} display="flex" justifyContent="flex-start" alignItems="center" sx={{ padding: '0 0', marginTop: '-20px' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, padding: '0', marginTop: '-20px' }}
            aria-controls={openMenu ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={openMenu}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            variant:"myMenuVariant"
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <Avatar sx={{ marginRight: 1 }}/> {name}
          </MenuItem>
          <Divider />
          <MenuItem onClick={changePass}>
            <ListItemIcon>
              <LockResetOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Change Password
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Grid>

      <Dialog
        open={openChange}
        onClose={cancelChange}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-delete dialog-task"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" className="dialog-delete-header">
          Change Password
        </DialogTitle>
        <DialogContent className="dialog-task-content">
          {alertState.open && (
            <Alert severity={alertState.severity} onClose={() => setAlertState({ ...alertState, open: false })} sx={{ typography: 'body1', fontSize: '1rem' }}>
              {alertState.message}
            </Alert>
          )}
          <DialogContentText
            className="dialog-delete-text-content"
            id="alert-dialog-description"
          >
            Are you sure you want to change your password?
          </DialogContentText>

          <Grid item xs={12}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(confirmSave)}>
                <Grid container rowSpacing={3.79} xs={12} mt={3}>
                  <Grid item xs={12} sm={12}>
                    <Controller
                      name='password_old'
                      control={methods.control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          focused
                          className='input-field-crud'
                          placeholder='Old Password'
                          label='Old Password *'
                          inputProps={{ maxLength: 50 }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Controller
                      name='password_new'
                      control={methods.control}
                      rules={{
                        validate: (value) => {
                          const { password_new_confirmation } = methods.getValues();
                          return value === password_new_confirmation || "Passwords do not match";
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          focused
                          className='input-field-crud'
                          placeholder='New Password'
                          label='New Password *'
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          inputProps={{ maxLength: 50 }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Controller
                      name='password_new_confirmation'
                      control={methods.control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          focused
                          className='input-field-crud'
                          placeholder='Confirm New Password'
                          label='Confirm New Password *'
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          inputProps={{ maxLength: 50 }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="flex-end" mt={3.5}>
                  <Grid item xs={12} sm={4} textAlign="right">
                    <Button fullWidth variant="cancelButton" onClick={() => cancelChange()}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4} textAlign="right">
                    <Button fullWidth variant="saveButton" type="submit">
                      Save Change
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </FormProvider>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
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
          <Button onClick={handleCloseConfirm} variant='outlined' className="button-text">{isSave ? 'Back' : 'Cancel without saving'}</Button>
          <Button onClick={onSave} variant='saveButton'>{isSave ? 'Save Data' : 'Back'}</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Header;




// import React, { useState, useContext } from "react";
// import { Typography, IconButton, Button, Avatar, Menu, MenuItem, ListItemIcon, Divider, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from "@mui/material";
// import FormInputText from "../FormInputText";
// import Logout from '@mui/icons-material/Logout';
// import Grid from "@mui/material/Grid";
// import { useNavigate } from 'react-router';
// import '../../App.css'
// import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { FormProvider, useForm } from "react-hook-form";
// // import FormInputText from '../../../Component/FormInputText';
// import client from "../../Global/client";
// import { AlertContext } from "../../Context";

// const Header = ({ title, open }) => { // Terima prop
//   const name = localStorage.getItem("name");
//   const navigate = useNavigate()

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [openChange, setOpen] = useState(false)
//   const [sendData, setData] = useState({})
//   const [isSave, setIsSave] = useState(false)
//   const { setDataAlert } = useContext(AlertContext)
//   const [openConfirm, setOpenConfirm] = useState(false)
//   const openMenu = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     navigate('/')
//   };

//   const cancelChange = () => {
//     // setIsSave(false)
//     setOpen(false)
//   }
//   const handleCloseConfirm = () => {
//     // setIsSave(false)
//     setOpenConfirm(false)
//   }

//   const changePass = () => {
//     setIsSave(false)
//     setOpen(true)
//   }

//   const confirmSave = async (data) => {
//     setIsSave(true);
//     setOpenConfirm(true);
//     setData(data);
//     // onSave()
//   };

//   const methods = useForm({
//     // resolver: yupResolver(validateInput),
//     defaultValues: {
//       password_old: '',
//       password_new: '',
//       password_new_confirmation: '',
//     }
//   });

//   const onSave = async () => {
//     if(!isSave){
//       setOpenConfirm(false)
//     } else{
//     const data = {
//       ...sendData,
//     }
//     console.log(data)
//     const id = localStorage.getItem("userID")
//     const res = await client.requestAPI({
//       method: 'PUT',
//       endpoint: `/users/change_password/${id}`,
//       data
//     })
//     console.log(res)
//     if (!res.isError) {
//       setDataAlert({
//         severity: 'success',
//         open: true,
//         message: res.status
//       })
//       setTimeout(() => {
//         navigate('/')
//       }, 3000)
//     } else {
//       setDataAlert({
//         severity: 'error',
//         message: res.error.detail,
//         open: true
//       })
//     }
//         setOpenConfirm(false)
//     }
//   }

//   return (
//     <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ position: 'sticky', top: 0, zIndex: 1100, width: '103.95%', height: '70px', backgroundColor: '#146C94', alignItems: 'center', padding: '0 16px' }}>
//       <Grid item xs={11} display={'flex'} alignItems="center">
//         <Grid container className="containerHeader">
//           <Grid item xs={12} sx={{marginLeft: `${open ? 0 : -15}px`, transition: 'margin-left 0.3s ease, width 0.3s ease', padding: '0 0', marginTop: '-30px'}}>
//               <Typography variant="headerCardMenu" padding={1} sx={{ paddingBottom: '0', marginTop: '-30px' }}>
//                 {`${title}`}
//               </Typography>
//           </Grid>
//         </Grid>
//       </Grid>
      
//       <Grid item xs={1} display="flex" justifyContent="flex-start" alignItems="center" sx={{ padding: '0 0', marginTop: '-20px' }}>
//         {/* <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}> */}
//           <Tooltip title="Account settings">
//             <IconButton
//               onClick={handleClick}
//               size="small"
//               sx={{ ml: 2, padding: '0', marginTop: '-20px' }}
//               aria-controls={openMenu ? 'account-menu' : undefined}
//               aria-haspopup="true"
//               aria-expanded={openMenu ? 'true' : undefined}
//             >
//               <Avatar sx={{ width: 32, height: 32 }}></Avatar>
//               {/* <Typography>dada</Typography> */}
//             </IconButton>
//           </Tooltip>
//         {/* </Box> */}

//         <Menu
//           anchorEl={anchorEl}
//           id="account-menu"
//           open={openMenu}
//           onClose={handleClose}
//           onClick={handleClose}
//           PaperProps={{
//             variant:"myMenuVariant"
//           }}
//           transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//           anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//         >
//           <MenuItem>
//             <Avatar /> {name}
//           </MenuItem>
//           <Divider />
//           <MenuItem onClick={changePass}>
//             <ListItemIcon>
//               <LockResetOutlinedIcon fontSize="small" />
//             </ListItemIcon>
//             Change Password
//           </MenuItem>
//           <MenuItem onClick={handleLogout}>
//             <ListItemIcon>
//               <Logout fontSize="small" />
//             </ListItemIcon>
//             Logout
//           </MenuItem>
//         </Menu>
//       </Grid>


//       <Dialog
//         open={openChange} 
//         onClose={cancelChange}     
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         className="dialog-delete dialog-task"
//         fullWidth
//         >
//           <DialogTitle id="alert-dialog-title" className="dialog-delete-header">
//             Change Password
//           </DialogTitle>
//           <DialogContent className="dialog-task-content">
//             <DialogContentText
//               className="dialog-delete-text-content"
//               id="alert-dialog-description"
//             >
//               Are you sure want to change your password?
//             </DialogContentText>

//             <Grid item xs={12}>
//               <FormProvider {...methods}>
//                 <form onSubmit={methods.handleSubmit(confirmSave)}>
//                     <Grid container rowSpacing={3.79} xs={12} mt={3}>
//                       {/* <Grid marginLeft={5}>{errorText && <p style={{ color: 'red' }}>{errorText}</p>}</Grid> */}
//                       <Grid item xs={12} sm={12}>
//                         <TextField
//                           focused
//                           name='password_old'
//                           className='input-field-crud'
//                           placeholder='e.g Fasilitas Poliklinik'
//                           label='Old Password *'
//                           inputProps={{ maxLength: 50 }}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={12}>
//                         <TextField
//                           focused
//                           name='password_new'
//                           className='input-field-crud'
//                           placeholder='e.g Fasilitas Poliklinik'
//                           label='New Password *'
//                           inputProps={{ maxLength: 50 }}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={12}>
//                         <TextField
//                           focused
//                           name='password_new_confirmation'
//                           className='input-field-crud'
//                           placeholder='e.g Fasilitas Poliklinik'
//                           label='Confirmation New Password *'
//                           inputProps={{ maxLength: 50 }}
//                         />
//                       </Grid>
//                     </Grid>
//                     <Grid container spacing={2} justifyContent="flex-end" mt={3.5}>
//                       <Grid item xs={12} sm={4} textAlign="right">
//                         <Button fullWidth variant="cancelButton" onClick={() => cancelChange()}>
//                           Cancel
//                         </Button>
//                       </Grid>
//                       <Grid item xs={12} sm={4} textAlign="right">
//                         <Button fullWidth variant="saveButton" type="submit">
//                           Save Change
//                         </Button>
//                       </Grid>
//                     </Grid>
//                 </form>
//               </FormProvider>
//             </Grid>
//           </DialogContent>

//       </Dialog>


//       <Dialog
//           open={openConfirm}
//           onClose={handleCloseConfirm}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//           className="dialog-delete"
//         >
//           <DialogTitle id="alert-dialog-title" className='dialog-delete-header'>
//             {isSave ? "Save Data" : 'Cancel Data'}
//           </DialogTitle>
//           <DialogContent className="dialog-delete-content">
//             <DialogContentText className='dialog-delete-text-content' id="alert-dialog-description">
//               {isSave ? 'Save your progress: Don\'t forget to save your data before leaving' : 'Warning: Canceling will result in data loss without saving!'}
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions className="dialog-delete-actions">
//             <Button onClick={handleCloseConfirm} variant='outlined' className="button-text">{isSave ? 'Back' : 'Cancel without saving'}</Button>
//             <Button onClick={onSave} variant='saveButton'>{isSave ? 'Save Data' : 'Back'}</Button>
//           </DialogActions>
//         </Dialog>
//     </Grid>
//   );
// };

// export default Header;
