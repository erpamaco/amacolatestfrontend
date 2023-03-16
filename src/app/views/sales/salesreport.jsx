import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import { Link,useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import url from "../../views/invoice/InvoiceService"
import moment from "moment";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from "@material-ui/pickers";
  import DateFnsUtils from "@date-io/date-fns";
// import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  TableRow,
  Button,
  Typography,
  Grid,
  Tooltip,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
const columnStyleWithWidth = {
  top: "0px",
  left: "0px",
  zIndex: "100",
  position: "sticky",
  backgroundColor: "#fff",
  width: "80px",
  wordBreak: "break-all",
}
const columnStyleWithWidth1 = {
  top: "0px",
  left: "0px",
  zIndex: "100",
  position: "sticky",
  backgroundColor: "#fff",
  width: "400px",
  wordBreak: "break-all",
}


const PaymentTable = ({data1}) => {
  const [sales_Report, setsales_Report] = useState([]); 
  const [from_date, setfrom_date] = useState(new Date()); 
  const [to_date, setto_date] = useState(new Date()); 
  const handleDateChange = (date) => {
    setfrom_date(date);
  };

  const handleDateChange1 = (date) => {
    setto_date(date);
  };
useEffect(() => {
    
  // url.get("advance-payments").then(({ data }) => {
  //     setsales_Report(data)

      

  // })
},[data1])
const handleSubmit = ()=>{
  url
      .post(
        "sale-report?" +
          "from_date=" +
          moment(from_date).format("YYYY-MM-DD") +
          "&to_date=" +
          moment(to_date).format("YYYY-MM-DD")
      )
      .then(({ data }) => {
        setsales_Report(data)
        // console.log(data)
      })
}
const removeData = (id) => {
  // alert(id)
  // let url = `https://jsonplaceholder.typicode.com/users/${id}`
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this Advance Payment!',
    icon: 'danger',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    icon: 'warning',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      url.delete(`advance-payments/${id}`)
        .then(res => {
          url.get("advance-payments").then(({ data }) => {
            setsales_Report(data)
            
    
        })
          // getrow()
          Swal.fire(
            'Deleted!',
            'Advance Payment has been deleted.',
            'success'
          )

        })


      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your Receipt is safe :)',
        'error'
      )
    }
  })

}
  
  
  const columns = [
    {
      name: "id", // field name in the row object
      label: "S.No.", // column title that will be shown in table
      options: {
       
        customHeadRender: ({index, ...column}) =>{
          return (
            <TableCell key={index} style={columnStyleWithWidth}>  
              <span style={{marginLeft:18}}>S.No.</span> 
            </TableCell>
          )
       }
      }
    },
    {
      name: "fname", // field name in the row object
      label: "Date", // column title that will be shown in table
    //   options : {
	// 			customHeadRender: ({index, ...column}) =>{
    //       return (
    //         <TableCell key={index} style={columnStyleWithWidth1}>  
    //           <p style={{marginLeft:18}}>Company Name</p> 
    //         </TableCell>
    //       )
    //    }
	// 		}
    },
    {
      name: "name",
      label: "Company Name",
      options: {
       
        customHeadRender: ({index, ...column}) =>{
          return (
            <TableCell key={index} style={columnStyleWithWidth1}>  
              <span style={{marginLeft:18}}>Company Name</span> 
            </TableCell>
          )
       }
      }
    },
    {
      name: "name",
      label: "PO NUMBER",
      options: {
       
        customHeadRender: ({index, ...column}) =>{
          return (
            <TableCell key={index} style={columnStyleWithWidth1}>  
              <span style={{marginLeft:18}}>PO NUMBER</span> 
            </TableCell>
          )
       }
      }
    },
    {
      name: "amount",
      label: "Invoice No.",
      options: {
        filter: true,
      },
    },
    {
        name: "amount",
        label: "Grand Total",
        options: {
          filter: true,
        },
      },
    // {
    //   name: "id",
    //   label: "Action",
    //   options: {
    //     filter: true,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <span>
    //         {/* <Link to={"/invoice/" + tableMeta.rowData[4]}> */}
    //           <Tooltip title="View More">
    //             <Icon color="error" onClick={e=>removeData(tableMeta.rowData[4])}>delete</Icon>
    //          </Tooltip>
    //         {/* </Link> */}
           
    //       </span>

    //       )

    //     },
    //   },
    // },
   
  ];



  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
    
        <Breadcrumb
          routeSegments={[
            // { name: "Add Expense", path: "/addexpense" },
            { name: "Sales Reports" },
          ]}
        />
        </div>
        <ValidatorForm className="px-0 pb-0" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          
          <Grid item lg={3} md={6} xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className="mb-4 w-full"
                margin="none"
                label="From Date"
                maxDate={new Date()}
                inputVariant="outlined"
                type="text"
                size="small"
                autoOk={true}
                value={from_date}
                format="MMMM dd, yyyy"
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item lg={3} xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className="mb-4 w-full"
                margin="none"
                label="To Date"
                inputVariant="outlined"
                type="text"
                size="small"
                autoOk={true}
                value={to_date}
                format="MMMM dd, yyyy"
                onChange={handleDateChange1}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item lg={3} xs={12}>
            <Button
              color="primary"
              variant="outlined"
              type="submit"
              onClick={handleSubmit}
            >
              <Icon>save</Icon> Filter
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
      
      <MUIDataTable
        title={"Sales Reports"}
       data={sales_Report.map((item, index) => {
 
        
        return [
         ++index,
          item.ps_date,
          item.party?item.party['firm_name']:'',
          item.po_number ? item.po_number : '--',
          item.quotation_no,
          item.net_amount
       ]
        
      })} 
         columns={columns}  
         options={{
           
            rowsPerPageOptions: [10, 20, 40, 80, 100],
            selectableRows: "none",
            // filterType: "dropdown",
            responsive: "scrollMaxHeight",
            rowsPerPage: 10, 
         }}          
                   
      />
    </div>
   
  );
}


export default PaymentTable;
