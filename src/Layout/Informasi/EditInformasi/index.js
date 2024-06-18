import React, { useContext, useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import SideBar from '../../../Component/Sidebar';
import Breadcrumbs from "../../../Component/DataBread";
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Autocomplete } from '@mui/material';
import '../../../App.css';
import { useNavigate } from 'react-router';
import { FormProvider, useForm, Controller } from "react-hook-form";
import client from '../../../Global/client';
import { AlertContext } from '../../../Context';
import { yupResolver } from '@hookform/resolvers/yup';
import validateInput from '../validate';

const EditInformasi = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sendData, setSendData] = useState({});
  const [isSave, setIsSave] = useState(false);
  const { setDataAlert } = useContext(AlertContext);
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState('');
  const [optCategory, setOptCategory] = useState([]);
  const [titleInformation, setTitleInformation] = useState('')
  const [description, setDescriptionInformation] = useState('')
  const [dataCategory, setDataCategory] = useState('')
  
  
  const MAX_SIZE_FILE = 3145728; // 3 MB

  const dataBread = [
    { href: "/", title: "Dashboard", current: false },
    { href: "/informasi", title: "Informasi", current: false },
    { href: "/informasi/edit", title: "Edit Informasi", current: true },
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
    resolver: yupResolver(validateInput),
    defaultValues: {
      document: '',
      title_information: '',
      category_information_id: '',
      description_information: ''
    }
  });

  useEffect(() => {
    getCategory();

    const id= localStorage.getItem('id')
    if(id){
        getDataDetail(id)
    } else{
        navigate('/information')
    }
  }, []);

  const getDataDetail = async (id) => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/information/get_information_by_id/${id}`
    })
    setTitleInformation(res.data.title_information)
    setDescriptionInformation(res.data.description_information)
    setDataCategory(res.data.category_information_id)
   
    methods.setValue('title_information', res.data.title_information);
    methods.setValue('description_information', res.data.description_information);
    methods.setValue('category_information_id', res.data.category_information_id);
    console.log('data detail', res)
  }

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

    console.log('data categori', res)
  };

  const onSave = async (form) => {
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
        const data = {
          ...sendData,
          document : file
        }

        console.log("ini data perubahannya", data)
            const id = localStorage.getItem('id');
            const res = await client.requestAPI({
              method: 'PUT',
              endpoint: `/information/edit_with_upload_file/${id}`,
              data,
            })

            console.log('data edit', res)

          if (!res.isError) {
            setDataAlert({
              severity: 'success',
              open: true,
              message: res.data.message
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
        
        setOpen(false);
      }
    }
  };


  const [errorText, setErrorText] = useState('');
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      if (uploadedFile.type === 'application/pdf') {
        setFile(uploadedFile);
        setFilePath(uploadedFile.name);
        setSendData(prevData => ({
          ...prevData,
          document: file
        }));
        setErrorText('');
      } else {
        setErrorText('File harus berupa file PDF');
        setFile(null);
        setFilePath('');
      }
    } else {
      setErrorText('File tidak boleh kosong');
      setFile(null);
      setFilePath('');
    }
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
                        // value={file}
                        onChange={handleFileChange}
                      />
                    </Grid>
                    <Grid marginLeft={5}>{errorText && <p style={{ color: 'red' }}>{errorText}</p>}</Grid>
                    <Grid item xs={12} sm={12}>
                    <Controller
                      name='title_information'
                      control={methods.control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          focused
                          name='title_information'
                          className='input-field-crud'
                          placeholder='e.g Fasilitas Poliklinik'
                          label='Information Name *'
                          inputProps={{ maxLength: 50 }}
                          value={titleInformation}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setTitleInformation(e.target.value); 
                            setSendData(prevData => ({
                              ...prevData,
                              title_information: e.target.value
                            }));
                          }}
                          error={!!methods.formState.errors.title_information}
                          helperText={methods.formState.errors.title_information ? 'Title is required' : ''}
                        />
                      )}
                    />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            name="category_information_id"
                            options={optCategory}
                            value={optCategory.find((option) => option.id === dataCategory) || null}
                            sx={{ width: "100%", marginTop: "8px" }}
                            onChange={(_event, newValue) => {
                              if (newValue) {
                                setDataCategory(newValue.id)
                                setSendData(prevData => ({
                                  ...prevData,
                                  category_information_id: newValue.id
                                }));
                              }
                            }}
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
                    <Controller
                      name='description_information'
                      control={methods.control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          focused
                          name='description_information'
                          className='input-field-crud'
                          placeholder='e.g Fasilitas Poliklinik'
                          label='Description *'
                          inputProps={{ maxLength: 501 }}
                          value={description}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setDescriptionInformation(e.target.value); 
                            setSendData(prevData => ({
                              ...prevData,
                              description_information: e.target.value
                            }));
                          }}
                          error={!!methods.formState.errors.description_information}
                          helperText={methods.formState.errors.description_information ? 'Title is required' : ''}
                        />
                      )}
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

export default EditInformasi