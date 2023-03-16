import React, { useRef, useEffect, useState, createContext } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Card,
  Icon,
  TableRow,
  Divider,
  Button,
} from "@material-ui/core";
import { Breadcrumb, SimpleCard } from "matx";
import StatementDialog from "../statements/dialogue";
import moment from "moment";
import { salesTax } from "../invoice/InvoiceService";
import { expensePaid, receipts } from "../invoice/InvoiceService";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { ta } from "date-fns/locale";
import Header from "./Header";
import { useReactToPrint } from "react-to-print";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import url from "../invoice/InvoiceService";
import profitLossShare from "./profitLossShare";
import { Bankbalance } from "./globaldata";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  "@global": {
    "@media print": {
      "body, html": {
        visibility: "hidden",
        size: "auto",

        content: "none !important",
        "-webkit-print-color-adjust": "exact !important",
        marginTop: "10px",
        counterIncrement: "page",
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
        // 'counter-increment': page,
        // eslint-disable-next-line no-undef

        // content: counter(pageBreakAfter),
      },

      "#table": {
        // display: "-webkit-box",

        // display: "right",
        // width: "650px",
        marginLeft: "2px",
        // position: "absolute",

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
}));
const subscribarList = [
  {
    DESCRIPTION: "Loans To Employee",
    ACCOUNT: "9019800",
    NETDEBIT: "47,229.00",
    NETCREDIT: "0.00",
  },
  {
    DESCRIPTION: "Loans To Employee",
    ACCOUNT: "9019800",
    NETDEBIT: "47,229.00",
    NETCREDIT: "0.00",
  },
  {
    DESCRIPTION: "Loans To Employee",
    ACCOUNT: "9019800",
    NETDEBIT: "47,229.00",
    NETCREDIT: "0.00",
  },
  {
    DESCRIPTION: "Loans To Employee",
    ACCOUNT: "9019800",
    NETDEBIT: "47,229.00",
    NETCREDIT: "0.00",
  },
  {
    DESCRIPTION: "Loans To Employee",
    ACCOUNT: "9019800",
    NETDEBIT: "47,229.00",
    NETCREDIT: "0.00",
  },
  {
    DESCRIPTION: "Loans To Employee",
    ACCOUNT: "9019800",
    NETDEBIT: "47,229.00",
    NETCREDIT: "0.00",
  },
];

const RE = [
  {
    DESC: "Profit from Jan 01,2021 to Oct 27,2021",
    AMM: "-136,874.24",
  },
];

const Banks = [
  {
    DESC: "BANQUE SAUDI FRANSI- 9019026",
    AMM: "15,625.03",
  },
  {
    DESC: "BANK AL RAJHI -9019027",
    AMM: "3,071.27",
  },
];

const Cashes = [
  {
    DESC: "Cash Account - 9019100",
    AMM: "13,279.33",
  },
];

// const CA = [
//   {
//     DESC: "Loans TO Employees - 9013800",
//     AMM: "47,229.00",
//   },
//   {
//     DESC: "Accounts Receivable (IP2) - 9015000",
//     AMM: "882,534.19",
//   },
//   {
//     DESC: "Input VAT - 9016100",
//     AMM: "125,803.13",
//   },
// ];

