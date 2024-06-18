import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Typography, Button, IconButton,  } from "@mui/material";
import SearchBar from "../Searchbar";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from "@mui/icons-material/Delete";
import "../../App.css"
import { EditOutlined, UploadFileOutlined } from "@mui/icons-material";

const DataTable = ({
  title,
  data,
  columns,
  handleChangeSearch,
  searchTitle,
  onAdd,
  onEdit,
  onUpload,
  onDetail,
  onDelete,
  onFilter,
  totalData,
  loading = false,
  hideAddButton=false
}) => {
  const [pagination, setPagination] = useState({ page: 0, pageSize: 10 });
  const [sorting, setSort] = useState([]);
  const [dataColumns, setDataColumns] = useState([]);

  /**
   * return fungsi model dari pagination.
   *
   * @param {model} object Page & page size saat ini.
   */
  const changePagination = (model) => {
    setPagination({ ...model });
  };

  /**
   * return fungsi model dari sorting.
   *
   * @param {model} object field & sort size saat ini dalam bentuk array.
   */
  const changeSort = (model) => {
    if (model.length > 0) {
      setSort([{ ...model }]);
    } else {
      setSort([
        {
          field: "",
          sort: "",
        },
      ]);
    }
  };

  const handleBuildList = (filter) => {
    onFilter(filter);
  };

  useEffect(() => {
    const filter = {
      sorting: sorting.length > 0 ? { ...sorting[0] } : { field: "", sort: "" },
      ...pagination,
    };
    handleBuildList(filter);
  }, [sorting, pagination]);

  useEffect(() => {
    const temp = [...columns];
    if (onEdit || onDelete || onDetail)
      temp.push({
        field: "actions",
        headerName: "Action",
        width: 200,
        sortable: false,
        renderCell: (data) => {
          return (
            <div>
              {onDetail && (
                <IconButton onClick={() => onDetail(data.id)}>
                  <VisibilityIcon />
                </IconButton>
              )}
              {onEdit && (
                <IconButton onClick={() => onEdit(data.id)}>
                  <EditOutlined />
                </IconButton>
              )}
              {onDelete && (
                <IconButton onClick={() => onDelete(data.id)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          );
        },
      });
    setDataColumns(temp);
  }, [columns]);

  return (
    <Grid container rowSpacing={3}>
      <Grid
        item
        justifyContent="space-between"
        container
        xs={12}
        paddingTop={3}
      >
        {!onUpload ? (
          <Grid item xs={6} sm={3} alignSelf="center" sx={{textAlign: {xs: "start", sm:"end"}}}>
            <SearchBar
              label={searchTitle}
              onChange={handleChangeSearch}
            />
          </Grid>
        ) : (
          <Grid
            container
            direction="row"
            item
            xs={6}
            alignItems="center"
            justifyContent="flex-start"
            spacing={2}
          >
          </Grid>
        )
        }

        {!onUpload && !hideAddButton && (
          <Grid item xs={12} sm={4} mt={1} alignSelf="center" sx={{textAlign: {xs: "start", sm:"end"}}}
          >
            <Button
              variant="contained"
              onClick={() => onAdd()}
              startIcon={<AddIcon />}
            >
              {title}
            </Button>
          </Grid>
        )}
      </Grid>
      
      {data.length > 0 ? (
        <Grid item xs={12}>
          <DataGrid
            rows={data}
            columns={dataColumns}
            disableRowSelectionOnClick
            // pageSize={10}
            // pageSize={pagination.pageSize}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            // paginationMode="server"
            // paginationModel={{ ...pagination }}
            onPaginationModelChange={(model) => changePagination(model)}
            onSortModelChange={(model) => changeSort(model)}
            disableColumnFilter
            loading={loading}
            disableColumnMenu
            rowCount={totalData}
            getRowId={(row) => row.id}
            sortingMode="server"
          />
        </Grid>
      ) : (
        <Grid
          container
          item
          xs={12}
          minHeight="600px"
          alignContent="center"
          alignItems="center"
          display="flex"
          justifyContent="center"
          textAlign="center"
        >
          <Grid item xs={12} pb={3.75}>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="noDataTable">
              Sorry, the data you are looking for could not be found.
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default DataTable;
