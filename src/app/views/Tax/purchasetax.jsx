import React, { useState, useEffect, useRef } from "react";
import { Breadcrumb } from "matx";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import { useReactToPrint } from "react-to-print";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import url from "../../views/invoice/InvoiceService"
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
// import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  TableRow,
  Button,
  Typography, Card,
  Grid,
  Tooltip,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ValidatorForm } from "react-material-ui-form-validator";
const columnStyleWithWidth = {
  top: "0px",
  left: "0px",
  zIndex: "100",
  position: "sticky",
  backgroundColor: "#1d2257",
  width: "80px",
  wordBreak: "break-all",
  color: 'white'
}
const columnStyleWithWidth1 = {
  top: "0px",
  left: "0px",
  zIndex: "100",
  position: "sticky",
  backgroundColor: "#fff",
  width: "360px",
  wordBreak: "break-all",
}
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

const SalesTax = ({ data1 }) => {
  const componentRef = useRef();
  const [sales_Report, setsales_Report] = useState([]);
  const [from_date, setfrom_date] = useState(new Date());
  const [to_date, setto_date] = useState(new Date());
  const [net_tax_amount, setnet_tax_amount] = useState();
  const handleDateChange = (date) => {
    setfrom_date(date);
  };

  const handleDateChange1 = (date) => {
    setto_date(date);
  };
  useEffect(() => {

    //   var localTime = moment().format('YYYY-MM-DD'); // store localTime
    // var startdate = localTime + "T00:00:00.000Z";
    // console.log(startdate)
    // var lastdate = moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).format('YYYY-MM-DD');
    // var enddate =lastdate + "T00:00:00.000Z";
    // console.log(enddate)

    //   url.get("invoic").then(({ data }) => {

    //  var  result = data.filter(d => {var time = d.created_at;
    //                              return (startdate <= time && time <= enddate);
    //                             });
    // console.log(result);



    url
      .post(
        "purchase-tax?" +
        "from_date=" +
        moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format("YYYY-MM-DD") +
        "&to_date=" +
        moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).format("YYYY-MM-DD")
      )
      .then(({ data }) => {
        var net_tax = 0;
        data.map((item, i) => {
          net_tax += parseFloat(item.tax ? item.tax : 0.00)
        })
        const myArr = Object.values(data).sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setsales_Report(myArr)
        setnet_tax_amount(net_tax)
      })
    setfrom_date(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
    setto_date(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0))


  }, [data1])

  const handlePrinting = useReactToPrint({
    content: () => componentRef.current,
    header: () => componentRef.current,
  });
  const handleSubmit = () => {
    url
      .post(
        "purchase-tax?" +
        "from_date=" +
        moment(from_date).format("YYYY-MM-DD") +
        "&to_date=" +
        moment(to_date).format("YYYY-MM-DD")
      )
      .then(({ data }) => {
        setsales_Report(data)
        // console.log(data)
      })
  }
  const removeData = (id) => {
    // alert(id)
    // let url = `https://jsonplaceholder.typicode.com/users/${id}`
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Advance Payment!',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        url.delete(`advance-payments/${id}`)
          .then(res => {
            url.get("advance-payments").then(({ data }) => {
              setsales_Report(data)


            })
            // getrow()
            Swal.fire(
              'Deleted!',
              'Advance Payment has been deleted.',
              'success'
            )

          })


        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Receipt is safe :)',
          'error'
        )
      }
    })

  }


  const columns = [
    {
      name: "id", // field name in the row object
      label: "S.No.", // column title that will be shown in table
      options: {

        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={columnStyleWithWidth}>
              <span style={{ marginLeft: 18 }}>S.No.</span>
            </TableCell>
          )
        },


      }
    },
    {
      name: "fname", // field name in the row object
      label: "Date", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ background: '#1d2257', color: 'white' }}>
              <span style={{ marginLeft: 18 }}>DATE</span>
            </TableCell>
          )
        },

      }
    },
    {
      name: "fname", // field name in the row object
      label: "Bill No", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ background: '#1d2257', color: 'white' }}>
              <span style={{ marginLeft: 18 }}>BILL NO</span>
            </TableCell>
          )
        },
      }
    },


    // {
    //     name: "Paid By",
    //     label: "Paid By",
    //     options: {
    //       filter: true,
    //     },
    //   },

    {
      name: "Paid To",
      label: "Paid To",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ background: '#1d2257', color: 'white' }}>
              <span style={{ marginLeft: 18 }}>PAID TO</span>
            </TableCell>
          )
        },
      },
    },
    {
      name: "amount",
      label: "Amount",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ background: '#1d2257', color: 'white' }}>
              <span style={{ marginLeft: 18 }}>AMOUNT</span>
            </TableCell>
          )
        },
      },
    },
    {
      name: "amount",
      label: "Tax Amount",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ background: '#1d2257', color: 'white' }}>
              <span style={{ marginLeft: 18 }}>TAX AMOUNT</span>
            </TableCell>
          )
        },
      },
    },


  ];



  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">

        <Breadcrumb
          routeSegments={[
            // { name: "Add Expense", path: "/addexpense" },
            { name: "Purchase Tax" },
          ]}
        />
      </div>
      <ValidatorForm className="px-0 pb-0" onSubmit={handleSubmit}>
        <Grid container spacing={3}>

          <Grid item lg={3} md={3} xs={12}>
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

          <Grid item lg={3} md={3} xs={12}>
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



          <Grid item lg={3} md={6} xs={12}>
            <Button
              color="primary"
              variant="outlined"
              className="mr-6"
              type="submit"
              onClick={handleSubmit}
            >
              <Icon>save</Icon> Save
            </Button>
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

          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <span>Total Tax Amount</span>:    <strong>{net_tax_amount}</strong>
          </Grid>

        </Grid>
      </ValidatorForm>
      <div />
      <Card className="p-8">
        <div id="print-area" ref={componentRef}>
          <table >
            <thead style={{ display: "table-header-group", marginTop: "20px" }}>
              <tr>
                <td>
                  <div class="empty-header">
                  </div>
                </td>
              </tr>
            </thead>
            {/* <MUIDataTable
       id="print-area"
       ref={componentRef}
        title={"Purchase Tax"}
       data={sales_Report.map((item, index) => {
        
        return [
         ++index,
            moment(item.paid_date).format("DD MMM YYYY"),
          item.referrence_bill_no,
          // item.paid_by,
          item.paid_to,
          item.amount,
          item.tax
          
       ]
        
      })} 
         columns={columns}  
         options={{
           
            rowsPerPageOptions: [10, 20, 40, 80, 100],
            selectableRows: "none",
            // filterType: "dropdown",
            responsive: "scrollMaxHeight",
            rowsPerPage: 10, 
            print:false
         }}          
                   
      /> */}
            <tfoot>
              <div class="empty-footer"></div>
            </tfoot>

            <div class="footer">
              <footer style={{ visibility: "hidden" }}>

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

              </footer>
            </div>
          </table>
        </div>
      </Card>

    </div>




  );
}


export default SalesTax;
