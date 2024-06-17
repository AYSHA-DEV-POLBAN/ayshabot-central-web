import React, { useState, useEffect, useContext } from 'react';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Grid } from '@mui/material';
import SideBar from '../../Component/Sidebar';
import Header from '../../Component/Header';
import { useNavigate } from "react-router";
import client from '../../Global/client';
import { AlertContext } from "../../Context";
import BreadCumbComp from '../../Component/DataBread';
import axios from 'axios';


const CategoryInformation = () => {
  
  const [data, setData] = useState([]);
  
  const columns = [
    {
      field: 'no',
      headerName: 'No',
      flex: 0.3,
      sortable: false,
    },
    {
      field: 'category_name',
      headerName: 'Category Name',
      flex: 0.7,
      minWidth: 200,
    },
    {
      field: 'category_description',
      headerName: 'Description',
      flex: 0.5,
      minWidth: 150,
    },
  ];

  const dataBread = [
    {
      href: "/",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/category_information",
      title: "Category Information",
      current: false,
    },
  ];

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const [idHapus,setidHapus] = useState();
  const [totalData, setTotalData] = useState();
  const { setDataAlert } = useContext(AlertContext)
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'category_name',
    sortType: 'asc',
    search: ''
  })
  

  const handleClickOpen = async (id) => {
    setidHapus(id)
    setOpen(true)
  };

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/category-information/`
    })
    rebuildData(res)
  }

  const rebuildData = (resData) => {
    let temp = []
    let number = filter.page * filter.size
    temp = resData.data.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.id,
        category_name: value.name_category_information,
        category_description: value.description_category_information,
      }
    })    
    setData([...temp])
    // setTotalData(resData.meta.page.totalElements)
    setTotalData(resData.data.length)
  }
  
  const deleteData = async (id) => {
    const res = await client.requestAPI({
      method: 'DELETE',
      endpoint: `/category-information/delete/${id}`
    })
      console.log(res);
    setOpenAlert(true);
    getData()
    if (!res.isError) {
      setDataAlert({
        severity: 'warning',
        open: true,
        message: res.message
      })
      handleClose();
    } else {
      setDataAlert({
        severity: 'error',
        message: res.error.detail,
        open: true
      })
    }
    handleClose();
  }
  

  const handleDetail = async (id) => {
    localStorage.setItem('id', id)
    console.log(id)
    navigate("/category_information/detail");
  };

  const handleEdit = async (id, isEdit) => {
    localStorage.setItem('id', id)
    console.log(id)
    // isEdit=(true)
    navigate("/category_information/edit");
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleChangeSearch = (event) => {
    setFilter({
      ...filter,
      page: event.target.value != "" ? 0 : filter.page,
      search: event.target.value
    });
    console.log(filter )
  }
  
  
  const onAdd = () => {
    navigate("/category_information/create")
  }

  const onFilter = (dataFilter) => {
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName: dataFilter.sorting.field !== '' ? dataFilter.sorting[0].field : 'name',
      sortType: dataFilter.sorting.sort !== '' ? dataFilter.sorting[0].sort : 'asc',
      search: filter.search
    })
  }


  return (
    <div>
      <SideBar title='Category Information' >
        <Grid style={{marginTop:'20px', marginLeft:'10px'}}>
          <BreadCumbComp breadcrumbs={dataBread} />
            <DataTable
              title='Category Information'
              data={data}
              columns={columns}
              placeSearch="Name, Username, Status, etc"
              searchTitle="Search By"
              onAdd={() => onAdd()}
              onFilter={(dataFilter => onFilter(dataFilter))}
              handleChangeSearch={handleChangeSearch}
              onDetail={(id) => handleDetail(id)}
              onEdit={(id) => handleEdit(id)}
              onDelete={(id) => handleClickOpen(id)}
              totalData={totalData}
              getRowHeight={() => 'auto'} getEstimatedRowHeight={() => 200}
            />
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-delete"
        >
          <DialogTitle id="alert-dialog-title" className='dialog-delete-header'>
            {"Delete Data"}
          </DialogTitle>
          <DialogContent className="dialog-delete-content">
            <DialogContentText className='dialog-delete-text-content' id="alert-dialog-description">
              Warning: Deleting this data is irreversible. Are you sure you want to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-delete-actions">
            <Button onClick={handleClose} variant='outlined' className="button-text">Cancel</Button>
            <Button onClick={() => deleteData(idHapus)} className='delete-button button-text'>Delete Data</Button>
            {/* <Button onClick={() => onDelete(idHapus)} className='delete-button button-text'>Delete Data</Button> */}
          </DialogActions>
        </Dialog>
      </SideBar>
    </div>
  )
}

export default CategoryInformation