import React, { useState, useEffect, useRef } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


import {
  Icon, Card,
  Grid,
  Table,
  TextField,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TablePagination
} from "@material-ui/core";

import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import logo from "./../invoice/amaco-logo.png";
// import 'bootstrap/dist/css/bootstrap.min.css';
import url, { getpaymentaccount, getdivisions, receipts } from "../invoice/InvoiceService";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { Breadcrumb } from "matx";
import { ValidatorForm } from "react-material-ui-form-validator";
import Division from "../user/divisionview";
// import { database } from "firebase";


// import Image from 'react-image-resizer';

const useStyles = makeStyles(({ palette, ...theme }) => ({
  "@global": {
    "@media print": {
      "body, html": {
        visibility: "hidden",
        size: "auto",

        content: "none !important",
        "-webkit-print-color-adjust": "exact !important",
        marginTop: "10px",
      },

      "#header": {
        // padding: "10px",

        /* These do the magic */
        position: "fixed",
        marginTop: "100px",
        left: 0,
        paddingTop: 130,
        justifySelf: "end",
      },
      ".empty-header": {
        height: "100px",
        marginTop: "10px",
      },
      ".empty-footer": {
        height: "100px",
        marginTop: "10px",
      },
      ".header": {
        position: "fixed",
        height: "100px",
        top: 0,
      },
      ".footer": {
        position: "fixed",
        height: "100px",
        bottom: 0,
        width: "100%",
      },

      "#footer": {
        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",

        bottom: "0",
        position: "fixed",
        width: "100%",
        justifySelf: "end",
      },

      "#table": {
        display: "-webkit-box",
        display: "-ms-flexbox",
        // display: "right",
        width: "650px",
        margin: "15px",
        position: "absolute",

        // top: "38.9cm !important",
        // paddingRight: "24cm !important"
      },
      //   "#footer": {
      //     display:"-webkit-box",
      // display: "-ms-flexbox",
      // display: "center",
      // width: "100%",
      // position: "absolute",

      // top: "38.9cm !important",
      // paddingRight: "12cm !important"
      //    },
      "#print-area": {
        // top: 10,
        left: 0,
        right: 0,

        // height: "100%",
        // marginTop: "10px",
        // marginBottom:'30px',
        boxDecorationBreak: "clone",
        position: "relative",

        "& *": {
          visibility: "visible",
        },
      },
    },
  },
  invoiceViewer: {},
}));

