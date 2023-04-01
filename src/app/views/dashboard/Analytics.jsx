import React, { Fragment, useState, useEffect } from "react";
import { Grid, Card, Icon, TableCell, MenuItem } from "@material-ui/core";
// import DoughnutChart from "../charts/echarts/Doughnut";
import ModifiedAreaChart from "./shared/ModifiedAreaChart";
import StatCards from "./shared/StatCards";
import "./s.css";
// import TopSellingTable from "./shared/TopSellingTable";
// import RowCards from "./shared/RowCards";
// import StatCards2 from "./shared/StatCards2";
// import UpgradeCard from "./shared/UpgradeCard";
// import Campaigns from "./shared/Campaigns";

import { BarChart, Bar, XAxis, YAxis, Tooltip ,Legend} from "recharts";
import { RechartCreator } from "matx";
import { useTheme } from "@material-ui/styles";
import url, { getpaidDivision } from "../invoice/InvoiceService";
import MUIDataTable from "mui-datatables";
import DueInvoice from "./DueInvoice";
import AccountStatement from "./AccountStatement";
import ExpenseCategory from "./expenseCategory";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
// import { TreeItem } from "@material-ui/lab";
// import { TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  
  loading: {
    position: "fixed",
    left: 240,
    right: 0,
    top: "calc(30% - 40px)",
    margin: "auto",
    height: "40px",
    width: "40px",
    "& img": {
      position: "absolute",
      height: "25px",
      width: "auto",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: "auto"
    }
  }
}));
let months = [
  {
    name: "Jan",
    count: 0,
  },
  {
    name: "Feb",
    count: 0,
  },
  {
    name: "Mar",
    count: 0,
  },
  {
    name: "Apr",
    count: 0,
  },
  {
    name: "May",
    count: 0,
  },
  {
    name: "Jun",
    count: 0,
  },
  {
    name: "Jul",
    count: 0,
  },
  {
    name: "Aug",
    count: 0,
  },
  {
    name: "Sep",
    count: 0,
  },
  {
    name: "Oct",
    count: 0,
  },
  {
    name: "Nov",
    count: 0,
  },
  {
    name: "Dec",
    count: 0,
  },
];
let monthse = [
  {
    name: "Jan",
    count: 0,
  },
  {
    name: "Feb",
    count: 0,
  },
  {
    name: "Mar",
    count: 0,
  },
  {
    name: "Apr",
    count: 0,
  },
  {
    name: "May",
    count: 0,
  },
  {
    name: "Jun",
    count: 0,
  },
  {
    name: "Jul",
    count: 0,
  },
  {
    name: "Aug",
    count: 0,
  },
  {
    name: "Sep",
    count: 0,
  },
  {
    name: "Oct",
    count: 0,
  },
  {
    name: "Nov",
    count: 0,
  },
  {
    name: "Dec",
    count: 0,
  },
];
const receipt_months = [
  {
    name: "Jan",
    count: 0,
  },
  {
    name: "Feb",
    count: 0,
  },
  {
    name: "Mar",
    count: 0,
  },
  {
    name: "Apr",
    count: 0,
  },
  {
    name: "May",
    count: 0,
  },
  {
    name: "Jun",
    count: 0,
  },
  {
    name: "Jul",
    count: 0,
  },
  {
    name: "Aug",
    count: 0,
  },
  {
    name: "Sep",
    count: 0,
  },
  {
    name: "Oct",
    count: 0,
  },
  {
    name: "Nov",
    count: 0,
  },
  {
    name: "Dec",
    count: 0,
  },
];

