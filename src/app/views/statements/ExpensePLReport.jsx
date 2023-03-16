import React, { useRef, useEffect, useState, forwardRef } from "react";
import {
  Icon,
  Divider,
  Grid,
  Avatar,
  Table,
  TextField,
  ClickAwayListener,
  InputAdornment,
  TableHead,
  TableFooter,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  MenuItem,
  Card,
  Button,
} from "@material-ui/core";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import url from "../invoice/InvoiceService";
import { Breadcrumb } from "matx";
import Header from "./Header";
import Footer from "./Footer";
//import { DatePicker, InlineDatePicker } from "material-ui-pickers";
import Dialog from './Dialog'

const useStyles = makeStyles(({ palette, ...theme }) => ({
  "@global": {
    "@media print": {
      "body, html,div,h2,h3,h4,h5,h6": {
        visibility: "hidden",
        size: "auto",

        content: "none !important",
        "-webkit-print-color-adjust": "exact !important",
        // marginTop:'10px',
        counterIncrement: "page",
        fontSize: "11pt",
      },

      "#table": {
        "font-family": "Calibri",
        "font-size": "11pt",
      },
      /* You can add additional styles here which you need */

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
        // 'counter-increment': page,
        // eslint-disable-next-line no-undef

        // content: counter(pageBreakAfter),
      },

      // "#table": {
      //   // display: "-webkit-box",
      //   // display: "-ms-flexbox",
      //   // // display: "right",
      //   // width: "650px",
      //   // margin: "15px",
      //   // position: "absolute",
      //   fontSize:6

      //   // top: "38.9cm !important",
      //   // paddingRight: "24cm !important"
      // },
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
}));

function ExpenseReport() {
  let arr;
  const quaterMonths = (val) => {
    if (val == 1) {
      setmonths({
        ...months,
        firstMonth: "January",
        secondMonth: "February",
        thirdMonth: "March",
      });
      setfilter_month(
        months__.filter(
          (obj) => obj == "January" || obj == "February" || obj == "March"
        )
      );
    } else if (val == 2) {
      setmonths({
        ...months,
        firstMonth: "April",
        secondMonth: "May",
        thirdMonth: "June",
      });
      setfilter_month(
        months__.filter(
          (obj) => obj == "April" || obj == "May" || obj == "June"
        )
      );
    } else if (val == 3) {
      setmonths({
        ...months,
        firstMonth: "July",
        secondMonth: "August",
        thirdMonth: "September",
      });
      setfilter_month(
        months__.filter(
          (obj) => obj == "July" || obj == "August" || obj == "September"
        )
      );
    } else if (val == 4) {
      setmonths({
        ...months,
        firstMonth: "October",
        secondMonth: "November",
        thirdMonth: "December",
      });
      setfilter_month(
        months__.filter(
          (obj) => obj == "October" || obj == "November" || obj == "December"
        )
      );
    }
    setquater(val);
  };

  const [invoiceData, setInvoiceData] = useState([]);
  const [type, setType] = useState('');
  const [invDialog, setInvDialog] = useState(false);


  const openDialogFunction = (all,type) => {
    if(type == 'I'){
      setType(type)
      setInvoiceData(all)
      setInvDialog(true);
    }else{
      setType(type)
      setInvoiceData(all)
      setInvDialog(true);

    }
  
  };

  const handleClose = () => {
    setType('')
      setInvoiceData([])
      setInvDialog(false);
  }

  const caluclateTotalExpense = (arr, m, c1, c2, c3, c4) => {
    var result = arr.filter(function (o1) {
      return m.some(function (o2) {
        return o1.MONTH === o2; // return the ones with equal id
      });
    });
    const res = result
      .filter(
        (obj) =>
          obj.CATEGORY == c1 ||
          obj.CATEGORY == c2 ||
          obj.CATEGORY == c3 ||
          obj.CATEGORY == c4
      )
      .reduce((a, v) => (a = a + parseFloat(v.AMOUNT)), 0.0);

    return res;
  };
  const caluclateTotal = (m, arr, category) => {
    var result = arr.filter(function (o1) {
      return m.some(function (o2) {
        return o1.MONTH === o2; // return the ones with equal id
      });
    });
    const res = result
      ?.filter((obj) => obj.CATEGORY == category)
      .reduce((a, v) => (a = a + parseFloat(v.AMOUNT)), 0.0);

    return res;
  };
  const caluclateamount = (arr, month, category) => {
    const res = arr
      .filter((obj) => obj.MONTH == month && obj.CATEGORY == category)
      .reduce(
        (a, v) =>
          (a = a + (isNaN(parseFloat(v.AMOUNT)) ? 0 : parseFloat(v.AMOUNT))),
        0.0
      );
    // console.log(res)

    return res.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
  };

  const id = useRef(null);
  const [arrExpense, setarrExpense] = useState([]);
  const [salesExpense, setsalesExpense] = useState([]);
  const [profitLoss, setprofitLoss] = useState([]);
  const [filter_month, setfilter_month] = useState([]);
  const [netprofit, setnetprofit] = useState();

  const [data, setData] = useState([]);
  const [alldata, setAllData] = useState([]);

  const [total_sales, settotal_sales] = useState(0.0);
  const [year, setyear] = useState(new Date());
  const [months, setmonths] = useState({
    firstMonth: " ",
    secondMonth: " ",
    thirdMonth: " ",
  });
  const [quater, setquater] = useState("");
  const [isAlive, setisAlive] = useState(false);
  var months__ = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();

  const [from_date, setfrom_date] = useState(new Date(y, m, 1));
  const [to_date, setto_date] = useState(new Date(y, m + 1, 0));

  const [value, setValue] = React.useState(new Date());
  let sum = 0.0;
  var dataVal;

  const handleSubmit = () => {
    const fData = alldata.filter(
      (obj) =>
        new Date(obj.created_at).getTime() >= new Date(from_date).getTime() &&
        new Date(obj.created_at).getTime() <= new Date(to_date).getTime()
    );
    setData(fData);
  };

  useEffect(() => {
    url
      .get("expense-invoice-report")
      .then(({ data }) => {
        const fData = data.filter(
          (obj) =>
            new Date(obj.created_at).getTime() >=
              new Date(from_date).getTime() &&
            new Date(obj.created_at).getTime() <= new Date(to_date).getTime()
        );

        setData(fData);
        setAllData(fData);
      })
      .catch(() => {});

    // filterData(year)

    // setfilter_month(months__)

    // setTimeout(() => {
    //   var n1 = document.getElementById('net').innerHTML.replace(/,/g, '');
    //   // console.log(parseFloat(n1))
    //   url.get("profitLoss").then(({ data }) => {
    //     var res = data[0].data.map((item) => {
    //       item['profit_Amount'] = (parseFloat(item.profit_per) / 100) * n1;
    //       item['invest_Amount'] = data[0].data?.filter(obj => obj.payment_account_id == item.payment_account_id).reduce((a, v) => a = a + parseFloat(v.investment_details?.amount), 0.00) + parseFloat(item.opening_balance ? item.opening_balance : 0.00)
    //       return item
    //     })
    //     // console.log(res)
    //     setprofitLoss(res)

    //   })
    // }, 1000);
  }, []);

  const classes = useStyles();
  const componentRef = useRef();
  const handlePrinting = useReactToPrint({
    content: () => componentRef.current,
    header: () => componentRef.current,
  });
  const handleDateChangeYear = (date) => {
    setyear(date);

    // filterData(date)
    const fData = alldata.filter(
      (obj) =>
        moment(obj.created_at).format("YYYY") === moment(date).format("YYYY")
    );
    setData(fData);
  };

  const handleDateChange = (date) => {
    setfrom_date(moment(date).format("DD MMM YYYY"));
  };

  const handleDateChange1 = (date) => {
    setto_date(moment(date).format("DD MMM YYYY"));
  };

  return (
    <div className="m-sm-30">
      {/* <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            // { name: " ", path: "/material" },
            { name: "ProfitLoss" },
          ]}
        />
      </div> */}
      <Card style={{ padding: "10px" }}>
        <div className={clsx("invoice-viewer py-4", classes.invoiceViewer)}>
          <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
            <div>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className="mb-4 w-full"
                      margin="none"
                      label="YEAR"
                      inputVariant="outlined"
                      type="text"
                      size="small"
                      autoOk={true}
                      value={year}
                      views={["year"]}
                      format="yyyy"
                      onChange={handleDateChangeYear}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={3}>
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
                <Grid item xs={3}>
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
                <Grid item xs={3}>
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
            </div>
            <div>
              <Button
                className="mr-4 py-2"
                color="secondary"
                variant="outlined"
                onClick={() => handlePrinting()}
              >
                <Icon>print</Icon> PRINT
              </Button>
            </div>
          </div>
          <div>
            <div
              id="print-area"
              ref={componentRef}
              style={{ fontFamily: "Calibri", fontSize: 16 }}
            >
              <table>
                <Header />
                <div>
                  <Table
                    style={{
                      fontSize: "10pt",
                      border: "none",
                      fontFamily: "Calibri",
                    }}
                    id="table"
                  >
                    <TableHead
                      style={{
                        backgroundColor: "#1d2257",
                        display: "table-row-group",
                      }}
                    >
                      <TableRow>
                        {/* <TableCell colSpan={1}></TableCell> */}
                        <TableCell
                          colSpan={7}
                          style={{
                            color: "#fff",
                            textAlign: "center",
                            fontSize: 20,
                          }}
                        >
                          SALES & EXPENSE REPORT - {moment(year).format("YYYY")}{" "}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableHead
                      style={{
                        backgroundColor: "#1d2257",
                        display: "table-row-group",
                      }}
                    >
                      <TableRow style={{ pageBreakInside: "avoid" }} id="table">
                        <TableCell
                          className="pr-0"
                          style={{
                            border: "1px solid #ccc",
                            width: "25px",
                            fontFamily: "Calibri",
                            color: "#fff",
                            fontWeight: 1000,
                            fontSize: "11pt",
                          }}
                          align="center"
                        >
                          SL.NO
                        </TableCell>
                        <TableCell
                          className="px-0"
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            color: "#fff",
                            fontColor: "#fff",
                            fontWeight: 1000,
                            fontSize: "11pt",
                          }}
                          align="center"
                        >
                          NAME
                        </TableCell>
                        <TableCell
                          className="px-0"
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            color: "#fff",
                            fontColor: "#fff",
                            fontWeight: 1000,
                            fontSize: "11pt",
                          }}
                          align="center"
                        >
                          INVOICE NUMBER
                        </TableCell>
                        <TableCell
                          className="px-0"
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            color: "#fff",
                            fontColor: "#fff",
                            fontWeight: 1000,
                            fontSize: "11pt",
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
                            fontSize: "11pt",
                          }}
                          align="center"
                        >
                          AMOUNT
                        </TableCell>
                        <TableCell
                          className="px-0"
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            color: "#fff",
                            fontWeight: 1000,
                            fontSize: "11pt",
                          }}
                          align="center"
                        >
                          EXPENSE
                        </TableCell>
                        <TableCell
                          className="px-0"
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            color: "#fff",
                            fontWeight: 1000,
                            fontSize: "11pt",
                          }}
                          align="center"
                        >
                          PROFIT
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.map((item, i) => {
                        return (
                          <>
                            <TableRow
                              style={{
                                border: "1px solid #ccc",
                                pageBreakInside: "avoid",
                              }}
                            >
                              <TableCell
                                className="pr-0"
                                align="center"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: "11pt",
                                }}
                              >
                                {++i}
                              </TableCell>
                              <TableCell
                                className="pr-4"
                                align="center"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: "11pt",
                                }}
                              >
                                {item?.party?.firm_name}
                              </TableCell>
                              <TableCell
                                className="pr-4"
                                align="center"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: "11pt",
                                }}
                              >
                                <span style={{ cursor: "pointer" }}>
                                  {item?.type == "I" ? (
                                    <span
                                      onClick={() => {
                                        openDialogFunction(item?.allData,'I')
                                        
                                      }}
                                    >
                                      {item?.q_i_number}
                                    </span>
                                  ) : (
                                    <span
                                      onClick={() => {
                                        openDialogFunction(item?.allData,'Q')
                                      }}
                                    >
                                      {item?.q_i_number}
                                    </span>
                                  )}{" "}
                                </span>
                              </TableCell>
                              <TableCell
                                className="pr-4"
                                align="center"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: "11pt",
                                }}
                              >
                                {moment(item?.created_at).format("DD-MMM-YYYY")}
                              </TableCell>
                              <TableCell
                                className="pr-4"
                                align="right"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: "11pt",
                                }}
                              >
                                {parseFloat(item?.tot_amount).toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
                              </TableCell>
                              <TableCell
                                className="pr-4"
                                align="right"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: "11pt",
                                }}
                              >
                                {parseFloat(item?.amount).toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
                              </TableCell>
                              <TableCell
                                className="pr-4"
                                align="right"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  fontSize: "11pt",
                                }}
                              >
                                {parseFloat(item?.profit).toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                      {/* {filter_month.map((item) => {
                        return (
                          <TableRow style={{ border: "1px solid #ccc", pageBreakInside: 'avoid' }}>
                         
                            <TableCell className="pr-4" align="right" style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                              {caluclateamount(arrExpense, item, "Governmental Expenses")}
                            </TableCell>
                            <TableCell className="pr-4" align="right" style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                              {caluclateamount(arrExpense, item, "PURCHASE")}
                            </TableCell>
                            <TableCell className="pr-4" align="right" style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                              {caluclateamount(salesExpense, item, "SALES")}
                            </TableCell>



                          </TableRow>)
                      })} */}

                      <TableRow
                        style={{
                          border: "1px solid #ccc",
                          pageBreakInside: "avoid",
                          backgroundColor: "#1d2257",
                          fontWeight: 1000,
                        }}
                      >
                        <TableCell
                          className="pr-0"
                          align="center"
                          colspan={1}
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            fontSize: "11pt",
                            fontWeight: 1000,
                            color: "white",
                          }}
                        >
                          TOTAL
                        </TableCell>

                        <TableCell
                          className="pr-4"
                          align="right"
                          colspan={1}
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            fontSize: "11pt",
                            fontWeight: 1000,
                            color: "white",
                          }}
                        ></TableCell>
                        <TableCell
                          className="pr-4"
                          align="right"
                          colspan={1}
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            fontSize: "11pt",
                            fontWeight: 1000,
                            color: "white",
                          }}
                        ></TableCell>
                        <TableCell
                          className="pr-4"
                          align="right"
                          colspan={1}
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            fontSize: "11pt",
                            fontWeight: 1000,
                            color: "white",
                          }}
                        ></TableCell>
                        <TableCell
                          className="pr-4"
                          align="right"
                          colspan={1}
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            fontSize: "11pt",
                            fontWeight: 1000,
                            color: "white",
                          }}
                        >
                          {parseFloat(
                            data.reduce(function (prev, current) {
                              return prev + +current.tot_amount;
                            }, 0)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                        <TableCell
                          className="pr-4"
                          align="right"
                          colspan={1}
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            fontSize: "11pt",
                            fontWeight: 1000,
                            color: "white",
                          }}
                        >
                          {parseFloat(
                            data.reduce(function (prev, current) {
                              return prev + +current.amount;
                            }, 0)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                        <TableCell
                          className="pr-4"
                          align="right"
                          colspan={1}
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            fontSize: "11pt",
                            fontWeight: 1000,
                            color: "white",
                          }}
                        >
                          {parseFloat(
                            data.reduce(function (prev, current) {
                              return prev + +current.profit;
                            }, 0)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                      </TableRow>

                      <TableRow
                        style={{
                          border: "1px solid #ccc",
                          pageBreakInside: "avoid",
                          backgroundColor: "#cccccc85",
                          fontWeight: 1000,
                        }}
                      >
                        <TableCell
                          className="pr-0"
                          align="center"
                          colspan={1}
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            fontSize: "11pt",
                            fontWeight: 1000,
                          }}
                        >
                          TOTAL SALES
                        </TableCell>
                        <TableCell
                          className="pr-0"
                          align="center"
                          colspan={6}
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            fontSize: "11pt",
                            fontWeight: 1000,
                          }}
                        >
                          {parseFloat(
                            data.reduce(function (prev, current) {
                              return prev + +current.tot_amount;
                            }, 0)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        style={{
                          border: "1px solid #ccc",
                          pageBreakInside: "avoid",
                          backgroundColor: "#cccccc85",
                          fontWeight: 1000,
                        }}
                      >
                        <TableCell
                          className="pr-0"
                          align="center"
                          colspan={1}
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            fontSize: "11pt",
                            fontWeight: 1000,
                          }}
                        >
                          TOTAL EXPENSES
                        </TableCell>
                        <TableCell
                          className="pr-0"
                          align="center"
                          colspan={6}
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            fontSize: "11pt",
                            fontWeight: 1000,
                          }}
                        >
                          {parseFloat(
                            data.reduce(function (prev, current) {
                              return prev + +current.amount;
                            }, 0)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                      </TableRow>
                      {/* <TableRow
                        style={{
                          border: "1px solid #ccc",
                          pageBreakInside: "avoid",
                          backgroundColor: "#cccccc85",
                          fontWeight: 1000,
                        }}
                      >
                        <TableCell
                          className="pr-0"
                          align="center"
                          colspan={1}
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            fontSize: "11pt",
                            fontWeight: 1000,
                          }}
                        >
                          GROSS PROFIT
                        </TableCell>
                        <TableCell
                          className="pr-0"
                          align="center"
                          colspan={5}
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            fontSize: "11pt",
                            fontWeight: 1000,
                          }}
                        >
                          {(
                            caluclateTotal(
                              filter_month,
                              salesExpense,
                              "SALES"
                            ) -
                            caluclateTotal(filter_month, arrExpense, "PURCHASE")
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                      </TableRow> */}
                      <TableRow
                        style={{
                          border: "1px solid #ccc",
                          pageBreakInside: "avoid",
                          backgroundColor: "#1d2257",
                          fontWeight: 1000,
                        }}
                      >
                        <TableCell
                          className="pr-0"
                          align="center"
                          colspan={1}
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            fontSize: "11pt",
                            fontWeight: 1000,
                            color: "white",
                          }}
                        >
                          GROSS PROFIT
                        </TableCell>
                        <TableCell
                          id="net"
                          className="pr-0"
                          align="center"
                          colspan={6}
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            fontSize: "15pt",
                            fontWeight: 1000,
                            color: "white",
                          }}
                        >
                          {parseFloat(
                            data.reduce(function (prev, current) {
                              return prev + +current.profit;
                            }, 0)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="pr-0"
                          align="center"
                          colspan={6}
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            fontSize: "11pt",
                            fontWeight: 1000,
                            color: "green",
                          }}
                        ></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Table></Table>
                </div>
                <tfoot>
                  <div class="empty-footer"></div>
                </tfoot>
              </table>

              <div class="footer">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {invDialog && <Dialog type={type} handleClose={handleClose} data={invoiceData} open={invDialog}/>}
    </div>
  );
}

export default ExpenseReport;
