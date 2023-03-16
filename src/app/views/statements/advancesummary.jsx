import React, { useState, useEffect, useRef } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Footer from './Footer';
import { Link,useHistory } from "react-router-dom";
import "../../../app/views/Newinvoice/print.css";

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

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import url from "../invoice/InvoiceService";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
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

      "#table": {
        display: "-webkit-box",
        display: "-ms-flexbox",
        // display: "right",
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

const Advance = ({
  toggleInvoiceEditor,
  list = [],
  handleAddList,
  handleAddNewCard,
}) => {
 
  const componentRef = useRef();



  const [from_date, setfrom_date] = useState('01-01-'+new Date().getFullYear());
  const [to_date, setto_date] = useState(new Date());
  const [opening_balance, setopening_balance] = useState(0.00);
  const [current_bal, setcurrent_bal] = useState([]);
  const [balance, setbalance] = useState(0.00);
 

  
  const classes = useStyles();
 




//   bank statements
  
    const[arr,setarr]=useState([])
    const[response,setresponse]=useState([])
   
    
    
  useEffect(() => {
    url.get("paidDivision").then(({ data }) => {
     
        
        // filter and set the array data based on type=="personal" and balance amount greater than and equal to 0.00
        setarr(data?.filter(obj=>obj.balance>=0 && obj.type=="personal"))
        setresponse(data?.filter(obj=>obj.balance>=0 && obj.type=="personal"))

        // set the calculated balance amount where type=="personal" and balance amount is greater than or equal to 0.00
        setbalance(data?.filter(obj=>obj.balance>=0 && obj.type=="personal").reduce((initial,cal)=> initial= initial+ parseFloat(cal.balance),0))

        
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

   


  
  //Function will filter the array based on the fromDate and to date   
  const filter_data=(fDate,tDate)=>{
   
    
  
  

  //  set the filtered array
    setarr(response.filter(obj=>(moment(obj.date).format('YYYY-MM-DD')>=moment(fDate).format('YYYY-MM-DD') && moment(obj.date).format('YYYY-MM-DD')<=moment(tDate).format('YYYY-MM-DD'))))

    // Set the Balance amaount
    setbalance(response.filter(obj=>(moment(obj.date).format('YYYY-MM-DD')>=moment(fDate).format('YYYY-MM-DD') && moment(obj.date).format('YYYY-MM-DD')<=moment(tDate).format('YYYY-MM-DD'))).reduce((initial,cal)=> initial= initial+ parseFloat(cal.balance),0))
   
   
    
    
   
   
    
    
    
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
      {/* <ValidatorForm className="px-0 pb-0 ml-4" >
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
      </ValidatorForm> */}
      <div className={clsx("invoice-viewer py-4 pt-0", classes.Advance)}>
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
                          {/* <TableCell
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
                          </TableCell> */}

                          
                          <TableCell
                            className="pr-0 capitalize"
                            align="center"
                            // rowSpan={3}
                            colSpan={4}
                            style={{
                              border: "1px solid #ccc",
                              wordBreak: "break-word",
                              fontFamily: "Calibri",
                              fontSize: 16,
                            }}
                          >
                            <h3>SUMMARY</h3>
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
                              {/* from date */}
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
                              {/* to date */}
                             {moment(to_date).format("DD MMM YYYY")}
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
                              S.No
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
                         
                        
                          {arr?.sort((a, b) => new Date(a?.date) - new Date(b?.date)).map((item, index) => {
                            
                        

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
                                  {/* {moment(item?.date).format("DD-MMM-YYYY")} */}
                                  {++index}
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
                                <Link to={`/account/${item.id}`}>
                            {item?.name}
                            </Link>
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
                                  
                                 
                                
                                {item.balance.toLocaleString(undefined,{
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
              <h5 class="outer"></h5>
            {/* <div class="pageno">page</div> */}
              <div class="empty-footer"></div>
            </tfoot>
          </table>
       
          <div class="footer">
          
           {/* Footer component */}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advance;
