import {
  TableCell,
  Tooltip,
  Icon,
  Grid,
  TextField,
  MenuItem,
  Button
} from "@material-ui/core";
import clsx from "clsx";
import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import url, { GDIV, navigatePath } from "../../../invoice/InvoiceService";
import moment from "moment";
import Swal from "sweetalert2";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useHistory } from 'react-router';
import { SettingsCellSharp } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from '@mui/material/LinearProgress';
const columnStyleWithWidth = {
  top: "0px",
  left: "0px",
  zIndex: "100",
  position: "sticky",
  backgroundColor: "#fff",
  width: "80px",
  wordBreak: "break-all",
}



const ExpenseVerified = () => {
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
      float: 'right',
      background: 'blue',
      color: 'white'
    },
    input: {
      display: "none"
    },
    columnStyleWithWidth: {
      top: "0px",
      left: "0px",
      zIndex: "100",
      position: "sticky",
      backgroundColor: "#fff",
      width: "300px",
      wordBreak: "break-word",
      wordWrap: "break-word",
      overflowWrap: "break-word",
      textAlign: "center"
    },
    columnStyleWithWidth1: {
      top: "0px",
      left: "0px",
      zIndex: "100",
      position: "sticky",
      backgroundColor: "#fff",
      width: "300px",
      wordBreak: "break-word",
      wordWrap: "break-word",
      overflowWrap: "break-word",
      textAlign: "center"
    }
  }));
  const classes = useStyles();
  const [load, setLoad] = useState(true);

  const formData = new FormData();
  const [expenseList, setexpenseList] = useState([]);
  const [expenseList2, setexpenseList2] = useState([]);
  const [deleteAll, setdeleteAll] = useState([]);
  const [division, setDivision] = useState([]);
  const [selectableRowsHideCheckboxes, setselectableRowsHideCheckboxes] = React.useState(false)
  const [rowsSelected, setrowsSelected] = React.useState([]);
  const [isAlive, setisAlive] = useState(false);
  const routerHistory = useHistory();
   const [from_date_exv, setfrom_date_exv] = useState(moment(new Date()).format("YYYY"));
  const [resetuserList, setResetUserList] = useState([]);
  const curr_date = new Date();
  const curr_year = moment(curr_date).format("YYYY");

     const handleReset = () => {
    setfrom_date_exv(new Date())
    // console.log("sup",from_date_q)
    
  
    localStorage.removeItem("from_date_exv");
      
    localStorage.removeItem("dataKeyState_exv")
    setexpenseList(
      resetuserList.filter(item => item.is_paid == 1 && item.status == "verified" && new Date(moment(item.paid_date).format('YYYY')).getTime() == new Date(curr_year).getTime() ));
    setisAlive(false)
    // window.location.reload()
  }
  const handleSubmit = () => {
    const datas = resetuserList.filter(
  (obj) =>
    new Date(moment(obj.paid_date).format('YYYY')).getTime() == new Date(from_date_exv).getTime() 
    // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
);
setexpenseList(datas);
localStorage.setItem('dataKeyState_exv', JSON.stringify(datas))

// localStorage.setItem('dataKeyState', userList)
// console.log("dataKeyState",JSON.parse(localStorage.getItem("dataKeyState")))
};

