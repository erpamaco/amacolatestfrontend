import React, { useState, useMemo, useEffect } from "react";
import { debounce } from "lodash";
import { Breadcrumb, ConfirmationDialog } from "matx";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import { Icon, Fab, Tooltip, TextField, InputAdornment } from "@material-ui/core";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import FormDialog from "./Addcategory"
import MemberEditorDialog from "./Addcategory";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useParams, useHistory } from "react-router-dom";
import url, { getcategories } from "../../invoice/InvoiceService";
import history from "history.js";
import MatxSearchBox from "./ProductSearch";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  TableRow,
  Divider,
  Button,
  Card,
  Grid,
  Typography
} from "@material-ui/core";
import ReactTooltip from 'react-tooltip';



const SimpleMuiTable = () => {
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
      float: 'right',
      background: 'blue',
      color: 'white'
    },
    input: {
      display: "none"
    }
  }));
  const columnStyleWithWidth = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "500px"
  }
  const classes = useStyles();
  const [isAlive, setIsAlive] = useState(true);
  const [userList, setUserList] = useState([]);
  const [catList, setcatList] = useState([]);
  const [subcatList, setsubcatList] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [catid, setcatid] = useState(null);
  const [originalList, setOriginalList] = useState([]);
  const [list, setList] = useState([]);
  const dummydata = [{
    name: "Industry"
  },
  {
    name: 'Stationary'
  }]
  const dummysub = [{
    name: "hand wash"
  }]
  function handleClick(event, id) {

    // url.get("sub-category/" + id).then(({ data }) => {

    //   setsubcatList(data);
    //   setcatid(id)
    // })
    setsubcatList(dummysub);
    setcatid(1);
    setAnchorEl(event.currentTarget);
  }

  const routerHistory = useHistory();


  function handleClose() {

    setAnchorEl(null);
  }
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);

  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);


  useEffect(() => {

    url.get("products").then(({ data }) => {
      setUserList(data);




    });
    if (catid) {
      url.get("categories").then(({ data }) => {
        setcatList(data);
        setOriginalList(data);
        setList(data);


      });
    }
    else {
      url.get("categories").then(({ data }) => {
        setcatList(data);
        setOriginalList(data);
        setList(data);
      })
    }


    return () => setIsAlive(false);

  }, []);
  const [count, setCount] = useState(0);

  function getrow(e) {
    url.get("products").then(({ data }) => {
      if (isAlive) setUserList(data);
    });
    return () => setIsAlive(false);
  }

  function Increment(e) {


  }
  function Decrement() {
    setCount(count - 1);
  }

  const [click, setClick] = useState([]);

  const addNumber = () => {
    setClick([
      ...click,
      {
        id: click.length,
        value: Math.random() * 10
      }
    ]);
  };
  const handleDialogClose = () => {
    setcatid(null)
    setShouldOpenEditorDialog(false);

  };

  const handleDeleteUser = (user) => {

    setShouldOpenConfirmationDialog(true);
  };
  const setsubcategory = (id) => {
    setcatid(id)
    setAnchorEl(null);
    setShouldOpenEditorDialog(true);

  }
  const deletecategory = (id) => {
    Swal.fire({
      title: 'Are you sure you want to delete this category?',
      text: 'Any products, services, or categories in it will be uncategorised.',
      icon: 'danger',
      showCancelButton: true,
      customClass: {
        zIndex: 1000
      },
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        url.delete(`categories/${id}`)
          .then(res => {



          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          customClass: {
            zIndex: 1000
          },
          title: 'Cancelled'
          // 'Cancelled',
          // 'Your imaginary file is safe :)',
          // 'error',

        })
      }
    })


  }
  const selectcategory = (user) => {

    // url.get(url+"categorized-products/"+user)
    //   .then(function (response) {

    //     setUserList(response.data)

    //   })
    routerHistory.push(`/print_viewproduct/${user}`)

    setAnchorEl(null);
  };

  const removeData = (id) => {
    // alert(id)
    // let url = `https://jsonplaceholder.typicode.com/users/${id}`
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        url.delete(`products/${id}`)
          .then(res => {

            getrow()
            Swal.fire(
              'Deleted!',
              ' product has been deleted.',
              'success'
            )

          })


        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your product is safe :)',
          'error'
        )
      }
    })

  }
  // search
  const search = useMemo(
    () =>

      debounce((query) => {
        let tempList = originalList.filter((item) =>
          item.name.toLowerCase().match(query.toLowerCase())
        );
        setcatList([...tempList]);
      }, 200),
    [originalList]
  );
  const handleInputChange = (event) => {
    let { value } = event.target;
    search(value);
  };
  {/* category wise product display */ }
  const statList = [
    {
      icon: "receipt",
      amount: 23,
      title: "New Quotation Request",
    },
    {
      icon: "hourglass_empty",
      amount: 12,
      title: "Pending Quotation",
    },
    {
      icon: "shopping_cart",
      amount: 10,
      title: "Sales Orders",
    },
    {
      icon: "dvr",
      amount: 30,
      title: "Todays Sale",
    },
  ];

  const columns = [
    {
      name: "id", // field name in the row object
      label: "#", // column title that will be shown in table
      options: {

        filter: true,
      },
    },
    {
      name: "name", // field name in the row object
      label: "Name", // column title that will be shown in table
      options: {

        filter: true,
      },
    },
    {
      name: "description",
      label: "Description",
      resizableColumns: true,
      options: {
        // setCellProps: () => ({ style: { minWidth: "800px", maxWidth: "800px" }}),
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={columnStyleWithWidth}>
              <TableHead>Description</TableHead>
            </TableCell>
          )
        },
      },
    },
    {
      name: "unit_of_measure",
      label: "Unit_of_measure",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{
              top: "0px",
              left: "0px",
              zIndex: "100",
              position: "sticky",
              backgroundColor: "#fff",
              width: "60px"
            }} >
              <TableHead >UOM</TableHead>
            </TableCell>
          )
        },
        filter: true,
      },
    },

    {
      name: "category_name",
      label: "Category",
      options: {

        filter: true,
      },
    },


    {
      name: "id",
      label: "Action",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <span>
              <IconButton onClick={() => removeData(tableMeta.rowData[5])}>
                <Icon color="error">delete</Icon>
              </IconButton>

              <Link to={"/product/updateproduct?id=" + tableMeta.rowData[4]}>
                <IconButton>
                  <Icon color="secondary">edit</Icon>
                </IconButton>
              </Link>
            </span>

          )

        },
      },
    },
    // {
    //   name: "id",
    //   label:".",
    //   options: {
    //       filter: true,
    //       customBodyRender: (value, tableMeta, updateValue) => {
    //           return (
    //             <Link to={"/product/updateproduct?id=" +tableMeta.rowData[4] }>
    //               <IconButton>
    //                 <Icon color="secondary">edit</Icon>
    //               </IconButton>
    //             </Link>


    //           )
    //       },
    //   },
    // },
  ];



  return (

    <div className="m-sm-30">
      <div className="mb-sm-30">
        <div className="flex flex-wrap justify-between mb-6">
          <Breadcrumb
            routeSegments={[
              // { name: "Add new", path: "./Addproduct" },
              { name: "Product Category" }
            ]}
          />
          <div className="flex justify-end pr-4" >

            <TextField
              className="mt-4"
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>search</Icon>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <Button className="py-2 ml-4"
              color="primary"
              size="small"
              variant="outlined"
              onClick={() => {
                setShouldOpenEditorDialog(true);
              }} >
              <Icon>add</Icon>
              Add New
            </Button>
          </div>
        </div>
      </div>
      <div className="viewer_actions px-4 flex justify-end">

        {/* <MatxSearchBox /> */}


      </div>
      <div className="viewer_actions px-4 flex justify-between">
        <div className="mb-6">


          <Grid container spacing={3}>

            {/* <Card elevation={20} className="p-2" style={{ maxWidth: 50,maxHeight: 50,marginTop:10, whiteSpace: 'pre-line' }} onClick={() => {
              setShouldOpenEditorDialog(true);
            }} >
              <Tooltip title="Add New Category">

                <Icon fontSize="large" color="dark" >add</Icon>


              </Tooltip>
            </Card> */}

            {dummydata.map((item, ind) => (
              <Grid item xs>
                <Card elevation={20} style={{ minWidth: 300, whiteSpace: 'pre-line' }} className="p-2" >
                  <div className="text-right">
                    <IconButton size="small" aria-owns={anchorEl ? "simple-menu" : undefined}
                      aria-haspopup="true"
                      onClick={(event) => handleClick(event, item.id)}
                    >
                      <Tooltip title="Subcategory list">
                        <Icon color="primary" style={{ paddingRight: 12 }}>expand_more</Icon>
                      </Tooltip>
                    </IconButton>
                  </div>
                  <Menu

                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => {
                      setShouldOpenEditorDialog(true);
                      setAnchorEl(null)
                    }}>
                      <Icon align="left">add</Icon> Add Sub Category
                    </MenuItem>
                    {subcatList.map((item) => (
                      <MenuItem value={item.id} key={item.id} onClick={() => selectcategory(item.id)}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.name}
                      </MenuItem>
                    ))}
                  </Menu>
                  <div className="pb-5 flex justify-between">
                    <div style={{ display: 'flex', marginLeft: '0.5rem' }}>

                      <strong><h6 align="center" style={{ display: 'inline-block' }} >{item.name}</h6></strong>
                    </div>
                    <div className="px-4">
                      {/* <IconButton size="small"  aria-owns={anchorEl ? "simple-menu" : undefined}
                        aria-haspopup="true"
                        onClick={(event) => handleClick(event, item.id)}
                        style={{marginRight:'0.5rem',paddingTop:0}}
                        >
                        <Tooltip title="Subcategory list">
                          <Icon color="primary" style={{paddingRight:12}}>expand_more</Icon>
                        </Tooltip>
                      </IconButton>
                      <Menu

                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => {
                          setShouldOpenEditorDialog(true);
                          setAnchorEl(null)
                        }}>
                      <Icon align="left">add</Icon> Add Sub Category
                      </MenuItem>
                        {subcatList.map((item) => (
                          <MenuItem value={item.id} key={item.id} onClick={() => selectcategory(item.id)}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.name}
                          </MenuItem>
                        ))}
                      </Menu> */}
                    </div>
                  </div>
                  {/* <p className="m-0 " style={{color:'blue'}}>{item.name}</p> */}


                </Card>
              </Grid>
            ))}

          </Grid>
        </div>
        {/* </Button> */}
        <Link to={"Addproduct"}>

          {/* <Button className="py-2"
           color="primary"
           variant="outlined">
          <Icon>add</Icon>
          Add New
        </Button> */}
        </Link>
      </div>





      {shouldOpenEditorDialog && (
        <MemberEditorDialog
          handleClose={handleDialogClose}
          open={shouldOpenEditorDialog}
          catid={catid}
          catList={setcatList}

        />
      )}
      {shouldOpenConfirmationDialog && (
        <ConfirmationDialog
          open={shouldOpenConfirmationDialog}
          onConfirmDialogClose={handleDialogClose}
          text="Are you sure to delete?"
        />
      )}

      <div className="mb-sm-30">
        {/* <MUIDataTable
                title={"Products"}
                data={userList}
                columns={columns}
                options={{
                    filterType: "textField",
                    responsive: "simple",
                    selectableRows: "none", // set checkbox for each row
                    // search: false, // set search option
                    // filter: false, // set data filter option
                    // download: false, // set download option
                    // print: false, // set print option
                    // pagination: true, //set pagination option
                    // viewColumns: false, // set column option
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            /> */}
      </div>
    </div>
  );
}


export default SimpleMuiTable;