const Master = ({
  toggleInvoiceEditor,
  list = [],
  handleAddList,
  handleAddNewCard,
}) => {
  // let search = window.location.search;
  // let params = new URLSearchParams(search);
  // const foo =parseInt(params.get('s'));
  const componentRef = useRef();




  const [from_date, setfrom_date] = useState('01-01-' + new Date().getFullYear());
  const [to_date, setto_date] = useState(new Date());


  const [statements, setstatements] = useState([]);
  let [total, settotal] = useState(0.0);
  let [vattotal, setvattotal] = useState(0.0);
  let [subtotal, setsubtotal] = useState(0.0);
  const [banktransfer, setbanktransfer] = useState(0.0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  let bank_expense = 0.00
  const [arr_length, setarr_length] = useState();
  const [isAlive, setisAlive] = useState(false);

  ;
  const [response_data, setresponse_data] = useState([]);




  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;
  const classes = useStyles();
  let finalbal = 0.00;

  const curr_date = new Date();
  const curr_year = moment(curr_date).format("YYYY");

  const formData = new FormData();
  useEffect(() => {
    // updateSidebarMode({ mode: "close" })
    document.title = "PURCHASE TAX - Amaco";
    url.get('purchaseTax').then(({ data }) => {
      // console.log(data)
      var result = data.filter(obj => (moment(obj.issue_date).format('YYYY') == curr_year));
      console.log("result",result)
      setstatements(result)
      setresponse_data(data)
      var sumTotal = 0.0
      var sumVat = 0.0
       sumTotal = data.reduce((initial, cal) => initial = initial + parseFloat(cal.amount), 0) ? data.reduce((initial, cal) => initial = initial + parseFloat(cal.amount), 0) : 0.00
      settotal(sumTotal)
      sumVat = data.reduce((initial, cal) => initial = initial + parseFloat(cal.tax), 0) ? data.reduce((initial, cal) => initial = initial + parseFloat(cal.tax), 0) : 0.00
      setvattotal(sumVat)
      setsubtotal(sumTotal - sumVat)
      setarr_length(result.length);
      console.log("myArr.length",result.length)

    })


    // return setisAlive(true)

  }, [isAlive]);


  window.onafterprint = function () {
    window.close();
    window.location.href = ``;
  };
  const handlePrinting = useReactToPrint({
    content: () => componentRef.current,
    header: () => componentRef.current,
  });
  const handleChangePage = (event, newPage) => {

    setPage(newPage);
    setisAlive(false)
  };

  const calBalance = (cBalance, amount, sign, i) => {






    let temp = amount;

    cBalance = parseFloat(cBalance?.split(",").join(""));
    let tempAmt = parseFloat(amount);

    sign === "-" && (cBalance -= tempAmt);
    sign === "+" && (cBalance += tempAmt);



    // return cBalance.toFixed(2)





  };



  const handleDateChange = (date) => {
    setfrom_date(date);
    filter_data(date, to_date)

  };

  const handleDateChange1 = (date) => {
    setto_date(date);
    filter_data(from_date, date)
  };



  const filter_data = (fDate, tDate) => {



    var result = response_data.filter(obj => (moment(obj.issue_date).format('YYYY-MM-DD') >= moment(fDate).format('YYYY-MM-DD') && moment(obj.issue_date).format('YYYY-MM-DD') <= moment(tDate).format('YYYY-MM-DD')));
    var sumTotal = 0.0;
    sumTotal = result.reduce((initial, cal) => initial = initial + parseFloat(cal.amount), 0)
    settotal(sumTotal)
    var sumVat = 0.0;

    sumVat = result.reduce((initial, cal) => initial = initial + parseFloat(cal.tax), 0)
    setvattotal(sumVat)
    var date2 = new Date(fDate);


    setstatements(result);






  }



  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <div className="flex flex-wrap justify-between mb-2">
          <Breadcrumb
            routeSegments={[
              // { name: "Expense", path: "/expenseview" },
              { name: "PURCHASE TAX" },
            ]}
          />
          <div className="text-right">
            <Button
              className="mr-4 py-2"
              color="secondary"
              variant="outlined"
              onClick={handlePrinting}
            >
              <Icon>print</Icon> PRINT STATEMENT
            </Button>
          </div>
        </div>
      </div>
      <Card style={{ padding: '10px' }}>
        <ValidatorForm className="px-0 pb-0 ml-4" >
          <Grid container spacing={2}>
            {/* <Grid item lg={3} xs={12}>
            <TextField
              className="mb-4 w-full"
              label="Name"
              name="workPhone"
              size="small"
              variant="outlined"
              // onChange={(e) => setpayment_account_id(e.target.value)}
              onChange={(e) => filter_data(e.target.value,from_date,to_date)}
              fullWidth
              value={payment_account_id}
              autoComplete="Disabled"
              select
            >
              <MenuItem value="All" >
                  All
                </MenuItem>
              {userList.filter(obj=>obj.type=="division").map((item, ind) => (
                <MenuItem value={item.id} key={item}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid> */}

            <Grid item lg={3} md={6} xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className="mb-4 w-full"
                  margin="none"
                  label="From Date"
                  inputVariant="outlined"
                  type="text"
                  size="small"
                  autoOk={true}
                  value={from_date}
                  format="dd MMMM yyyy"
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
                  minDate={from_date}
                  format="dd MMMM yyyy"
                  onChange={handleDateChange1}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item lg={3} xs={12}>
              {/* <Button
              color="primary"
              variant="outlined"
              type="submit"
              // onClick={handleSubmit}
            >
              <Icon>save</Icon> Generate Statement
            </Button> */}
            </Grid>
          </Grid>
        </ValidatorForm>
        <div className={clsx("invoice-viewer py-4 pt-0", classes.Master)}>
          <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
            <div>
              {/* <Button
            className="mr-4 py-2"
            color="primary"
            variant="outlined"
            onClick={() => toggleInvoiceEditor()}
          >
            Edit Quote
          </Button> */}
            </div>
          </div>

          <div
            id="print-area"
            ref={componentRef}
            style={{ fontFamily: "Calibri", fontSize: 16 }}
          >
            <table>
              <thead style={{ display: "table-header-group", marginTop: "20px" }}>
                <tr>
                  <td>
                    <div class="empty-header">

                      <div className="px-2 flex justify-between">
                        <div className="flex">
                          <div className="pr-12">
                            <img
                              src={logo}
                              alt="this is car image"
                              style={{ marginLeft: "15px", width: 237 }}
                            />
                          </div>

                          <div className="viewer__order-info px-4 mb-4 flex justify-between"></div>
                        </div>
                        <div className="flex">
                          <div style={{ marginLeft: "50px" }}>
                            <h2 style={{ color: "#1d2257", textAlign: "right" }}>
                              شركة أماكو العربية للمقاولات
                            </h2>

                            <h3
                              style={{
                                color: "#1d2257",
                                textAlign: "right",
                                fontSize: 20,
                              }}
                            >
                              AMACO ARABIA CONTRACTING COMPANY
                            </h3>
                            <h5
                              style={{
                                color: "#555",
                                textAlign: "right",
                                fontSize: 17,
                              }}
                              className="font-normal b-4 capitalize"
                            >
                              C.R No. 2055003404 | VAT No. 310398615200003
                            </h5>
                          </div>
                        </div>
                      </div>

                    </div>
                  </td>
                </tr>
              </thead>

              <tbody style={{ marginBottom: "50px" }}>
                <tr>
                  <td>
                    <div>
                      <div className="px-4 mb-2 pl-4 pt-4 flex ">
                        <Table
                          style={{ width: "100%", fontSize: 12, border: "none" }}
                          className="pl-4"
                        >
                          <TableRow
                            style={{
                              border: "1px solid #ccc",
                              pageBreakInside: "avoid",
                            }}
                          >
                            <TableCell
                              className="pl-2"
                              colspan={4}
                              align="center"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            >
                              <h4>PURCHASE TAX </h4>
                              <h6>FROM {moment(from_date).format('DD MMM YYYY')}TO {moment(to_date).format('DD MMM YYYY')}</h6>
                            </TableCell>




                          </TableRow>


                        </Table>
                      </div>

                      <div className="px-4 mb-2 pl-4 pt-4 pb-8 flex justify-between">
                        <Table
                          style={{ width: "100%", fontSize: 12, border: "none" }}
                          className="pl-4"
                        >
                          {/* <TableRow
                            style={{
                              border: "1px solid #ccc",
                              pageBreakInside: "avoid",
                              backgroundColor:'#ccc'
                            }}
                          >
                            <TableCell
                              className="pr-0"
                              align="center"
                              colSpan={1}
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            ></TableCell>

                            <TableCell
                              className="pr-0"
                              align="center"
                              colSpan={1}
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            ></TableCell>

                            <TableCell
                              className="pr-0 capitalize"
                              align="center"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                              colSpan={2}
                            ></TableCell>
                            <TableCell
                              className="pl-2 capitalize"
                              align="left"
                              style={{
                                border: "1px solid #ccc",
                                wordBreak: "break-word",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            ></TableCell>
                            <TableCell
                              className="pl-2 capitalize"
                              align="left"
                              style={{
                                border: "1px solid #ccc",
                                wordBreak: "break-word",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            ></TableCell>

                            

                            <TableCell
                              className="pl-0 capitalize"
                              align="right"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            >
                             {parseFloat(vattotal).toLocaleString(undefined,{minimumFractionDigits:2})}
                            </TableCell>
                            <TableCell
                              className="pl-0 capitalize"
                              align="right"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            >
                             {parseFloat(total).toLocaleString(undefined,{minimumFractionDigits:2})}
                            </TableCell>
                            
                           
                             
                          </TableRow> */}
                          <TableHead
                            style={{
                              backgroundColor: "#1d2257",
                              display: "table-row-group",
                            }}
                          >
                            <TableRow style={{ pageBreakInside: "avoid" }}>
                              <TableCell
                                className="pr-0"
                                colSpan={1}
                                style={{
                                  border: "1px solid #ccc",
                                  width: 50,
                                  fontFamily: "Calibri",
                                  color: "#fff",
                                  fontWeight: 1000,
                                  fontSize: 16,
                                }}
                                align="center"
                              >
                                S.NO
                              </TableCell>
                              <TableCell
                                className="pr-0"
                                colSpan={1}
                                style={{
                                  border: "1px solid #ccc",
                                  width: 100,
                                  fontFamily: "Calibri",
                                  color: "#fff",
                                  fontWeight: 1000,
                                  fontSize: 16,
                                }}
                                align="center"
                              >
                                DATE
                              </TableCell>

                              <TableCell
                                className="px-0"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  color: "#fff",
                                  fontColor: "#fff",
                                  fontWeight: 1000,
                                  fontSize: 16,
                                  width: 100
                                }}

                                align="center"
                              >
                                INVOICE NO.
                              </TableCell>
                              <TableCell
                                className="px-0"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  color: "#fff",
                                  fontColor: "#fff",
                                  fontWeight: 1000,
                                  fontSize: 16,
                                  width: 100
                                }}

                                align="center"
                              >
                                VAT NO.
                              </TableCell>

                              <TableCell
                                className="px-0"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  color: "#fff",
                                  fontColor: "#fff",
                                  fontWeight: 1000,
                                  fontSize: 16,
                                  width: 200
                                }}
                                align="center"
                                colSpan={2}
                              >

                                NAME
                              </TableCell>
                              {/* <TableCell
                              className="px-0"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                color: "#fff",
                                width: 80,
                                fontWeight: 1000,
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              USER
                            </TableCell> */}
                              <TableCell
                                className="px-0"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  color: "#fff",
                                  width: 80,
                                  fontWeight: 1000,
                                  fontSize: 16,
                                }}
                                align="center"
                              >
                                SUB TOTAL
                              </TableCell>
                              <TableCell
                                className="px-0"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  color: "#fff",
                                  width: 80,
                                  fontWeight: 1000,
                                  fontSize: 16,
                                }}
                                align="center"
                              >
                                VAT AMOUNT
                              </TableCell>
                              <TableCell
                                className="px-0"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  width: 80,
                                  color: "#fff",
                                  fontWeight: 1000,
                                  fontSize: 16,
                                }}
                                align="center"
                              >
                                TOTAL
                              </TableCell>
                              {/* <TableCell
                              className="px-0"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                width: 80,
                                color: "#fff",
                                fontWeight: 1000,
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              BALANCE
                            </TableCell> */}


                            </TableRow>
                          </TableHead>
                          <TableBody>

                            {statements.
                              map((item, index) => {



                                return (
                                  <TableRow
                                    style={{
                                      border: "1px solid #ccc",
                                      pageBreakInside: "avoid",
                                    }}
                                  >

                                    <TableCell
                                      className="pr-0"
                                      align="center"
                                      colSpan={1}
                                      style={{
                                        border: "1px solid #ccc",
                                        fontFamily: "Calibri",
                                        fontSize: 16,
                                      }}
                                    >
                                      {++index}
                                    </TableCell>
                                    <TableCell
                                      className="pr-0"
                                      align="center"
                                      colSpan={1}
                                      style={{
                                        border: "1px solid #ccc",
                                        fontFamily: "Calibri",
                                        fontSize: 16,
                                      }}
                                    >
                                      {moment(item.issue_date).format('DD MMM YYYY')}
                                    </TableCell>


                                    <TableCell
                                      className="pl-2 capitalize"
                                      align="center"
                                      style={{
                                        border: "1px solid #ccc",
                                        wordBreak: "break-word",
                                        fontFamily: "Calibri",
                                        fontSize: 16,
                                      }}

                                    >
                                      {item.inv_no}
                                    </TableCell>
                                    <TableCell
                                      className="pl-2 capitalize"
                                      align="center"
                                      style={{
                                        border: "1px solid #ccc",
                                        wordBreak: "break-word",
                                        fontFamily: "Calibri",
                                        fontSize: 16,
                                      }}

                                    >
                                      {item.vatno}
                                    </TableCell>
                                    <TableCell
                                      className="pl-2 capitalize"
                                      align="center"
                                      style={{
                                        border: "1px solid #ccc",
                                        wordBreak: "break-word",
                                        fontFamily: "Calibri",
                                        fontSize: 16,
                                      }}
                                      colSpan={2}
                                    >

                                      {item.company}
                                    </TableCell>
                                    {/* <TableCell
                                  className="pl-2 capitalize"
                                  align="center"
                                  style={{
                                    border: "1px solid #ccc",
                                    wordBreak: "break-word",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
                                  
                                >
                                  {item[0]?.user_name}
                                </TableCell> */}
                                    <TableCell
                                      className=" capitalize"
                                      align="right"
                                      style={{
                                        border: "1px solid #ccc",
                                        fontFamily: "Calibri",
                                        fontSize: 16,
                                      }}
                                    >
                                      {(parseFloat(item.amount) - parseFloat(item.tax)).toLocaleString(undefined, {
                                        minimumFractionDigits: 2
                                      })}

                                    </TableCell>
                                    <TableCell
                                      className=" capitalize"
                                      align="right"
                                      style={{
                                        border: "1px solid #ccc",
                                        fontFamily: "Calibri",
                                        fontSize: 16,
                                      }}
                                    >
                                      {parseFloat(item.tax).toLocaleString(undefined, {
                                        minimumFractionDigits: 2
                                      })}

                                    </TableCell>
                                    <TableCell
                                      className="capitalize"
                                      align="right"
                                      style={{
                                        border: "1px solid #ccc",
                                        fontFamily: "Calibri",
                                        fontSize: 16,
                                      }}
                                    >
                                      {
                                        parseFloat(item.amount).toLocaleString(undefined, {
                                          minimumFractionDigits: 2
                                        })}
                                    </TableCell>
                                    {/* {item[0].debit&&(<TableCell
                                  className="pl-0 capitalize"
                                  style={{
                                    textAlign: "right",
                                    border: "1px solid #ccc",
                                    fontFamily: "Calibri",

                                    fontSize: 16,
                                  }}
                                >
                                  {osum = calBalance(
                                        osum,
                                        item[0].debit,
                                        "+",
                                        index,
                                      )} */}
                                    {/* {item[0].debit
                                    ? (osum = calBalance(
                                        osum,
                                        item[0].debit,
                                        "+",
                                        index,
                                      ))
                                    : (osum = calBalance(
                                        osum,
                                        item[0].credit,
                                        "-",
                                        index
                                      ))} */}
                                    {/* </TableCell>)} */}
                                    {/* {item[0].credit&&(<TableCell
                                  className="pl-0 capitalize"
                                  style={{
                                    textAlign: "right",
                                    border: "1px solid #ccc",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                    p
                                    
                                   
                                    
                                  }}
                                 
                                >
                                  {osum = calBalance(
                                        osum,
                                        item[0].credit,
                                        "-",
                                        index,
                                      )}
                                 
                                </TableCell>)}
                                 */}






                                  </TableRow>
                                );

                              })}
                            <TableRow
                              style={{
                                border: "1px solid #ccc",
                                pageBreakInside: "avoid",
                                backgroundColor: '#ccc'
                              }}
                            >
                              <TableCell
                                className="pr-0"
                                align="center"
                                colSpan={1}
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                              ></TableCell>

                              <TableCell
                                className="pr-0"
                                align="center"
                                colSpan={1}
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                              ></TableCell>

                              <TableCell
                                className="pr-0 capitalize"
                                align="center"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                                colSpan={2}
                              ></TableCell>
                              <TableCell
                                className="pl-2 capitalize"
                                align="left"
                                style={{
                                  border: "1px solid #ccc",
                                  wordBreak: "break-word",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                              ></TableCell>
                              <TableCell
                                className="pl-2 capitalize"
                                align="left"
                                style={{
                                  border: "1px solid #ccc",
                                  wordBreak: "break-word",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                              ></TableCell>


                              <TableCell
                                className="pl-0 capitalize"
                                align="right"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                              >
                                {parseFloat(subtotal).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </TableCell>
                              <TableCell
                                className="pl-0 capitalize"
                                align="right"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                              >
                                {parseFloat(vattotal).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </TableCell>
                              <TableCell
                                className="pl-0 capitalize"
                                align="right"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                              >
                                {parseFloat(total).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </TableCell>


                            </TableRow>
                            <TableRow>

                            </TableRow>
                          </TableBody>

                        </Table>
                      </div>
                      {/* <TablePagination
                        colspan={7}
          className="px-4"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={statements.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={({ target: { value } }) => setRowsPerPage(value)}
        /> */}
                      <div className="px-4 mb-2 pl-4 pt-8 flex justify-between">
                        <Table
                          style={{ width: "100%", fontSize: 12, border: "none" }}
                          className="pl-4"
                        >
                          <tr
                            style={{
                              borderColor: "#fff",
                              pageBreakInside: "avoid",
                            }}
                          >



                          </tr>
                        </Table>

                      </div>


                      <br></br>

                      <div className="viewer__order-info px-4 mb-4 flex justify-between">
                        <div></div>
                      </div>
                      <br></br>
                      <div className="viewer__order-info px-4 mb-4 flex justify-between"></div>
                      <br></br>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <div class="empty-footer"></div>
              </tfoot>
            </table>
            <div class="footer">
              <footer style={{ visibility: "hidden" }}>
                {/* <div style={{visibility: "hidden" }} style={{'borderBottom': '30px solid #c1c1c1','borderLeft': '50px solid transparent','height': 0,'width': '100%',paddingLeft:'0'}}>
          
          <p style={{color:'#fff',paddingTop:5,paddingBottom:5}} align="center"> Tel.: +966 13 363 2387| Fax: +966 13 363 2387 | P.O.Box 9290 | Jubail 31951 | Kingdom of Saudi Arabia</p>
                
        </div>
         <div class="main" style={{width:'100%'}} > 
       <div  class="right" style={{width: '60px',height: '5ex',backgroundColor: '#fff',shapeOutside: 'polygon(100% 0, 100% 100%, 0 100%)',float: 'right',webkitClipPath: 'polygon(100% 0, 100% 100%, 0 100%)'}}></div>           
        <p   style={{textAlign: 'center',backgroundColor: '#1d2257',color:'white',fontFamily: "Calibri",paddingTop:5,paddingBottom:5}}>E-mail: sales@amaco.com.sa | Website: www.amaco.com.sa</p>
        </div>
         */}
                <div>
                  <div
                    id="outer"
                    style={{
                      position: "relative",
                      width: "1050px",
                      backgroundColor: "#c1c1c1",
                      transform: "skew(-20deg)",
                      marginLeft: "40px",
                      marginRight: "50px",
                    }}
                  >
                    <p
                      style={{
                        color: "#fff",
                        paddingTop: 5,
                        paddingBottom: 5,
                        transform: "skew(20deg)",
                      }}
                      align="center"
                    >
                      {" "}
                      Tel.: +966 13 363 2387| Fax: +966 13 363 2387 | P.O.Box 9290
                      | Jubail 31951 | Kingdom of Saudi Arabia
                    </p>
                    <div
                      id="spacer"
                      style={{ width: "200px", height: "10px", marginRight: 0 }}
                    ></div>
                    <div
                      style={{
                        position: "fixed",
                        bottom: 0,
                        width: "100%",
                        height: 30,
                        backgroundColor: "#1d2257",
                      }}
                    >
                      {" "}
                      <p
                        style={{
                          textAlign: "center",
                          color: "white",
                          fontFamily: "Calibri",
                          paddingTop: 5,
                          paddingBottom: 10,
                          transform: "skew(20deg)",
                        }}
                      >
                        E-mail: sales@amaco.com.sa | Website: www.amaco.com.sa
                      </p>
                    </div>
                  </div>
                </div>
                {/* <h6 style={{textAlign:"center"}}>page 1 of 1</h6> */}
              </footer>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Master;
