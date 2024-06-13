import React, { useContext, useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import SideBar from '../../../Component/Sidebar';
import Breadcrumbs from "../../../Component/DataBread";
import Header from '../../../Component/Header'
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';
import '../../../App.css'
import { useNavigate } from 'react-router';
// import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from "react-hook-form";
import FormInputText from '../../../Component/FormInputText';
// import schemacompany from '../shema';
// import client from '../../../global/client';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { AlertContext } from '../../../Context';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const DetailHistoryConversation = () => {
  const [dataProject, setDataProject] = useState([])
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [sendData, setData] = useState({})
  const [isSave, setIsSave] = useState(false)
  const { setDataAlert } = useContext(AlertContext)
  const [isEdit, setIsEdit] = useState(false)
  const [dataDetail, setDataDetail] = useState({})
  const dataBread = [
    {
      href: "/",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/history_conversation",
      title: "History Conversation",
      current: false,
    },
    {
      href: "/history_conversation/detail",
      title: "Detail History Conversation",
      current: true,
    },
  ];

  useEffect(() => {
    getDataDetail()
  }, [])

  const getDataDetail = async () => {
    // const id = localStorage.getItem('companyId')
    // setCompanyId(id)
    // const res = await client.requestAPI({
    //   method: 'GET',
    //   endpoint: `/company/${id}`
    // })
    // if (res.data.attributes) {
    //   buildDataComp(res.data.attributes.projects)
    //   const temp = res.data.attributes
    //   delete temp.createdBy
    //   delete temp.createdOn
    //   delete temp.isActive
    //   delete temp.lastModifiedBy
    //   delete temp.lastModifiedOn
    //   for (const property in temp) {
    //     if (property === 'companyProfile') {
    //       const urlMinio = temp[property] ? `${process.env.REACT_APP_BASE_API}/${temp[property]}` : ''
    //       setFilePath(temp[property])
    //       setFile(urlMinio)
    //     } else {
    //       methods.setValue(`${property}`, `${temp[property]}`)
    //       setDataDetail(temp)
    //     }
    //   }
    // }
  }

  const buildDataComp = (dataCom) => {
    let number = 0
    const temp = dataCom.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.projectId,
        ...value
      }
    })
    setDataProject(temp)
  }


  return (
    <div>
      <SideBar title='History Conversation' >
      <Breadcrumbs breadcrumbs={dataBread} />
        <Grid container>
          {/* <Grid item xs={12} sm={8}>
            <Header judul={isEdit ? 'Edit Propmpting' : 'Detail Prompting'} />
          </Grid> */}
          <Grid item xs={12}>
                <div className='card-container-detail'>
                    <Grid 
                      item 
                      container 
                      columnSpacing={3.79}
                      rowSpacing={3.79}
                      xs={12}
                    >
                      <Grid item xs={12} sm={12}>
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail'>Phone Number :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='textDetail'>0812342131234</Typography>
                              {/* <Typography variant='inputDetail' style={{ wordBreak: 'break-word' }}>{dataDetail.companyName}</Typography> */}
                            </Grid>
                          </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail'>Question :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='textDetail'>ada poliklinik mata?</Typography>
                              {/* <Typography variant='inputDetail' style={{ wordBreak: 'break-word' }}>{dataDetail.companyEmail}</Typography> */}
                            </Grid>
                          </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail'>Answer :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='textDetail'>Di sini ada poliklinik mata</Typography>
                              {/* <Typography variant='inputDetail'>{dataDetail.npwp}</Typography> */}
                            </Grid>
                          </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail'>Chunk Relevant :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='textDetail'>poliklinik mata</Typography>
                              {/* <Typography variant='inputDetail'>{dataDetail.npwp}</Typography> */}
                            </Grid>
                          </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <Grid container>
                            <Grid item xs={6} sm={6}>
                              <Typography variant='labelHeaderDetail'>Bill :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='textDetail'>$0.02</Typography>
                              {/* <Typography variant='inputDetail'>{dataDetail.npwp}</Typography> */}
                            </Grid>
                          </Grid>
                      </Grid>
                    </Grid>
                    </div>
          </Grid>
        </Grid>
        <Dialog
          open={open}
        //   onClose={handleClose}
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
            {/* <Button onClick={handleClose} variant='outlined' className="button-text">{isSave ? 'Back' : 'Cancel without saving'}</Button> */}
            {/* <Button onClick={onSave} variant='saveButton'>{isSave ? 'Save Data' : 'Back'}</Button> */}
          </DialogActions>
        </Dialog>
     </SideBar>
        </div>
  )

}

export default DetailHistoryConversation