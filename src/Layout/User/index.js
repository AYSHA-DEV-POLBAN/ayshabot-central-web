import React, { useState, useEffect, useContext } from 'react';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Stack, Switch, Grid } from '@mui/material';
import SideBar from '../../Component/Sidebar';
import { useNavigate } from "react-router";
import client from '../../Global/client';
import { AlertContext } from "../../Context";
import BreadCumbComp from '../../Component/DataBread';


const User = () => {
  
  const [data, setData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogVerifyOpen, setDialogVerifyOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [statusVerify, setStatusVerify] = useState(null);
  
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
      flex: 0.7 ,
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
      flex: 1 ,
      minWidth: 150,
      renderCell: (data) => {
        const isActive = data.row.email_verify === 1;
  
        return (
          <Stack direction="row" spacing={1} marginTop={2} alignItems="center">
            <Switch
              checked={isActive}
              onChange={() => handleDialogVerifyOpen(data.row)}
              inputProps={{ 'aria-label': 'information status toggle' }}
            />
          </Stack>
        );
      },
    },
    {
      field: 'userStatus',
      headerName: 'Status',
      flex:1,
      minWidth: 100,
      renderCell: (data) => {
        const isActive = data.row.userStatus === 1;
  
        return (
          <Stack direction="row" spacing={1} marginTop={2} alignItems="center">
            <Switch
              checked={isActive}
              onChange={() => handleDialogOpen(data.row)}
              inputProps={{ 'aria-label': 'information status toggle' }}
            />
          </Stack>
        );
      },
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
  

  const handleDialogOpen = (row) => {
    setCurrentRow(row);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentRow(null);
  };

  const handleToggleStatus = async () => {
    const isActive = currentRow.userStatus === 1
    const id = currentRow.id;
    const endpoint = isActive
      ? `/users/deactivate_account_operator/${id}`
      : `/users/activate_account_operator/${id}`;
    
      console.log(endpoint)
    try {
      await client.requestAPI({ method: 'PUT', endpoint });
      getData();
      setDataAlert({
        message: `User ${isActive ? 'deactivated' : 'activated'} successfully`,
        severity: 'success'
      });
    } catch (error) {
      setDataAlert({
        message: `Failed to ${isActive ? 'deactivate' : 'activate'} user`,
        severity: 'error'
      });
    }
    handleDialogClose();
  };

  const handleDialogVerifyOpen = (row) => {
    setStatusVerify(row);
    setDialogVerifyOpen(true);
  };

  const handleDialogVerifyClose = () => {
    setDialogVerifyOpen(false);
    setStatusVerify(null);
  };

  const handleToggleVerify = async () => {
    const isActive = statusVerify.email_verify === 1
    const id = statusVerify.id;
    const endpoint = isActive
      ? `/users/deactivate_email_operator/${id}`
      : `/users/activate_email_operator/${id}`;
    
    console.log("ferivy",endpoint)
    try {
      await client.requestAPI({ method: 'PUT', endpoint });
      getData();
      setDataAlert({
        message: `Email ${isActive ? 'deactivated' : 'activated'} successfully`,
        severity: 'success'
      });
    } catch (error) {
      setDataAlert({
        message: `Failed to ${isActive ? 'deactivate' : 'activate'} email`,
        severity: 'error'
      });
    }
    handleDialogVerifyClose();
  };

  const handleClickOpen = async (id) => {
    setidHapus(id)
    setOpen(true)
  };

  useEffect(() => {
    getData()
  }, [filter])

  const getData = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/users/`,
      params: {
        page: filter.page,
        size: filter.size,
        sortName: filter.sortName,
        sortType: filter.sortType,
        search: filter.search
      }
    })
    rebuildData(res)
  }

  const rebuildData = (resData) => {
    let temp = []
    let number = filter.page * filter.size
    temp = resData.data.filter(value => value.id === 2).map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.id,
        name: value.name,
        email: value.email,
        email_verify: value.verify_email,
        userLevel: value.role_id === 1 ? "Superadmin" : "Operator",
        userStatus: value.status
      }
    })    

    if (filter.search) {
      temp = temp.filter(item =>
        item.name.toLowerCase().includes(filter.search.toLowerCase()) ||
        item.email.toLowerCase().includes(filter.search.toLowerCase())
      );
    }
    setData([...temp])
    setTotalData(resData.data.length)
  }
  
  const deleteData = async (id) => {
    const res = await client.requestAPI({
      method: 'DELETE',
      endpoint: `/users/delete/${id}`
    })
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
    navigate("/user/detail");
  };

  const handleEdit = async (id, isEdit) => {
    localStorage.setItem('id', id)
    // isEdit=(true)
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
        <Grid style={{marginTop:'20px', marginLeft:'10px'}}>
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
          </DialogActions>
        </Dialog>

        {/* dialog untuk ubah status */}
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-delete"
        >
          <DialogTitle id="alert-dialog-title" className='dialog-delete-header'>
            {"Change Status"}
          </DialogTitle>
          <DialogContent className="dialog-delete-content">
            <DialogContentText className='dialog-delete-text-content' id="alert-dialog-description">
            Are you sure you want to {currentRow?.userStatus === 1 ? 'deactivate' : 'activate'} this status?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-delete-actions">
            <Button onClick={handleDialogClose} variant='outlined' className="button-text">Cancel</Button>
            <Button onClick={handleToggleStatus} variant='saveButton' className="button-text">Confirm</Button>
          </DialogActions>
        </Dialog>

        {/* dialog untuk verify email */}
        <Dialog
          open={dialogVerifyOpen}
          onClose={handleDialogVerifyClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-delete"
        >
          <DialogTitle id="alert-dialog-title" className='dialog-delete-header'>
            {"Change Status Verify"}
          </DialogTitle>
          <DialogContent className="dialog-delete-content">
            <DialogContentText className='dialog-delete-text-content' id="alert-dialog-description">
            Are you sure you want to {statusVerify?.email_verify === 1 ? 'deactivate' : 'activate'} this email?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-delete-actions">
            <Button onClick={handleDialogVerifyClose} variant='outlined' className="button-text">Cancel</Button>
            <Button onClick={handleToggleVerify} variant='saveButton' className="button-text">Confirm</Button>
          </DialogActions>
        </Dialog>
      </SideBar>
    </div>
  )
}

export default User