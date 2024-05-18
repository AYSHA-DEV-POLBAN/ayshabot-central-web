import React, { useState, useEffect, useContext } from 'react';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Box } from '@mui/material';
import SideBar from '../../Component/Sidebar';
import { useNavigate } from "react-router";
// import client from "../../global/client";
import { AlertContext } from "../../Context";
import BreadCumbComp from '../../Component/DataBread';
import Header from '../../Component/Header';


const Informasi = () => {
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
      flex: 1 ,
      minWidth: 100
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
    { id:1, no: 1, informationName: 'Fasilitas', desc: 'UGD', file: 'abcd.pdf', informationStatus: 'active' },
    { id:2, no: 2, informationName: 'Fasilitas', desc: 'Poliklinik', file: 'abds.pdf', informationStatus: 'active' },
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
    // setidHapus(id)
    setOpen(true)
  };

  useEffect(() => {
    // getData()
  }, [filter])

  const getData = async () => {
    // const res = await client.requestAPI({
    //   method: 'GET',
    //   endpoint: ``
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
      }
    })    
    setData([...temp])
    setTotalData(resData.meta.page.totalElements)
  }
  
  const deleteData = async (id) => {
    // const res = await client.requestAPI({
    //   method: 'DELETE',
    //   endpoint: ``
    // })
    setOpenAlert(true);
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
    // localStorage.setItem('id', id)
    navigate("/informasi/detail");
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

  const [openSide, setOpenSide] = useState(false);
  const handleDrawerClose = () => { // Fungsi untuk menutup/membuka Sidebar
    setOpenSide(!openSide);
  };

  return (
    <div>
      {/* <SideBar> */}
      <Header title='Information' handleDrawerClose={handleDrawerClose} open={openSide} />
        <SideBar open={openSide} handleDrawerClose={handleDrawerClose}>
      <BreadCumbComp breadcrumbs={dataBread} />
        <DataTable
          title='Informasi'
          data={data}
          columns={columns}
          // placeSearch="Information Name, File, Status, etc"
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

export default Informasi