const handleDateChange_Q = (date) => {
  if(localStorage.getItem("dataKeyState_exv")){
    setfrom_date_exv(moment(date).format("YYYY"));
    localStorage.setItem("from_date_exv",moment(date).format("YYYY"));
    setexpenseList(resetuserList)
  }else{
    setfrom_date_exv(moment(date).format("YYYY"));
    localStorage.setItem("from_date_exv",moment(date).format("YYYY"));


  }
     
};
  
  const filterbyDivision = (e) => {
   
    // setexpenseList(expenseList2)

   

   if(e.target.value == 'Trading Division'){
    const filterbydiv = expenseList2.filter(obj => obj.paid_towards == e.target.value)
    setexpenseList(filterbydiv)
  }else if(e.target.value == 'Manufacturing'){
    const filterbydiv = expenseList2.filter(obj => obj.paid_towards == e.target.value)
    setexpenseList(filterbydiv)
  }else if(e.target.value == 'Printing Division'){
    const filterbydiv = expenseList2.filter(obj => obj.paid_towards == e.target.value)
    setexpenseList(filterbydiv)
  }else if(e.target.value == 'Power Division'){
    const filterbydiv = expenseList2.filter(obj => obj.paid_towards == e.target.value)
    setexpenseList(filterbydiv)
  }else if(e.target.value == 'Rental Division'){
    const filterbydiv = expenseList2.filter(obj => obj.paid_towards == e.target.value)
    setexpenseList(filterbydiv)
  }else if(e.target.value == 'All'){
    // const filterbydiv = expenseList2.filter(obj => obj.paid_towards == e.target.value)
    setexpenseList(expenseList2)
  }


    

  }


  const DeleteRow = (data, status) => {

    var res = expenseList.filter((o1, ind) => data.data.some((o2, i) => ind == o2.index))
    var results = res.map((item) => {
      return [item['id']];
    })
    var merged = [].concat.apply([], results);


    Swal.fire({
      text: 'Are you sure you want to Delete?',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        zIndex: 1000
      },
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {

      if (result.value) {

        formData.append('data', JSON.stringify(merged))
        formData.append('status', 'delete')
        url.post(`Expense_delete_verify`, formData).then((response) => {
          Swal.fire(
            'Deleted!',
            'Expense Details has been deleted.',
            'success'
          )

          setisAlive(false)




        })





      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          customClass: {
            zIndex: 1000
          },
          title: 'Cancelled',
          icon: 'error'

        })
      }
    })

  }

  const options = {
    textLabels: {
      body: {
        noMatch: '',
      }
    },
    filter: true,
    selectableRows: 'multiple',
    selectableRowsOnClick: true,
    selectableRowsHideCheckboxes: selectableRowsHideCheckboxes,
    filterType: 'dropdown',
    responsive: 'vertical',
    rowsPerPage: 10,
    rowsSelected: rowsSelected,
    // onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
    //   console.log(rowsSelectedData, allRows, rowsSelected);
    //   this.setState({ rowsSelected: rowsSelected });
    // },
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <div>
        <Tooltip title={"Delete"} cursor='pointer' className="mr-6">
          <Icon onClick={() => DeleteRow(selectedRows)} color="error">delete</Icon>
        </Tooltip>


      </div>

    ),

  }
  useEffect(() => {
        if(localStorage.getItem("from_date_exv")){
      setfrom_date_exv(localStorage.getItem("from_date_exv"));
  
    }
    if(localStorage.getItem("dataKeyState_exv")){
      setexpenseList(JSON.parse(localStorage.getItem("dataKeyState_exv")));
      setLoad(false);
      
    }else{
    url.get("expense-paid").then(({ data }) => {

      setexpenseList(data.filter(item => item.is_paid == 1 && item.status == "verified" && new Date(moment(item.paid_date).format('YYYY')).getTime() == new Date(curr_year).getTime() ));
      setexpenseList2(data.filter(item => item.is_paid == 1 && item.status == "verified" && new Date(moment(item.paid_date).format('YYYY')).getTime() == new Date(curr_year).getTime() ));
      setLoad(false);

    });
  }
    url.get("division").then(({ data }) => {
      setDivision(data);
      setLoad(false);
    });
    return setisAlive(true)

  }, [isAlive]);


  const setstatus = (id) => {
    Swal.fire({
      text: 'Are you sure you want to update Payment?',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        zIndex: 1000
      },
      confirmButtonText: 'Yes, Update it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        const arr = {
          is_paid: 2,
          id: id
        }
        url.put(`expense/${id}`, arr).then(({ data }) => {
          Swal.fire({
            title: 'Success',
            type: 'success',
            icon: 'success',
            text: 'Updated successfully.',
          });


          url.get("expense-paid").then(({ data }) => {

            setexpenseList(data);

          });


        })
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          customClass: {
            zIndex: 1000
          },
          title: 'Cancelled'

        })
      }
    })

  }
  const removeData = (id) => {
    Swal.fire({
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        zIndex: 1000
      },
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        url.delete(`expense/${id}`)
          .then(res => {
            url.get("expense").then(({ data }) => {

              setexpenseList(data);

            });
            Swal.fire(
              'Deleted!',
              'Expense Details has been deleted.',
              'success'
            )

          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {

        Swal.fire({
          customClass: {
            zIndex: 1000
          },
          title: 'Cancelled'

        })
      }
    })

  }
  const columns = [
    {
      name: "id", // field name in the row object
      label: "VOUCHER NO", // column title that will be shown in table
      options: {

        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }}>
              <span style={{ marginLeft: 18, textAlign: "center" }}>VOUCHER NO</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: 'center'

        })
      }

    },
    {
      name: "name",
      label: "DATE",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center", position: "sticky" }}>
              <span >DATE</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: 'center'

        })

      }
    },

    // {
    //   name: "paid_date",
    //   label: "ACCOUNT",
    //   options : {
    //     filter: true,
    //   }
    // },
    {
      name: "amount",
      label: "EXPENSE DIVISION",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center", position: "sticky" }}>
              <span >EXPENSE DIVISION</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: 'center'

        })
      },
    },
    {
      name: "amount",
      label: "CATEGORY - DESCRIPTION",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center", position: "sticky" }}>
              <span >CATEGORY - DESCRIPTION</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: 'center'

        })
      },
    },
    {
      name: "amount",
      label: "USER",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center", position: "sticky" }}>
              <span >USER</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: 'center'

        })
      },
    },
    // {
    //   name: "amount",
    //   label: "PAID FROM",
    //   options: {
    //     filter: true,
    //     customHeadRender: ({index, ...column}) =>{
    //       return (
    //         <TableCell key={index} style={{textAlign:"center",position: "sticky"}}>  
    //           <span >PAID FROM</span> 
    //         </TableCell>
    //       )
    //    },
    //     setCellProps:()=>({
    //       align:'center'

    //     })

    //   },
    // },
    {
      name: "amount",
      label: "AMOUNT",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "right", position: "sticky" }} className="pr-2">
              <span >AMOUNT</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: 'right'

        })
      },
    },
    {
      name: "amount",
      label: "TAX AMOUNT",
      options: {
        filter: true,
        display: 'none'
      },
    },

    {
      name: "id",
      label: "STATUS",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center", position: "sticky" }} >
              <span >STATUS</span>
            </TableCell>
          )
        },
        customBodyRender: (value, tableMeta, updateValue) => {

          return (

            <div style={{ textAlign: 'center' }} >

              {tableMeta.rowData[8] == 1 ? (
                <Tooltip title="Update Payment">
                  <small onClick={e => setstatus(tableMeta.rowData[6])}
                    style={{ cursor: 'pointer' }}
                    className={clsx({
                      "border-radius-4  text-white px-2 py-2 max-w-500  bg-error": true,

                    })}
                  >

                    PENDING


                  </small>
                </Tooltip>
              ) : (<small
                className={clsx({
                  "border-radius-4  text-white px-2 py-2 bg-primary": true,

                })}
              >

                PAYMENT DONE


              </small>
              )}

            </div>


          )

        },
      },
    },
    {
      name: "",
      label: " ",
      options: {
        filter: true,
        display: false
      },
    },
    {
      name: "id",
      label: "ACTION",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center", position: "sticky" }} >
              <span >ACTION</span>
            </TableCell>
          )
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          // console.log(tableMeta.rowData)
          return (

            <div style={{ textAlign: 'center' }} className="pr-1">



              <div className="pt-2">
                <Tooltip title="delete">
                  <Icon color="error" onClick={() => removeData(tableMeta.rowData[6])} style={{ cursor: 'pointer' }}>cancel</Icon>
                </Tooltip>
                <Tooltip title="Edit">
                  <Icon color="secondary" className="ml-4 mr-4 " onClick={() => routerHistory.push(navigatePath + `/editexpense/${tableMeta.rowData[6]}/` + tableMeta.rowData[7])
                  }   >edit</Icon>
                </Tooltip>
                <Tooltip title="view more">
                  <Icon color="primary" onClick={() => routerHistory.push(navigatePath + `/expensedetails/${tableMeta.rowData[6]}`)
                  } style={{ cursor: 'pointer' }}>play_circle_filled</Icon>
                </Tooltip>
              </div>
            </div>


          )

        },
      },
    },

  ];
  return (
    <div>
        {localStorage.getItem("role") == "SA" && <div style={{display:"flex"}}> <Grid item >
                  <TextField
                    className="mb-4 mr-2"
                    label="Filter By Division"
                    variant="outlined"
                    fullWidth
                    style={{width:'175px',marginLeft:"28px"}}
                    onChange={(e)=>{filterbyDivision(e)}}
                    select
                    size="small"
                    name="filter_by_status"
                  >
                  <MenuItem value={'All'}>ALL</MenuItem>

                  {division.filter(obj => obj.name != "Manufacturing" && obj.name != "HQ ").map((item) => {
                    return (
                      <MenuItem value={item.name}>{item.name}</MenuItem>

                    ) 

                  })}
                   
                    

                  </TextField>
                </Grid>&nbsp;&nbsp;<Grid item > <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                      value={localStorage.getItem("from_date_exv") ? localStorage.getItem("from_date_exv") : from_date_exv}
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
                  {localStorage.getItem("dataKeyState_exv") &&<Button
                    color="error"
                    variant="outlined"
                   
                    onClick={handleReset}
                  >
                    <Icon>rotate_left</Icon>&nbsp;&nbsp; Reset
                  </Button>}</Grid></div>}

                  {load && (
        <div className={classes.loading}>
          {/* <img src="/assets/images/logo-circle.svg" alt="" /> */}
          <LinearProgress  sx={{
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgb(37 44 71)',
                        color:'rgb(37 44 71)',
                    }
}} />

        </div>
      )}
      <MUIDataTable
        title={"VERIFIED EXPENSES LIST"}
        data={localStorage.getItem('role') == "SA" ? expenseList.filter(obj => obj.div_id == localStorage.getItem('division')).map((item, index) => {
          // console.log(item.is_paid)
          return [
            // ++index,
            item?.voucher_no,
            moment(item.paid_date).format('DD  MMM YYYY '),
            item?.paid_towards,
            item?.name + " - " + item?.description,
            // item?.paid_to
            localStorage.getItem('user_name'),
            // item?.paid_from,
            // item.referrence_bill_no,
            // item.paid_to,
            parseFloat(item.amount).toLocaleString(undefined, { minimumFractionDigits: 2 }),
            // item.tax!==null?parseFloat(item.tax).toLocaleString(undefined, {minimumFractionDigits:2}):'0.00',
            item.id,
            item.account_category_id,
            item.is_paid

          ]

        }) : expenseList.filter(obj => obj.div_id == localStorage.getItem('division')   && obj.user_id == localStorage.getItem('user_id')).map((item, index) => {
          // console.log(item.is_paid)
          return [
            // ++index,
            item?.voucher_no,
            moment(item.paid_date).format('DD  MMM YYYY '),
            item?.paid_towards,
            item?.name + " - " + item?.description,
            // item?.paid_to
            localStorage.getItem('user_name'),
            // item?.paid_from,
            // item.referrence_bill_no,
            // item.paid_to,
            parseFloat(item.amount).toLocaleString(undefined, { minimumFractionDigits: 2 }),
            // item.tax!==null?parseFloat(item.tax).toLocaleString(undefined, {minimumFractionDigits:2}):'0.00',
            item.id,
            item.account_category_id,
            item.is_paid

          ]

        })}
        columns={columns}
        options={options}
        options={{

          textLabels: {
          body: {
              noMatch: load ? "Data Loading..." : "Sorry, no records found",
              }
            },
        }} 
      //  options={{

      //     rowsPerPageOptions: [10, 20, 40, 80, 100],
      //     selectableRows: "none",
      //     responsive: "scrollMaxHeight",
      //     rowsPerPage: 10, 
      //  }}        

      />
    </div>
  );
};


export default ExpenseVerified;
