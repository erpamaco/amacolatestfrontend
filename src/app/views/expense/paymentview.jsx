import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import { Link,useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import url, { GDIV } from "../../views/invoice/InvoiceService"
import moment from "moment";
import MemberEditorDialog1 from "./addpayment";

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
  Tooltip
} from "@material-ui/core";
const columnStyleWithWidth = {
  // top: "0px",
  // left: "8px",
  zIndex: "100",
  position: "sticky",
  backgroundColor: "#fff",
  width: "200px",
  wordBreak: "break-all",
}
const columnStyleWithWidth1 = {
  top: "0px",
  left: "0px",
  zIndex: "100",
  position: "sticky",
  backgroundColor: "#fff",
  width: "600px",
  wordBreak: "break-all",
}


const PaymentTable = ({data1}) => {
  const [userList, setuserList] = useState([]);
  const [shouldOpenEditorDialog1, setShouldOpenEditorDialog1] = useState(false);
  const [id, setid] = useState('');
  const [from_date_pay, setfrom_date_pay] = useState(moment(new Date()).format("YYYY"));
  const [resetuserList, setResetUserList] = useState([]);
  const curr_date = new Date();
  const curr_year = moment(curr_date).format("YYYY");
  const [IsAlive, setIsAlive] = useState(false);

    const handleReset = () => {
    setfrom_date_pay(new Date())
    // console.log("sup",from_date_q)
    
  
    localStorage.removeItem("from_date_pay");
      
    localStorage.removeItem("dataKeyState_pay")
    setuserList(
      resetuserList.filter(
        (obj) =>
          new Date(moment(obj.received_date).format('YYYY')).getTime() == new Date(curr_year).getTime() 
          // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
      )
    );
    setIsAlive(false)
    // window.location.reload()
  }
  const handleSubmit = () => {
    const datas = resetuserList.filter(
  (obj) =>
    new Date(moment(obj.received_date).format('YYYY')).getTime() == new Date(from_date_pay).getTime() 
    // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
);
setuserList(datas);
localStorage.setItem('dataKeyState_pay', JSON.stringify(datas))

// localStorage.setItem('dataKeyState', userList)
// console.log("dataKeyState",JSON.parse(localStorage.getItem("dataKeyState")))
};

const handleDateChange_Q = (date) => {
  if(localStorage.getItem("dataKeyState_pay")){
    setfrom_date_pay(moment(date).format("YYYY"));
    localStorage.setItem("from_date_pay",moment(date).format("YYYY"));
    setuserList(resetuserList)
  }else{
    setfrom_date_pay(moment(date).format("YYYY"));
    localStorage.setItem("from_date_pay",moment(date).format("YYYY"));


  }
     
};
 
useEffect(() => {
     if(localStorage.getItem("from_date_pay")){
      setfrom_date_pay(localStorage.getItem("from_date_pay"));
  
    }
    
  url.get("advance-payments").then(({ data }) => {
      setResetUserList(data);

      if(localStorage.getItem("dataKeyState_pay")){
        setuserList(JSON.parse(localStorage.getItem("dataKeyState_pay")));
        
      }else{
      setuserList(data.filter(
        (obj) =>
          new Date(moment(obj.received_date).format('YYYY')).getTime() == new Date(curr_year).getTime() 
          // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
      ))
      }

      

  })
},[data1])

const handleDialogClose1 = () => {
  
  setShouldOpenEditorDialog1(false);
  // setTabIndex(0)
  url.get('advance-payments').then(({ data }) => {
    setuserList(data)

  });

};
const setpaymenttid = (id) => {
    
  setShouldOpenEditorDialog1(true);
  setid(id);
  
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
            setuserList(data)
            
    
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
      label: "S.NO.", // column title that will be shown in table
      options: {
       
        customHeadRender: ({index, ...column}) =>{
          return (
            <TableCell key={index} style={{width:80}}>  
              <span style={{marginLeft:18}}>S.No.</span> 
            </TableCell>
          )
       },
    setCellProps: () => ({
      align: "center",
      
    })
    }
    },
    
    {
      name: "fname", // field name in the row object
      label: "PAYMENT ACCOUNT",
      options:{
        filter:true,
        responsive:"scrollMaxHeight"
      }
       // column title that will be shown in table
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
      name: "fname", // field name in the row object
      label: "PAID TO", // column title that will be shown in table
    
    },
    {
      name: "paid_date",
      label: "COMMENT",
     
      options : {
			
        customHeadRender: ({index, ...column}) =>{
          return (
            <TableCell key={index} style={{textAlign:"center",position: "sticky",overflowWrap:'break-word'}} >  
              <span style={{"word-wrap": "break-word"}}>COMMENT</span> 
            </TableCell>
          )
       },
        setCellProps:()=>({
          align:"center",
          style: { overflowWrap: "break-word" },
         
        }),
        
			}
    },
    {
      name: "paid_date",
      label: "PAID DATE",
      options : {

			
        customHeadRender: ({index, ...column}) =>{
          return (
            <TableCell key={index} style={{textAlign:"center",position: "sticky"}} options={{responsive:"scrollMaxHeight"}}>  
              <span >RECEIVED DATE</span> 
            </TableCell>
          )
       },
       setCellProps:()=>({
        align:"center"
      })
    }
			
    },
    {
      name: "amount",
      label: "AMOUNT",
      className:"text-right",
      
      options: {
       
        customHeadRender: ({index, ...column}) =>{
          return (
            <TableCell key={index} style={{textAlign:"right",position: "sticky"}}>  
              <span >AMOUNT</span> 
            </TableCell>
          )
       },
        setCellProps: () => ({
          align: "right",
          
        })
      },
    },
    {
      name: "id",
      label: "ACTION",
      options: {
        filter: true,
        customHeadRender: ({index, ...column}) =>{
          return (
            <TableCell key={index} style={{textAlign:'right'}} className="pr-8">  
              <span style={{textAlign:'center'}}>ACTION</span> 
            </TableCell>
          )
       },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{textAlign:"right"}} className="pr-8">
            {/* <Link to={"/invoice/" + tableMeta.rowData[4]}> */}
              <Tooltip title="Edit">
                <Icon color="secondary" onClick={e=>setpaymenttid(tableMeta.rowData[6])}>edit</Icon>
             </Tooltip>
             <Tooltip title="Delete">
                <Icon color="error" onClick={e=>removeData(tableMeta.rowData[6])}>delete</Icon>
             </Tooltip>
            {/* </Link> */}
           
          </div>

          )

        },
      },
    },
   
  ];



  return (
    <div>

<MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
                      // className="m-2"
                      margin="none"
                      label="Filter By Paid Date"
                      maxDate={new Date()}
                      inputVariant="outlined"
                      type="text"
                      size="small"
                      autoOk={true}
                      views={["year"]}
                      value={localStorage.getItem("from_date_pay") ? localStorage.getItem("from_date_pay") : from_date_pay}
                      format="yyyy"
                      onChange={handleDateChange_Q}
                    />
          </MuiPickersUtilsProvider>&nbsp;&nbsp;
          <Button
                    color="success"
                    variant="outlined"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <Icon>search</Icon>&nbsp;&nbsp; Filter
                  </Button>&nbsp;&nbsp;
                  {localStorage.getItem("dataKeyState_pay") &&<Button
                    color="error"
                    variant="outlined"
                   
                    onClick={handleReset}
                  >
                    <Icon>rotate_left</Icon>&nbsp;&nbsp; Reset
                  </Button>}

      
      <MUIDataTable
        title={"PAYMENTS"}
       data={userList.filter(obj=>obj.div_id==localStorage.getItem('division')).map((item, index) => {
        // console.log(item)
        return [
         ++index,
          item.payment_account?item.payment_account.name:'',
         item.received_by?item.received_by.name:'',
          item.narration?item.narration:'',
          moment(item.received_date).format('DD MMM YYYY'),
          parseFloat(item.amount).toLocaleString(undefined,{minimumFractionDigits:2}),
           item.id
       ]
        
      })} 
         columns={columns}  
         options={{
           
            rowsPerPageOptions: [10, 20, 40, 80, 100],
            selectableRows: "none",
            // filterType: "dropdown",
            // responsive: "scrollMaxHeight",
            rowsPerPage: 10, 
         }}          
                   
      />
       {shouldOpenEditorDialog1 && (
        <MemberEditorDialog1
          handleClose={handleDialogClose1}
          open={shouldOpenEditorDialog1}
          id={id}
          

        />
      )}
    </div>
   
  );
}


export default PaymentTable;
