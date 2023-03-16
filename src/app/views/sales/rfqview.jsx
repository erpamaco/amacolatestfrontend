import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    TableRow,
    Button
} from "@material-ui/core";
import url from "../invoice/InvoiceService"


const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true);
    const [userList, setUserList] = useState([]);
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);

    useEffect(() => {
        url.get("products").then(({ data }) => {
            if (data) setUserList(data);
        });
        return () => setIsAlive(false);
    }, [isAlive]);
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
  const removeData = (id) => {
    // alert(id)
    // let url = `https://jsonplaceholder.typicode.com/users/${id}`
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        url.delete(`products/${id}`)
    .then(res => {
        
        getrow()
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
        
    })
    
        
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
    // url.delete(`http://dataqueuesystems.com/amaco/amaco/public/api/products/${id}`)
    // .then(res => {
   
        
    // })
    // getrow()
    // url.delete(url).then(res => {
    //     const del = employees.filter(employee => id !== employee.id)
    //     setEmployees(del)
    
    // })
}
const columns = [
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
      options: {
          filter: true,
      },
  },
  {
      name: "unit_of_measure",
      label: "Unit_of_measure",
      options: {
          filter: true,
      },
  },
  // {
  //     name: "unit_",
  //     label: "unit_of_measure",
  //     options: {
  //         filter: true,
  //     },
  // },
 
  {
    name: "id",
    label: "Action",
    options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
           
            return (
            <IconButton onClick={() => removeData(tableMeta.rowData[4])
            }
            >
                    <Icon>close</Icon>
            </IconButton>
            
            
            )
            
        },
    },
},
{
  name: "id",
  options: {
      filter: true,
      customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Link to={"/product/updateproduct?id=" +tableMeta.rowData[4] }>
              <IconButton>
                <Icon>edit</Icon>
              </IconButton>
            </Link>
          
          )
          
      },
  },
},
];

    
  
  return ( 
    <div> 
      <MUIDataTable
                title={"User Report"}
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
            />
    </div> 
  ); } 
   

export default SimpleMuiTable;
