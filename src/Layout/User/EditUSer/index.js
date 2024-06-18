import React, { useContext, useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import SideBar from '../../../Component/Sidebar';
import Breadcrumbs from "../../../Component/DataBread";
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import '../../../App.css'
import { useNavigate } from 'react-router';
import { FormProvider, useForm } from "react-hook-form";
import FormInputText from '../../../Component/FormInputText';
import client from '../../../Global/client';
import { AlertContext } from '../../../Context';
import validateInput from '../validate';
import { yupResolver } from '@hookform/resolvers/yup';



const EditUser = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [sendData, setData] = useState({})
  const [isSave, setIsSave] = useState(false)
  const { setDataAlert } = useContext(AlertContext)
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
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
      href: "/user/create",
      title: "Edit Operator",
      current: true,
    },
  ];


  const cancelData = () => {
    setIsSave(false)
    setOpen(true)
  }

  const confirmSave = async (data) => {
    setIsSave(true)
    setOpen(true)
    setData(data)
  }

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      fetchData(id);
    } else {
      navigate('/category_information');
    }
  }, []);

  const fetchData = async (id) => {
    try {
      const res = await client.requestAPI({
        method: 'GET',
        endpoint: `/users/get_user_by_id/${id}`, 
      });
      setCategoryName(res.data.name);
      setCategoryDescription(res.data.email);

      methods.setValue('name', res.data.name);
      methods.setValue('email', res.data.email);
    } catch (error) {
      console.error('Failed to fetch category data:', error);
    }
  };

  const methods = useForm({
    resolver: yupResolver(validateInput),
    defaultValues: {
      name: '',
      email: '',
    }
  })

  const handleClose = () => {
    if (!isSave) {
      navigate('/user')
    }
    setOpen(false)
  }

  const onSaveEdit = async () => {
    if(!isSave){
      setOpen(false)
    } else{
    const data = {
      ...sendData,
    }
    console.log(data)
    const id = localStorage.getItem("id")
    const res = await client.requestAPI({
      method: 'PUT',
      endpoint: `/users/edit/${id}`,
      data
    })
    console.log(res)
    if (!res.isError) {
      setDataAlert({
        severity: 'success',
        open: true,
        message: res.status
      })
      setTimeout(() => {
        navigate('/user')
      }, 3000)
    } else {
      setDataAlert({
        severity: 'error',
        message: res.error.detail,
        open: true
      })
    }
        setOpen(false)
    }
  }


  return (
    // <SideBar>
    <div>
      <SideBar title='User' >
      <Breadcrumbs breadcrumbs={dataBread} />
        <Grid container>
          <Grid item xs={12}>
              <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(confirmSave)}>
                <div className='card-container'>
                    <Grid 
                      item 
                      container 
                      columnSpacing={3.79}
                      rowSpacing={3.79}
                      xs={12}
                    >
                        <Grid item xs={12} sm={12}>
                        <FormInputText
                          focused
                          name='name'
                          className='input-field-crud'
                          placeholder='e.g Aslan Islan'
                          label='Name *'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormInputText
                          focused
                          name='email'
                          className='input-field-crud'
                          placeholder='e.g aslanislan@gmail.com'
                          label='Email *'
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
              </form>
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
            <Button onClick={onSaveEdit} variant='saveButton'>{isSave ? 'Save Data' : 'Back'}</Button>
          </DialogActions>
        </Dialog>
     </SideBar>
        </div>
  )

}

export default EditUser