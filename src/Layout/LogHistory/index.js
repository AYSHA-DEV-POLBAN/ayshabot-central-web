import React, { useState, useEffect, useContext } from 'react';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Box, Grid } from '@mui/material';
import SideBar from '../../Component/Sidebar';
import BreadCumbComp from '../../Component/DataBread';
import { useNavigate } from "react-router";
import client from '../../Global/client';
// import { AlertContext } from "../../context";
import axios from 'axios';


const LogHistory = () => {
  const columns = [
    {
      field: 'no',
      headerName: 'No',
      flex: 0.3,
      sortable: false,
    },
    {
      field: 'user',
      headerName: 'User',
      flex: 0.7,
      minWidth: 200,
    },
    {
      field: 'client',
      headerName: 'Client',
      flex: 0.7,
      minWidth: 200,
    },
    {
      field: 'tableName',
      headerName: 'Table Name',
      flex: 1 ,
      minWidth: 240
    },
    {
      field: 'actionName',
      headerName: 'Action Name',
      flex: 1 ,
      minWidth: 240
    },
  ];

  const dataBread = [
    {
      href: "/",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/logHistory",
      title: "Log History",
      current: false,
    },
  ];
  
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [idHapus,setidHapus] = useState();
  const [totalData, setTotalData] = useState();
//   const { setDataAlert } = useContext(AlertContext)
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'user',
    sortType: 'asc',
    search: ''
  })

  const handleClickOpen = async (id) => {
    //setId
    // setidHapus(id)
    setOpen(true)
  };

  useEffect(() => {
    getData()
  }, [filter])

  const getData = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/log-history/`
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
        user: value.user_id,
        client: value.client_id,
        tableName: value.table_name,
        actionName: value.action_name,
      }
    })    

    // if (filter.sortName && filter.sortType) {
    //   temp.sort((a, b) => {
    //     const valueA = (typeof a[filter.sortName] === 'string') ? a[filter.sortName].toLowerCase() : '';
    //     const valueB = (typeof b[filter.sortName] === 'string') ? b[filter.sortName].toLowerCase() : '';
    //     if (filter.sortType === 'asc') {
    //       return valueA > valueB ? 1 : -1;
    //     } else {
    //       return valueA < valueB ? 1 : -1;
    //     }
    //   });
    // }

    // if (filter.search) {
    //   temp = temp.filter(item =>
    //     // item.user.toLowerCase().includes(filter.search.toLowerCase()) ||
    //     // item.client.toLowerCase().includes(filter.search.toLowerCase()) ||
    //     item.tableName.toLowerCase().includes(filter.search.toLowerCase()) ||
    //     item.actionName.toLowerCase().includes(filter.search.toLowerCase())
    //   );
    // }
    setData([...temp])
    setTotalData(resData.data.length)
  }
  

  const handleDetail = async (id) => {
    localStorage.setItem('id', id)
    navigate("/logHistory/detail");
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
      sortName: dataFilter.sorting.field !== '' ? dataFilter.sorting[0].field : 'user',
      sortType: dataFilter.sorting.sort !== '' ? dataFilter.sorting[0].sort : 'asc',
      search: filter.search
    })
  }

  const handleChangePage = (event, newPage) => {
    setFilter({ ...filter, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setFilter({ ...filter, size: newSize, page: 0 });
  };

  return (
    <div>
      <SideBar title='Log History' >
      <Grid style={{marginTop:'20px', marginLeft:'10px'}}>
        <BreadCumbComp breadcrumbs={dataBread} />
          <DataTable
            title='Log History'
            data={data}
            columns={columns}
            placeSearch="Project Name, task code, etc"
            searchTitle="Search By"
            onFilter={(dataFilter => onFilter(dataFilter))}
            handleChangeSearch={handleChangeSearch}
            onDetail={(id) => handleDetail(id)}
            totalData={totalData}
            pageSize={filter.size}
            onChangePage={handleChangePage}
            onChangePageSize={handleChangeRowsPerPage}
            getRowHeight={() => 'auto'} getEstimatedRowHeight={() => 200}
            hideAddButton={true}
          />
        </Grid>
      </SideBar>
    </div>
  )
}

export default LogHistory