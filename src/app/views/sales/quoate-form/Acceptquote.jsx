import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import { Icon, Tooltip } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import url, { GDIV, navigatePath } from "../../invoice/InvoiceService";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from '@mui/material/LinearProgress';

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
  Button
} from "@material-ui/core";


const AcceptQuote = () => {
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
  const [isAlive, setIsAlive] = useState(true);
  const classes = useStyles();
  const [load, setLoad] = useState(true);
  const [userList, setUserList] = useState([]);
  const [qdetails, setqdetails] = useState([]);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [resetuserList, setResetUserList] = useState([]);
  const [from_date_q_acc, setfrom_date_q_acc] = useState(moment(new Date()).format("MMM YYYY"));
  const curr_date = new Date();
  const curr_year = moment(curr_date).format("YYYY");
  const handleDateChange_Q = (date) => {
    if(localStorage.getItem("dataKeyState_q_acc")){
      setfrom_date_q_acc(moment(date).format("MMM YYYY"));
      localStorage.setItem("from_date_q_acc",moment(date).format("MMM YYYY"));
      setqdetails(resetuserList)
      const datas = resetuserList.filter(
        (obj) =>
          new Date(moment(obj.quotation_date).format('MMM YYYY')).getTime() == new Date(moment(date).format("MMM YYYY")).getTime() 
          // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
      );
      setqdetails(datas);
      localStorage.setItem('dataKeyState_q_acc', JSON.stringify(datas))
      
    }else{
      setfrom_date_q_acc(moment(date).format("MMM YYYY"));
      localStorage.setItem("from_date_q_acc",moment(date).format("MMM YYYY"));
      const datas = resetuserList.filter(
        (obj) =>
          new Date(moment(obj.quotation_date).format('MMM YYYY')).getTime() == new Date(moment(date).format("MMM YYYY")).getTime() 
          // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
      );
      setqdetails(datas);
      localStorage.setItem('dataKeyState_q_acc', JSON.stringify(datas))
      
  

    }
       
  };



  const handleDateChange_Q_Year = (date) => {
    if(localStorage.getItem("dataKeyState_q_acc")){
      setfrom_date_q_acc(moment(date).format("YYYY"));
      localStorage.setItem("from_date_q_acc",moment(date).format("YYYY"));
      setqdetails(resetuserList)
      const datas = resetuserList.filter(
        (obj) =>
          new Date(moment(obj.quotation_date).format('YYYY')).getTime() == new Date(moment(date).format("YYYY")).getTime() 
          // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
      );
      setqdetails(datas);
      localStorage.setItem('dataKeyState_q_acc', JSON.stringify(datas))
      
    }else{
      setfrom_date_q_acc(moment(date).format("YYYY"));
      localStorage.setItem("from_date_q_acc",moment(date).format("YYYY"));
      const datas = resetuserList.filter(
        (obj) =>
          new Date(moment(obj.quotation_date).format('YYYY')).getTime() == new Date(moment(date).format("YYYY")).getTime() 
          // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
      );
      setqdetails(datas);
      localStorage.setItem('dataKeyState_q_acc', JSON.stringify(datas))
      
  

    }
       
  };



    const handleReset = () => {
    setfrom_date_q_acc(new Date())
    
  
    localStorage.removeItem("from_date_q_acc");
      
    localStorage.removeItem("dataKeyState_q_acc")
    setqdetails(
      resetuserList.filter(
        (obj) =>
          new Date(moment(obj.quotation_date).format('YYYY')).getTime() == new Date(curr_year).getTime() 
          // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
      )
    );
    setIsAlive(false)
    // window.location.reload()
  }
    const handleSubmit = () => {
    const datas = resetuserList.filter(
  (obj) =>
    new Date(moment(obj.quotation_date).format('MMM YYYY')).getTime() == new Date(from_date_q_acc).getTime() 
    // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
);
setqdetails(datas);
localStorage.setItem('dataKeyState_q_acc', JSON.stringify(datas))

// localStorage.setItem('dataKeyState', userList)
// console.log("dataKeyState",JSON.parse(localStorage.getItem("dataKeyState")))
};
  const columnStyleWithWidth1 = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    // position: "sticky",
    backgroundColor: "#fff",
    width: "200px",
    maxWidth: "200px",
    wordBreak: "break-word",
    // wordWrap: "break-word",
    // overflowWrap:"break-word",
    hyphens: "auto",
    textAlign: "center",
    // paddingRight:30

  }
  const subject = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    // position: "sticky",
    backgroundColor: "#fff",
    width: "200px",
    maxWidth: "200px",
    wordBreak: "break-word",
    // wordWrap: "break-word",
    // overflowWrap:"break-word",
    hyphens: "auto",
    textAlign: "center",
    // paddingRight:30

  }
  const amount = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    // position: "sticky",
    backgroundColor: "#fff",
    width: "150px",
    maxWidth: "150px",
    wordBreak: "break-word",
    // wordWrap: "break-word",
    // overflowWrap:"break-word",
    hyphens: "auto",
    textAlign: "right",
    // paddingRight:30

  }
  const quotedate = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "200px",
    wordBreak: "break-word",
    // wordWrap: "break-word",
    // overflowWrap:"break-word",
    hyphens: "auto",
    textAlign: "center",
    // paddingRight:30

  }
  const columnStyleWithWidth = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    // position: "sticky",
    backgroundColor: "#fff",
   
    maxWidth: "300px",
    width: "200px",
    wordBreak: "break-word",

  }
  useEffect(() => {
    if(localStorage.getItem('page') !== 'q'){
      localStorage.removeItem('search')
      localStorage.removeItem('page')
  }
  if(localStorage.getItem("from_date_q_acc")){
    setfrom_date_q_acc(localStorage.getItem("from_date_q_acc"));

  }
    url.get("quotations-accepted-list").then(({ data }) => {
      // if (isAlive) setUserList(data);
      setResetUserList(data);
      // var myJSON = JSON.stringify(data.id);

      // if(data.length)
      // {
        if(localStorage.getItem("dataKeyState_q_acc")){
          setqdetails(JSON.parse(localStorage.getItem("dataKeyState_q_acc")));
          setLoad(false);
        }else{
      setUserList(data?.sort(function (a, b) {
        var dateA = new Date(a?.ps_date),
          dateB = new Date(b?.ps_date);
        return dateB - dateA;
      }));

      setqdetails(data.filter(
        (obj) =>
          new Date(moment(obj.quotation_date).format('YYYY')).getTime() == new Date(curr_year).getTime() 
          // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
      ));
      }
      setLoad(false);
    });
    return () => setIsAlive(false);
  }, []);
  const [count, setCount] = useState(0);
  const routerHistory = useHistory();
  const handeViewClick = (invoiceId) => {

    routerHistory.push(`/rfqanalysis/${invoiceId}`);
  };

  function getrow(id) {
    url.get("rfq/" + id).then(({ data }) => {
      if (isAlive) setqdetails(data[0].qdetails);
    });
    return () => setIsAlive(false);
  }
  function Increment(e) {
    alert('3')
  }
  function Decrement() {
    setCount(count - 1);
  }
  const [showInvoiceEditor, setShowInvoiceEditor] = useState(false);
  const [isNewInvoice, setIsNewInvoice] = useState(false);

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
    //    
    // })
  }
  const columns = [
    {
      name: "id",
      label: "S.NO.",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ width: 100, textAlign: 'center' }}>
              <span textAlign="center" >S.NO.</span>
            </TableCell>
          )
        },

        setCellProps: () => ({
          align: "center",
          // paddingLeft:24
        })
      }
    },
    {
      name: "quotation_no", // field name in the row object
      label: "QUOTATION NO", // column title that will be shown in table
      options: {
        filter: true,
        wordBreak: 'break-word',
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={columnStyleWithWidth} >
              <span style={{ marginLeft: 18 }}>QUOTATION NO</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          // align: "center",
          // width:600,
          style:{
            color:'green'
          }
        })

      },
    },
    {
      name: "fname", // field name in the row object
      label: "COMPANY NAME", // column title that will be shown in table
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={columnStyleWithWidth1} textAlign="center" >
              <span textAlign="center">COMPANY NAME</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center",
          // width:600,
          wordWrap: 'break',
          style:{
            color:'green'
          }
        })
      },
    },
    {
      name: "fname", // field name in the row object
      label: "SUBJECT", // column title that will be shown in table
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={subject} textAlign="center" >
              <span textAlign="center">SUBJECT</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center",
          // width:600,
          wordWrap: 'break',
          style:{
            color:'green'
          }
        })
      },
    },
    {
      name: "name",
      label: "Quote Date",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={subject} textAlign="center">
              <span>QUOTE DATE</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center",
          // width:600,
          wordWrap: 'break',
          style:{
            color:'green'
          }
        })
      },
    },
    {
      name: "name",
      label: "Quote Date",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={subject} textAlign="center">
              <span>PO Number</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center",
          // width:600,
          wordWrap: 'break',
          style:{
            color:'green'
          }
        })
      },
    },
    // {
    //   name: "require_date",
    //   label: "AMOUNT",
    //   options: {
    //     filter: true,
    //   },
    // },
    {
      name: "id",
      label: "AMOUNT",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} className="pr-2" style={amount}>
              <span textAlign="right" >AMOUNT</span>
            </TableCell>
          )
        },

        setCellProps: () => ({
          align: "right",
          style:{
            color:'green'
          }
          // paddingLeft:24
        })
      }
    },

    //   {
    //     name: "id",
    //     label: "Action",
    //     options: {
    //         filter: true,
    //         customBodyRender: (value, tableMeta, updateValue) => {
    //             
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
    {
      name: "id",
      label: "ACTION",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ width:100,textAlign: "right" }} className="pr-8" >
              <span>ACTION</span>
            </TableCell>
          )
        },
        customBodyRender: (value, tableMeta, updateValue) => {

          return (
            <div style={{ textAlign: "right" }} className="pr-8">
              <Link to={navigatePath + "/quote/" + tableMeta.rowData[7] + "/accept/2"}>
                <Tooltip title="View More">
                  <Icon color="primary">remove_red_eye</Icon>
                </Tooltip>
              </Link>
              {/* <Link to={"/sales/rfq-form/rfqanalysis?id=" + tableMeta.rowData[0]}>
            <IconButton>
              <Icon color="secondary">find_in_page</Icon>
            </IconButton>
          </Link> */}
            </div>

          )

        },
      },
    },
    //   {
    //     name: "",
    //     // label: "Action",
    //     options: {
    //       filter: true,
    //       customBodyRender: (value, tableMeta, updateValue) => {
    //         return (
    //           <Link to={"/sales/rfq-form/rfqanalysis?id=" + tableMeta.rowData[0]}>
    //             <IconButton>
    //               <Icon color="secondary">find_in_page</Icon>
    //             </IconButton>
    //           </Link>

    //         )

    //       },
    //     },
    // },
  ];



  return (
    <div>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
                      // className="m-2"
                      style={{marginLeft:"30px"}}
                      margin="none"
                      label="Filter By Quote Month & Year"
                      maxDate={new Date()}
                      inputVariant="outlined"
                      type="text"
                      size="small"
                      autoOk={true}
                      views={["month","year"]}
                      value={localStorage.getItem("from_date_q_acc") ? localStorage.getItem("from_date_q_acc") : from_date_q_acc}
                      format="MMM yyyy"
                      onChange={handleDateChange_Q}
                    />
          </MuiPickersUtilsProvider>&nbsp;&nbsp;


          <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
                      // className="m-2"
                      style={{marginLeft:"30px"}}
                      margin="none"
                      label="Filter By Quote Year"
                      maxDate={new Date()}
                      inputVariant="outlined"
                      type="text"
                      size="small"
                      autoOk={true}
                      views={["year"]}
                      value={localStorage.getItem("from_date_q_acc") ? localStorage.getItem("from_date_q_acc") : from_date_q_acc}
                      format="yyyy"
                      onChange={handleDateChange_Q_Year}
                    />
          </MuiPickersUtilsProvider>&nbsp;&nbsp;
          {/* <Button
                    color="success"
                    variant="outlined"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <Icon>search</Icon>&nbsp;&nbsp; Filter
                  </Button>&nbsp;&nbsp; */}
                  {localStorage.getItem("dataKeyState_q_acc") &&<Button
                    color="error"
                    variant="outlined"
                   
                    onClick={handleReset}
                  >
                    <Icon>rotate_left</Icon>&nbsp;&nbsp; Reset
                  </Button>}

      <div className="m-sm-30">
        <div className="mb-sm-30">
          {/* <Breadcrumb
          routeSegments={[
            // { name: "Add new", path: "/sales/rfq-form/Rfqform" },
            { name: "Sales Quotation" },
          ]}
        />

        <div className="text-right">
          <Link to={"/Newquoteanalysis"}>
            <Button
              className="py-2"
              variant="outlined"
              color="primary"
            >
              <Icon>add</Icon> Add New 
          </Button>
          </Link>
        </div> */}
        </div>
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
      {console.log("saaaas", qdetails.filter(obj => obj.div_id == localStorage.getItem('division')).length > 0  ? "Data Loading..." : "Sorry, no records found")}
        <MUIDataTable
          title={"SALES QUOTATION"}

          data={qdetails.filter(obj => obj.div_id == localStorage.getItem('division')).map((item, index) => {

            return [
              ++index,
              item?.quotation_no,
              item?.party?.firm_name,
              item?.subject == "null" || item?.subject == "" || item?.subject == null  ? '--' : item?.subject,
              moment(item?.quotation_date).format('DD MMM YYYY'),
              item?.po_number ? item?.po_number == null || item?.po_number == 'null' ? '--' : item?.po_number : '--',
              (parseFloat(item?.net_amount)).toLocaleString(undefined, { minimumFractionDigits: 2 }),
              item?.id
              // item.party[index].firm_name,
              // item.requested_date,
              // item.require_date,
            ]

          })}

          columns={columns}
          options={{

            rowsPerPageOptions: [10, 20, 40, 80, 100],
            selectableRows: "none",
            textLabels: {
                    body: {
                      
                        noMatch: load ? "Data Loading..." : "Sorry, no records found",
                        }
                      },
            onSearchClose: e => {
                          localStorage.removeItem("search");
                          localStorage.removeItem("page");
                        },
            searchProps: {
              onKeyUp:(e) => {
                localStorage.setItem('search',e.target.value);
                localStorage.setItem('page','q');
              }
            },
          searchText: localStorage.getItem('search') && localStorage.getItem('search') ,
          

            filterType: "dropdown",
            // responsive: "scrollMaxHeight",
            rowsPerPage: 10,

            // expandableRows: true,
            // expandableRowsOnClick: true,
            renderExpandableRow: (rowData, rowMeta) => {

              return (
                <tr>
                  <td colSpan={6}>
                    <Table style={{ minWidth: "650", border: "1px solid black" }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>product Name</TableCell>
                          <TableCell>description</TableCell>
                          <TableCell>Quantity</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* {userList.map((item, index) => {
                        if(rowData[0]===item.id)
                      {
                      {item.qdetails.map((row,index) => {
                      
                       return(<TableRow key={row.product[0].id}>

                          <TableCell>{row.description}</TableCell>
                          <TableCell>{row.product[0].name}</TableCell>
                          <TableCell>{row.product[0].id}</TableCell>
                        </TableRow>
                       )
                      })}
                      } */}
                        {userList.map((item, index) => {

                          {
                            item.qdetails.map(row => (
                              <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                  {row.id}
                                </TableCell>
                                <TableCell align="right">{row.product[0].name}</TableCell>
                                <TableCell align="right">{row.product[0].name}</TableCell>
                                <TableCell align="right">{row.product[0].name}</TableCell>
                                <TableCell align="right">{row.product[0].name}</TableCell>
                              </TableRow>
                            ))
                          }

                        })}

                        {/* })} */}

                      </TableBody>
                    </Table>
                  </td>
                </tr>
              )
            }
          }}
        />
      </div>
    </div>
  );
}


export default AcceptQuote;
