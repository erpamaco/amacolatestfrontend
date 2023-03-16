import React, { useState, useEffect, useRef } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import {
  Icon,
  Grid,
  Table,
  Card,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@material-ui/core";

import { format } from "date-fns";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import url, { getpaymentaccount, navigatePath } from "../invoice/InvoiceService";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { Breadcrumb } from "matx";
import { ValidatorForm } from "react-material-ui-form-validator";
import Header from "./Header";
import Footer from "./Footer";




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
        // display: "-ms-flexbox",
        width: "650px",
        margin: "15px",
        position: "absolute",

        
      },
           "#print-area": {
        
        left: 0,
        right: 0,

       
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
}) => {
  
  const componentRef = useRef();

  const [UserList, setUserList] = useState([]);
  const [payment_account_id, setpayment_account_id] = useState("");
  // const [IsAlive, setIsAlive] = useState(false);
  const [thstatus, setthstatus] = useState(false);
  const [from_date, setfrom_date] = useState('01-01-' + new Date().getFullYear());
  const [to_date, setto_date] = useState(new Date());
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
  const [arr_length, setarr_length] = useState();
  const [balance, setbalance] = useState();
  // const [arr_length_status, setarr_length_status] = useState(false);
  // const [creditbalance, setcreditbalance] = useState(0.00);
  // const [debitbalance, setdebitbalance] = useState(0.00);
  const [closing_bal, setclosing_bal] = useState(0.00);
  const [DivisionList, setDivisionList] = useState([]);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { id, s } = useParams();
  // const { vertical, horizontal, open } = state;
  const classes = useStyles();
  // let finalbal = 0.00;

  // const formData = new FormData();
  useEffect(() => {
    // updateSidebarMode({ mode: "close" })
    document.title = "Request for quoatation - Amaco";
    getpaymentaccount().then(({ data }) => {

      setUserList(data);
    });


    // Api displays the Personal account statement from the start date to end date
    url
      .post(
        "all-advance-payment-statement?" +
        "from_date=" +
        moment(from_date).format("YYYY-MM-DD") +
        "&to_date=" +
        moment(to_date).format("YYYY-MM-DD") +
        "&payment_account_id=" + id
      )
      .then(({ data }) => {

        const myArr = Object.values(data[0].data).sort(
          (a, b) => new Date(b[0].date) - new Date(a[0].date)
        );//sort the response data in date wise 
        setresponse_data(myArr);//set the myArr array object to response_data array
        setstatements(myArr);//set the myArr array object to response_data array
        setarr_length(Object.keys(myArr).length);//find the length of myArr


        var sum = parseFloat(data[0].opening_balance);//Assign the opening balance to sum variable
        var sum1 = 0.0;//initial value sum1 is 0
        Object.values(data[0].data).map((item, i) => {
          if (item[0].debit) {
            sum += parseFloat(item[0].debit);
          }
          if (item[0].credit) {
            sum1 += parseFloat(item[0].credit);
          }
        });//create new array element sum and sum1 where sum holds  the total debit amount and sum1 holds the total credit amount
        setfrom_date(from_date)//set from_date
        setto_date(new Date())//set to date
        // setpayment_account_id('')
        setdsum(sum);//set the debit sum
        setcsum(sum1);//set the credit sum
        // setfdate(moment(data[0].from_date).format('DD-MMM-YYYY'));

        // settdate(moment(data[0].to_date).format('DD-MMM-YYYY'));

        setcredit_days(data[0].credit_days);//set the credit days
        setcname(data[0].name);//set person name
        setopening_balance((data[0].opening_balance));//set the opening balance
        setclosing_bal((data[0].opening_balance) - sum + sum1);//set the closing balance
        setbalance((data[0].balance));// set the balance

        setthstatus(true);
      });


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






    let temp = amount;

    cBalance = parseFloat(cBalance?.split(",").join(""));
    let tempAmt = parseFloat(amount);

    sign === "-" && (cBalance -= tempAmt);
    sign === "+" && (cBalance += tempAmt);



    // return cBalance.toFixed(2)


    currentBalance = parseFloat(cBalance).toLocaleString(undefined, {
      minimumFractionDigits: 2
    });

    current_bal.push(cBalance.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    }))
    return parseFloat((cBalance)).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
  };


  // const handleSubmit = () => {


  //   // if payment_account_id is not selected
  //   if (payment_account_id === "All") {
  //     url
  //       .post(
  //         "all-advance-payment-statement?" +
  //         "from_date=" +
  //         moment(from_date).format("YYYY-MM-DD") +
  //         "&to_date=" +
  //         moment(to_date).format("YYYY-MM-DD")
  //       )
  //       .then(({ data }) => {

  //         const myArr = Object.values(data[0].data).sort(
  //           (a, b) => new Date(b[0].date) - new Date(a[0].date)
  //         );

  //         setstatements(myArr);
  //         setarr_length(Object.keys(myArr).length);


  //         var sum = parseFloat(data[0].opening_balance);
  //         var sum1 = 0.0;
  //         Object.values(data[0].data).map((item, i) => {
  //           if (item[0].debit) {
  //             sum += parseFloat(item[0].debit);

  //           }
  //           if (item[0].credit) {
  //             sum1 += parseFloat(item[0].credit);

  //           }
  //         });



  //         setfrom_date(from_date)
  //         setto_date(new Date())
  //         setpayment_account_id('')
  //         setdsum(sum);
  //         setcsum(sum1);
  //         setfdate(moment(data[0].from_date).format('DD-MMM-YYYY'));

  //         settdate(moment(data[0].to_date).format('DD-MMM-YYYY'));

  //         setcredit_days(data[0].credit_days);
  //         setcname(data[0].name);
  //         setopening_balance((data[0].opening_balance));
  //         // setthstatus(true);
  //       });
  //   }
  //   //  payment_account_id is  selected
  //   else {
  //     url
  //       .post(
  //         "advance-payment-statement?" +
  //         "payment_account_id=" +
  //         payment_account_id +
  //         "&from_date=" +
  //         moment(from_date).format("YYYY-MM-DD") +
  //         "&to_date=" +
  //         moment(to_date).format("YYYY-MM-DD")
  //       )
  //       .then(({ data }) => {
  //         const myArr = Object.values(data[0].data).sort(
  //           (a, b) => new Date(a[0].date) - new Date(b[0].date)
  //         );

  //         setstatements(myArr);
  //         setarr_length(Object.keys(myArr).length);


  //         var sum = parseFloat(data[0].opening_balance);
  //         var sum1 = 0.0;

  //         Object.values(data[0].data).map((item, i) => {
  //           if (item[0].debit) {
  //             sum += parseFloat(item[0].debit);



  //           }
  //           if (item[0].credit) {
  //             sum1 += parseFloat(item[0].credit);


  //           }

  //         });


  //         setdsum(sum);
  //         setcsum(sum1);
  //         setfdate(moment(data[0].from_date).format('DD-MMM-YYYY'));
  //         settdate(moment(data[0].to_date).format('DD-MMM-YYYY'));

  //         setcredit_days(data[0].credit_days);
  //         setcname(data[0].name);
  //         setopening_balance((data[0].opening_balance));
  //         // setthstatus(true);
  //       });
  //   }
  // };
  const handleDateChange = (date) => {
    filter_data(payment_account_id, date, to_date)
    setfrom_date(date);
  };

  const handleDateChange1 = (date) => {
    filter_data(payment_account_id, from_date, date)
    setto_date(date);
  };

  let currentBalance = 0;
  let osum = parseFloat(opening_balance).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
  const filter_data = (id, fDate, tDate) => {


    setpayment_account_id(id);

    // console.log(response_data)

    var result = response_data.filter(obj => (moment(obj[0].created_at).format('YYYY-MM-DD') >= moment(fDate).format('YYYY-MM-DD') && moment(obj[0].created_at).format('YYYY-MM-DD') <= moment(tDate).format('YYYY-MM-DD')));
    var date2 = new Date(fDate);
    let debitSum = 0.00;
    let creditSum = 0.00;
    let dSum = 0.00;
    let cSum = 0.00;
    response_data.filter(obj => (moment(obj[0].created_at).format('YYYY-MM-DD') < moment(date2).format('YYYY-MM-DD'))).map((item, i) => {


      if (item[0].debit) {
        dSum += parseFloat(item[0].debit);




      }
      if (item[0].credit) {
        cSum += parseFloat(item[0].credit);


      }

    });

    let openingBal;
    // if(id!=='All')
    // {
    // openingBal=DivisionList.filter(obj=>obj.id==id).reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.balance), 0)

    // }
    // else
    // {
    openingBal = DivisionList.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.balance ? currentValue.balance : 0), 0)
    // console.log(openingBal)

    // }
    // console.log(result)
    result.map((item, id) => {
      if (item[0].debit) {
        debitSum += parseFloat(item[0].debit);
        //  console.log(debitSum)


      }
      if (item[0].credit) {
        creditSum += parseFloat(item[0].credit);
        // console.log(item)

      }
    })
    setstatements(result);
    //  console.log(dSum)
    //  console.log(cSum)
    setcsum(creditSum);
    setdsum(debitSum)
    setopening_balance(cSum - dSum);
    setclosing_bal((cSum - dSum) + creditSum - debitSum)






  }



  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <div className="flex flex-wrap justify-between mb-2">
          <Breadcrumb
            routeSegments={[
              { name: "PERSONAL ACCOUNT", path: navigatePath + "/personalTab" },
              { name: "ACCOUNT STATEMENTS" },
              // { name: "ACCOUNT STATEMENTS" },
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
      <ValidatorForm className="px-0 pb-0 ml-4">
        <Grid container spacing={2}>
          {/* <Grid item lg={3} xs={12}>
            <TextField
              className="mb-4 w-full"
              label="Name"
              name="workPhone"
              size="small"
              variant="outlined"
              onChange={(e) => filter_data(e.target.value,from_date,to_date)}
              // onChange={(e) => setpayment_account_id(e.target.value)}
              fullWidth
              value={payment_account_id}
              autoComplete="Disabled"
              select
            >
              <MenuItem value="All" >
                  All
                </MenuItem>
              {UserList.filter(obj=>obj.type=="personal").map((item, ind) => (
                <MenuItem value={item.id} key={item}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid> */}

          <Grid item lg={3} md={6} xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className="mb-4 w-full ml-8"
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
                className="mb-4 w-full ml-6"
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
                              {cname}
                            </TableCell>


                            <TableCell
                              className="pr-0 capitalize"
                              align="center"
                              rowSpan={3}
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
                              {moment(from_date).format("DD MMM YYYY")}
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
                              {moment(to_date).format("DD MMM YYYY")}
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
                              {parseFloat((opening_balance)).toLocaleString(
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
                                fontWeight: 1000
                              }}
                            >
                              {/* {(current_bal.slice(current_bal.length-1))} */}
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
                          >
                            
                          </TableCell> */}
                            {/* <TableCell
                            className="pr-0 capitalize"
                            align="center"
                            colspan={2}
                            style={{
                              border: "1px solid #ccc",
                              wordBreak: "break-word",
                              fontFamily: "Calibri",
                              fontSize: 16,
                            }}
                          >
                          
                          </TableCell> */}
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

                              {/* <TableCell
                              className="px-0"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontColor: "#fff",
                                fontWeight: 1000,
                                fontSize: 16,
                                width:100
                              }}
                              colSpan={3}
                              align="center"
                            >
                              DOCUMENT #
                            </TableCell> */}

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
                                  color: "#fff",
                                  width: 80,
                                  fontWeight: 1000,
                                  fontSize: 16,
                                }}
                                align="center"
                              >
                                USER
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
                                DEBIT
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
                                CREDIT
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
                                BALANCE
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
                                {fdate}
                              </TableCell>
                              {/* 
                            
                            <TableCell
                              className="pl-2 capitalize"
                              align="center"
                              style={{
                                border: "1px solid #ccc",
                                wordBreak: "break-word",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                              colspan={3}
                            >
                              ---
                            </TableCell> */}
                              <TableCell
                                className="pl-2 capitalize"
                                align="center"
                                style={{
                                  border: "1px solid #ccc",
                                  wordBreak: "break-word",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                  width: 250
                                }}
                              >
                                opening_balance
                              </TableCell>

                              {opening_balance >= 0 ? (
                                <TableCell
                                  className="pl-0 capitalize"
                                  align="center"
                                  style={{
                                    border: "1px solid #ccc",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                    width: 150
                                  }}
                                >
                                  {/* {parseFloat((opening_balance)).toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )} */}---
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
                                >---</TableCell>
                              )}
                              {opening_balance < 0 ? (
                                <TableCell
                                  className=" capitalize"
                                  align="center"
                                  style={{
                                    border: "1px solid #ccc",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
                                >
                                  {/* {parseFloat((opening_balance)).toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )} */}---
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
                                > ---</TableCell>
                              )}
                              <TableCell
                                className="pl-0 capitalize"
                                style={{
                                  textAlign: "center",
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                              >
                                {/* {parseFloat((opening_balance)).toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                }
                              )} */}---
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
                                {parseFloat((opening_balance)).toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
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


                                  {/* <TableCell
                                  className="pl-2 capitalize"
                                  align="center"
                                  style={{
                                    border: "1px solid #ccc",
                                    wordBreak: "break-word",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
                                  colspan={3}
                                >
                                  ---
                                </TableCell> */}
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
                                    {item[0]?.description ? item[0]?.description : item[0].narration}
                                  </TableCell>
                                  <TableCell
                                    className="px-0"
                                    style={{
                                      border: "1px solid #ccc",
                                      fontFamily: "Calibri",
                                      width: 80,

                                      fontSize: 16,
                                    }}
                                    align="center"
                                  >
                                    {item[0].name}
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
                                    {/* {item[0].credit === null
                                    ? ""
                                    : parseFloat(item[0].credit).toLocaleString(undefined,{
                                      minimumFractionDigits:2
                                    })} */}
                                    {item[0].debit === null ? "" : parseFloat(item[0].debit).toLocaleString(undefined, {
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
                                    {/* {item[0].debit === null ? "" : parseFloat(item[0].debit).toLocaleString(undefined,{
                                    minimumFractionDigits:2
                                  })} */}
                                    {item[0].credit === null
                                      ? ""
                                      : parseFloat(item[0].credit).toLocaleString(undefined, {
                                        minimumFractionDigits: 2
                                      })}

                                  </TableCell>
                                  {item[0].debit && (<TableCell
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
                                      "-",
                                      index,
                                    )}
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
                                  </TableCell>)}
                                  {item[0].credit && (<TableCell
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
                                      item[0].credit,
                                      "+",
                                      index,
                                    )}

                                  </TableCell>)}







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

                              {/* <TableCell
                              className="pr-0 capitalize"
                              align="center"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                              colSpan={2}
                            ></TableCell> */}
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
                                className="pl-0 capitalize"
                                align="right"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                              >

                                {parseFloat(dsum).toLocaleString(undefined, {
                                  minimumFractionDigits: 2
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
                                {parseFloat(csum).toLocaleString(undefined, {
                                  minimumFractionDigits: 2
                                })}
                              </TableCell>

                              {closing_bal < 0 ? <TableCell
                                className="pl-0 capitalize text-error"
                                style={{
                                  textAlign: "right",
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: 16,

                                }}

                              >

                                {closing_bal.toLocaleString(undefined, {
                                  minimumFractionDigits: 2
                                })}
                              </TableCell> : <TableCell
                                className="pl-0 capitalize"
                                style={{
                                  textAlign: "right",
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                }}
                              >

                                {closing_bal.toLocaleString(undefined, {
                                  minimumFractionDigits: 2
                                })}
                              </TableCell>}


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
            <Footer></Footer>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Customer;
