import React, { useState, useEffect, useContext } from 'react';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Typography, Box, Grid } from '@mui/material';
import SideBar from '../../Component/Sidebar';
import { useNavigate } from "react-router";
import client from '../../Global/client';
import { AlertContext } from "../../Context";
import BreadCumbComp from '../../Component/DataBread';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';


const Informasi = () => {

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [idHapus,setidHapus] = useState();
  const [totalData, setTotalData] = useState();
  const [isEdit, setIsEdit] = useState(false)
  const { setDataAlert } = useContext(AlertContext)
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'informationName',
    sortType: 'asc',
    search: ''
  })
  
  const columns = [
    {
      field: 'no',
      headerName: 'No',
      flex: 0.3,
      sortable: false,
    },
    {
      field: 'informationName',
      headerName: 'Information Name',
      flex: 0.7,
      minWidth: 180,
    },
    {
      field: 'categoryInformation',
      headerName: 'Category Information',
      flex: 0.7,
      minWidth: 180,
    },
    {
      field: 'desc',
      headerName: 'Description',
      flex: 0.7,
      minWidth: 240,
    },
    {
      field: 'file',
      headerName: 'File',
      flex: 1 ,
      minWidth: 180,
      renderCell: (params) => {
        const fileName = params.value.split('/').pop();
        return(
        <a href={params.value} target="_blank" rel="noopener noreferrer">
         {fileName}
        </a>
        )
      },
    },
    {
      field: 'informationStatus',
      headerName: 'Status',
      flex: 1.5 ,
      minWidth: 150,
      renderCell: (data) => {
        const isActive = data.row.informationStatus === 1;
  
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
    }
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
    const isActive = currentRow.informationStatus === 1
    const id = currentRow.id;
    const endpoint = isActive
      ? `/information/deactivate_information/${id}`
      : `/information/activate_information/${id}`;
    
    try {
      await client.requestAPI({ method: 'PUT', endpoint });
      getData();
      setDataAlert({
        message: `Information ${isActive ? 'deactivated' : 'activated'} successfully`,
        severity: 'success'
      });
    } catch (error) {
      setDataAlert({
        message: `Failed to ${isActive ? 'deactivate' : 'activate'} information`,
        severity: 'error'
      });
    }
    handleDialogClose();
  };

  const dataBread = [
    {
      href: "/",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/informasi",
      title: "Informasi",
      current: false,
    },
  ];

 
  
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
      endpoint: `/information/`,
      params: {
        page: filter.page,
        size: filter.size,
        sortName: filter.sortName,
        sortType: filter.sortType,
        search: filter.search
      }
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
        informationName: value.title_information,
        categoryInformation: value.CategoryInformation.name_category_information,
        desc: value.description_information,
        file: value.file_path_information,
        informationStatus: value.status_information
      }
    })    

    temp.sort((a, b) => a.no - b.no);

    if (filter.search) {
      temp = temp.filter(item =>
        item.informationName.toLowerCase().includes(filter.search.toLowerCase()) ||
        item.desc.toLowerCase().includes(filter.search.toLowerCase()) ||
        item.file.toLowerCase().includes(filter.search.toLowerCase())
      );
    }

    setData([...temp])
    setTotalData(resData.data.length)
  }
  
  const deleteData = async (id) => {
    const res = await client.requestAPI({
      method: 'DELETE',
      endpoint: `/information/delete/${id}`
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
    navigate("/informasi/detail");
  };

  const handleEdit = async (id, isEdit) => {
    localStorage.setItem('id', id)
    console.log(id)
    isEdit=(true)
    navigate("/informasi/edit");
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
    navigate("/informasi/create");
  }

  const onFilter = (dataFilter) => {
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName: dataFilter.sorting.field !== '' ? dataFilter.sorting[0].field : 'informationName',
      sortType: dataFilter.sorting.sort !== '' ? dataFilter.sorting[0].sort : 'asc',
      search: filter.search
    })
  }


  return (
    <div>
      <SideBar title='Information' >
        <Grid style={{marginTop:'20px', marginLeft:'10px'}}>
          <BreadCumbComp breadcrumbs={dataBread} />
        <DataTable
          title='Information'
          data={data}
          columns={columns}
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
            Are you sure you want to {currentRow?.informationStatus === 1 ? 'deactivate' : 'activate'} this information?
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

export default Informasi