import React, { useRef, useEffect, useState, forwardRef } from 'react'
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
  Button
} from "@material-ui/core";
import clsx from "clsx";


import { makeStyles } from '@material-ui/core/styles';
import { useReactToPrint } from 'react-to-print';
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import url from '../invoice/InvoiceService';
import { Breadcrumb } from "matx";
import Header from './Header';
import Footer from './Footer';
//import { DatePicker, InlineDatePicker } from "material-ui-pickers";

const useStyles = makeStyles(({ palette, ...theme }) => ({


  "@global": {



    "@media print": {


      "body, html,div,h2,h3,h4,h5,h6": {
        visibility: "hidden",
        size: "auto",

        content: 'none !important',
        "-webkit-print-color-adjust": "exact !important",
        // marginTop:'10px',
        counterIncrement: 'page',
        fontSize: '11pt'








      },

      "#table": {
        'font-family': "Calibri",
        'font-size': '11pt',
      },
      /* You can add additional styles here which you need */



      "#header": {
        // padding: "10px",

        /* These do the magic */
        position: "fixed",
        marginTop: '100px',
        left: 0,
        paddingTop: 130,
        justifySelf: "end"

      },
      ".empty-header": {
        height: "100px",
        marginTop: '10px',


      },
      ".empty-footer": {
        height: "100px",
        marginTop: '10px',



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
        position: 'fixed',
        width: "100%",
        justifySelf: "end"
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
        boxDecorationBreak: 'clone',
        position: 'relative',



        "& *": {
          visibility: "visible",
        },
      },


    },

  },

}))

