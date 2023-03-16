import React, { useState, useEffect, useRef } from "react";
import { borders } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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
  Card,
  Button,
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { getInvoiceById } from "../invoice/InvoiceService";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import { cond, split } from "lodash";
import logo from "./../invoice/amaco-logo.png";
import logos from "./../invoice/vision2030.png";
// import 'bootstrap/dist/css/bootstrap.min.css';
import useSettings from "../../hooks/useSettings";
import apiurl from "../../../config";
import url, { getCustomerList, getpaymentaccount } from "../invoice/InvoiceService";
import Arabic from "../../../lang/ar.json";
import { IntlProvider, FormattedNumber } from "react-intl";
import { FormattedMessage } from "react-intl";
import Swal from "sweetalert2";
import Axios from "axios";
import history from "history.js";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";
import { ToWords } from "to-words";
import { useReactToPrint } from "react-to-print";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { Breadcrumb, ConfirmationDialog } from "matx";
import { ValidatorForm } from "react-material-ui-form-validator";
const locale = navigator.language;

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
}) => {
  // let search = window.location.search;
  // let params = new URLSearchParams(search);
  // const foo =parseInt(params.get('s'));
  const componentRef = useRef();

  const [UserList, setUserList] = useState([]);
  const [payment_account_id, setpayment_account_id] = useState("");
  const [IsAlive, setIsAlive] = useState(false);
  const [thstatus, setthstatus] = useState(false);
  const [from_date, setfrom_date] = useState(new Date());
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
  const [arr_length, setarr_length] = useState();
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
    // updateSidebarMode({ mode: "close" })
    document.title = "Request for quoatation - Amaco";
    getpaymentaccount().then(({ data }) => {
       
      setUserList(data);
    });
    url
      .get(
        "all-account-statement" +
          "payment_account_id=" +
          payment_account_id +
          "&from_date=" +
          moment(from_date).format("YYYY-MM-DD") +
          "&to_date=" +
          moment(to_date).format("YYYY-MM-DD")
      )
      .then(({ data }) => {
        const myArr = Object.values(data[0].data).sort(
          (a, b) => new Date(a[0].date) - new Date(b[0].date)
        );

        setstatements(myArr);
        setarr_length(Object.keys(myArr).length);
      

        var sum = parseFloat(data[0].opening_balance);
        var sum1 = 0.0;
        Object.values(data[0].data).map((item, i) => {
          if (item[0].debit) {
            sum += parseFloat(item[0].debit.split(",").join(""));
          }
          if (item[0].credit) {
            sum1 += parseFloat(item[0].credit.split(",").join(""));
          }
        });
        setfrom_date(new Date())
        setto_date(new Date())
        setpayment_account_id('')
        setdsum(sum);
        setcsum(sum1);
        setfdate(data[0].from_date);

        settdate(data[0].to_date);

        setcredit_days(data[0].credit_days);
        setcname(data[0].firm_name);
        setopening_balance(data[0].opening_balance);
        setthstatus(true);
      });
  }, []);

  const handlePrint = () => {
    window.print();
  };
  window.onafterprint = function () {
    window.close();
    window.location.href = ``;
  };
  const handlePrinting = useReactToPrint({
    content: () => componentRef.current,
    header: () => componentRef.current,
  });

  //  const  calcualte_bal=(curbal,cBalance)=>{
  //     let tmp=curbal +cBalance
  //     setcurrent_bal(tmp)
  //     return tmp

  //   }
  const calBalance = (cBalance, amount, sign,i) => {
    // cBalance=parseFloat(cBalance)
 
 
  
  
    
    
    cBalance = parseFloat(cBalance?.split(",").join(""));
    let tempAmt = parseFloat(amount?.split(",").join(""));

    sign === "+" && (cBalance += tempAmt);
    sign === "-" && (cBalance -= tempAmt);

    // return cBalance.toFixed(2)
    
    currentBalance=cBalance
   
    current_bal.push(cBalance.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    }))
    return parseFloat(cBalance).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
  };
  

  const handleSubmit = () => {
    const formData1 = {
      payment_account_id: payment_account_id,
      from_date: "2021-01-03",
      to_date: "2021-03-22",
    };

    // formData.append('payment_account_id',payment_account_id)
    // formData.append('from_date',moment(from_date).format('YYYY-MM-DD'))
    // formData.append('to_date',moment(to_date).format('YYYY-MM-DD'))
    
    url
      .post(
        "advance-payment-statement?" +
          "payment_account_id=" +
          payment_account_id +
          "&from_date=" +
          moment(from_date).format("YYYY-MM-DD") +
          "&to_date=" +
          moment(to_date).format("YYYY-MM-DD")
      )
      .then(({ data }) => {
        const myArr = Object.values(data[0].data).sort(
          (a, b) => new Date(a[0].date) - new Date(b[0].date)
        );

        setstatements(myArr);
        setarr_length(Object.keys(myArr).length);
      

        var sum = parseFloat(data[0].opening_balance);
        var sum1 = 0.0;
        Object.values(data[0].data).map((item, i) => {
          if (item[0].debit) {
            sum += parseFloat(item[0].debit.split(",").join(""));
          }
          if (item[0].credit) {
            sum1 += parseFloat(item[0].credit.split(",").join(""));
          }
        });
        setfrom_date(new Date())
        setto_date(new Date())
        setpayment_account_id('')
        setdsum(sum);
        setcsum(sum1);
        setfdate(data[0].from_date);

        settdate(data[0].to_date);

        setcredit_days(data[0].credit_days);
        setcname(data[0].firm_name);
        setopening_balance(data[0].opening_balance);
        setthstatus(true);
      });
  };
  const handleDateChange = (date) => {
    setfrom_date(date);
  };

  const handleDateChange1 = (date) => {
    setto_date(date);
  };

  let currentBalance = 0;
  let arr=[];
  let curbal = 0.0;
  let osum = parseFloat(opening_balance).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
  let {
    orderNo,
    buyer,
    seller,
    item: invoiceItemList = [],
    status,
    vat,
    date,
  } = state;

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <div className="flex flex-wrap justify-between mb-2">
          <Breadcrumb
            routeSegments={[
              // { name: "Expense", path: "/expenseview" },
              { name: "Account Statements" },
            ]}
          />
          <div className="text-right">
            <Button
              className="mr-4 py-2"
              color="secondary"
              variant="outlined"
              onClick={handlePrinting}
            >
              <Icon>print</Icon> Print Statement
            </Button>
          </div>
        </div>
      </div>
      
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
                    {/* <header> */}
                    <div className="px-2 flex justify-between">
                      <div className="flex">
                        <div className="pr-12">
                          <img
                            src={logo}
                            alt="this is car image"
                            style={{ marginLeft: "15px", width: 237 }}
                          />
                        </div>

                        <div className="viewer__order-info px-4 mb-4  flex justify-between"></div>
                      </div>
                      <div className="flex">
                        <div style={{ marginLeft: "50px",marginRight:10 }}>
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
                    {/* </header> */}
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
                            style={{
                              border: "1px solid #ccc",
                              fontFamily: "Calibri",
                              fontSize: 16,
                            }}
                          ></TableCell>
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
                            <h3>Statement of Account</h3>
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
                            {fdate}
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
                            {tdate}
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
                            {current_bal.slice(current_bal.length-1)}
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
                            className="pr-0 capitalize"
                            align="center"
                            style={{
                              border: "1px solid #ccc",
                              wordBreak: "break-word",
                              fontFamily: "Calibri",
                              fontSize: 16,
                            }}
                          >
                          
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
                                width: 110,
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
                                width:50
                              }}
                              align="center"
                            >
                              DOCUMENT #
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
                                width:120
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
                                width: 180,
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
                                width: 180,
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
                                width: 110,
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
                                {parseFloat(opening_balance).toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
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
                                {opening_balance}
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
                                  {moment(item[0].date).format("YYYY-MM-DD")}
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
                                  align="left"
                                  style={{
                                    border: "1px solid #ccc",
                                    wordBreak: "break-word",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
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
                                  {item[0].debit === null ? "" : item[0].debit}
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
                                    : item[0].credit}
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
                                
                                
                                
                               
                              
                             
                              </TableRow>
                            );
                           
                          })}
                          <TableRow
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
                             
                              {currentBalance.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                              })}
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
                            Account No.
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
                            IBAN NO.
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
    </div>
  );
};

export default Customer;
