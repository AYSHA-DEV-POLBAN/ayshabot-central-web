import React, { useContext, useState } from 'react';
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
import { yupResolver } from '@hookform/resolvers/yup';
import validateInput from '../validate';



const CreatePrompting = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [sendData, setData] = useState({})
  const [isSave, setIsSave] = useState(false)
  const { setDataAlert } = useContext(AlertContext)

  const dataBread = [
    {
      href: "/",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/command",
      title: "Command",
      current: false,
    },
    {
      href: "/command/create",
      title: "Create New Command",
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

  const methods = useForm({
    resolver: yupResolver(validateInput),
    defaultValues: {
      name_command: '',
      response_command:''
    }
  })

  const handleClose = () => {
    if (!isSave) {
      navigate('/command')
    }
    setOpen(false)
  }
  const onSave = async () => {
    if(!isSave){
      setOpen(false)
    } else{
        const data = {
          ...sendData
        }

        console.log(sendData)
        
        console.log(data)
        const res = await client.requestAPI({
          method: 'POST',
          endpoint: '/command/create',
          data
        })
        console.log(res)

        
        if (!res.isError) {
          setDataAlert({
            severity: 'success',
            open: true,
            message: res.message
          })
          setTimeout(() => {
            navigate('/command')
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
    <div>
      <SideBar title='Command' >
      <Grid style={{marginTop:'20px', marginLeft:'10px'}}>
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
                          name='name_command'
                          className='input-field-crud'
                          placeholder='e.g Cek Dokter'
                          label='Command Name *'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormInputText
                          focused
                          name='response_command'
                          className='input-field-crud'
                          placeholder='e.g Jadwal Dokter Hari Ini'
                          label='Response Command*'
                          inputProps={{
                            maxLength: 501,
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
                    // onClick={() => confirmSave()}
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

export default CreatePrompting