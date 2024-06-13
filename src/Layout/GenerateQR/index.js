import React, { useState, useEffect, useContext } from 'react';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Box } from '@mui/material';
import SideBar from '../../Component/Sidebar';
import Header from '../../Component/Header';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router";
// import client from "../../global/client";
import { AlertContext } from "../../Context";
import BreadCumbComp from '../../Component/DataBread';


const GenerateQR = () => {
  const dataBread = [
    {
      href: "/",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/generate_qr",
      title: "Generate QR",
      current: false,
    },
  ];

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState();
  const { setDataAlert } = useContext(AlertContext)

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
    // let number = filter.page * filter.size
    temp = resData.data.map((value, index) => {
      return {
        // no: number + (index + 1),
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
  }

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <SideBar title='Generate QR' >
      <BreadCumbComp breadcrumbs={dataBread} />
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
            {/* <Button onClick={() => deleteData(idHapus)} className='delete-button button-text'>Delete Data</Button> */}
            {/* <Button onClick={() => onDelete(idHapus)} className='delete-button button-text'>Delete Data</Button> */}
          </DialogActions>
        </Dialog>
      </SideBar>
    </div>
  )
}

export default GenerateQR