const Analytics = () => {
  const [invoiceData, setinvoiceData] = useState([]);
  const [maxVal, setmaxVal] = useState("");
  const [date, setdate] = useState(moment(new Date()).format("YYYY"));
  const [eDate, setExtraDate] = useState("");
  const [responseData, setresponseData] = useState([]);
  const [receiptData, setreceiptData] = useState([]);
  const [dataReceipt, setdataReceipt] = useState([]);
  const [expeseData, setExpenseData] = useState([]);
  const [dataExpense, setdataExpense] = useState([]);
  const [stackData, setStackData] = useState([]);
  const [monthss, setmonthss] = useState(months);
  const [load, setLoad] = useState(true);
  const classes = useStyles();
  const { d } = useParams();
  // var obj;
  // var parentData;
  const styles = (theme) => ({
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "yellow !important",
    },
  });

  useEffect(() => {
    url.get("dashboard").then(({ data }) => {
      console.log("heyyy")
  
      receiptFun(data?.receipt, date);
      // receiptFun1(data?.receipt, date)
      expenseFun(data?.expense, date);
      invoiceFun(
        data?.invoice?.filter((obj) => obj.approve == "1"),
        date,
        months
      );
      // invoiceFun1(data?.invoice?.filter((obj)=>obj.approve == '1'),date,months);
      setreceiptData(data?.receipt);
      setExpenseData(data?.expense);
      setresponseData(data?.invoice?.filter((obj) => obj.approve == "1"));
      setLoad(false);
    });
    // return localStorage.getItem('division')
  }, [localStorage.getItem("division")]);

  /*Function to calculate the monthly wise receipt amount */
  async function receiptFun(data, date) {
    months = monthse;
    setmonthss(monthse);

    let monthsq = [
      {
        name: "Jan",
        count: 0,
      },
      {
        name: "Feb",
        count: 0,
      },
      {
        name: "Mar",
        count: 0,
      },
      {
        name: "Apr",
        count: 0,
      },
      {
        name: "May",
        count: 0,
      },
      {
        name: "Jun",
        count: 0,
      },
      {
        name: "Jul",
        count: 0,
      },
      {
        name: "Aug",
        count: 0,
      },
      {
        name: "Sep",
        count: 0,
      },
      {
        name: "Oct",
        count: 0,
      },
      {
        name: "Nov",
        count: 0,
      },
      {
        name: "Dec",
        count: 0,
      },
    ];
    var receipt = await data.filter(
      (obj) => obj.division_id == localStorage.getItem("division")
    ); //division wise filter the array object

    /*filter the array object by issue date and map the credit amount ,month*/
    var receiptResult = receipt
      .filter(
        (obj) =>
          moment(obj.paid_date).format("YYYY") == moment(date).format("YYYY")
      )
      .map((item, i) => {
        item["debit"] = receipt
          .filter(
            (x) =>
              moment(x.paid_date).format("MM YYY") ==
              moment(item.paid_date).format("MM YYY")
          )
          .reduce((result, item) => result + item.credit, 0);
        item["count"] = receipt
          .filter(
            (x) =>
              moment(x.paid_date).format("MM YYY") ==
              moment(item.paid_date).format("MM YYY")
          )
          .reduce((result, item) => result + parseFloat(item.credit), 0);
        item["month"] = moment(item.paid_date).format("MMM");
        return item;
      });

    /*filter the array based on voucher number */
    var receiptArr = receiptResult.filter(
      (ele, ind) =>
        ind ===
        receiptResult.findIndex((elem) => elem.voucher_no === ele.voucher_no)
    );
    const receipt_months = [
      {
        name: "Jan",
        count: 0,
      },
      {
        name: "Feb",
        count: 0,
      },
      {
        name: "Mar",
        count: 0,
      },
      {
        name: "Apr",
        count: 0,
      },
      {
        name: "May",
        count: 0,
      },
      {
        name: "Jun",
        count: 0,
      },
      {
        name: "Jul",
        count: 0,
      },
      {
        name: "Aug",
        count: 0,
      },
      {
        name: "Sep",
        count: 0,
      },
      {
        name: "Oct",
        count: 0,
      },
      {
        name: "Nov",
        count: 0,
      },
      {
        name: "Dec",
        count: 0,
      },
    ];

    /*monthly wise assign the mount */
    var receiptfinalResult = receipt_months.filter(function (o1) {
      return receiptArr.map(function (o2) {
        if (o1.name == o2.month) {
          o1["count"] = o2.count;
        }
      });
    });
    /*retrive only the count from the receiptFinalResult */
    var receiptfinalArray = receiptfinalResult.map(function (obj) {
      return obj?.count;
    });
    /*If data exists update the array value */
    if (receiptResult.length) {
      receiptfinalArray = receiptfinalArray.map((item) => {
        return parseFloat(item).toFixed(2);
      });
      setdataReceipt(receiptfinalArray);
      // setmaxVal(Math.max(...receiptfinalArray));
    } else {
      /*else data not exists update the array value to 0 */

      setdataReceipt(["0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00"]);
    }
    setmonthss(monthse);
  }
  async function receiptFun1(data, date) {
    months = monthse;
    setmonthss(monthse);

    let monthsq = [
      {
        name: "Jan",
        count: 0,
      },
      {
        name: "Feb",
        count: 0,
      },
      {
        name: "Mar",
        count: 0,
      },
      {
        name: "Apr",
        count: 0,
      },
      {
        name: "May",
        count: 0,
      },
      {
        name: "Jun",
        count: 0,
      },
      {
        name: "Jul",
        count: 0,
      },
      {
        name: "Aug",
        count: 0,
      },
      {
        name: "Sep",
        count: 0,
      },
      {
        name: "Oct",
        count: 0,
      },
      {
        name: "Nov",
        count: 0,
      },
      {
        name: "Dec",
        count: 0,
      },
    ];
    var receipt = await data.filter(
      (obj) => obj.division_id == localStorage.getItem("division")
    ); //division wise filter the array object

    /*filter the array object by issue date and map the credit amount ,month*/
    var receiptResult = receipt
      .filter(
        (obj) =>
          moment(obj.paid_date).format("MMM YYYY") ==
          moment(date).format("MMM YYYY")
      )
      .map((item, i) => {
        item["debit"] = receipt
          .filter(
            (x) =>
              moment(x.paid_date).format("MM YYY") ==
              moment(item.paid_date).format("MM YYY")
          )
          .reduce((result, item) => result + item.credit, 0);
        item["count"] = receipt
          .filter(
            (x) =>
              moment(x.paid_date).format("MM YYY") ==
              moment(item.paid_date).format("MM YYY")
          )
          .reduce((result, item) => result + parseFloat(item.credit), 0);
        item["month"] = moment(item.paid_date).format("MMM");
        return item;
      });

    /*filter the array based on voucher number */
    var receiptArr = receiptResult.filter(
      (ele, ind) =>
        ind ===
        receiptResult.findIndex((elem) => elem.voucher_no === ele.voucher_no)
    );
    const receipt_months = [
      {
        name: "Jan",
        count: 0,
      },
      {
        name: "Feb",
        count: 0,
      },
      {
        name: "Mar",
        count: 0,
      },
      {
        name: "Apr",
        count: 0,
      },
      {
        name: "May",
        count: 0,
      },
      {
        name: "Jun",
        count: 0,
      },
      {
        name: "Jul",
        count: 0,
      },
      {
        name: "Aug",
        count: 0,
      },
      {
        name: "Sep",
        count: 0,
      },
      {
        name: "Oct",
        count: 0,
      },
      {
        name: "Nov",
        count: 0,
      },
      {
        name: "Dec",
        count: 0,
      },
    ];

    /*monthly wise assign the mount */
    var receiptfinalResult = receipt_months.filter(function (o1) {
      return receiptArr.map(function (o2) {
        if (o1.name == o2.month) {
          o1["count"] = o2.count;
        }
      });
    });
    /*retrive only the count from the receiptFinalResult */
    var receiptfinalArray = receiptfinalResult.map(function (obj) {
      return obj?.count;
    });
    /*If data exists update the array value */
    if (receiptResult.length) {
      receiptfinalArray = receiptfinalArray.map((item) => {
        return parseFloat(item).toFixed(2);
      });
      setdataReceipt(receiptfinalArray);
      // setmaxVal(Math.max(...receiptfinalArray));
    } else {
      /*else data not exists update the array value to 0 */

      setdataReceipt(["0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00"]);
    }
    setmonthss(monthse);
  }
  async function expenseFun(data, date) {
    months = monthse;
    setmonthss(monthse);

    let monthsq = [
      {
        name: "Jan",
        count: 0,
      },
      {
        name: "Feb",
        count: 0,
      },
      {
        name: "Mar",
        count: 0,
      },
      {
        name: "Apr",
        count: 0,
      },
      {
        name: "May",
        count: 0,
      },
      {
        name: "Jun",
        count: 0,
      },
      {
        name: "Jul",
        count: 0,
      },
      {
        name: "Aug",
        count: 0,
      },
      {
        name: "Sep",
        count: 0,
      },
      {
        name: "Oct",
        count: 0,
      },
      {
        name: "Nov",
        count: 0,
      },
      {
        name: "Dec",
        count: 0,
      },
    ];
    var receipt = await data.filter(
      (obj) => obj.div_id == localStorage.getItem("division")
    ); //division wise filter the array object

    /*filter the array object by issue date and map the credit amount ,month*/
    var receiptResult = receipt
      .filter(
        (obj) =>
          moment(obj.paid_date).format("YYYY") == moment(date).format("YYYY")
      )
      .map((item, i) => {
        item["debit"] = receipt
          .filter(
            (x) =>
              moment(x.paid_date).format("MM YYY") ==
              moment(item.paid_date).format("MM YYY")
          )
          .reduce((result, item) => result + item.amount, 0);
        item["count"] = receipt
          .filter(
            (x) =>
              moment(x.paid_date).format("MM YYY") ==
              moment(item.paid_date).format("MM YYY")
          )
          .reduce((result, item) => result + parseFloat(item.amount), 0);
        item["month"] = moment(item.paid_date).format("MMM");
        return item;
      });

    /*filter the array based on voucher number */
    var receiptArr = receiptResult.filter(
      (ele, ind) =>
        ind ===
        receiptResult.findIndex((elem) => elem.voucher_no === ele.voucher_no)
    );
    const receipt_months = [
      {
        name: "Jan",
        count: 0,
      },
      {
        name: "Feb",
        count: 0,
      },
      {
        name: "Mar",
        count: 0,
      },
      {
        name: "Apr",
        count: 0,
      },
      {
        name: "May",
        count: 0,
      },
      {
        name: "Jun",
        count: 0,
      },
      {
        name: "Jul",
        count: 0,
      },
      {
        name: "Aug",
        count: 0,
      },
      {
        name: "Sep",
        count: 0,
      },
      {
        name: "Oct",
        count: 0,
      },
      {
        name: "Nov",
        count: 0,
      },
      {
        name: "Dec",
        count: 0,
      },
    ];

    /*monthly wise assign the mount */
    var receiptfinalResult = receipt_months.filter(function (o1) {
      return receiptArr.map(function (o2) {
        if (o1.name == o2.month) {
          o1["count"] = o2.count;
        }
      });
    });
    /*retrive only the count from the receiptFinalResult */
    var receiptfinalArray = receiptfinalResult.map(function (obj) {
      return obj?.count ? obj?.count : 0;
    });

    // console.log(receiptfinalArray)
    /*If data exists update the array value */
    if (receiptResult.length) {
      receiptfinalArray = receiptfinalArray.map((item) => {
        return parseFloat(item).toFixed(2);
      });
      // console.log("yyy",receiptfinalArray)
      setdataExpense(receiptfinalArray);
      // setmaxVal(Math.max(...receiptfinalArray));
    } else {
      /*else data not exists update the array value to 0 */
      // console.log("elses")
      setdataExpense(["0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00"]);
    }
    setmonthss(monthse);
  }
  async function expenseFun1(data, date) {
    months = monthse;
    setmonthss(monthse);

    let monthsq = [
      {
        name: "Jan",
        count: 0,
      },
      {
        name: "Feb",
        count: 0,
      },
      {
        name: "Mar",
        count: 0,
      },
      {
        name: "Apr",
        count: 0,
      },
      {
        name: "May",
        count: 0,
      },
      {
        name: "Jun",
        count: 0,
      },
      {
        name: "Jul",
        count: 0,
      },
      {
        name: "Aug",
        count: 0,
      },
      {
        name: "Sep",
        count: 0,
      },
      {
        name: "Oct",
        count: 0,
      },
      {
        name: "Nov",
        count: 0,
      },
      {
        name: "Dec",
        count: 0,
      },
    ];
    var receipt = await data.filter(
      (obj) => obj.div_id == localStorage.getItem("division")
    ); //division wise filter the array object

    /*filter the array object by issue date and map the credit amount ,month*/
    var receiptResult = receipt
      .filter(
        (obj) =>
          moment(obj.paid_date).format("MMM YYYY") ==
          moment(date).format("MMM YYYY")
      )
      .map((item, i) => {
        item["debit"] = receipt
          .filter(
            (x) =>
              moment(x.paid_date).format("MM YYY") ==
              moment(item.paid_date).format("MM YYY")
          )
          .reduce((result, item) => result + item.amount, 0);
        item["count"] = receipt
          .filter(
            (x) =>
              moment(x.paid_date).format("MM YYY") ==
              moment(item.paid_date).format("MM YYY")
          )
          .reduce((result, item) => result + parseFloat(item.amount), 0);
        item["month"] = moment(item.paid_date).format("MMM");
        return item;
      });

    /*filter the array based on voucher number */
    var receiptArr = receiptResult.filter(
      (ele, ind) =>
        ind ===
        receiptResult.findIndex((elem) => elem.voucher_no === ele.voucher_no)
    );
    const receipt_months = [
      {
        name: "Jan",
        count: 0,
      },
      {
        name: "Feb",
        count: 0,
      },
      {
        name: "Mar",
        count: 0,
      },
      {
        name: "Apr",
        count: 0,
      },
      {
        name: "May",
        count: 0,
      },
      {
        name: "Jun",
        count: 0,
      },
      {
        name: "Jul",
        count: 0,
      },
      {
        name: "Aug",
        count: 0,
      },
      {
        name: "Sep",
        count: 0,
      },
      {
        name: "Oct",
        count: 0,
      },
      {
        name: "Nov",
        count: 0,
      },
      {
        name: "Dec",
        count: 0,
      },
    ];

    /*monthly wise assign the mount */
    var receiptfinalResult = receipt_months.filter(function (o1) {
      return receiptArr.map(function (o2) {
        if (o1.name == o2.month) {
          o1["count"] = o2.count;
        }
      });
    });
    /*retrive only the count from the receiptFinalResult */
    var receiptfinalArray = receiptfinalResult.map(function (obj) {
      return obj?.count;
    });

    // console.log(receiptfinalArray)
    /*If data exists update the array value */
    if (receiptResult.length) {
      receiptfinalArray = receiptfinalArray.map((item) => {
        return parseFloat(item).toFixed(2);
      });
      setdataExpense(receiptfinalArray);
      // setmaxVal(Math.max(...receiptfinalArray));
    } else {
      /*else data not exists update the array value to 0 */

      setdataExpense([0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00]);
    }
    setmonthss(monthse);
  }
  /*Function to calculate the monthly wise Invoice amount */
  async function invoiceFun(data, i, m) {
    months = monthse;

    setmonthss(months);
    let monthsq = [
      {
        name: "Jan",
        count: 0,
      },
      {
        name: "Feb",
        count: 0,
      },
      {
        name: "Mar",
        count: 0,
      },
      {
        name: "Apr",
        count: 0,
      },
      {
        name: "May",
        count: 0,
      },
      {
        name: "Jun",
        count: 0,
      },
      {
        name: "Jul",
        count: 0,
      },
      {
        name: "Aug",
        count: 0,
      },
      {
        name: "Sep",
        count: 0,
      },
      {
        name: "Oct",
        count: 0,
      },
      {
        name: "Nov",
        count: 0,
      },
      {
        name: "Dec",
        count: 0,
      },
    ];

    var dataList = data?.filter(
      (obj) => obj.div_id == localStorage.getItem("division")
    ); //division wise filter the array object

    var result = dataList
      .filter(
        (obj) =>
          moment(obj.issue_date).format("YYYY") == moment(i).format("YYYY")
      ) //filter the array object year wise map the data filter the month and year wise and creat the new array element debit,count,month
      .map((item, i) => {
        item["debit"] = dataList
          .filter(
            (x) =>
              moment(x.issue_date).format("MM YYY") ==
              moment(item.issue_date).format("MM YYY")
          )
          .reduce((result, item) => result + item.grand_total, 0);
        item["count"] = dataList
          .filter(
            (x) =>
              moment(x.issue_date).format("MM YYY") ==
              moment(item.issue_date).format("MM YYY")
          )
          .reduce((result, item) => result + parseFloat(item.grand_total), 0);
        item["month"] = moment(item.issue_date).format("MMM");
        return item;
      });

    /*filter the array based on the invoice number */
    var Due = result.filter(
      (ele, ind) =>
        ind === result.findIndex((elem) => elem.invoice_no === ele.invoice_no)
    );

    // console.log(Due)

    /*return the month if the there is a sales in the month List */

    var finalResult = monthsq.filter((el) => {
      return Due.map((element) => {
        if (el.name == element.month) {
          return (el["count"] = element.count);
        }
      });
    });

    // const finalResult = await Due.filter(function (o1) {
    //    return months.find(function (o2) {
    //     console.log(o2.month)
    //     if (o1.name == o2.month) {
    //        return o1["count"] = o2.count;

    //     }

    //   });
    // });

    var finalArray = finalResult.map(function (obj) {
      return obj?.count ? obj?.count : 0;
    });

    if (result.length) {
      finalArray = finalArray.map((item) => {
        // console.log("1",parseFloat(item).toFixed(2))
        // console.log("2",parseFloat(item).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
        // return parseFloat(item).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return parseFloat(item).toFixed(2);
      });
     
      // const finalArrayC =  finalArray.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    
    //  console.log(finalArray);

      setinvoiceData(finalArray);
      setmaxVal(Math.max(...finalArray));
    } else {
      setinvoiceData(["0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00"]);
    }
    setmonthss(monthse);
  }
  async function invoiceFun1(data, i, m) {
    months = monthse;

    setmonthss(months);
    let monthsq = [
      {
        name: "Jan",
        count: 0,
      },
      {
        name: "Feb",
        count: 0,
      },
      {
        name: "Mar",
        count: 0,
      },
      {
        name: "Apr",
        count: 0,
      },
      {
        name: "May",
        count: 0,
      },
      {
        name: "Jun",
        count: 0,
      },
      {
        name: "Jul",
        count: 0,
      },
      {
        name: "Aug",
        count: 0,
      },
      {
        name: "Sep",
        count: 0,
      },
      {
        name: "Oct",
        count: 0,
      },
      {
        name: "Nov",
        count: 0,
      },
      {
        name: "Dec",
        count: 0,
      },
    ];

    var dataList = data?.filter(
      (obj) => obj.div_id == localStorage.getItem("division")
    ); //division wise filter the array object

    var result = dataList
      .filter(
        (obj) =>
          moment(obj.issue_date).format("MMM YYYY") ==
          moment(i).format("MMM YYYY")
      ) //filter the array object year wise map the data filter the month and year wise and creat the new array element debit,count,month
      .map((item, i) => {
        item["debit"] = dataList
          .filter(
            (x) =>
              moment(x.issue_date).format("MM YYY") ==
              moment(item.issue_date).format("MM YYY")
          )
          .reduce((result, item) => result + item.grand_total, 0);
        item["count"] = dataList
          .filter(
            (x) =>
              moment(x.issue_date).format("MM YYY") ==
              moment(item.issue_date).format("MM YYY")
          )
          .reduce((result, item) => result + parseFloat(item.grand_total), 0);
        item["month"] = moment(item.issue_date).format("MMM");
        return item;
      });

    /*filter the array based on the invoice number */
    var Due = result.filter(
      (ele, ind) =>
        ind === result.findIndex((elem) => elem.invoice_no === ele.invoice_no)
    );

    // console.log(Due)

    /*return the month if the there is a sales in the month List */

    var finalResult = monthsq.filter((el) => {
      return Due.map((element) => {
        if (el.name == element.month) {
          return (el["count"] = element.count);
        }
      });
    });

    // const finalResult = await Due.filter(function (o1) {
    //    return months.find(function (o2) {
    //     console.log(o2.month)
    //     if (o1.name == o2.month) {
    //        return o1["count"] = o2.count;

    //     }

    //   });
    // });

    var finalArray = finalResult.map(function (obj) {
      return obj?.count ? obj?.count : 0;
    });

    if (result.length) {
      finalArray = finalArray.map((item) => {
        return parseFloat(item).toFixed(2);
      });
      setinvoiceData(finalArray);
      setmaxVal(Math.max(...finalArray));
    } else {
      setinvoiceData(["0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00"]);
    }
    setmonthss(monthse);
  }
  // const handleChange = (i) => {

  //   url.get("dashboard").then(({ data }) => {
  //     let dataList = data.invoice.filter(
  //       (obj) => obj.div_id == localStorage.getItem("division")
  //     );
  //     const result = responseData
  //       .filter((obj) => moment(obj.issue_date).format("YYYY") == parseInt(i))
  //       .map((item, i) => {
  //         item["debit"] = dataList
  //           .filter(
  //             (x) =>
  //               moment(x.issue_date).format("MM YYY") ==
  //               moment(item.issue_date).format("MM YYY")
  //           )
  //           .reduce((result, item) => result + item.grand_total, 0);
  //         item["count"] = dataList
  //           .filter(
  //             (x) =>
  //               moment(x.issue_date).format("MM YYY") ==
  //               moment(item.issue_date).format("MM YYY")
  //           )
  //           .reduce((result, item) => result + parseFloat(item.grand_total), 0);
  //         item["month"] = moment(item.issue_date).format("MMM");

  //         return item;
  //       });

  //     let Due = result.filter(
  //       (ele, ind) =>
  //         ind === localStorage.getItem("division") ||
  //         ind === result.findIndex((elem) => elem.invoice_no === ele.invoice_no)
  //     );

  //     const finalResult = months.filter(function (o1) {
  //       return Due.map(function (o2) {
  //         if (o1.name == o2.month) {
  //           o1["count"] = o2.count;
  //         } else {
  //           o1["count"] = 0;
  //         }
  //       });
  //     });

  //     var finalArray = finalResult.map(function (obj) {
  //       return obj.count;
  //     });

  //     setmaxVal(Math.max(...finalArray));
  //     if (result.length) {
  //       setinvoiceData(finalArray);

  //     } else {

  //       setinvoiceData([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  //     }
  //   });
  // };


