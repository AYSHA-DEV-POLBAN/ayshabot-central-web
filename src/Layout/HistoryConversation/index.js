import React, { useState, useEffect, useContext } from 'react';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Box, Grid } from '@mui/material';
import SideBar from '../../Component/Sidebar';
import { useNavigate } from "react-router";
import client from '../../Global/client';
import { AlertContext } from "../../Context";
import BreadCumbComp from '../../Component/DataBread';


const HistoryConversation = () => {
  const columns = [
    {
      field: 'no',
      headerName: 'No',
      flex: 0.3,
      sortable: false,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 0.7,
      minWidth: 180,
    },
    {
      field: 'question',
      headerName: 'Question',
      flex: 1,
      minWidth: 240,
    },
    {
      field: 'answer',
      headerName: 'Answer',
      flex: 1 ,
      minWidth: 100
    },
    {
      field: 'bill',
      headerName: 'Bill',
      flex: 1 ,
      minWidth: 100
    },
  ];

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
  ];

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [idHapus,setidHapus] = useState();
  const [totalData, setTotalData] = useState();
  const { setDataAlert } = useContext(AlertContext)
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'commandName',
    sortType: 'asc',
    search: ''
  })

  useEffect(() => {
    getData()
  }, [filter])

  const getData = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/conversation/`
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
        phoneNumber: value.Client.whatsapp_number,
        question: value.question_client,
        answer: value.response_system,
        bill: value.bill,
      }
    })    

    if (filter.sortName && filter.sortType) {
      temp.sort((a, b) => {
        const valueA = (typeof a[filter.sortName] === 'string') ? a[filter.sortName].toLowerCase() : '';
        const valueB = (typeof b[filter.sortName] === 'string') ? b[filter.sortName].toLowerCase() : '';
        if (filter.sortType === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
    }

    if (filter.search) {
      temp = temp.filter(item =>
        // item.phoneNumber.toLowerCase().includes(filter.search.toLowerCase()) ||
        // item.question.toLowerCase().includes(filter.search.toLowerCase()) ||
        item.answer.toLowerCase().includes(filter.search.toLowerCase()) ||
        item.bill.toLowerCase().includes(filter.search.toLowerCase())
      );
    }

    setData([...temp])
    setTotalData(resData.data.length)
  }
  

  const handleDetail = async (id) => {
    localStorage.setItem('id', id)
    navigate("/history_conversation/detail");
  };



  const handleChangeSearch = (event) => {
    setFilter({
      ...filter,
      page: event.target.value != "" ? 0 : filter.page,
      search: event.target.value
    });
  }
  

  const onFilter = (dataFilter) => {
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName: dataFilter.sorting.field !== '' ? dataFilter.sorting[0].field : 'question',
      sortType: dataFilter.sorting.sort !== '' ? dataFilter.sorting[0].sort : 'asc',
      search: filter.search
    })
  }

  return (
    <div>
      <SideBar title='History Conversation' >
        <Grid style={{marginTop:'20px', marginLeft:'10px'}}>
          <BreadCumbComp breadcrumbs={dataBread} />
            <DataTable
              title='History Conversation'
              data={data}
              columns={columns}
              placeSearch="Command Name, Status, etc"
              searchTitle="Search By"
              onFilter={(dataFilter => onFilter(dataFilter))}
              handleChangeSearch={handleChangeSearch}
              onDetail={(id) => handleDetail(id)}
              totalData={totalData}
              getRowHeight={() => 'auto'} getEstimatedRowHeight={() => 200}
              hideAddButton={true}
            />
          </Grid>
      </SideBar>
    </div>
  )
}

export default HistoryConversation