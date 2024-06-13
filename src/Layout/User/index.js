import React, { useState, useEffect, useContext } from 'react';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Box } from '@mui/material';
import SideBar from '../../Component/Sidebar';
import Header from '../../Component/Header';
import { useNavigate } from "react-router";
import client from '../../Global/client';
import { AlertContext } from "../../Context";
import BreadCumbComp from '../../Component/DataBread';
import axios from 'axios';


const User = () => {
  
  const [data, setData] = useState([
    // { id: 1, no: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com', password: '123456', userLevel: 'Admin', userStatus: 'active' },
    // { id: 2, no: 2, name: 'Jane Smith', username: 'janesmith', email: 'jane@example.com', password: 'password', userLevel: 'Admin', userStatus: 'active' },
  ]);
  
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
      field: 'userLevel',
      headerName: 'Role',
      flex: 0.3 ,
      minWidth: 100
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1 ,
      minWidth: 200
    },
    {
      field: 'email_verify',
      headerName: 'Email Verify',
      flex: 0.7 ,
      minWidth: 150
    },
    {
      field: 'userStatus',
      headerName: 'Status',
      flex: 0.3 ,
      minWidth: 100,
      // renderCell: (data) => (
      //   <Box
      //     sx={{
      //       backgroundColor: getStatusColor(data.userStatus),
      //       color: getStatusFontColor(data.userStatus),
      //       padding: '5px 10px',
      //       gap: '10px',
      //       borderRadius: '4px',
      //       fontSize: '12px',
      //     }}
      //   >
      //     {data.userStatus}
      //   </Box>
      // ),
    },
  ];

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
    sortName: 'name',
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
      endpoint: `/users/`,
    })
    rebuildData(res)
    // try {
    //   const res = await axios.get('http://localhost:8001/api/v1/users/', {
    //     headers: {
    //       'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJyb2xlX2lkIjoxLCJuYW1lIjoic3VwZXJhZG1pbiIsImVtYWlsIjoic3VwZXJhZG1pbkBnbWFpbC5jb20ifSwiaWF0IjoxNzE3NzkxMjMzfQ.Bqd_22FjessNFIw3G9eVkQT3GmkwTUXo2FoElw9X_EM`
    //     }
    //   });
    //   console.log(res.data);
    //   rebuildData(res.data)
    // } catch (error) {
    //   console.error('There was an error!', error);
    // }
  }

  const rebuildData = (resData) => {
    let temp = []
    let number = filter.page * filter.size
    temp = resData.data.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.id,
        name: value.name,
        email: value.email,
        email_verify: value.verify_email,
        userLevel: value.role_id,
        userStatus: value.status
      }
    })    
    setData([...temp])
    // setTotalData(resData.meta.page.totalElements)
    setTotalData(resData.data.length)
  }
  
  const deleteData = async (id) => {
    const res = await client.requestAPI({
      method: 'DELETE',
      endpoint: `/users/delete/${id}`
    })
    setOpenAlert(true);
    getData()
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

    // try {
    //   const res = await axios.delete(`/users/delete/${id}`)
    //   console.log(res);
    //   setOpenAlert(true);
    //   getData()
    //   // rebuildData(res.data)
    // } catch (error) {
    //   console.error('There was an error!', error);
    // }

    handleClose();
  }
  

  const handleDetail = async (id) => {
    localStorage.setItem('id', id)
    console.log(id)
    navigate("/user/detail");
  };

  const handleEdit = async (id) => {
    localStorage.setItem('id', id)
    navigate("/user/edit");
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
      <SideBar title='User' >
      <BreadCumbComp breadcrumbs={dataBread} />
        <DataTable
          title='User'
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