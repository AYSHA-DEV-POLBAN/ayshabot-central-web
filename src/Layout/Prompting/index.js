import React, { useState, useEffect, useContext } from 'react';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Stack, Switch, Grid } from '@mui/material';
import SideBar from '../../Component/Sidebar';
import { useNavigate } from "react-router";
import client from '../../Global/client';
import { AlertContext } from "../../Context";
import BreadCumbComp from '../../Component/DataBread';


const Command = () => {

  
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [idHapus,setidHapus] = useState();
  const [totalData, setTotalData] = useState();
  const { setDataAlert } = useContext(AlertContext)
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'commandName',
    sortType: 'asc',
    search: ''
  })

  
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
  ];


  const columns = [
    {
      field: 'no',
      headerName: 'No',
      flex: 0.3,
      sortable: false,
    },
    {
      field: 'commandName',
      headerName: 'Command Name',
      flex: 0.7,
      minWidth: 180,
    },
    {
      field: 'commandResponse',
      headerName: 'Response Command',
      flex: 1,
      minWidth: 240,
    },
    {
      field: 'commandStatus',
      headerName: 'Status',
      flex: 1 ,
      minWidth: 100,
      renderCell: (data) => {
        const isActive = data.row.commandStatus === 1;
  
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

  const handleDialogOpen = (row) => {
    setCurrentRow(row);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentRow(null);
  };

  const handleToggleStatus = async () => {
    const isActive = currentRow.commandStatus === 1
    const id = currentRow.id;
    const endpoint = isActive
      ? `/command/deactivate_command/${id}`
      : `/command/activate_command/${id}`;
    
    try {
      await client.requestAPI({ method: 'PUT', endpoint });
      getData();
      setDataAlert({
        message: `Command ${isActive ? 'deactivated' : 'activated'} successfully`,
        severity: 'success'
      });
    } catch (error) {
      setDataAlert({
        message: `Failed to ${isActive ? 'deactivate' : 'activate'} command`,
        severity: 'error'
      });
    }
    handleDialogClose();
  };

  const handleClickOpen = async (id) => {
    //setId
    setidHapus(id)
    setOpen(true)
  };

  useEffect(() => {
    getData()
  }, [filter])

  const getData = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/command/`
    })
    console.log(res)
    rebuildData(res)
  }

  const rebuildData = (resData) => {
    let temp = []
    let number = filter.page * filter.size
    temp = resData.data.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.id,
        commandName: value.name_command,
        commandResponse: value.response_command,
        commandStatus: value.status_command,
      }
    })    
    setData([...temp])
    // setTotalData(resData.meta.page.totalElements)
    setTotalData(resData.data.length)
  }
  
  const deleteData = async (id) => {
    const res = await client.requestAPI({
      method: 'DELETE',
      endpoint: `/command/delete/${id}`
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
    navigate("/command/detail");
  };

  const handleEdit = async (id, isEdit) => {
    localStorage.setItem('id', id)
    isEdit=(true)
    navigate("/command/edit");
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
    navigate("/command/create");
  }

  const onFilter = (dataFilter) => {
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName: dataFilter.sorting.field !== '' ? dataFilter.sorting[0].field : 'commandName',
      sortType: dataFilter.sorting.sort !== '' ? dataFilter.sorting[0].sort : 'asc',
      search: filter.search
    })
  }

  return (
    <div>
      <SideBar title='Command' >
        <Grid style={{marginTop:'20px', marginLeft:'10px'}}>
          <BreadCumbComp breadcrumbs={dataBread} />
            <DataTable
              title='Command'
              data={data}
              columns={columns}
              placeSearch="Command Name, Status, etc"
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
            Are you sure you want to {currentRow?.informationStatus === 1 ? 'deactivate' : 'activate'} this command?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-delete-actions">
            <Button onClick={handleDialogClose} variant='outlined' className="button-text">Cancel</Button>
            <Button onClick={handleToggleStatus} variant='saveButton' className="button-text">Confirm</Button>
          </DialogActions>
        </Dialog>
      </SideBar>
    </div>
  )
}

export default Command