import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import { Link,useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import url from "../../invoice/InvoiceService"
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
  width: "360px",
  wordBreak: "break-all",
}


const Jobreport = ({data1}) => {
  const [sales_Report, setsales_Report] = useState([]); 
  const [from_date, setfrom_date] = useState(new Date()); 
  const [to_date, setto_date] = useState(new Date()); 
  const [net_tax_amount, setnet_tax_amount] = useState(); 
  const handleDateChange = (date) => {
    setfrom_date(date);
  };

  const handleDateChange1 = (date) => {
    setto_date(date);
  };
useEffect(() => {
    
//   var localTime = moment().format('YYYY-MM-DD'); // store localTime
// var startdate = localTime + "T00:00:00.000Z";
// console.log(startdate)
// var lastdate = moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).format('YYYY-MM-DD');
// var enddate =lastdate + "T00:00:00.000Z";
// console.log(enddate)
  
//   url.get("invoic").then(({ data }) => {
             
//  var  result = data.filter(d => {var time = d.created_at;
//                              return (startdate <= time && time <= enddate);
//                             });
// console.log(result);



url
.post(
  "purchase-tax?" +
    "from_date=" +
    moment(new Date(new Date().getFullYear(), new Date().getMonth() , 1)).format("YYYY-MM-DD") +
    "&to_date=" +
    moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).format("YYYY-MM-DD")
)
.then(({ data }) => {
    var net_tax=0;
  data.map((item,i)=>{
    net_tax+=parseFloat(item.tax)
  })
  const myArr = Object.values(data).sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  setsales_Report(myArr)
  setnet_tax_amount(net_tax)
})
setfrom_date(new Date(new Date().getFullYear(), new Date().getMonth() , 1))
setto_date(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0))


},[data1])
const handleSubmit = ()=>{
  url
      .post(
        "purchase-tax?" +
          "from_date=" +
          moment(from_date).format("YYYY-MM-DD") +
          "&to_date=" +
          moment(to_date).format("YYYY-MM-DD")
      )
      .then(({ data }) => {
        setsales_Report(data)
        console.log(data)
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
      options : {
		filter:true		
          
			}
    },
    {
        name: "fname", // field name in the row object
        label: "Bill No", // column title that will be shown in table
        options : {
                  filter:true
              }
      },
    
    
    // {
    //     name: "Paid By",
    //     label: "Paid By",
    //     options: {
    //       filter: true,
    //     },
    //   },

      {
        name: "Paid To",
        label: "Paid To",
        options: {
          filter: true,
        },
      },
    {
        name: "amount",
        label: "Amount",
        options: {
          filter: true,
        },
      },
      {
        name: "amount",
        label: "Tax Amount",
        options: {
          filter: true,
        },
      },
    
   
  ];



  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
    
        <Breadcrumb
          routeSegments={[
            // { name: "Add Expense", path: "/addexpense" },
            { name: "Job Report" },
          ]}
        />
        </div>
        <ValidatorForm className="px-0 pb-0" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          
          <Grid item lg={3} md={3} xs={12}>
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

          <Grid item lg={3} md={3} xs={12}>
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


          
          <Grid item lg={3} md={6} xs={12}>
            <Button
              color="primary"
              variant="outlined"
              className="mr-6"
              type="submit"
              onClick={handleSubmit}
            >
              <Icon>save</Icon> Save
            </Button>
            
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
          {/* <span>Total Tax Amount</span>:    <strong>{net_tax_amount}</strong> */}
            </Grid>
          
        </Grid>
      </ValidatorForm>
      
      <MUIDataTable
        title={"Job Report"}
       data={sales_Report.map((item, index) => {
        
        return [
         ++index,
            moment(item.paid_date).format("DD MMM YYYY"),
          item.referrence_bill_no,
          // item.paid_by,
          item.paid_to,
          item.amount,
          item.tax
          
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


export default Jobreport;