const BalanceSheet = ({ refval }) => {
  const componentRef = useRef();
  const classes = useStyles();
  const [Advance, setAdvance] = useState(1000);
  const [AccountPayable, setAccountPayable] = useState(0.0);
  const [output_vat, setoutput_vat] = useState(0.0);
  const [input_vat, setinput_vat] = useState(0.0);
  const [taxpaid_vat, settaxpaid_vat] = useState(0.0);
  const [asset, setasset] = useState(0.0);
  const [bank_expense, setbank_expense] = useState(0.0);
  const [cash_expense, setcash_expense] = useState(0.0);
  const [bank_receipt, setbank_receipt] = useState(0.0);
  const [cash_receipt, setcash_receipt] = useState(0.0);
  const [receivable_amount, setreceivable_amount] = useState(0.0);
  const [status, setstatus] = useState("");
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  let sumCredit = 0.0;
  let sumDebit = 0.0;
  let sum = 0.0;
  const [state, setstate] = useState([
    {
      Advance: "",
      AccountPayable: "",
    },
  ]);
  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
  };
  const handleDialogOpen = () => {
    setShouldOpenEditorDialog(true);
  };
  const CA = [
    {
      DESC: "Loans TO Employees - 9013800",
      AMM: "47,229.00",
    },
    {
      DESC: "Accounts Receivable (IP2) - 9015000",
      AMM: state.Advance,
    },
    {
      DESC: "Input VAT - 9016100",
      AMM: "125,803.13",
    },
  ];
  const Cl = [
    {
      DESC: "Acc. Payable Control(IP 1)-8024000",
      AMM: AccountPayable,
    },
    {
      DESC: "Accural Personnel Bonus-8028800",
      AMM: "4000.00",
    },
    {
      DESC: "Accured Salaries - 8029610",
      AMM: "-14,000.00",
    },
    {
      DESC: "Output VAT -9016000",
      AMM: "-157,700.04",
    },
  ];
  const handlePrinting = useReactToPrint({
    content: () => componentRef.current,
    header: () => componentRef.current,
  });
  useEffect(() => {
    let obj;

    // url.get("paidDivision").then(({ data }) => {

    //   const accout_receivable = data?.filter(obj => obj.balance >= 0 && obj.type == "personal").map((item) => {
    //     return item
    //   })
    //   const accout_payable = data?.filter(obj => obj.balance <= 0 && obj.type == "personal").map((item) => {
    //     return item
    //   })
    //   const res = accout_receivable?.reduce(function (acc, obj) { return acc + obj?.balance; }, 0)
    //   setAdvance(res)
    //   setstate({ 'Advance': res });
    //   // setAccountPayable(accout_payable?.reduce(function (acc, obj) { return acc + obj?.balance; }, 0));

    // });
    // url.post(
    //   "all-account-statement")
    //   .then(({ data }) => {
    //     Object.values(data[0].data).map((item, i) => {
    //       if (item[0].debit) {
    //         sumDebit += parseFloat(item[0].debit);
    //       }
    //       if (item[0].credit) {
    //         sumCredit += parseFloat(item[0].credit);
    //       }
    //     })
    //     setreceivable_amount(sumDebit - sumCredit)
    //   })

    // Total sales
    // salesTax().then(({ data }) => {
    //   var res = data.reduce((initial, cal) => initial = initial + parseFloat(cal.vat_in_value), 0)
    //   setoutput_vat(res)

    // })

    // vat from expense
    // url.get('responseData').then(({ data }) => {

    //   var res = data.Expense.filter(obj => obj.account_category_id == 27).reduce((initial, cal) => initial = initial + parseFloat(cal.amount), 0)
    //   setinput_vat(res)
    //   console.log(res)

    //   var res1 = data.Expense.filter(obj => obj?.tax).reduce((initial, cal) => initial = initial + parseFloat(cal.tax), 0)
    //   settaxpaid_vat(res1)

    //   var asset = data.Expense.filter(obj => obj.account_categories[0].parent_id == 48).reduce((initial, cal) => initial = initial + parseFloat(cal.amount), 0)
    //   setasset(asset)
    //   let bank_expense = data.Expense.filter(obj => obj.payment_type == "banktransfer").reduce((initial, cal) => initial = initial + parseFloat(cal.amount), 0)

    //   let cash_expense = data.Expense.filter(obj => obj.payment_type == "cash" && obj.payment_account[0].type == "division").reduce((initial, cal) => initial = initial + parseFloat(cal.amount), 0)
    //   console.log(cash_expense)
    //   setbank_expense(bank_expense)
    //   setcash_expense(cash_expense)
    //   const accout_payable = data.Expense?.filter(obj => obj.is_paid == 0 && obj.status == "verified").reduce((initial, cal) => initial = initial + parseFloat(cal.amount), 0)
    //   setAccountPayable(accout_payable);
    //   console.log(data.Expense)

    //   let bank_receipt = data.Receipt.filter(obj => obj.payment_mode == "banktransfer")
    //   let bank_Expense = data.Expense.filter(obj => obj.payment_type == "banktransfer")

    //   let arrs = data.Advance.filter(item => item.payment_mode == "banktransfer" && (!(item.received_by.type == "division" && item.payment_account.type == "division"))).map((item) => {
    //     if (item.payment_mode == "banktransfer" && item.received_by.type == "division") {
    //       item['credit'] = item.amount
    //       item['debit'] = null

    //     }
    //     if (item.payment_mode == "banktransfer" && item.payment_account.type == "division") {
    //       item['credit'] = null
    //       item['debit'] = item.amount

    //     }
    //     return item
    //   })

    //   setbank_receipt(bank_receipt.reduce((obj, val) => obj + parseFloat(val.credit), 0) + arrs.reduce((obj, val) => obj + parseFloat(val?.credit ? val?.credit : 0), 0))

    //   setbank_expense(bank_Expense.reduce((obj, val) => obj + parseFloat(val.amount), 0) + arrs.reduce((obj, val) => obj + parseFloat(val?.debit ? val?.debit : 0), 0))

    //   let cash_receipt = data?.Advance?.filter(obj => obj?.payment_mode == "cash" && obj.received_by?.type == "division" && (!(obj?.received_by?.type == "division" && obj?.payment_account?.type == "division"))).reduce((initial, cal) => initial = initial + parseFloat(cal?.amount), 0)

    //   setcash_receipt(cash_receipt)

    // })
    url.get("mjrBalanceSheet").then(({ data }) => {
      var res = data.salesTax.reduce(
        (initial, cal) => (initial = initial + parseFloat(cal.vat_in_value)),
        0
      );
      setoutput_vat(res);

      const accout_receivable = data.paidDivision
        ?.filter((obj) => obj.balance >= 0 && obj.type == "personal")
        .map((item) => {
          return item;
        });
      const accout_payables = data.paidDivision
        ?.filter((obj) => obj.balance <= 0 && obj.type == "personal")
        .map((item) => {
          return item;
        });
      const ress = accout_receivable?.reduce(function (acc, obj) {
        return acc + obj?.balance;
      }, 0);
      setAdvance(ress);
      setstate({ Advance: ress });

      var res = data.responseData.Expense.filter(
        (obj) => obj.account_category_id == 27
      ).reduce(
        (initial, cal) => (initial = initial + parseFloat(cal.amount)),
        0
      );
      setinput_vat(res);

      var res1 = data.responseData.Expense.filter((obj) => obj?.tax).reduce(
        (initial, cal) => (initial = initial + parseFloat(cal.tax)),
        0
      );
      settaxpaid_vat(res1);

      var asset = data.responseData.Expense.filter(
        (obj) => obj.account_categories[0].parent_id == 48
      ).reduce(
        (initial, cal) => (initial = initial + parseFloat(cal.amount)),
        0
      );
      setasset(asset);
      let bank_expense = data.responseData.Expense.filter(
        (obj) => obj.payment_type == "banktransfer"
      ).reduce(
        (initial, cal) => (initial = initial + parseFloat(cal.amount)),
        0
      );

      let cash_expense = data.responseData.Expense.filter(
        (obj) =>
          obj.payment_type == "cash" &&
          obj.payment_account[0].type == "division"
      ).reduce(
        (initial, cal) => (initial = initial + parseFloat(cal.amount)),
        0
      );

      setbank_expense(bank_expense);
      setcash_expense(cash_expense);
      const accout_payable = data.responseData.Expense?.filter(
        (obj) => obj.is_paid == 0 && obj.status == "verified"
      ).reduce(
        (initial, cal) => (initial = initial + parseFloat(cal.amount)),
        0
      );
      setAccountPayable(accout_payable);

      let bank_receipt = data.responseData.Receipt.filter(
        (obj) => obj.payment_mode == "banktransfer"
      );
      let bank_Expense = data.responseData.Expense.filter(
        (obj) => obj.payment_type == "banktransfer"
      );

      let arrs = data.responseData.Advance.filter(
        (item) =>
          item.payment_mode == "banktransfer" &&
          !(
            item.received_by.type == "division" &&
            item.payment_account.type == "division"
          )
      ).map((item) => {
        if (
          item.payment_mode == "banktransfer" &&
          item.received_by.type == "division"
        ) {
          item["credit"] = item.amount;
          item["debit"] = null;
        }
        if (
          item.payment_mode == "banktransfer" &&
          item.payment_account.type == "division"
        ) {
          item["credit"] = null;
          item["debit"] = item.amount;
        }
        return item;
      });

      setbank_receipt(
        bank_receipt.reduce((obj, val) => obj + parseFloat(val.credit), 0) +
          arrs.reduce(
            (obj, val) => obj + parseFloat(val?.credit ? val?.credit : 0),
            0
          )
      );

      setbank_expense(
        bank_Expense.reduce((obj, val) => obj + parseFloat(val.amount), 0) +
          arrs.reduce(
            (obj, val) => obj + parseFloat(val?.debit ? val?.debit : 0),
            0
          )
      );

      let cash_receipt = data.responseData?.Advance?.filter(
        (obj) =>
          obj?.payment_mode == "cash" &&
          obj.received_by?.type == "division" &&
          !(
            obj?.received_by?.type == "division" &&
            obj?.payment_account?.type == "division"
          )
      ).reduce(
        (initial, cal) => (initial = initial + parseFloat(cal?.amount)),
        0
      );

      setcash_receipt(cash_receipt);
      var d = new Date();

      var result = data.salesExpenseReport[0].map((item, i) => {
        // console.log(item.category.amount);
        let dateObj = new Date(item?.category?.paid_date);
        let monthyear = dateObj.toLocaleString("en-us", { month: "long" });

        item["AMOUNT"] = item?.category?.amount;
        item["CATEGORY"] = item?.sub_categories;
        item["MONTH"] = monthyear;
        item["SUM"] = sum + parseFloat(item?.category?.amount);

        return item;
      });

      setarrExpense(result);

      var salesResult = data.invoice.map((item, i) => {
        let dateObj = new Date(item.issue_date);
        let monthyear = dateObj.toLocaleString("en-us", { month: "long" });

        item["AMOUNT"] = item.grand_total;
        item["CATEGORY"] = "SALES";
        item["MONTH"] = monthyear;

        return item;
      });
      setsalesExpense(salesResult);
    });
    // filterData();
  }, []);

  const [salesExpense, setsalesExpense] = useState([]);
  const [arrExpense, setarrExpense] = useState([]);
  const filterData = () => {
    var d = new Date();
    // var quarter =  parseInt(d.getMonth() / 3 ) + 1 ;
    // quaterMonths(quarter)

    url.get("salesExpenseReport").then(({ data }) => {
      var result = data[0].map((item, i) => {
        // console.log(item.category.amount);
        let dateObj = new Date(item.category.paid_date);
        let monthyear = dateObj.toLocaleString("en-us", { month: "long" });

        // console.log(monthyear)

        item["AMOUNT"] = item.category.amount;
        item["CATEGORY"] = item.sub_categories;
        item["MONTH"] = monthyear;
        item["SUM"] = sum + parseFloat(item.category.amount);

        return item;
        // if(!r[monthyear]) r[monthyear] = {monthyear, entries: 1}
        // else r[monthyear].entries++;
        // return r;
      });

      setarrExpense(result);
    });

    url.get("invoice").then(({ data }) => {
      var salesResult = data.map((item, i) => {
        let dateObj = new Date(item.issue_date);
        let monthyear = dateObj.toLocaleString("en-us", { month: "long" });

        item["AMOUNT"] = item.grand_total;
        item["CATEGORY"] = "SALES";
        item["MONTH"] = monthyear;

        return item;
        // if(!r[monthyear]) r[monthyear] = {monthyear, entries: 1}
        // else r[monthyear].entries++;
        // return r;
      });
      setsalesExpense(salesResult);
    });
  };
  const caluclateTotalExpense = (arr, c1, c2, c3, c4) => {
    const res = arr
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
  const caluclateTotal = (arr, category) => {
    const res = arr
      .filter((obj) => obj.CATEGORY == category)
      .reduce((a, v) => (a = a + parseFloat(v.AMOUNT)), 0.0);

    return res;
  };
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            // { name: " ", path: "/material" },
            { name: "Balance Sheet" },
          ]}
        />
      </div>
      <div className={clsx("invoice-viewer py-4", classes.invoiceViewer)}>
        <SimpleCard>
          <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
            <div>
              {/* <Link to={"/sales/rfq-form/rfqview"}>
        <IconButton >
          <Icon>arrow_back</Icon>
        </IconButton>
        </Link> */}
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
          <div
            id="print-area"
            ref={componentRef}
            style={{ fontFamily: "Calibri", fontSize: 16 }}
          >
            <table>
              <Header />

              <div>
                <Table style={{ align: "right" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        className="pl-6"
                        colSpan={12}
                        style={{ fontSize: 20, align: "right", marginLeft: 0 }}
                      >
                        <span>BALANCE SHEET</span>
                      </TableCell>
                      <TableCell
                        style={{ fontSize: 20, align: "right" }}
                        className="pl-10"
                        colSpan={3}
                      >
                        <div style={{ fontSize: 20, align: "right" }}>
                          {/* <span >
  BALANCE SHEET
  </span> */}
                        </div>
                        <span>AS OF OCT 27,2021</span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
                {/* <TableHead>
          <TableRow>
            <TableCell className="pl-6" style={{ fontSize: 16 }} colspan={4}>
            Liabilities & Equities
            </TableCell>
            <TableCell className="px-2" style={{ fontSize: 20 }} colspan={4}>
                Assets
            </TableCell>
          </TableRow>
        </TableHead> */}
                <div className="flex justify-around">
                  <div>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          className="pl-6"
                          style={{ fontSize: 20, marginLeft: 200 }}
                          colspan={4}
                        >
                          Liabilities & Equities
                        </TableCell>
                        {/* <TableCell className="px-2" style={{ fontSize: 20 }} colspan={4}>
                Assets
            </TableCell> */}
                      </TableRow>
                    </TableHead>
                    <Table style={{ float: "left" }}>
                      <TableHead>
                        <TableRow className="mx-0">
                          <TableCell className="pl-6" style={{ fontSize: 14 }}>
                            Current Liabilities
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      {/* <TableHead>
          <TableRow>
            <TableCell className="px-0" >Current Liabilities</TableCell>
          </TableRow>
        </TableHead> */}
                      <TableBody>
                        <TableRow>
                          <TableCell
                            className="pl-6"
                            style={{
                              color: "#4791db",
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                            align="left"
                          >
                            <span
                              onClick={() => {
                                setShouldOpenEditorDialog(true);
                                setstate("pay");
                              }}
                            >
                              Acc. Payable Control(IP 1)-8024000
                            </span>
                          </TableCell>
                          <TableCell
                            className="px-4 capitalize"
                            style={{ fontSize: 12 }}
                            align="right"
                          >
                            {AccountPayable.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          {/* <TableCell
                      className="pl-6"
                      style={{ color: "#4791db", fontSize: 12 }}
                      align="left"
                    >
                     Accural Personnel Bonus-8028800
                    </TableCell>
                    <TableCell className="px-4 capitalize" style={{fontSize: 12}} align="right">
                      {Cl.AMM}
                    </TableCell> */}
                        </TableRow>
                        <TableRow>
                          {/* <TableCell
                      className="pl-6"
                      style={{ color: "#4791db", fontSize: 12 }}
                      align="left"
                    >
                      Accured Salaries - 8029610
                    </TableCell>
                    <TableCell className="px-4 capitalize" style={{fontSize: 12}} align="right">
                      {Cl.AMM}
                    </TableCell> */}
                        </TableRow>
                        <TableRow>
                          <TableCell
                            className="pl-6"
                            style={{
                              color: "#4791db",
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                            align="left"
                          >
                            <span
                              onClick={() => {
                                setShouldOpenEditorDialog(true);
                                setstate("vat");
                              }}
                            >
                              Output VAT -9016000
                            </span>
                          </TableCell>
                          <TableCell
                            className="px-4 capitalize"
                            style={{ fontSize: 12 }}
                            align="right"
                          >
                            {isNaN(output_vat - input_vat - taxpaid_vat)
                              ? "0.00"
                              : (
                                  output_vat -
                                  input_vat -
                                  taxpaid_vat
                                ).toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                })}
                          </TableCell>
                        </TableRow>
                      </TableBody>

                      <TableBody>
                        <TableRow>
                          <td className="pt-2 capitalize" align="center"></td>
                          <td className="pt-2 capitalize" align="center"></td>
                        </TableRow>

                        <TableRow>
                          <TableCell
                            className="pl-6"
                            style={{
                              color: "black",
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                            align="left"
                          >
                            Total Current Liabilitiess
                          </TableCell>
                          <TableCell
                            style={{
                              color: "black",
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                            className="px-4 capitalize"
                            align="right"
                          >
                            {isNaN(
                              AccountPayable +
                                (output_vat - input_vat - taxpaid_vat)
                            )
                              ? "0.00"
                              : (
                                  AccountPayable +
                                  (output_vat - input_vat - taxpaid_vat)
                                ).toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                })}
                          </TableCell>
                        </TableRow>
                      </TableBody>

                      <TableHead>
                        <TableRow>
                          <TableCell
                            className="pl-6"
                            style={{ fontSize: 15, fontWeight: 600 }}
                          >
                            <br />
                            EQUITIES
                          </TableCell>
                          {/* <TableCell className="px-0">Action</TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableHead>
                        <TableRow className="mx-0">
                          <TableCell className="pl-6" style={{ fontSize: 14 }}>
                            Retained Earnings
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* {RE.map((RE, index) => ( */}
                        <TableRow>
                          <TableCell
                            className="pl-6 capitalize"
                            style={{
                              color: "#4791db",
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                            align="left"
                          >
                            <span
                              onClick={() => {
                                setShouldOpenEditorDialog(true);
                                setstate("profit");
                              }}
                            >
                              {" "}
                              Profit From Jan 01,2021 To Dec 31,2021
                            </span>
                          </TableCell>
                          <TableCell
                            className="px-4 capitalize"
                            style={{ fontSize: 12 }}
                            align="right"
                          >
                            {isNaN(
                              caluclateTotal(salesExpense, "SALES") -
                                caluclateTotalExpense(
                                  arrExpense,
                                  "Operational Expenses",
                                  "Governmental Expenses",
                                  "Marketing Expenses",
                                  "PURCHASE"
                                )
                            )
                              ? "0.00"
                              : (
                                  caluclateTotal(salesExpense, "SALES") -
                                  caluclateTotalExpense(
                                    arrExpense,
                                    "Operational Expenses",
                                    "Governmental Expenses",
                                    "Marketing Expenses",
                                    "PURCHASE"
                                  )
                                ).toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                })}
                          </TableCell>
                        </TableRow>
                        {/* ))} */}
                      </TableBody>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            className="pl-6"
                            style={{
                              color: "black",
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                            align="left"
                          >
                            Total Retained Earnings
                          </TableCell>
                          <TableCell
                            className="px-4 capitalize"
                            align="right"
                            style={{ fontWeight: 600 }}
                          >
                            {isNaN(
                              caluclateTotal(salesExpense, "SALES") -
                                caluclateTotalExpense(
                                  arrExpense,
                                  "Operational Expenses",
                                  "Governmental Expenses",
                                  "Marketing Expenses",
                                  "PURCHASE"
                                )
                            )
                              ? "0.00"
                              : (
                                  caluclateTotal(salesExpense, "SALES") -
                                  caluclateTotalExpense(
                                    arrExpense,
                                    "Operational Expenses",
                                    "Governmental Expenses",
                                    "Marketing Expenses",
                                    "PURCHASE"
                                  )
                                ).toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                })}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                      <TableBody>
                        <br />
                        <br />
                        <TableRow>
                          {/* <TableCell
                      className="pl-6"
                      style={{ color: "red", fontSize: 12,fontWeight: 600 }}
                      align="left"
                    >
                     Differences of Account
                    </TableCell> */}
                          {/* <TableCell className="px-4 capitalize" align="right" style={{color:"red",fontWeight: 600}}>
                      -250,025.23
                    </TableCell> */}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <Divider
                    style={{ borderLeft: "solid black 1.8px" }}
                    orientation="vertical"
                    flexItem
                  />
                  <div className="py-0 text-center">
                    <Table style={{ float: "right" }}>
                      <TableHead>
                        <TableRow>
                          <TableCell className="px-4" style={{ fontSize: 20 }}>
                            Assets
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableHead>
                        <TableRow>
                          <TableCell className="px-4" style={{ fontSize: 16 }}>
                            Fixed Assets
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* {Banks.map((Banks, index) => ( */}
                        <TableRow>
                          <TableCell
                            className="px-4 capitalize"
                            style={{
                              color: "#4791db",
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                            align="left"
                          >
                            <span
                              onClick={() => {
                                setShouldOpenEditorDialog(true);
                                setstate("assets");
                              }}
                            >
                              {" "}
                              Assets
                            </span>
                          </TableCell>
                          <TableCell
                            style={{ fontSize: 12, paddingRight: 20 }}
                            align="right"
                          >
                            {asset.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </TableCell>
                        </TableRow>
                        {/* ))} */}
                      </TableBody>

                      <TableBody>
                        <TableRow>
                          <td className="pt-2 capitalize" align="center"></td>
                          <td className="pt-2 capitalize" align="center"></td>
                        </TableRow>

                        <TableRow>
                          {/* <TableCell
                    className="px-4 capitalize"
                    style={{ color: "black", fontSize: 12, fontWeight: 600 }}
                    align="left"
                  >
                    Total Banks
                  </TableCell>
                  <TableCell
                    style={{fontSize: 12,fontWeight:600,paddingRight:20}} align="right"
                    
                  >
                   {(bank_receipt-bank_expense).toLocaleString(undefined,{minimumFractionDigits:2})}
                  </TableCell> */}
                        </TableRow>
                      </TableBody>

                      {/* <TableHead>
                <TableRow>
                  <TableCell className="px-4" style={{ fontSize: 16 }}>
                    Cashes
                  </TableCell>
                </TableRow>
              </TableHead> */}
                      <TableBody>
                        {/* {Cashes.map((Cashes, index) => ( */}
                        <TableRow>
                          {/* <TableCell
                      className="px-4 capitalize"
                      style={{ color: "#4791db", fontSize: 12 }}
                      align="left"
                    >
                      Cashes
                    </TableCell>
                    <TableCell style={{fontSize: 12,paddingRight:20}} align="right">
                      {(cash_receipt-cash_expense).toLocaleString(undefined,{minimumFractionDigits:2})}
                    </TableCell> */}
                        </TableRow>
                        {/* ))} */}
                      </TableBody>

                      <TableBody>
                        <TableRow>
                          <td className="pt-2 capitalize" align="center"></td>
                          <td className="pt-2 capitalize" align="center"></td>
                        </TableRow>

                        <TableRow>
                          <TableCell
                            className="px-4 capitalize"
                            style={{
                              color: "black",
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                            align="left"
                          >
                            Total Fixed Assets
                          </TableCell>
                          <TableCell
                            style={{
                              color: "black",
                              fontSize: 12,
                              fontWeight: 600,
                              paddingRight: 20,
                            }}
                            align="right"
                          >
                            {asset.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                      <br />
                      <TableHead>
                        <TableRow>
                          <TableCell className="px-4" style={{ fontSize: 16 }}>
                            Current Assets
                          </TableCell>
                          {/* <TableCell className="px-0">Action</TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* {CA.map((CA, index) => ( */}
                        <TableRow>
                          {/* <TableCell
                      className="px-4 capitalize"
                      style={{ color: "#4791db",fontSize: 12 }}
                      align="left"
                    >
                      Assets
                    </TableCell>
                    <TableCell style={{fontSize: 12,paddingRight:20}} align="right">
                      {asset.toLocaleString(undefined,{
                        minimumFractionDigits:2
                      })}
                    </TableCell> */}
                        </TableRow>
                        <TableRow>
                          <TableCell
                            className="px-4 capitalize"
                            style={{
                              color: "#4791db",
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                            align="left"
                          >
                            {/* Accounts Receivable (IP2) - 9015000 */}
                            <span
                              onClick={() => {
                                setShouldOpenEditorDialog(true);
                                setstate("advance");
                              }}
                            >
                              {" "}
                              Advance
                            </span>
                          </TableCell>
                          <TableCell
                            style={{ fontSize: 12, paddingRight: 20 }}
                            align="right"
                          >
                            {Advance.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            className="px-4 capitalize"
                            style={{
                              color: "#4791db",
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                            align="left"
                          >
                            {/* Accounts Receivable (IP2) - 9015000 */}
                            <span
                              onClick={() => {
                                setShouldOpenEditorDialog(true);
                                setstate("bank");
                              }}
                            >
                              {" "}
                              Bank
                            </span>
                          </TableCell>
                          <TableCell
                            style={{ fontSize: 12, paddingRight: 20 }}
                            align="right"
                          >
                            {(bank_receipt - bank_expense).toLocaleString(
                              undefined,
                              { minimumFractionDigits: 2 }
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            className="px-4 capitalize"
                            style={{
                              color: "#4791db",
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                            align="left"
                          >
                            {/* Accounts Receivable (IP2) - 9015000 */}
                            <span
                              onClick={() => {
                                setShouldOpenEditorDialog(true);
                                setstate("cash");
                              }}
                            >
                              Cash
                            </span>
                          </TableCell>
                          <TableCell
                            style={{ fontSize: 12, paddingRight: 20 }}
                            align="right"
                          >
                            {(cash_receipt - cash_expense).toLocaleString(
                              undefined,
                              { minimumFractionDigits: 2 }
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            className="px-4 capitalize"
                            style={{
                              color: "#4791db",
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                            align="left"
                          >
                            {/* Accounts Receivable (IP2) - 9015000 */}
                            <span
                              onClick={() => {
                                setShouldOpenEditorDialog(true);
                                setstate("receivable");
                              }}
                            >
                              Receivable
                            </span>
                          </TableCell>
                          <TableCell
                            style={{ fontSize: 12, paddingRight: 20 }}
                            align="right"
                          >
                            {receivable_amount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          {/* <TableCell
                      className="px-4 capitalize"
                      style={{ color: "#4791db",fontSize: 12 }}
                      align="left"
                    >
                     Input VAT - 9016100
                    </TableCell>
                    <TableCell style={{fontSize: 12,paddingRight:20}} align="right">
                      {input_vat.toLocaleString(undefined,{
                        minimumFractionDigits:2
                      })}
                    </TableCell> */}
                        </TableRow>
                        {/* ))} */}
                      </TableBody>

                      <TableBody>
                        <TableRow>
                          <TableCell
                            className="px-4 capitalize"
                            style={{
                              color: "black",
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                            align="left"
                          >
                            Total Current Assets
                          </TableCell>
                          <TableCell
                            style={{
                              color: "black",
                              fontSize: 12,
                              fontWeight: 600,
                              paddingRight: 20,
                            }}
                            align="right"
                          >
                            {(
                              receivable_amount +
                              Advance +
                              (bank_receipt - bank_expense) +
                              (cash_receipt - cash_expense)
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ fontSize: 14, fontWeight: 600 }}
                        className="pl-6"
                        colspan={2}
                      >
                        Total Liabilies & Equities
                      </TableCell>
                      <TableCell
                        className="pr-3"
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          float: "right",
                        }}
                      >
                        {isNaN(
                          AccountPayable +
                            (output_vat - input_vat - taxpaid_vat) +
                            (caluclateTotal(salesExpense, "SALES") -
                              caluclateTotalExpense(
                                arrExpense,
                                "Operational Expenses",
                                "Governmental Expenses",
                                "Marketing Expenses",
                                "PURCHASE"
                              ))
                        )
                          ? "0.00"
                          : (
                              AccountPayable +
                              (output_vat - input_vat - taxpaid_vat) +
                              (caluclateTotal(salesExpense, "SALES") -
                                caluclateTotalExpense(
                                  arrExpense,
                                  "Operational Expenses",
                                  "Governmental Expenses",
                                  "Marketing Expenses",
                                  "PURCHASE"
                                ))
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                      </TableCell>
                      <TableCell
                        className="pl-3"
                        style={{ fontSize: 14, fontWeight: 600 }}
                        colspan={2}
                      >
                        Total Assets
                      </TableCell>
                      <TableCell
                        className="pl-50"
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          paddingRight: 20,
                        }}
                        align="right"
                      >
                        {(
                          receivable_amount +
                          Advance +
                          (bank_receipt - bank_expense) +
                          (cash_receipt - cash_expense) +
                          asset
                        ).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </div>

              <tfoot>
                <div class="empty-footer"></div>
              </tfoot>
            </table>

            <div class="footer">
              <Footer />
            </div>
          </div>
        </SimpleCard>
      </div>
      {shouldOpenEditorDialog && (
        <StatementDialog
          handleClose={handleDialogClose}
          open={shouldOpenEditorDialog}
          value={state}
        />
      )}
    </div>
  );
};

export default BalanceSheet;
