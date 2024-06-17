import React, { useContext, useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import SideBar from '../../../Component/Sidebar';
import Breadcrumbs from "../../../Component/DataBread";
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Autocomplete } from '@mui/material';
import '../../../App.css';
import { useNavigate } from 'react-router';
import { FormProvider, useForm } from "react-hook-form";
import FormInputText from '../../../Component/FormInputText';
import client from '../../../Global/client';
import { AlertContext } from '../../../Context';
import axios from 'axios';

const CreateInfomasi = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sendData, setSendData] = useState({});
  const [isSave, setIsSave] = useState(false);
  const { setDataAlert } = useContext(AlertContext);
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState('');
  const [optCategory, setOptCategory] = useState([]);
  
  const MAX_SIZE_FILE = 3145728; // 3 MB

  const dataBread = [
    { href: "/", title: "Dashboard", current: false },
    { href: "/informasi", title: "Informasi", current: false },
    { href: "/informasi/create", title: "Create New Informasi", current: true },
  ];

  const cancelData = () => {
    setIsSave(false);
    setOpen(true);
  };

  const confirmSave = async (data) => {
    setIsSave(true);
    setOpen(true);
    setSendData(data);
  };

  const methods = useForm({
    defaultValues: {
      document: '',
      title_information: '',
      category_information_id: '',
      description_information: ''
    }
  });

  useEffect(() => {
    getCategory();
  }, []);

  const handleClose = () => {
    if (!isSave) {
      navigate('/informasi');
    }
    setOpen(false);
  };

  const getCategory = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: '/category-information/',
    });
    const data = res.data.map(item => ({ id: item.id, name: item.name_category_information }));
    setOptCategory(data);
  };

  const onSave = async () => {
    if (!isSave) {
      setOpen(false);
    } else {
      if (file && file.size >= MAX_SIZE_FILE) {
        setDataAlert({
          severity: 'error',
          message: 'Max File Size is 3 MB',
          open: true
        });
      } else {
        const formData = new FormData();
        formData.append('document', file);
        formData.append('title_information', sendData.title_information);
        formData.append('category_information_id', sendData.category_information_id);
        formData.append('description_information', sendData.description_information);

        try {
          const res = await axios.post('http://localhost:8001/api/v1/information/create_with_upload_file', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          if (res.status === 200) {
            setDataAlert({
              severity: 'success',
              open: true,
              message: res.data.meta.message
            });
            setTimeout(() => {
              navigate('/informasi');
            }, 3000);
          } else {
            setDataAlert({
              severity: 'error',
              message: res.data.message || 'Error uploading file',
              open: true
            });
          }
        } catch (error) {
          setDataAlert({
            severity: 'error',
            message: error.message || 'Error uploading file',
            open: true
          });
        }
        navigate('/informasi');
        setOpen(false);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setFilePath(file.name);
  };

  return (
    <div>
      <SideBar title='Informasi'>
        <Breadcrumbs breadcrumbs={dataBread} />
        <Grid container>
          <Grid item xs={12}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(confirmSave)}>
                <div className='card-container'>
                  <Grid container columnSpacing={3.79} rowSpacing={3.79} xs={12}>
                    <Grid item xs={12} sm={12} mt={2} className='custom-file-upload'>
                      <label className='class-label-upload'>Upload File</label>
                      <input
                        type="file"
                        accept=".pdf"
                        className="custom-file-input"
                        name='document'
                        onChange={handleFileChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormInputText
                        focused
                        name='title_information'
                        className='input-field-crud'
                        placeholder='e.g Fasilitas Poliklinik'
                        label='Information Name *'
                        inputProps={{ maxLength: 50 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        name="category_information_id"
                        options={optCategory}
                        sx={{ width: "100%", marginTop: "8px" }}
                        onChange={(event, newValue) => methods.setValue('category_information_id', newValue ? newValue.id : null)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputLabelProps={{ shrink: true }}
                            label="Category Information *"
                            placeholder="Select Category"
                            error={methods.formState.errors.category_information_id !== undefined}
                            helperText={methods.formState.errors.category_information_id ? 'Category is required' : ''}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormInputText
                        focused
                        name='description_information'
                        className='input-field-crud'
                        placeholder='e.g Ini adalah fasilitas poliklinik'
                        label='Description*'
                        inputProps={{ maxLength: 100 }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} justifyContent="flex-end" mt={3.5}>
                    <Grid item xs={12} sm={2} textAlign="right">
                      <Button fullWidth variant="cancelButton" onClick={() => cancelData()}>
                        Cancel Data
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={2} textAlign="right">
                      <Button fullWidth variant="saveButton" type="submit">
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
            <Button onClick={onSave} variant='saveButton'>{isSave ? 'Save Data' : 'Back'}</Button>
          </DialogActions>
        </Dialog>
        </SideBar>
      </div>
  )

}

export default CreateInfomasi