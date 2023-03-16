import React, { useState, useEffect, useRef } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Link, useParams } from "react-router-dom";

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
} from "@material-ui/core";



import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import logo from "./../invoice/amaco-logo.png";


import url, { getCustomerList } from "../invoice/InvoiceService";



import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";
import { useReactToPrint } from "react-to-print";

import { Breadcrumb } from "matx";
import { ValidatorForm } from "react-material-ui-form-validator";
import CustomerList from "../pages/customers/CustomerList";
import Header from "./Header";
import Footer from "./Footer";


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

const Customer = ({
  toggleInvoiceEditor,
  list = [],
  handleAddList,
  handleAddNewCard,
  value
}) => {
  // let search = window.location.search;
  // let params = new URLSearchParams(search);
  // const foo =parseInt(params.get('s'));
  const componentRef = useRef();

  const [UserList, setUserList] = useState([]);

  const [IsAlive, setIsAlive] = useState(false);
  const [thstatus, setthstatus] = useState(false);
  const [from_date, setfrom_date] = useState('01-01-' + new Date().getFullYear());
  const [to_date, setto_date] = useState(new Date());
  const [party_id, setparty_id] = useState("");
  const [fdate, setfdate] = useState();
  const [tdate, settdate] = useState();
  const [cname, setcname] = useState();
  const [credit_days, setcredit_days] = useState();
  const [opening_balance, setopening_balance] = useState();
  const [statements, setstatements] = useState([]);
  let [dsum, setdsum] = useState(0.0);
  let [csum, setcsum] = useState(0.0);
  const [current_bal, setcurrent_bal] = useState([]);
  const [response_data, setresponse_data] = useState([]);
  const [creditbalance, setcreditbalance] = useState([]);
  const [debitbalance, setdebitbalance] = useState([]);
  const [DivisionList, setDivisionList] = useState([]);
  const [arr_length, setarr_length] = useState();
  const [arr_length_status, setarr_length_status] = useState(false);
  const [closing_bal, setclosing_bal] = useState(0.00);
  const { ids } = useParams();
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const classes = useStyles();
  var demoArr;


  useEffect(() => {
    document.title = "Request for quoatation - Amaco";
    // getCustomerList().then(({ data }) => {
    //   // console.log(data)
    //   setUserList(data);
    // });


    



    // url
    //   .post(
    //     "all-account-statement"
    //   )
    //   .then(({ data }) => {
    //     const myArr = Object.values(data[0].data).sort(
    //       (a, b) => new Date(a[0].date) - new Date(b[0].date)
    //     );
    //     setfrom_date("01-01-2021")
    //     setto_date(new Date())
    //     setparty_id('')
    //     setstatements(myArr);
    //     setresponse_data(myArr)
    //     setarr_length(Object.keys(myArr).length);


    //     var sum = parseFloat(data[0].opening_balance);
    //     var sum1 = 0.0;
    //     Object.values(data[0].data).map((item, i) => {
    //       if (item[0].debit) {
    //         sum += parseFloat(item[0].debit);
    //       }
    //       if (item[0].credit) {
    //         sum1 += parseFloat(item[0].credit);
    //       }
    //     });

    //     setdsum(sum);
    //     setcsum(sum1);
    //     setfdate(moment(data[0].from_date).format('DD-MMM-YYYY'));

    //     settdate(moment(data[0].to_date).format('DD-MMM-YYYY'));

    //     setcredit_days(data[0].credit_days);
    //     // setcname(data[0].firm_name);
    //     setopening_balance(0.0);
    //     setclosing_bal(sum - sum1);
    //     setthstatus(true);
    //   })
    // getCustomerList().then(({ data }) => {
    //   // console.log(data)
    //   setUserList(data);
    // });


    



    url
      .get("mjrCustomerStatement1/"+localStorage.getItem('division'))
      .then(({ data }) => {
        setUserList(data?.vendor);
        const myArr = Object.values(data?.customerStatement[0]?.data).sort(
          (a, b) => new Date(a[0]?.date) - new Date(b[0]?.date)
        );
        setfrom_date("01-01-2021")
        setto_date(new Date())
        setparty_id('')
        setstatements(myArr);
        setresponse_data(myArr)
        setarr_length(Object.keys(myArr).length);


        var sum = parseFloat(data?.customerStatement[0]?.opening_balance);
        var sum1 = 0.0;
        Object.values(data?.customerStatement[0]?.data).map((item, i) => {
          if (item[0].debit) {
            sum += parseFloat(item[0]?.debit);
          }
          if (item[0].credit) {
            sum1 += parseFloat(item[0]?.credit);
          }
        });

        setdsum(sum);
        setcsum(sum1);
        setfdate(moment(data?.customerStatement[0]?.from_date).format('DD-MMM-YYYY'));

        settdate(moment(data?.customerStatement[0]?.to_date).format('DD-MMM-YYYY'));

        setcredit_days(data?.customerStatement[0]?.credit_days);
        // setcname(data[0].firm_name);
        setopening_balance(0.0);
        setclosing_bal(sum - sum1);
        setthstatus(true);
      })



  }, []);


  window.onafterprint = function () {
    window.close();
    window.location.href = ``;
  };
  const handlePrinting = useReactToPrint({
    content: () => componentRef.current,
    header: () => componentRef.current,
  });


  const calBalance = (cBalance, amount, sign, i) => {






    cBalance = parseFloat(cBalance?.split(",").join(""));
    let tempAmt = parseFloat(amount);

    sign === "+" && (cBalance += tempAmt);
    sign === "-" && (cBalance -= tempAmt);

    // return cBalance.toFixed(2)

    currentBalance = cBalance

    current_bal.push(cBalance.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    }))
    return parseFloat(cBalance).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
  };



  const handleDateChange = (date) => {

    setfrom_date(date);
    filter_data(party_id, date, to_date)
  };

  const handleDateChange1 = (date) => {
    setto_date(date);

    filter_data(party_id, from_date, date)
  };

  let currentBalance = 0;

  let osum = parseFloat(opening_balance).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
  const filter_data = (id, fDate, tDate) => {



    setparty_id(id);
    let openingBal = 0.00;
    let name = UserList.filter(obj => {
      if (obj.id == id) {
        return obj
      }
      else {
        return 0.00
      }
    })
    setcname(name[0]?.firm_name)
    setcredit_days(name[0]?.credit_days)
    if (name.length) {
      openingBal = parseFloat(name[0]?.opening_balance)
    }
    else {
      openingBal = 0.00
    }

    var result = response_data.filter(obj => id !== "All" ? (obj[0].party_id == id && moment(obj[0].created_at).format('YYYY-MM-DD') >= moment(fDate).format('YYYY-MM-DD') && moment(obj[0].created_at).format('YYYY-MM-DD') <= moment(tDate).format('YYYY-MM-DD')) : (moment(obj[0].created_at).format('YYYY-MM-DD') >= moment(fDate).format('YYYY-MM-DD') && moment(obj[0].created_at).format('YYYY-MM-DD') <= moment(tDate).format('YYYY-MM-DD')));
    var date2 = new Date(fDate);
    let debitSum = 0.00;
    let creditSum = 0.00;
    let dSum = 0.00;
    let cSum = 0.00;
    response_data.filter(obj => id !== "All" ? (obj[0].party_id == id && moment(obj[0].created_at).format('YYYY-MM-DD') < moment(date2).format('YYYY-MM-DD')) : (moment(obj[0].created_at).format('YYYY-MM-DD') < moment(date2).format('YYYY-MM-DD'))).map((item, i) => {


      if (item[0].debit) {
        dSum += parseFloat(item[0].debit);
        openingBal += parseFloat(item[0].debit);




      }
      if (item[0].credit) {
        cSum += parseFloat(item[0].credit);
        openingBal += parseFloat(item[0].credit);


      }

    });

    // setclosing_bal((data[0].opening_balance)+sum-sum1)
    // setclosing_bal(openingBal+cSum-dSum)
    setopening_balance(dSum - cSum);

    // if(id!=='All')
    // {
    // openingBal=DivisionList.filter(obj=>obj.id==id).reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.balance), 0)

    // }
    // else
    // {
    //   openingBal=DivisionList.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.balance?currentValue.balance:0),0)
    //   // console.log(openingBal)

    // }

    result.map((item, id) => {

      if (item[0].debit) {
        debitSum += parseFloat(item[0].debit);



        //  console.log(debitSum)


      }
      if (item[0].credit) {
        creditSum += parseFloat(item[0].credit);


      }
    })

    setstatements(result);
    //  console.log(dSum)

    setcreditbalance(creditSum);
    setdebitbalance(debitSum);
    setcsum(creditSum);
    setdsum(debitSum);
    setclosing_bal((parseFloat(dSum) - cSum) - creditSum + debitSum)







  }


  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <div className="flex flex-wrap justify-between mb-2">
          {!value ? (<Breadcrumb
            routeSegments={[
              // { name: "Expense", path: "/expenseview" },
              { name: "CUSTOMER STATEMENTS" },
            ]}
          />) : (<div></div>)}
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
      <ValidatorForm className="px-0 pb-0" >
        <Grid container spacing={2}>
          <Grid item lg={3} xs={12}>
            <TextField
              className="mb-4 w-full ml-10"
              label="Name"
              name="party_id"
              size="small"
              variant="outlined"

              // onChange={(e) => setparty_id(e.target.value)}
              onChange={(e) => filter_data(e.target.value, from_date, to_date)}
              fullWidth
              value={party_id}
              autoComplete="Disabled"
              select
            >
              <MenuItem value="All">
                All
              </MenuItem>
              {UserList.map((item, ind) => (
                <MenuItem value={item.id} key={item}>
                  {item.firm_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item lg={3} md={6} xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
              <KeyboardDatePicker
                className="mb-4 w-full ml-10"
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
                className="mb-4 w-full ml-10"
                margin="none"
                label="To Date"
                inputVariant="outlined"
                type="text"
                size="small"
                autoOk={true}
                minDate={from_date}
                value={to_date}
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
              onClick={handleSubmit}
            >
              <Icon>save</Icon> Generate Statement
            </Button> */}
          </Grid>
        </Grid>
      </ValidatorForm>
      <div className={clsx("invoice-viewer py-4 pt-0", classes.customer)}>
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

        <Card className="p-8">
          <div
            id="print-area"
            ref={componentRef}
            style={{ fontFamily: "Calibri", fontSize: 16 }}
          >
            <table>
              <Header></Header>

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
                              align="left"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            >
                              Name
                            </TableCell>
                            <TableCell
                              className="pl-2"
                              align="left"
                              colSpan={3}
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            >
                              {(party_id == "All" || !party_id) ? "All" : cname}
                            </TableCell>


                            <TableCell
                              className="pr-0 capitalize"
                              align="center"
                              rowSpan={2}
                              colSpan={2}
                              style={{
                                border: "1px solid #ccc",
                                wordBreak: "break-word",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            >
                              <h3>STATEMENT OF ACCOUNT</h3>
                            </TableCell>
                          </TableRow>
                          <TableRow
                            style={{
                              border: "1px solid #ccc",
                              pageBreakInside: "avoid",
                            }}
                          >
                            <TableCell
                              className="pl-2"
                              align="left"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            >
                              Period
                            </TableCell>
                            <TableCell
                              className="pl-2"
                              align="left"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            >
                              {moment(from_date).format("DD-MMM-YYYY")}
                            </TableCell>

                            <TableCell
                              className="pl-2 capitalize"
                              align="left"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            >
                              to
                            </TableCell>
                            <TableCell
                              className="pl-2 capitalize"
                              align="left"
                              style={{
                                border: "1px solid #ccc",
                                wordBreak: "break-word",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            >
                              {moment(to_date).format("DD-MMM-YYYY")}
                            </TableCell>
                            {/* <TableCell
                            className="pl-2 capitalize"
                            align="left"
                            style={{
                              border: "1px solid #ccc",
                              wordBreak: "break-word",
                              fontFamily: "Calibri",
                              fontSize: 16,
                            }}
                          ></TableCell> */}
                          </TableRow>
                          <TableRow
                            style={{
                              border: "1px solid #ccc",
                              pageBreakInside: "avoid",
                            }}
                          >
                            <TableCell
                              className="pl-2"
                              align="left"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            >
                              {/* Current Balance  */}
                              Opening Balance
                            </TableCell>
                            <TableCell
                              className="pl-2"
                              align="left"
                              colSpan={1}
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            >
                              {/* 45,99999999.00 */}
                              {parseFloat(opening_balance).toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                }
                              )}
                            </TableCell>

                            <TableCell
                              className="pl-2 capitalize"
                              align="left"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            >
                              Current Balance
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
                              {/* {current_bal.slice(current_bal.length-1)} */}
                              {closing_bal.toLocaleString(undefined, {
                                minimumFractionDigits: 2
                              })}
                            </TableCell>
                            {/* <TableCell
                            className="pl-2 capitalize"
                            align="left"
                            style={{
                              border: "1px solid #ccc",
                              wordBreak: "break-word",
                              fontFamily: "Calibri",
                              fontSize: 16,
                            }}
                          ></TableCell> */}
                            <TableCell
                              className="pl-2 capitalize"
                              align="left"
                              style={{
                                border: "1px solid #ccc",
                                wordBreak: "break-word",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            >
                              Credit Days
                            </TableCell>
                            <TableCell
                              className="pr-0 capitalize"
                              align="center"
                              style={{
                                border: "1px solid #ccc",
                                wordBreak: "break-word",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            >
                              {credit_days}Days
                            </TableCell>
                          </TableRow>
                        </Table>
                      </div>

                      <div className="px-4 mb-2 pl-4 pt-4 pb-8 flex justify-between">
                        <Table
                          style={{ width: "100%", fontSize: 12, border: "none" }}
                          className="pl-4"
                        >
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
                                colSpan={2}
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  color: "#fff",
                                  fontColor: "#fff",
                                  width: 150,
                                  fontWeight: 1000,
                                  fontSize: 16,
                                }}
                                align="center"
                              >
                                INV.#
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
                                  width: 150
                                }}
                                align="center"
                              >
                                DOCUMENT#
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
                              >
                                PARTICULARS

                              </TableCell>
                              <TableCell
                                className="px-0"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  width: 100,
                                  color: "#fff",
                                  fontWeight: 1000,
                                  fontSize: 16,
                                }}
                                align="center"
                              >
                                BILL AMOUNT
                              </TableCell>
                              <TableCell
                                className="px-0"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  color: "#fff",
                                  width: 100,
                                  fontWeight: 1000,
                                  fontSize: 16,
                                }}
                                align="center"
                              >
                                RECEIVED AMOUNT
                              </TableCell>

                              <TableCell
                                className="px-0"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  width: 100,
                                  color: "#fff",
                                  fontWeight: 1000,
                                  fontSize: 16,
                                }}
                                align="center"
                              >
                                BALANCE
                              </TableCell>
                              <TableCell
                                className="px-0"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  width: 50,
                                  color: "#fff",
                                  fontWeight: 1000,
                                  fontSize: 16,
                                }}
                                align="center"
                              >
                                AGE
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
                                INV. STATUS
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
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
                                {moment(from_date).format("DD-MMM-YYYY")}
                              </TableCell>

                              <TableCell
                                className="pr-0 capitalize"
                                align="center"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                                colSpan={2}
                              >
                                --
                              </TableCell>
                              <TableCell
                                className="pl-2 capitalize"
                                align="left"
                                style={{
                                  border: "1px solid #ccc",
                                  wordBreak: "break-word",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                              >

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
                                opening_balance
                              </TableCell>

                              {opening_balance >= 0 ? (
                                <TableCell
                                  className="pl-0 capitalize"
                                  align="right"
                                  style={{
                                    border: "1px solid #ccc",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
                                >
                                  {/* {parseFloat(opening_balance).toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )} */}
                                </TableCell>
                              ) : (
                                <TableCell
                                  className="pr-0 capitalize"
                                  align="center"
                                  style={{
                                    border: "1px solid #ccc",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
                                ></TableCell>
                              )}
                              {opening_balance < 0 ? (
                                <TableCell
                                  className=" capitalize"
                                  align="right"
                                  style={{
                                    border: "1px solid #ccc",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
                                >
                                  {/* {opening_balance} */}
                                </TableCell>
                              ) : (
                                <TableCell
                                  className="pr-0 capitalize"
                                  align="center"
                                  style={{
                                    border: "1px solid #ccc",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
                                ></TableCell>
                              )}
                              <TableCell
                                className="pl-0 capitalize"
                                style={{
                                  textAlign: "right",
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                              >
                                {parseFloat(opening_balance).toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
                              </TableCell>
                              <TableCell
                                className="pl-0 capitalize"
                                style={{
                                  textAlign: "right",
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                              ></TableCell>
                              <TableCell
                                className="pl-0 capitalize"
                                style={{
                                  textAlign: "right",
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                              >
                                --
                              </TableCell>
                            </TableRow>
                            {statements.map((item, index) => {



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
                                    {moment(item[0].date).format("DD-MMM-YYYY")}
                                  </TableCell>

                                  <TableCell
                                    className="pr-0 capitalize"
                                    align="center"
                                    style={{
                                      border: "1px solid #ccc",
                                      fontFamily: "Calibri",
                                      fontSize: 16,
                                    }}
                                    colSpan={2}
                                  >
                                    {item[0].code_no === null
                                      ? ""
                                      : item[0].code_no}
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
                                    {item[0].po_number === null
                                      ? ""
                                      : item[0].po_number}
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
                                    {item[0].description === null
                                      ? ""
                                      : item[0].description}
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
                                    {item[0].debit === null ? "" : parseFloat(item[0].debit).toLocaleString(undefined, {
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
                                    {item[0].credit === null
                                      ? ""
                                      : parseFloat(item[0].credit).toLocaleString(undefined, {
                                        minimumFractionDigits: 2
                                      })}
                                  </TableCell>
                                  <TableCell
                                    className="pl-0 capitalize"
                                    style={{
                                      textAlign: "right",
                                      border: "1px solid #ccc",
                                      fontFamily: "Calibri",
                                      fontSize: 16,
                                    }}
                                  >
                                    {item[0].debit
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
                                      ))}
                                  </TableCell>
                                  <TableCell
                                    className="pl-0 capitalize"
                                    style={{
                                      textAlign: "center",
                                      border: "1px solid #ccc",
                                      fontFamily: "Calibri",
                                      fontSize: 16,
                                    }}
                                  >
                                    {item[0].debit
                                      ? isNaN(moment(new Date(), "YYYY-MM-DD").diff(
                                        moment(`${item[0].date}`, "YYYY-MM-DD"),
                                        "days"
                                      )) ? "" : moment(new Date(), "YYYY-MM-DD").diff(
                                        moment(`${item[0].date}`, "YYYY-MM-DD"),
                                        "days"
                                      )  
                                      : ""}
                                  </TableCell>
                                  {!item[0].invoice_no ? (<TableCell
                                    className="pl-0 capitalize"
                                    style={{
                                      textAlign: "right",
                                      border: "1px solid #ccc",
                                      fontFamily: "Calibri",
                                      fontSize: 16,
                                    }}
                                  >

                                  </TableCell>) :
                                    (csum < parseFloat(osum.split(",").join("")) ? (<TableCell
                                      className="pl-0 capitalize"
                                      style={{
                                        textAlign: "center",
                                        border: "1px solid #ccc",
                                        fontFamily: "Calibri",
                                        fontSize: 16,
                                        color: 'blue'
                                      }}
                                    >
                                      {moment(new Date(), "YYYY-MM-DD").diff(
                                        moment(`${item[0].date}`, "YYYY-MM-DD"),
                                        "days"
                                      ) >= item[0].credit_days ? <small
                                        className={clsx({
                                          "border-radius-4  text-white px-2 py-2px bg-error": true,

                                        })}
                                      >
                                        OVERDUE
                                      </small> : moment(new Date(), "YYYY-MM-DD").diff(
                                        moment(`${item[0].date}`, "YYYY-MM-DD"),
                                        "days"
                                      ) > (item[0].credit_days - 5) && <small
                                        className={clsx({
                                          "border-radius-4  text-white px-2 py-2px bg-secondary": true,

                                        })}
                                      >
                                        OVERDUE SOON
                                      </small>}
                                    </TableCell>) :
                                      (<TableCell
                                        className="pl-0 capitalize"
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ccc",
                                          fontFamily: "Calibri",
                                          fontSize: 16,
                                          color: 'green'
                                        }}
                                      >
                                        <small
                                          className={clsx({
                                            "border-radius-4  text-white px-2 py-2px bg-green": true,

                                          })}
                                        >
                                          CLEARED
                                        </small>
                                      </TableCell>))

                                  }

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
                              >

                              </TableCell>
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
                                {dsum.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                })}
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
                                {csum.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                })}
                              </TableCell>
                              <TableCell
                                className="pl-0 capitalize"
                                style={{
                                  textAlign: "right",
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                              >

                                {/* {currentBalance.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                              })} */}
                                {closing_bal.toLocaleString(undefined, {
                                  minimumFractionDigits: 2
                                })}
                              </TableCell>
                              <TableCell
                                className="pl-0 capitalize"
                                style={{
                                  textAlign: "right",
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                              >

                              </TableCell>
                              <TableCell
                                className="pl-0 capitalize"
                                style={{
                                  textAlign: "right",
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                              >

                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
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
                            <td
                              className="pr-0 capitalize"
                              align="left"
                              style={{ fontFamily: "Calibri", fontSize: 16 }}
                            >
                              Accounts Dept.
                            </td>

                            <td
                              className="pr-0 capitalize"
                              align="left"
                              style={{ fontFamily: "Calibri", fontSize: 16 }}
                            >
                              Finance Dept.
                            </td>
                          </tr>
                        </Table>
                      </div>

                      <div className="px-4 mb-2 pl-4 pt-8 flex justify-between">
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
                              className="pr-0"
                              align="center"
                              colSpan={1}
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            >
                              Bank Name
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
                              Account Number.
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
                              IBAN Number.
                            </TableCell>
                          </TableRow>
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
                              National Commercial Bank
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
                              6000000242200
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
                              SA3610000006000000242200
                            </TableCell>
                          </TableRow>
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
             <Footer></Footer>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Customer;
