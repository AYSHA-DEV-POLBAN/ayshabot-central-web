import React, { useState } from "react";
import { Typography, IconButton, Button, Avatar, Menu, MenuItem, ListItemIcon, Divider, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, TextField } from "@mui/material";
import FormInputText from "../FormInputText";
import Logout from '@mui/icons-material/Logout';
import Grid from "@mui/material/Grid";
import { useNavigate } from 'react-router';
import '../../App.css'
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from "react-hook-form";
// import FormInputText from '../../../Component/FormInputText';

const Header = ({ title, open }) => { // Terima prop
  const name = localStorage.getItem("name");
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openChange, setOpen] = useState(false)
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/')
  };

  const cancelChange = () => {
    // setIsSave(false)
    setOpen(false)
  }

  const changePass = () => {
    // setIsSave(false)
    setOpen(true)
  }

  const confirmSave = async (data) => {
    // setIsSave(true);
    setOpen(true);
    // setSendData(data);
  };

  const methods = useForm({
    // resolver: yupResolver(validateInput),
    defaultValues: {
      document: '',
      title_information: '',
      category_information_id: '',
      description_information: ''
    }
  });

  return (
    <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ position: 'sticky', top: 0, zIndex: 1100, width: '103.95%', height: '70px', backgroundColor: '#146C94', alignItems: 'center', padding: '0 16px' }}>
      <Grid item xs={11} display={'flex'} alignItems="center">
        <Grid container className="containerHeader">
          <Grid item xs={12} sx={{marginLeft: `${open ? 0 : -15}px`, transition: 'margin-left 0.3s ease, width 0.3s ease', padding: '0 0', marginTop: '-30px'}}>
              <Typography variant="headerCardMenu" padding={1} sx={{ paddingBottom: '0', marginTop: '-30px' }}>
                {`${title}`}
              </Typography>
          </Grid>
        </Grid>
      </Grid>
      
      <Grid item xs={1} display="flex" justifyContent="flex-start" alignItems="center" sx={{ padding: '0 0', marginTop: '-20px' }}>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}> */}
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2, padding: '0', marginTop: '-20px' }}
              aria-controls={openMenu ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              {/* <Typography>dada</Typography> */}
            </IconButton>
          </Tooltip>
        {/* </Box> */}

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
            <Avatar /> {name}
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
            <DialogContentText
              className="dialog-delete-text-content"
              id="alert-dialog-description"
            >
              Are you sure want to change your password?
            </DialogContentText>

            <Grid item xs={12}>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(confirmSave)}>
                    <Grid container rowSpacing={3.79} xs={12} mt={3}>
                      {/* <Grid marginLeft={5}>{errorText && <p style={{ color: 'red' }}>{errorText}</p>}</Grid> */}
                      <Grid item xs={12} sm={12}>
                        <TextField
                          focused
                          name='title_information'
                          className='input-field-crud'
                          placeholder='e.g Fasilitas Poliklinik'
                          label='Information Name *'
                          inputProps={{ maxLength: 50 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          focused
                          name='title_information'
                          className='input-field-crud'
                          placeholder='e.g Fasilitas Poliklinik'
                          label='Information Name *'
                          inputProps={{ maxLength: 50 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          focused
                          name='title_information'
                          className='input-field-crud'
                          placeholder='e.g Fasilitas Poliklinik'
                          label='Information Name *'
                          inputProps={{ maxLength: 50 }}
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
    </Grid>
  );
};

export default Header;