//   function currencyFormat(num) {
//     return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
//  }
//  console.log(currencyFormat(2665));
  const data = [
    {
      name: "January",
      INVOICE: invoiceData[0],
      RECEIPT: dataReceipt[0],
      EXPENSE: dataExpense[0],
      maxVal:maxVal,
    },
    {
      name: "February",
      INVOICE: invoiceData[1],
      RECEIPT: dataReceipt[1],
      EXPENSE: dataExpense[1],
      maxVal:maxVal,
    },
    {
      name: "March",
      INVOICE: invoiceData[2],
      RECEIPT: dataReceipt[2],
      EXPENSE: dataExpense[2],
      maxVal:maxVal,
    },
    {
      name: "April",
      INVOICE: invoiceData[3],
      RECEIPT: dataReceipt[3],
      EXPENSE: dataExpense[3],
      maxVal:maxVal,
    },
    {
      name: "May",
      INVOICE: invoiceData[4],
      RECEIPT: dataReceipt[4],
      EXPENSE: dataExpense[4],
      maxVal:maxVal,
    },
    {
      name: "June",
      INVOICE: invoiceData[5],
      RECEIPT: dataReceipt[5],
      EXPENSE: dataExpense[5],
      maxVal:maxVal,
    },
    {
      name: "July",
      INVOICE: invoiceData[6],
      RECEIPT: dataReceipt[6],
      EXPENSE: dataExpense[6],
      maxVal:maxVal,
    },
    {
      name: "August",
      INVOICE: invoiceData[7],
      RECEIPT: dataReceipt[7],
      EXPENSE: dataExpense[7],
      maxVal:maxVal,
    },
    {
      name: "September",
      INVOICE: invoiceData[8],
      RECEIPT: dataReceipt[8],
      EXPENSE: dataExpense[8],
      maxVal:maxVal,
    },
    {
      name: "October",
      INVOICE: invoiceData[9],
      RECEIPT: dataReceipt[9],
      EXPENSE: dataExpense[9],
      maxVal:maxVal,
    },
    {
      name: "November",
      INVOICE: invoiceData[10],
      RECEIPT: dataReceipt[10],
      EXPENSE: dataExpense[10],
      maxVal:maxVal,
    },
    {
      name: "December",
      INVOICE: invoiceData[11],
      RECEIPT: dataReceipt[11],
      EXPENSE: dataExpense[11],
      maxVal:maxVal,
    }
  ];
  const style = {
    color:"white"

  };

  return (
    <Fragment>
   
      {/* <div className="pb-24 pt-7 px-8 bg-primary pl-12">
      

        <div className="card-title capitalize text-white mb-4 text-white-secondary justify-between">
        
          <div className="changeDateColor">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className="m-2"
                // margin="none"
                label=""
                format="MMM yyyy"
                // inputVariant="outlined"
                type="text"
                size="small"
                selected={date}
                value={date}
                style={{ float: "right", width: 140 }}
                views={["month", "year"]}
                onChange={(date) => {
                  setdate(moment(date).format("MMM YYYY"));
                  setExtraDate(moment(date).format("MMM YYYY"));
                  invoiceFun1(responseData, date);
                  // handleChange(moment(date).format("YYYY"));
                  receiptFun1(receiptData, date);
                  expenseFun1(expeseData, date);
                  // setdataReceipt([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                  // receiptFun(receiptData,moment(date).format('YYYY'))
                }}
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className="m-2"
                // margin="none"
                label=""
                format="yyyy"
                // inputVariant="outlined"
                type="text"
                size="small"
                selected={date}
                value={date}
                style={{ float: "right", width: 140 }}
                views={["year"]}
                onChange={(date) => {
                  setdate(moment(date).format("YYYY"));
                  invoiceFun(responseData, date);
                  // handleChange(moment(date).format("YYYY"));
                  receiptFun(receiptData, date);
                  expenseFun(expeseData, date);
                  // setdataReceipt([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                  // receiptFun(receiptData,moment(date).format('YYYY'))
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div>SALES AND EXPENCE CHART</div>
        </div>
        <div className="container">
          <ModifiedAreaChart
            height="280px"
            className="pl-12"
            maxVal={maxVal}
            option={{
              legend: {
                itemGap: 20,
                icon: "circle",
                textStyle: {
                  color: "#fff",
                  fontSize: 13,
                  fontFamily: "roboto",
                },
              },
              series: [
                {
                  data: invoiceData,
                  name: "INVOICE",
                  label: "invoice",
                  type: "line",
                  color: "#fff",
                },
                {
                  data: dataReceipt,
                  name: "RECEIPT",
                  label: "receipt",
                  type: "line",
                  color: "#7FFF00",
                },
                {
                  data: dataExpense,
                  name: "EXPENSE",
                  label: "expense",
                  type: "line",
                  color: "#ff0000",
                },
              ],
              // dataset: {

              //   source: [
              //     ["Month", "App", "Lin"],
              //     ["Jan", 2200, 1200, 950, 800],
              //     ["Feb", 800, 500, 1500, 600],
              //     ["Mar", 700, 1350, 800, 700],
              //     ["Apr", 1500, 1250, 950, 900],
              //     ["May", 2450, 450, 950, 500],
              //     ["June", 1700, 1250, 1500, 800],
              //   ],
              // },

              xAxis: {
                data: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
              },
            }}
          />
        </div>

     
      </div> */}
      <div className="pb-24 pt-7 px-8 bg-primary pl-12">
      <div className="card-title capitalize text-black mb-4 text-black-secondary justify-between">
        
        <div className="changeDateColor">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className="m-2"
              // margin="none"
              label=""
              format="MMM yyyy"
              // inputVariant="outlined"
              type="text"
              size="small"
              selected={date}
              value={date}
              style={{ float: "right", width: 140 }}
              views={["month", "year"]}
              onChange={(date) => {
                setdate(moment(date).format("MMM YYYY"));
                setExtraDate(moment(date).format("MMM YYYY"));
                invoiceFun1(responseData, date);
                // handleChange(moment(date).format("YYYY"));
                receiptFun1(receiptData, date);
                expenseFun1(expeseData, date);
                // setdataReceipt([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                // receiptFun(receiptData,moment(date).format('YYYY'))
              }}
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className="m-2"
              // margin="none"
              label=""
              format="yyyy"
              // inputVariant="outlined"
              type="text"
              size="small"
              selected={date}
              value={date}
              style={{ float: "right", width: 140 }}
              views={["year"]}
              onChange={(date) => {
                setdate(moment(date).format("YYYY"));
                invoiceFun(responseData, date);
                // handleChange(moment(date).format("YYYY"));
                receiptFun(receiptData, date);
                expenseFun(expeseData, date);
                // setdataReceipt([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                // receiptFun(receiptData,moment(date).format('YYYY'))
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div style={{color:"white"}}>SALES AND EXPENSE CHART</div>
      </div>
      {load && (
        <div className={classes.loading}>
          {/* <img src="/assets/images/logo-circle.svg" alt="" /> */}
          <CircularProgress color="secondary" />

        </div>
      )}
      
      <RechartCreator>
      
      <BarChart
        width={500}
        height={300}
        maxVal={maxVal}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <br />
        <br />
        {/* <Legend
          iconSize={10}
          width={120}
          height={140}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
        /> */}
         <Legend layout="horizontal" verticalAlign="top" align="center" wrapperStyle={style}/>
        <XAxis dataKey="name" stroke="#fff" style={{color:"white"}} />
        <YAxis dataKey="maxVal" tickFormatter={tick => {
              return tick.toLocaleString();
            }} stroke="#fff" style={{color:"white !important"}} />
       
        {/* <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} /> */}
        <Tooltip formatter={(value) => new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(value)} />
        
        <Bar dataKey="INVOICE" fill="#FFC221" />
        <Bar dataKey="RECEIPT" fill="#D21976" />
        <Bar dataKey="EXPENSE" fill="#76D219" />
      </BarChart>
    </RechartCreator>
    {/* <Legend  /> */}
</div>
      <div className="analytics m-sm-30 mt--18">
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <StatCards
              eDate={eDate}
              years={moment(date).format("YYYY")}
              stackData={stackData}
            />

            {/* Top Selling Products */}
            {/* <TopSellingTable /> */}

            <Card elevation={3} className="pt-5 mb-6">
              <div className="flex justify-between items-center px-6 mb-3">
                {/* <span className="card-title">Account Statements</span> */}
              </div>
              <div className="overflow-auto">
                <DueInvoice />
              </div>
            </Card>

            {/* <StatCards2 /> */}

            {/* <h4 className="card-title text-muted mb-4">Ongoing Projects</h4>
            <RowCards /> */}
          </Grid>

          <Grid item xs={6}>
            <AccountStatement />
          </Grid>

          <Grid item xs={6}>
            <ExpenseCategory />
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default Analytics;
