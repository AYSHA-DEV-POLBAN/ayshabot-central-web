import React, { useState, useEffect, useContext } from 'react';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Box } from '@mui/material';
import SideBar from '../../Component/Sidebar';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router";
// import client from "../../global/client";
// import { AlertContext } from "../../context";


const User = () => {
  const columns = [
    {
      field: 'no',
      headerName: 'No',
      flex: 0.3,
      sortable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.7,
      minWidth: 200,
    },
    {
      field: 'username',
      headerName: 'Username',
      flex: 0.7,
      minWidth: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1 ,
      minWidth: 240
    },
    {
      field: 'password',
      headerName: 'Password',
      flex: 1 ,
      minWidth: 240
    },
  ];

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([
    { id: 1, no: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com', password: '123456' },
    { id: 2, no: 2, name: 'Jane Smith', username: 'janesmith', email: 'jane@example.com', password: 'password' },
  ]);
  const [idHapus,setidHapus] = useState();
  const [totalData, setTotalData] = useState();
//   const { setDataAlert } = useContext(AlertContext)
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'name',
    sortType: 'asc',
    search: ''
  })
  

  const handleClickOpen = async (id) => {
    //setId
    // setidHapus(id)
    setOpen(true)
  };

  useEffect(() => {
    // getData()
  }, [])

  const getData = async () => {
    // const res = await client.requestAPI({
    //   method: 'GET',
    //   endpoint: `/backlog?page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}&search=${filter.search}`
    // })
    // rebuildData(res)
  }

  const rebuildData = (resData) => {
    let temp = []
    let number = filter.page * filter.size
    temp = resData.data.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.id,
        projectName: value.attributes.projectName,
        taskCode: value.attributes.taskCode,
        taskName: value.attributes.taskName,
        priority: value.attributes.priority,
        status: value.attributes.status,
        assignedTo: value.attributes.assignedTo
      }
    })    
    setData([...temp])
    setTotalData(resData.meta.page.totalElements)
  }
  
  const deleteData = async (id) => {
    // const res = await client.requestAPI({
    //   method: 'DELETE',
    //   endpoint: `/backlog/${id}`
    // })
    // setOpenAlert(true);
    // getData()
    // if (!res.isError) {
    //   setDataAlert({
    //     severity: 'warning',
    //     open: true,
    //     message: res.meta.message
    //   })
    //   handleClose();
    // } else {
    //   setDataAlert({
    //     severity: 'error',
    //     message: res.error.detail,
    //     open: true
    //   })
    // }
    handleClose();
  }
  

  const handleDetail = async (id) => {
    // localStorage.setItem('idBacklog', id)
    // navigate("/masterbacklog/detail");
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
  }
  
  
  const onAdd = () => {
    navigate("/user/create")
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
      <SideBar>
        <DataTable
          title='User'
          data={data}
          columns={columns}
          placeSearch="Project Name, task code, etc"
          searchTitle="Search By"
          onAdd={() => onAdd()}
          onFilter={(dataFilter => onFilter(dataFilter))}
          handleChangeSearch={handleChangeSearch}
          onDetail={(id) => handleDetail(id)}
          onDelete={(id) => handleClickOpen(id)}
          totalData={totalData}
          getRowHeight={() => 'auto'} getEstimatedRowHeight={() => 200}
        />
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

export default User