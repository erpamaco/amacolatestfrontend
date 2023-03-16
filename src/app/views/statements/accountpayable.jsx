import React, { useState, useEffect, useRef } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Footer from './Footer';

import {
  Icon,
  Grid,
  Table,
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
import logo from "./../invoice/amaco-logo.png";
// import 'bootstrap/dist/css/bootstrap.min.css';
import url, {  getpaymentaccount ,receipts,expensePaid} from "../invoice/InvoiceService";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { Breadcrumb } from "matx";
import { ValidatorForm } from "react-material-ui-form-validator";


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

const Accountpayable = ({
  toggleInvoiceEditor,
  list = [],
  handleAddList,
  handleAddNewCard,
}) => {
  // let search = window.location.search;
  // let params = new URLSearchParams(search);
  // const foo =parseInt(params.get('s'));
  const componentRef = useRef();



  const [from_date, setfrom_date] = useState('01-01-'+new Date().getFullYear());
  const [to_date, setto_date] = useState(new Date());
  const [cname, setcname] = useState();
  const [opening_balance, setopening_balance] = useState(0.00);
  const [current_bal, setcurrent_bal] = useState([]);
  const [balance, setbalance] = useState(0.00);
  const [closing_bal, setclosing_bal] = useState(0.00);
 

  
  const classes = useStyles();
 




//   bank statements
  
    const[arr,setarr]=useState([])
    const[response,setresponse]=useState([])
    const[totalcredit,settotalcredit]=useState('0.00')
    const[totaldebit,settotaldebit]=useState('0.00')
    
    
  useEffect(() => {
    expensePaid().then(({ data }) => {
     
        
   
        setarr(data?.filter(obj=>obj.is_paid==0 && obj.status=="verified"))
        setbalance(data?.filter(obj=>obj.is_paid==0 && obj.status=="verified").reduce((initial,cal)=> initial= initial+ parseFloat(cal.amount),0))
        setresponse(data?.filter(obj=>obj.is_paid==0 && obj.status=="verified"))

        
    })
  }, []);

  
  window.onafterprint = function () {
    window.close();
    window.location.href = ``;
  };
//   onclick print function
  const handlePrinting = useReactToPrint({
    content: () => componentRef.current,
    header: () => componentRef.current,
  });

//   Calculate the balance amount
  const calBalance = (cBalance, amount, sign,i) => {
  
    
    let temp=amount;
    
    cBalance = parseFloat(cBalance?.split(",").join(""));
    let tempAmt = parseFloat(amount);

    sign === "-" && (cBalance -= tempAmt);
    sign === "+" && (cBalance += tempAmt);
    
    
    currentBalance=parseFloat(cBalance).toLocaleString(undefined,{
      minimumFractionDigits:2
    });
   
    current_bal.push(cBalance.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    }))
    return parseFloat((cBalance)).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
  };
  

//   function to set the from date and call the filter_data function
  const handleFromDateChange = (date) => {
    filter_data(date,to_date)
    setfrom_date(date);
  };
//   function to set the To date and call the filter_data function

  const handleToDateChange = (date) => {
    filter_data(from_date,date)
    setto_date(date);
  };

  let currentBalance = 0;
  let osum = parseFloat(opening_balance).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });


  
  //Function will filter the array based on the fromDate and to date   
  const filter_data=(fDate,tDate)=>{
   
    
  
  

   
    setarr(response.filter(obj=>(moment(obj.created_at).format('YYYY-MM-DD')>=moment(fDate).format('YYYY-MM-DD') && moment(obj.created_at).format('YYYY-MM-DD')<=moment(tDate).format('YYYY-MM-DD'))))

    setbalance(response.filter(obj=>(moment(obj.created_at).format('YYYY-MM-DD')>=moment(fDate).format('YYYY-MM-DD') && moment(obj.created_at).format('YYYY-MM-DD')<=moment(tDate).format('YYYY-MM-DD'))).reduce((initial,cal)=> initial= initial+ parseFloat(cal.amount),0))
   
   
    
    
   
   
    
    
    
  }
  
  

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <div className="flex flex-wrap justify-between mb-2">
          {/* <Breadcrumb
            routeSegments={[
           
              { name: "BANK STATEMENTS"},
    
            ]}
          /> */}
          <div></div>
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
      <ValidatorForm className="px-0 pb-0 ml-4" >
        <Grid container spacing={2}>
          

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
                onChange={handleFromDateChange}
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
                onChange={handleToDateChange}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item lg={3} xs={12}>
           
          </Grid>
        </Grid>
      </ValidatorForm>
      <div className={clsx("invoice-viewer py-4 pt-0", classes.Accountpayable)}>
        <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
          <div>
           
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
                   
                   {/* Include the header */}
                   
                  </div>
                </td>
              </tr>
            </thead>

            <tbody style={{ marginBottom: "50px" }}>
              <tr>
                <td>
                  <div>
                    <div className="px-4 mb-2 pl-4 pt-4 flex ">
                     
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
                              BALANCE
                            </TableCell>
                            
                            
                          </TableRow>
                        </TableHead>
                        <TableBody>
                         
                        {/* {console.log(arr)} */}
                          {arr?.sort((a, b) => new Date(a?.created_at) - new Date(b?.created_at)).map((item, index) => {
                            
                        

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
                                    {/* display the created date */}
                                  {moment(item?.created_at).format("DD-MMM-YYYY")}
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
                                {/* Displays The expense or receipt Descriptions */}
                            {item?.name}
                            </TableCell>
                                
                                
                              
                                 {/* calculate the balance amount if the amount is from Receipt */}
                             <TableCell
                                  className="pl-0 capitalize"
                                  style={{
                                    textAlign: "right",
                                    border: "1px solid #ccc",
                                    fontFamily: "Calibri",

                                    fontSize: 16,
                                  }}
                                >
                                  
                                 
                                
                                {item?.amount.toLocaleString(undefined,{
                                    minimumFractionDigits:2
                                })}
                                
                                
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
                             {/* closing balance(opening balance -(total expense-total receipt)) */}
                             {(balance).toLocaleString(undefined,{
                                    minimumFractionDigits:2
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
            {/* <footer style={{ visibility: "hidden" }}>
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
            
            </footer> */}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accountpayable;