function ProfitLoss() {
  let arr;
  const quaterMonths = (val) => {
    if (val == 1) {
      setmonths({ ...months, firstMonth: 'January', secondMonth: 'February', thirdMonth: "March" })
      setfilter_month(months__.filter(obj => obj == 'January' || obj == 'February' || obj == "March"))
    }
    else if (val == 2) {
      setmonths({ ...months, firstMonth: 'April', secondMonth: 'May', thirdMonth: "June" })
      setfilter_month(months__.filter(obj => obj == 'April' || obj == 'May' || obj == "June"))

    }
    else if (val == 3) {
      setmonths({ ...months, firstMonth: 'July', secondMonth: 'August', thirdMonth: "September" })
      setfilter_month(months__.filter(obj => obj == 'July' || obj == 'August' || obj == "September"))


    }
    else if (val == 4) {
      setmonths({ ...months, firstMonth: 'October', secondMonth: 'November', thirdMonth: "December" })
      setfilter_month(months__.filter(obj => obj == 'October' || obj == 'November' || obj == "December"))

    }
    setquater(val)


  }
  const caluclateTotalExpense = (arr, m, c1, c2, c3, c4) => {
    var result = arr.filter(function (o1) {
      return m.some(function (o2) {
        return o1.MONTH === o2; // return the ones with equal id
      });
    });
    const res = result.filter(obj => (obj.CATEGORY == c1 || obj.CATEGORY == c2 || obj.CATEGORY == c3 || obj.CATEGORY == c4)).reduce((a, v) => a = a + parseFloat(v.AMOUNT), 0.00)


    return res
  }
  const caluclateTotal = (m, arr, category) => {

    var result = arr.filter(function (o1) {
      return m.some(function (o2) {
        return o1.MONTH === o2; // return the ones with equal id
      });
    });
    const res = result?.filter(obj => (obj.CATEGORY == category)).reduce((a, v) => a = a + parseFloat(v.AMOUNT), 0.00)


    return res
  }
  const caluclateamount = (arr, month, category) => {

    
    const res = arr.filter(obj => obj.MONTH == month && obj.CATEGORY == category).reduce((a, v) => a = a + (isNaN(parseFloat(v.AMOUNT)) ? 0 : parseFloat(v.AMOUNT)), 0.00)
    // console.log(res)

    return res.toLocaleString(undefined, {
      minimumFractionDigits: 2
    })


  }

  const id = useRef(null);
  const [arrExpense, setarrExpense] = useState([]);
  const [salesExpense, setsalesExpense] = useState([]);
  const [profitLoss, setprofitLoss] = useState([]);
  const [filter_month, setfilter_month] = useState([]);
  const [netprofit, setnetprofit] = useState();

  const [total_sales, settotal_sales] = useState(0.00);
  const [year, setyear] = useState(new Date());
  const [months, setmonths] = useState({ firstMonth: " ", secondMonth: " ", thirdMonth: " " })
  const [quater, setquater] = useState('')
  const [isAlive, setisAlive] = useState(false)
  var months__ = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  const [value, setValue] = React.useState(new Date());
  let sum = 0.00
  var dataVal;
  const filterData = (y) => {






    var d = new Date();
    var quarter = parseInt(d.getMonth() / 3) + 1;
    quaterMonths(quarter)

    url.get('salesExpenseReport').then(({ data }) => {

      var result = data[0].filter(date => moment(date.category.date).format('YYYY') == moment(y).format('YYYY')).map((item, i) => {


        let dateObj = new Date(item.category.paid_date);
        let monthyear = dateObj.toLocaleString("en-us", { month: "long" });

        if (months__.filter(obj => obj == monthyear)) {
          item['AMOUNT'] = item.category.amount
          item['CATEGORY'] = item.sub_categories
          item['MONTH'] = monthyear
          item['SUM'] = sum + parseFloat(item.category.amount)
        }
        // if(monthyear=="October")
        // {
        //   item['AMOUNT']=item.category.amount
        //   item['CATEGORY']=item.sub_categories
        //   item['MONTH']=monthyear
        //   item['SUM']=sum+parseFloat(item.category.amount)
        // }
        // if(monthyear=="November")
        // {
        //   item['AMOUNT']=item.category.amount
        //   item['CATEGORY']=item.sub_categories
        //   item['MONTH']=monthyear
        //   item['SUM']=sum+parseFloat(item.category.amount)
        // }
        // if(monthyear=="December")
        // {
        //   item['AMOUNT']=item.category.amount
        //   item['CATEGORY']=item.sub_categories
        //   item['MONTH']=monthyear
        //   item['SUM']=sum+parseFloat(item.category.amount)
        // }
        return item;

      })

      setarrExpense(result)
    })

    url.get("invoice").then(({ data }) => {
      var salesResult = data.filter(date => moment(date.issue_date).format('YYYY') == moment(y).format('YYYY')).map((item, i) => {


        let dateObj = new Date(item.issue_date);
        let monthyear = dateObj.toLocaleString("en-us", { month: "long" });

        // console.log(monthyear)
        if (months__.filter(obj => obj == monthyear)) {

          item['AMOUNT'] = item.grand_total
          item['CATEGORY'] = "SALES"
          item['MONTH'] = monthyear
        }

        // if(monthyear=="November")
        // {
        //   item['AMOUNT']=item.grand_total
        //   item['CATEGORY']="SALES"
        //   item['MONTH']=monthyear
        // }
        // if(monthyear=="October")
        // {
        //   item['AMOUNT']=item.grand_total
        //   item['CATEGORY']="SALES"
        //   item['MONTH']=monthyear
        // }
        // if(monthyear=="November")
        // {
        //   item['AMOUNT']=item.grand_total
        //   item['CATEGORY']="SALES"
        //   item['MONTH']=monthyear
        // }

        return item;
        // if(!r[monthyear]) r[monthyear] = {monthyear, entries: 1}
        // else r[monthyear].entries++;
        // return r;
      })
      setsalesExpense(salesResult)
    })



  }
  useEffect(() => {

    filterData(year)

    setfilter_month(months__)

    setTimeout(() => {
      var n1 = document.getElementById('net').innerHTML.replace(/,/g, '');
      // console.log(parseFloat(n1))
      url.get("profitLoss").then(({ data }) => {
        var res = data[0].data.map((item) => {
          item['profit_Amount'] = (parseFloat(item.profit_per) / 100) * n1;
          item['invest_Amount'] = data[0].data?.filter(obj => obj.payment_account_id == item.payment_account_id).reduce((a, v) => a = a + parseFloat(v.investment_details?.amount), 0.00) + parseFloat(item.opening_balance ? item.opening_balance : 0.00)
          return item
        })
        // console.log(res)
        setprofitLoss(res)

      })
    }, 1000);






  }, [])



  const classes = useStyles();
  const componentRef = useRef();
  const handlePrinting = useReactToPrint({
    content: () => componentRef.current,
    header: () => componentRef.current

  });
  const handleDateChange = (date) => {
    setyear(date);
    filterData(date)

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
      <Card style={{ padding: '10px' }}>
        <div className={clsx("invoice-viewer py-4", classes.invoiceViewer)}>
          <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
            <div>
              <Grid container spacing={2}>
                <Grid item xs={6}>
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
                      views={['year']}
                      format="yyyy"
                      onChange={handleDateChange}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    className="mb-4 w-full"
                    margin="none"

                    label="QUATER"
                    variant="outlined"
                    type="text"
                    size="small"
                    onChange={(e) => quaterMonths(e.target.value)}
                    select


                  >
                    <MenuItem value="1">Q1</MenuItem>
                    <MenuItem value="2">Q2</MenuItem>
                    <MenuItem value="3">Q3</MenuItem>
                    <MenuItem value="4">Q4</MenuItem>
                  </TextField>
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


            <div id="print-area" ref={componentRef} style={{ fontFamily: "Calibri", fontSize: 16 }}>
              <table>
                <Header />
                <div>
                  <Table style={{ fontSize: '10pt', border: "none", fontFamily: 'Calibri' }} id="table">
                    <TableHead style={{ backgroundColor: '#1d2257', display: 'table-row-group' }}>
                      <TableRow>
                        {/* <TableCell colSpan={1}></TableCell> */}
                        <TableCell colSpan={6} style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>
                          SALES & EXPENSE REPORT - {moment(year).format('YYYY')} (QUATER {quater})
                        </TableCell>

                      </TableRow>
                    </TableHead>
                    <TableHead style={{ backgroundColor: '#1d2257', display: 'table-row-group' }}>
                      <TableRow style={{ pageBreakInside: 'avoid' }} id="table">
                        <TableCell className="pr-0" style={{ border: "1px solid #ccc", width: "50px", fontFamily: "Calibri", color: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center">MONTH</TableCell>
                        <TableCell className="px-0" style={{ border: "1px solid #ccc", fontFamily: "Calibri", color: '#fff', fontColor: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center">OPERATIONAL EXPENSES</TableCell>
                        <TableCell className="px-0" style={{ border: "1px solid #ccc", fontFamily: "Calibri", color: '#fff', fontColor: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center">MARKETING EXPENSES</TableCell>

                        <TableCell className="px-0" style={{ border: "1px solid #ccc", fontFamily: "Calibri", color: '#fff', fontColor: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center">GOV. EXPENSES</TableCell>
                        <TableCell className="px-0" style={{ border: "1px solid #ccc", fontFamily: "Calibri", color: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center">PURCHASE EXPENSE</TableCell>



                        <TableCell className="px-0" style={{ border: "1px solid #ccc", fontFamily: "Calibri", color: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center">SALES INCOMING</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody >
                      {filter_month.map((item) => {
                        return (
                          <TableRow style={{ border: "1px solid #ccc", pageBreakInside: 'avoid' }}>
                            <TableCell className="pr-0" align="center" style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                              {item}
                            </TableCell>

                            <TableCell className="pr-4" align="right" style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                              {caluclateamount(arrExpense, item, "Operational Expenses")}
                            </TableCell>
                            <TableCell className="pr-4" align="right" style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                              {caluclateamount(arrExpense, item, "Marketing Expenses")}
                            </TableCell>
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
                      })}
                      {/* <TableRow  style={{border: "1px solid #ccc", pageBreakInside: 'avoid'}}>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    {months.secondMonth}
                    </TableCell>
                     <TableCell className="pr-4" align="right" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    {caluclateamount(arrExpense,months.secondMonth,"Operational Expenses")}
                    </TableCell>
                    <TableCell className="pr-4" align="right" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    {caluclateamount(arrExpense,months.secondMonth,"Marketing Expenses")}

                    </TableCell>
                    <TableCell className="pr-4" align="right" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    {caluclateamount(arrExpense,months.secondMonth,"Governmental Expenses")}
                    </TableCell>
                    <TableCell className="pr-4" align="right" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    {caluclateamount(arrExpense,months.secondMonth,"PURCHASE")}
                    </TableCell>
                    <TableCell className="pr-4" align="right" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    {caluclateamount(salesExpense,months.secondMonth,"SALES")}
                    </TableCell>
                    
                    
            </TableRow>
           <TableRow  style={{border: "1px solid #ccc", pageBreakInside: 'avoid'}}>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    {months.thirdMonth}
                    </TableCell>
                     <TableCell className="pr-4" align="right" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                     {caluclateamount(arrExpense,months.thirdMonth,"Operational Expenses")}
                    </TableCell>
                    <TableCell className="pr-4" align="right" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    {caluclateamount(arrExpense,months.thirdMonth,"Marketing Expenses")}
                    </TableCell>
                    <TableCell className="pr-4" align="right" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    {caluclateamount(arrExpense,months.thirdMonth,"Governmental Expenses")}
                    </TableCell>
                    <TableCell className="pr-4" align="right" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    {caluclateamount(arrExpense,months.thirdMonth,"PURCHASE")}

                    </TableCell>
                    <TableCell className="pr-4" align="right" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    {caluclateamount(salesExpense,months.thirdMonth,"SALES")}
                    </TableCell>
                    
            
                    
            </TableRow> */}

                      <TableRow style={{ border: "1px solid #ccc", pageBreakInside: 'avoid', backgroundColor: '#1d2257', fontWeight: 1000 }}>
                        <TableCell className="pr-0" align="center" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt', fontWeight: 1000, color: "white" }} >
                          TOTAL
                        </TableCell>

                        <TableCell className="pr-4" align="right" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt', fontWeight: 1000, color: "white" }} >
                          {caluclateTotal(filter_month, arrExpense, "Operational Expenses").toLocaleString(undefined, {
                            minimumFractionDigits: 2
                          })}
                        </TableCell>
                        <TableCell className="pr-4" align="right" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt', fontWeight: 1000, color: "white" }} >
                          {caluclateTotal(filter_month, arrExpense, "Marketing Expenses").toLocaleString(undefined, {
                            minimumFractionDigits: 2
                          })}
                        </TableCell>
                        <TableCell className="pr-4" align="right" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt', fontWeight: 1000, color: "white" }} >
                          {caluclateTotal(filter_month, arrExpense, "Governmental Expenses").toLocaleString(undefined, {
                            minimumFractionDigits: 2
                          })}
                        </TableCell>
                        <TableCell className="pr-4" align="right" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt', fontWeight: 1000, color: "white" }} >
                          {caluclateTotal(filter_month, arrExpense, "PURCHASE").toLocaleString(undefined, {
                            minimumFractionDigits: 2
                          })}
                        </TableCell>
                        <TableCell className="pr-4" align="right" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt', fontWeight: 1000, color: "white" }} >
                          {caluclateTotal(filter_month, salesExpense, "SALES").toLocaleString(undefined, {
                            minimumFractionDigits: 2

                          })}
                        </TableCell>



                      </TableRow>

                      <TableRow style={{ border: "1px solid #ccc", pageBreakInside: 'avoid', backgroundColor: '#cccccc85', fontWeight: 1000 }}>
                        <TableCell className="pr-0" align="center" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt', fontWeight: 1000 }} >
                          TOTAL SALES
                        </TableCell>
                        <TableCell className="pr-0" align="center" colspan={5} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt', fontWeight: 1000 }} >
                          {caluclateTotal(filter_month, salesExpense, "SALES").toLocaleString(undefined, {
                            minimumFractionDigits: 2

                          })}

                        </TableCell>
                      </TableRow>
                      <TableRow style={{ border: "1px solid #ccc", pageBreakInside: 'avoid', backgroundColor: '#cccccc85', fontWeight: 1000 }}>
                        <TableCell className="pr-0" align="center" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt', fontWeight: 1000 }} >
                          TOTAL EXPENSES
                        </TableCell>
                        <TableCell className="pr-0" align="center" colspan={5} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt', fontWeight: 1000 }} >
                          {caluclateTotalExpense(arrExpense, filter_month, "Operational Expenses", "Governmental Expenses", "Marketing Expenses", "PURCHASE").toLocaleString(undefined, {
                            minimumFractionDigits: 2

                          })}
                        </TableCell>
                      </TableRow>
                      <TableRow style={{ border: "1px solid #ccc", pageBreakInside: 'avoid', backgroundColor: '#cccccc85', fontWeight: 1000 }}>
                        <TableCell className="pr-0" align="center" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt', fontWeight: 1000 }} >
                          GROSS PROFIT
                        </TableCell>
                        <TableCell className="pr-0" align="center" colspan={5} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt', fontWeight: 1000 }} >
                          {(caluclateTotal(filter_month, salesExpense, "SALES") - caluclateTotal(filter_month, arrExpense, "PURCHASE")).toLocaleString(undefined, {
                            minimumFractionDigits: 2
                          })}
                        </TableCell>
                      </TableRow>
                      <TableRow style={{ border: "1px solid #ccc", pageBreakInside: 'avoid', backgroundColor: '#1d2257', fontWeight: 1000 }}>
                        <TableCell className="pr-0" align="center" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt', fontWeight: 1000, color: 'white' }} >
                          NET PROFIT

                        </TableCell>
                        <TableCell id="net" className="pr-0" align="center" colspan={5} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '15pt', fontWeight: 1000, color: 'white' }} >

                          {(caluclateTotal(filter_month, salesExpense, "SALES") - caluclateTotalExpense(arrExpense, filter_month, "Operational Expenses", "Governmental Expenses", "Marketing Expenses", "PURCHASE")).toLocaleString(undefined, {
                            minimumFractionDigits: 2

                          })}

                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pr-0" align="center" colspan={6} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt', fontWeight: 1000, color: 'green' }} >

                        </TableCell>
                      </TableRow>



                    </TableBody>
                  </Table>
                  <Table>
                    {/* {/* <TableRow style={{backgroundColor:'#1d2257'}}>
                <TableCell colSpan={3}></TableCell>
                 <TableCell colSpan={3} style={{color:'#fff',textAlign:'center',fontSize:20}}>
                 PROFIT & LOSS SHARE - 2021 (2)
                </TableCell> 
                <TableCell colSpan={3}></TableCell>  
                </TableRow> */}


                    {/* <TableRow  style={{pageBreakInside:'avoid',backgroundColor:'#1d2257'}} id="table"> 
              <TableCell className="pr-0"  style={{border: "1px solid #ccc",width:"200px",fontFamily: "Calibri",color:'#fff',fontWeight:1000,   fontSize:'11pt'}} align="center" colSpan={2}></TableCell>
              
                <TableCell className="px-0"  style={{border: "1px solid #ccc",fontFamily: "Calibri",color:'#fff',fontColor:'#fff',fontWeight:1000,   fontSize:'11pt'}}  align="center">SHARE HOLDER %</TableCell>
        
                <TableCell className="px-0"  style={{border: "1px solid #ccc",fontFamily: "Calibri",color:'#fff',fontColor:'#fff',fontWeight:1000,   fontSize:'11pt'}}  align="center">SALARY</TableCell>
                <TableCell className="px-0" style={{border: "1px solid #ccc",fontFamily: "Calibri",color:'#fff',fontWeight:1000,   fontSize:'11pt'}}  align="center">PROFIT AMOUNT</TableCell>
                <TableCell className="px-0"style={{border: "1px solid #ccc",fontFamily: "Calibri",color:'#fff',fontWeight:1000,   fontSize:'11pt'}}  align="center">WITHDRAWN AMOUNT</TableCell>
                
                <TableCell className="px-0"style={{border: "1px solid #ccc",fontFamily: "Calibri",color:'#fff',fontWeight:1000,   fontSize:'11pt'}}  align="center">DEDUCTION AMOUNT</TableCell> 
                <TableCell className="px-0"style={{border: "1px solid #ccc",fontFamily: "Calibri",color:'#fff',fontWeight:1000,   fontSize:'11pt'}}  align="center">INVESTED AMOUNT</TableCell>
                <TableCell className="px-0"style={{border: "1px solid #ccc",fontFamily: "Calibri",color:'#fff',fontWeight:1000,   fontSize:'11pt'}}  align="center">BALANCE AMOUNT</TableCell>
              </TableRow> */}
                    {/* {profitLoss?.map((item)=>(
              <TableRow  style={{border: "1px solid #ccc", pageBreakInside: 'avoid',backgroundColor:'#FFD580'}}>
        
              
                    <TableCell className="pr-0" align="center" colspan={2} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt',}} >
                    {item?.name}
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    {item?.profit_per}%
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  13,500.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  {item?.profit_Amount.toLocaleString(undefined,{
                    minimumFractionDigits:2
                  })}
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  0.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  0.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                 {item?.invest_Amount?item?.invest_Amount:0.00}
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    {item?.invest_Amount?(item.profit_Amount+item?.invest_Amount):0.00}
                    </TableCell>
                   
             
              
                    
                    </TableRow> */}
                    {/* ))} */}
                    {/* <TableRow  style={{border: "1px solid #ccc", pageBreakInside: 'avoid',backgroundColor:'#FFD580'}}>
                    <TableCell className="pr-0" align="center" colspan={2} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    ABBAS AHAMED SHAZLI
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    34.00%
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  13,500.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  8,543.11
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  0.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  0.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  0.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    8,543.11
                    </TableCell>
                    
                    </TableRow>
                    <TableRow  style={{border: "1px solid #ccc", pageBreakInside: 'avoid',backgroundColor:'#FFD580'}}>
                    <TableCell className="pr-0" align="center" colspan={2} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    ANSHIF
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    34.00%
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  13,500.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  8,543.11
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  0.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  0.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  0.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    8,543.11
                    </TableCell>
                    
                    </TableRow>
                   
                    <TableRow  style={{border: "1px solid #ccc", pageBreakInside: 'avoid',backgroundColor:'#FFD580'}}>
                    <TableCell className="pr-0" align="center" colspan={2} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    MOHAMMED JAMSHEED
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    34.00%
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  13,500.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  8,543.11
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  0.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  0.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  0.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    8,543.11
                    </TableCell>
                    
                    </TableRow>
                    <TableRow  style={{border: "1px solid #ccc", pageBreakInside: 'avoid',backgroundColor:'#FFD580'}}>
                    <TableCell className="pr-0" align="center" colspan={2} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    DANISH MOHAMMED HANEEF
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    34.00%
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  13,500.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  8,543.11
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  0.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  0.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                  0.00
                    </TableCell>
                    <TableCell className="pr-0" align="center" colspan={1} style={{border: "1px solid #ccc",fontFamily: "Calibri",   fontSize:'11pt'}} >
                    8,543.11
                    </TableCell>
                    
                    </TableRow>  */}

                  </Table>
                </div>
                <tfoot><div class="empty-footer"></div></tfoot>
              </table>


              <div class="footer">
                <Footer />
              </div>


            </div>

          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProfitLoss
