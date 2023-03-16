import React, { useState, useEffect } from "react";
import { Breadcrumb, ConfirmationDialog } from "matx";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import { Icon,Fab, Tooltip } from "@material-ui/core";
import { Link,useParams } from "react-router-dom";
import Swal from "sweetalert2";
import FormDialog from "./Addcategory"
import MemberEditorDialog from "./Addcategory";
import url from "../../invoice/InvoiceService";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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
    Grid
} from "@material-ui/core";



const SimpleMuiTable = () => {
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
      float: 'right',
      background:'blue',
      color:'white'
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
    width: "350px",
 }
 const columnStyleWithWidth1 = {
  top: "0px",
  left: "0px",
  zIndex: "100",
  position: "sticky",
  backgroundColor: "#fff",
  width: "300px",
  wordBreak: "break-word",
}
const dummydata=[{
  name:"PP-SG",
  description:'Adco Antiseptic Disinfectant',

  unit_of_measure:'ml',
  category_name:'Industry',
  id:1

}]
  const classes = useStyles();
    const [isAlive, setIsAlive] = useState(true);
    const [userList, setUserList] = useState([]);
    const [catList, setcatList] = useState([]);
    const [subcatList, setsubcatList] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { id } = useParams();

  function handleClick(event,id) {
    
    url.get("sub-category/"+id).then(({ data }) => {
      
      setsubcatList(data);
    })
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);

  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);


    useEffect(() => {
      
      url.get("categorized-products/"+id)
      .then(function (response) {
       
        setUserList(response.data)
        
      })
      //   url.get(url+"products").then(({ data }) => {
      //      setUserList(data);
        
          

      //   });
      //   url.get(url+"categories").then(({ data }) => {
      //     setcatList(data);
     
         

      //  });
      
       
        
        return () => setIsAlive(false);
    },[]);
    const [count, setCount] = useState(0);
  
    function getrow(e) {
      url.get("products").then(({ data }) => {
        if (isAlive) setUserList(data);
    });
    return () => setIsAlive(false);
    }
  function Increment(e) {
    alert('3')
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
    setShouldOpenEditorDialog(false);
   
  };

  const handleDeleteUser = (user) => {
    
    setShouldOpenConfirmationDialog(true);
  };
  const selectcategory = (user) => {
  
    url.get("categorized-products/"+user)
      .then(function (response) {
       
        setUserList(response.data)
        
      })

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
 {/* category wise product display */}
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
      label: "S.No.", // column title that will be shown in table
      options: {
         
          filter: true,
      },
  },
  {
    name: "name", // field name in the row object
    label: "Name",
    wordBreak:"break-word", // column title that will be shown in table
    options: {
       
      customHeadRender: ({index, ...column}) =>{
        return (
          <TableCell key={index} style={columnStyleWithWidth}>  
            <span style={{paddingLeft:15}}>Name</span>
          </TableCell>
        )
     },
    },
},
  {
      name: "description",
      label: "Description",
      resizableColumns: true,
      options: {
          // setCellProps: () => ({ style: { minWidth: "800px", maxWidth: "800px" }}),
          customHeadRender: ({index, ...column}) =>{
            return (
              <TableCell key={index} style={columnStyleWithWidth}>  
                <span style={{paddingLeft:15}}>Description</span>
              </TableCell>
            )
         },
      },
  },
  {
      name: "unit_of_measure",
      label: "Unit_of_measure",
      options: {
        customHeadRender: ({index, ...column}) =>{
          return (
            <TableCell key={index} style={{top: "0px",
            left: "0px",
            zIndex: "100",
            position: "sticky",
            backgroundColor: "#fff",
            width: "60px"}} >  
              <span style={{paddingLeft:15}}>UOM</span> 
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
      
      customHeadRender: ({index, ...column}) =>{
        return (
          <TableCell key={index} style={columnStyleWithWidth1}>  
            <span style={{paddingLeft:15}}>Category</span>
          </TableCell>
        )
     },
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
            {/* <IconButton onClick={() => removeData(tableMeta.rowData[5])}>
                    <Icon color="error">delete</Icon>
            </IconButton>
            
            <Link to={"/product/updateproduct?id=" +tableMeta.rowData[5] }>
              <IconButton>
                <Icon color="secondary">edit</Icon>
              </IconButton>
            </Link> */}
            <Link to={"/print_singleproduct?id=" +tableMeta.rowData[5] }>
              <Tooltip title="View Product">
                <Icon color="primary">arrow_forward</Icon>
              </Tooltip>
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
    <div>
      <div className="m-sm-30">
      <div  className="mb-sm-30">
      <div className="viewer_actions px-4 flex justify-between">
          <Breadcrumb
            routeSegments={[
              { name: "Product Category", path: "/print_categoryview" },
              { name: "Products" }
            ]}
          />
          
        
          <div className="text-right">
          <Link to={`/print_addproduct/${id}`} >
           
                    <Button className="py-2"
           color="primary"
           variant="outlined">
          <Icon>add</Icon>
          Add New
        </Button>
        </Link>
        </div>
        </div>
        </div>
          
      
          
        
        

                    {shouldOpenEditorDialog && (
          <MemberEditorDialog
            handleClose={handleDialogClose}
            open={shouldOpenEditorDialog}
          />
        )}
        {shouldOpenConfirmationDialog && (
          <ConfirmationDialog
            open={shouldOpenConfirmationDialog}
            onConfirmDialogClose={handleDialogClose}
            text="Are you sure to delete?"
          />
        )}
      
    
      <MUIDataTable
                title={"Products"}
                data={
                 
                  dummydata.map((item, index) => {
                    
                   
                      return [
          
                        ++index,
                        item.name,
                        item.description,
                        item.unit_of_measure,
                        item.category_name,
                        item.id,
                      ]
                    
                  })
                  
                }
                columns={columns}
                options={{
                    filterType: "textField",
                    responsive: "simple",
                    selectableRows: "none",
                   
                     // set checkbox for each row
                    // search: false, // set search option
                    // filter: false, // set data filter option
                    // download: false, // set download option
                    // print: false, // set print option
                    // pagination: true, //set pagination option
                    // viewColumns: false, // set column option
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
            </div>
           
            </div>
           
  ); } 
   

export default SimpleMuiTable;
