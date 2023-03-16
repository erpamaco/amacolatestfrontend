import React, { useState, useEffect } from "react";
import { Breadcrumb,ConfirmationDialog } from "matx";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import { Link,useParams } from "react-router-dom";
import Swal from "sweetalert2";
// import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import AnalysisForm from "./analysisform";
import url from "../../invoice/InvoiceService"
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    TableRow,
    Button
} from "@material-ui/core";


const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true);
    const [rfqList, setRfqList] = useState([]);
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
    const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);
  let search = window.location.search;
    let params = new URLSearchParams(search);
    const id =parseInt(params.get('id'));
  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
   
  };

  const handleDeleteUser = (user) => {
    
    setShouldOpenConfirmationDialog(true);
  };

    useEffect(() => {
    
        url.get("rfq/"+id).then(({ data }) => {
            if (isAlive) setRfqList(data[0].rfq_details);
           
        });
        return () => setIsAlive(false);
    }, [isAlive]);
    const [count, setCount] = useState(0);
  
    function getrow(e) {
      url.get("parties").then(({ data }) => {
        if (isAlive) setRfqList(data);
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
        url.delete(`parties/${id}`)
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
      name: "id", // field name in the row object
      label: "Sno", // column title that will be shown in table
      options: {
          filter: true,
      },
  },
  {
      name: "name",
      label: "product",
      options: {
          filter: true,
      },
  },
  {
      name: "description",
      label: "description",
      options: {
          filter: true,
      },
  },
  {
    name: "",
    // label: "Action",
    options: {
      filter: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Link to={"/rfqproductview?id=" + tableMeta.rowData[0]}>
            <IconButton>
              <Icon>search</Icon>
            </IconButton>
          </Link>

        )

      },
    },
},
//   {
//     name: "opening_balance",
//     label: "opening balance",
//     options: {
//         filter: true,
//     },
// },

 
//   {
//     name: "id",
//     label: "Action",
//     options: {
//         filter: true,
//         customBodyRender: (value, tableMeta, updateValue) => {

//             return (
//             <IconButton onClick={() => removeData(tableMeta.rowData[4])
//             }
//             >
//                     <Icon>close</Icon>
//             </IconButton>
            
            
//             )
            
//         },
//     },
// },
// {
//   name: "id",
//   label:".",
//   options: {
//       filter: true,
//       customBodyRender: (value, tableMeta, updateValue) => {
//           return (
//             <Link to={"/party/updateparty?id=" +tableMeta.rowData[4] }>
//               <IconButton>
//                 <Icon>edit</Icon>
//               </IconButton>
//             </Link>
            
          
//           )
//       },
//   },
// },
];

    
  
  return ( 
    <div>
      <div  className="m-sm-30">
      <div  className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "View", path: "./rfqview" },
              { name: "Rfqdetails" }
            ]}
          />
        </div> 
        <div className="text-right">
               
                {/* <Button
            className="mt-4"
            color="primary"
            variant="outline-primary"
            size="small"
              onClick={() => {
              setShouldOpenEditorDialog(true);
            }}
          >
            add new
          </Button> */}
         
          </div>
          {shouldOpenEditorDialog && (
          <AnalysisForm
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
                title={"RFQ Details"}
                data={rfqList.map((item, index) => {
         
                  return [
                    item.id,
                    item.product[0].name,
                    item.product[0].description,
                    item.require_date,
                  ]
                
              })}
                columns={columns}
                options={{
                    filterType: "textField",
                    responsive: "simple",
                    selectableRows: "none", // set checkbox for each row
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
    </div>
    </div> 
  ); } 
   

export default SimpleMuiTable;
