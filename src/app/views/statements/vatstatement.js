import React, { useState, useEffect, useRef } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Header from "./Header";
import Footer from "./Footer";
import Excel from '../sales/excel.png';

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

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// import 'bootstrap/dist/css/bootstrap.min.css';
import url, { getpaymentaccount } from "../invoice/InvoiceService";

import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { Breadcrumb } from "matx";
import { ValidatorForm } from "react-material-ui-form-validator";

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
      "#bread": {
        visibility: "hidden",
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

const VatStatement = ({
  toggleInvoiceEditor,
  list = [],
  handleAddList,
  handleAddNewCard,
  value,
}) => {
  const componentRef = useRef();

  const [DivisionList, setDivisionList] = useState([]);
  const [userList, setuserList] = useState([]);
  const [Arr, setArr] = useState([]);
  const [payment_account_id, setpayment_account_id] = useState("");
  const [IsAlive, setIsAlive] = useState(false);
  const [thstatus, setthstatus] = useState(false);
  const [from_date, setfrom_date] = useState(
    "01-01-" + new Date().getFullYear()
  );
  const [to_date, setto_date] = useState(new Date());
  const [fdate, setfdate] = useState();
  const [tdate, settdate] = useState();
  const [cname, setcname] = useState();
  const [credit_days, setcredit_days] = useState();
  const [opening_balance, setopening_balance] = useState();
  const [statements, setstatements] = useState([]);
  let [dsum, setdsum] = useState(0.0);
  let [csum, setcsum] = useState(0.0);
  const curr_date = new Date();
  const curr_year = moment(curr_date).format("YYYY");

  const [current_bal, setcurrent_bal] = useState([]);
  const [response_data, setresponse_data] = useState([]);
  const [arr_length, setarr_length] = useState();
  const [balance, setbalance] = useState();
  const [debit_balance, setdebit_balance] = useState(0.0);
  const [credit_balance, setcredit_balance] = useState(0.0);
  const [closing_bal, setclosing_bal] = useState(0.0);

  const [arr_length_status, setarr_length_status] = useState(false);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;
  const classes = useStyles();

  const formData = new FormData();
  useEffect(() => {
    getpaymentaccount().then(({ data }) => {
      setDivisionList(data);
      setuserList(data);
    });
    // displays the debited amount from vat expense or tax paid by the company and credited amount from the Invoices
    url
      .get(
        "vat"
      )
      .then(({ data }) => {
        const myArr = Object.values(data[0]?.data).sort(
          (a, b) => new Date(a?.issue_date) - new Date(b?.issue_date)
        );
        const myArr2 = Object.values(data[0]?.data).sort(
          (a, b) => new Date(a?.issue_date) - new Date(b?.issue_date)
        )?.filter(obj => parseInt(obj.div_id) == parseInt(localStorage.getItem('division')) && parseInt(obj.exclude_from_vat) == 0 && moment(obj.issue_date).format('YYYY') == curr_year);

        setstatements(myArr2);
        setresponse_data(myArr);
        setarr_length(Object.keys(myArr).length);

        let sum = 0.0;
        let sum1 = 0.0;
        Object.values(data[0].data).map((item, i) => {
          if (item.debit) {
            sum += parseFloat(item.debit);
          }
          if (item.credit) {
            sum1 += parseFloat(item.credit);
          }
        });

        setfrom_date(from_date);
        setto_date(new Date());
        setpayment_account_id("");
        setdsum(sum);
        setcsum(sum1);
        setdebit_balance(sum1);
        setcredit_balance(sum);

        setfdate(moment(data[0].from_date).format("DD-MMM-YYYY"));

        settdate(moment(data[0].to_date).format("DD-MMM-YYYY"));

        setcredit_days(data[0].credit_days);
        setcname(data[0].firm_name);
        setopening_balance(data[0].opening_balance);
        setclosing_bal(data[0].opening_balance + sum - sum1);
        setbalance(data[0].balance);

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

  // calculate the balance amount
  const calBalance = (cBalance, amount, sign, i) => {
    let temp = amount;

    cBalance = parseFloat(cBalance?.split(",").join(""));
    let tempAmt = parseFloat(amount);

    sign === "-" && (cBalance -= tempAmt);
    sign === "+" && (cBalance += tempAmt);

    currentBalance = parseFloat(cBalance).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });

    current_bal.push(
      cBalance.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })
    );
    return parseFloat(cBalance).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
  };

  // change the from date
  const handleFromDateChange = date => {
    setfrom_date(date);
    filter_data(payment_account_id, date, to_date);
  };
  const handleXlsx = () => {
    const XLSX = require('xlsx')

    const stmnt = statements?.map((item,i)=>{
      let a =  i
      return {
        'S.NO.' : ++a,
        'DATE' : moment(item?.issue_date).format("DD MMM YYYY"),
        'PARTICULARS' : item?.type + "/" + item?.number,
        'DEBIT' : item.debit === null
        ? ""
        : parseFloat(item.debit).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
            }
          ),
        'CREDIT' : item.credit === null
        ? ""
        : parseFloat(item.credit).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
            }
          ),
        // 'BALANCE' : osum = calBalance(
        //   osum,
        //   item.credit,
          
        // ),
        // 'VAT' : item?.party?.vat_no,
        
      }
    })
  
    let binaryWS = XLSX.utils.json_to_sheet(stmnt); 
    
    var wb = XLSX.utils.book_new() 
    XLSX.utils.book_append_sheet(wb, binaryWS, 'Binary values') 
    
    XLSX.writeFile(wb, `AMACO VAT STATEMENT ${moment(from_date).format('DD MMM YYYY')} - ${moment(to_date).format('DD MMM YYYY')}.xlsx`);
  }

  // Change the To Date
  const handleToDateChange = date => {
    setto_date(date);
    filter_data(payment_account_id, from_date, date);
  };

  let currentBalance = 0;
  let osum = parseFloat(opening_balance).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });

  // Filter the array based on the from date and Todate
  const filter_data = (id, fDate, tDate) => {
    var result = response_data.filter(
      obj =>
        moment(obj.issue_date).format("YYYY-MM-DD") >=
          moment(fDate).format("YYYY-MM-DD") &&
        moment(obj.issue_date).format("YYYY-MM-DD") <=
          moment(tDate).format("YYYY-MM-DD") && parseInt(obj.div_id) == parseInt(localStorage.getItem('division'))
    );
    var date2 = new Date(fDate);
    let debitSum = 0.0;
    let creditSum = 0.0;
    let vatSum = 0.0;
    let dSum = 0.0;
    let cSum = 0.0;
    let vSum = 0.0;
    response_data
      .filter(
        obj =>
          moment(obj.issue_date).format("YYYY-MM-DD") <
          moment(date2).format("YYYY-MM-DD")
      )
      .map((item, i) => {
        if (item.debit) {
          dSum += parseFloat(item.debit);
        }
        if (item.credit) {
          if (item.type == "PURCHASE") {
            cSum += parseFloat(item.credit);
          } else {
            vSum += parseFloat(item.credit);
          }
        }
      });

    let openingBal;

    result.map((item, id) => {
      if (item.debit) {
        debitSum += parseFloat(item.debit);
      }
      if (item.credit) {
        if (item.type == "PURCHASE") {
          creditSum += parseFloat(item.credit);
        } else {
          vatSum += parseFloat(item.credit);
        }
      }
    });
    setstatements(result);

    setdebit_balance(creditSum + vatSum);
    setcredit_balance(debitSum);
    setopening_balance(dSum - cSum - vSum);
    setclosing_bal(dSum - cSum - vSum + debitSum - creditSum - vatSum);
  };

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <div className="flex flex-wrap justify-between mb-2">
          <span id="bread">
            {!value ? (
              <Breadcrumb routeSegments={[{ name: "VAT STATEMENTS" }]} />
            ) : (
              <div></div>
            )}
          </span>
          <div className="text-right">
          <Button
              className="mr-4 py-2"
              color="success"
              variant="outlined"
              onClick={(e)=>{handleXlsx()}}
              style={{color:"#087e40",borderColor:"#087e40"}}
              
            >
              <img style={{width:'20px',height:'20px'}} src={Excel} />&nbsp; EXPORT TO XLSX
            </Button>&nbsp;
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
      <Card style={{ padding: "10px" }}>
        <ValidatorForm className="px-0 pb-0 ml-4">
          <Grid container spacing={2}>
            <Grid item lg={3} md={6} xs={12}>
              {/* Choose the from date */}
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
                  onChange={handleFromDateChange}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item lg={3} xs={12}>
              {/* Choose the End/Last Date */}
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
                  onChange={handleToDateChange}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item lg={3} xs={12}></Grid>
          </Grid>
        </ValidatorForm>
        <div className={clsx("invoice-viewer py-4 pt-0", classes.Master)}>
          <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
            <div></div>
          </div>

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
                          style={{
                            width: "100%",
                            fontSize: 12,
                            border: "none",
                          }}
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
                              {payment_account_id == "All" ||
                              !payment_account_id
                                ? "All"
                                : cname}
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
                              {/* Display the From Date */}
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
                              {/* Display the Till Date */}
                              {moment(to_date).format("DD-MMM-YYYY")}
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
                              {/* displays the opening balance */}
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
                                fontWeight: 1000,
                              }}
                            >
                              {/* Displays the Closing balance */}
                              {closing_bal.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                              })}
                            </TableCell>
                          </TableRow>
                        </Table>
                      </div>

                      <div className="px-4 mb-2 pl-4 pt-4 pb-8 flex justify-between">
                        <Table
                          style={{
                            width: "100%",
                            fontSize: 12,
                            border: "none",
                          }}
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
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  color: "#fff",
                                  fontColor: "#fff",
                                  fontWeight: 1000,
                                  fontSize: 16,
                                  width: 200,
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
                                {/* Displays the From date */}
                                {moment(from_date).format("DD-MMM-YYYY")}
                              </TableCell>

                              <TableCell
                                className="pl-2 capitalize"
                                align="center"
                                style={{
                                  border: "1px solid #ccc",
                                  wordBreak: "break-word",
                                  fontFamily: "Calibri",
                                  fontSize: 16,
                                  width: 250,
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
                                    width: 150,
                                  }}
                                >
                                  ---
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
                                >
                                  ---
                                </TableCell>
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
                                  ---
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
                                >
                                  {" "}
                                  ---
                                </TableCell>
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
                                {/* Displays the Opening Balance */}
                                {parseFloat(opening_balance).toLocaleString(
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
                                    {/* Displays the from date */}
                                    {moment(item?.issue_date).format(
                                      "DD-MMM-YYYY"
                                    )}
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
                                    {/* Displays the descriptions ("Type/Invoice or Voucher number") */}
                                    {item?.type + "/" + item?.number}
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
                                    {/* Displays the Debit Amount */}
                                    {item.credit === null
                                      ? ""
                                      : parseFloat(item.credit).toLocaleString(
                                          undefined,
                                          {
                                            minimumFractionDigits: 2,
                                          }
                                        )}
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
                                    {/* Displays the Credit Amount */}
                                    {item.debit === null
                                      ? ""
                                      : parseFloat(item.debit).toLocaleString(
                                          undefined,
                                          {
                                            minimumFractionDigits: 2,
                                          }
                                        )}
                                  </TableCell>
                                  {/* Calculate the opening balance If the amount is debit */}
                                  {item.debit && (
                                    <TableCell
                                      className="pl-0 capitalize"
                                      style={{
                                        textAlign: "right",
                                        border: "1px solid #ccc",
                                        fontFamily: "Calibri",

                                        fontSize: 16,
                                      }}
                                    >
                                      {
                                        (osum = calBalance(
                                          osum,
                                          item.debit,
                                          "+",
                                          index
                                        ))
                                      }
                                    </TableCell>
                                  )}
                                  {/* Calculate the opening balance If the amount is credit */}

                                  {item.credit && (
                                    <TableCell
                                      className="pl-0 capitalize"
                                      style={{
                                        textAlign: "right",
                                        border: "1px solid #ccc",
                                        fontFamily: "Calibri",
                                        fontSize: 16,
                                      }}
                                    >
                                      {
                                        (osum = calBalance(
                                          osum,
                                          item.credit,
                                          "-",
                                          index
                                        ))
                                      }
                                    </TableCell>
                                  )}
                                </TableRow>
                              );
                            })}
                            <TableRow
                              style={{
                                border: "1px solid #ccc",
                                pageBreakInside: "avoid",
                                backgroundColor: "#ccc",
                              }}
                            >
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
                                {/* Total Debit balance */}
                                {parseFloat(debit_balance).toLocaleString(
                                  undefined,
                                  { minimumFractionDigits: 2 }
                                )}
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
                                {/* Total Credit balance */}
                                {parseFloat(credit_balance).toLocaleString(
                                  undefined,
                                  { minimumFractionDigits: 2 }
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
                              >
                                {currentBalance}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                      <div className="px-4 mb-2 pl-4 pt-8 flex justify-between">
                        <Table
                          style={{
                            width: "100%",
                            fontSize: 12,
                            border: "none",
                          }}
                          className="pl-4"
                        >
                          <tr
                            style={{
                              borderColor: "#fff",
                              pageBreakInside: "avoid",
                            }}
                          ></tr>
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
        </div>
      </Card>
    </div>
  );
};

export default VatStatement;
