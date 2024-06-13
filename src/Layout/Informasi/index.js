import React, { useState, useEffect, useContext } from 'react';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Typography, Box } from '@mui/material';
import SideBar from '../../Component/Sidebar';
import { useNavigate } from "react-router";
import client from '../../Global/client';
import { AlertContext } from "../../Context";
import BreadCumbComp from '../../Component/DataBread';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Header from '../../Component/Header';


const Informasi = () => {

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

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
      minWidth: 180
    },
    {
      field: 'informationStatus',
      headerName: 'Status',
      flex: 1.5 ,
      minWidth: 150,
      renderCell: (data) => (
        <Stack direction="row" spacing={1} alignItems="center">
        <Typography>deact</Typography>
        <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
        <Typography>act</Typography>
      </Stack>
      ),
    }
  ];

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

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([
    // { id:1, no: 1, informationName: 'Fasilitas', desc: 'UGD', file: 'abcd.pdf', informationStatus: 'active' },
    // { id:2, no: 2, informationName: 'Fasilitas', desc: 'Poliklinik', file: 'abds.pdf', informationStatus: 'active' },
  ]);
  const [idHapus,setidHapus] = useState();
  const [totalData, setTotalData] = useState();
  const { setDataAlert } = useContext(AlertContext)
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'informationName',
    sortType: 'asc',
    search: ''
  })
  
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
      endpoint: `/information/`
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
        informationName: value.title_information,
        categoryInformation: value.category_information_id,
        desc: value.description_information,
        file: value.file_path_information,
        informationStatus: value.status_information
      }
    })    
    setData([...temp])
    // setTotalData(resData.meta.page.totalElements)
  }
  
  const deleteData = async (id) => {
    const res = await client.requestAPI({
      method: 'DELETE',
      endpoint: `/information/delete/${id}`
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
    handleClose();
  }
  

  const handleDetail = async (id) => {
    localStorage.setItem('id', id)
    console.log(id)
    navigate("/informasi/detail");
  };

  const handleEdit = async (id) => {
    localStorage.setItem('id', id)
    console.log(id)
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
      <BreadCumbComp breadcrumbs={dataBread} />
        <DataTable
          title='Information'
          data={data}
          columns={columns}
          // placeSearch="Information Name, File, Status, etc"
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
          </DialogActions>
        </Dialog>
      </SideBar>
    </div>
  )
}

export default Informasi