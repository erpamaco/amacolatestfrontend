import React, { useState, useEffect, useRef } from "react";
import { borders } from "@material-ui/system";
import converter from "number-to-words";
import Arabic from "../../../lang/ar.json";
import { IntlProvider } from "react-intl";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";

import moment from "moment";
import Header from "../../views/statements/Header";
import Box from "@material-ui/core/Box";
import Footer from "../../views/statements/Footer";
import "../Newinvoice/print.css";
import {
  Icon,
  Divider,
  Grid,
  Table,
  TextField,
  MenuItem,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Card,
  Button,
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { getInvoiceById, navigatePath } from "../invoice/InvoiceService";
import { format, setDate } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import { cond } from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import url from "../invoice/InvoiceService";
import logo from "./../invoice/amaco-logo.png";
import logos from "./../invoice/vision2030.png";
import Swal from "sweetalert2";
import useSettings from "../../hooks/useSettings";
import { useReactToPrint } from "react-to-print";
const locale = navigator.language;

// import Image from 'react-image-resizer';

const useStyles = makeStyles(({ palette, ...theme }) => ({
  // "@page":{
  //   size:'A4',
  //   margin:"11mm 17mm 17mm 17mm"

  // },
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
        // top: '1em',
        left: 0,
        // paddingBottom:130
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
      "#none": {
        display: "none",
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
      //    },import { Autocomplete } from '@material-ui/lab';

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

const InvoiceViewer = ({ toggleInvoiceEditor }) => {
  const [state, setState] = useState({});
  const [createdate, setcreatedate] = useState("");
  const [podetails, setpodetails] = useState([]);
  const [company, setcompany] = useState([]);
  const [attn, setattn] = useState("");
  const [po, setpo] = useState("");
  const [deliveryno, setdeliveryno] = useState("");
  const [quotationno, setquotationno] = useState("");
  const { id, s } = useParams();
  const classes = useStyles();
  const componentRef = useRef();
  const { settings, updateSettings } = useSettings();
  let fval;

  const routerHistory = useHistory();
  const filter = createFilterOptions();

  const [pageNumber, setPageNumber] = useState([]);

  let pos = 0;
  const handlePrintingCur = useReactToPrint({
    content: () => componentRef.current,
    header: () => componentRef.current,
  });

  const handlePrinting = () => {
    var totalPages = Math.ceil(componentRef.current.scrollHeight / 1123);

    // console.log(componentRef.current.scrollHeight);
    // if (componentRef.current.scrollHeight <= 1529) {
    //   totalPages = 1;
    // }
    // console.log(totalPages);
    // totalPages = totalPages - 2
    let a = [];
    for (var i = 0; i < totalPages; i++) {
      var j = i;
      j = ++j;
      var q = "Page " + j + " of " + totalPages;
      a[i] = q;
    }
    // console.log(a);
    setPageNumber(a);
    setTimeout(() => {
      handlePrintingCur();
    }, 500);
  };

  const [users, setUsers] = useState([]);
  const [delBys, SetDelBy] = useState([]);
  const [alive, setAlive] = useState(true);

  useEffect(() => {
    url.get("dDetails").then(({ data }) => {
      console.log("ddetails",data)
      setUsers(data?.prepBy);
      SetDelBy(data?.delBy ? data?.delBy : "");
      // console.log
    });
    setAlive(false);
  }, [alive]);

  useEffect(() => {
    // delivery-notes

    url.get("invoice_delivery_note/" + id + `/${s}`).then(({ data }) => {
      console.log("incoix",data)
      if (s == "invoice") {
        document.title = `AMACO ${data[1]?.delivery_number}-${data[5]?.firm_name}`;
      } else {
        document.title = `AMACO ${data[1]?.delivery_number}-${data[1]?.quotation?.party?.firm_name}`;
      }

      setPrefBy(data[1]?.prepared_by);
      setDelBy(data[1]?.delevered_by);

      setcreatedate(data[1]?.issue_date);
      if (s == "invoice") {
        if (data[9].length > 0) {
          let f = data[9][0]?.fname
            ? " " + data[9][0]?.fname.toUpperCase()
            : "";
          let l = data[9][0]?.lname
            ? " " + data[9][0]?.lname.toUpperCase()
            : "";
          let pr = data[9][0]?.prefix ? data[9][0]?.prefix + "." : "";
          let fu = pr + f + l;
          setattn(fu);
        } else {
          let f = data[8]?.fname ? " " + data[8]?.fname.toUpperCase() : "";
          let l = data[8]?.lname ? " " + data[8]?.lname.toUpperCase() : "";
          let pr = data[8]?.prefix ? data[8]?.prefix + "." : "";
          let fu = pr + f + l;
          setattn(fu);
        }
      } else {
        if (data[9].length > 0) {
          let f = data[9][0]?.fname
            ? " " + data[9][0]?.fname.toUpperCase()
            : "";
          let l = data[9][0]?.lname
            ? " " + data[9][0]?.lname.toUpperCase()
            : "";
          let pr = data[9][0]?.prefix ? data[9][0]?.prefix + "." : "";
          let fu = pr + f + l;
          setattn(fu);
        } else {
          if (data[1]?.quotation?.contact !== null) {
            let f = data[1]?.quotation?.contact?.fname
              ? " " + data[1]?.quotation?.contact?.fname.toUpperCase()
              : "";
            let l = data[1]?.quotation?.contact?.lname
              ? " " + data[1]?.quotation?.contact?.lname.toUpperCase()
              : "";
            let pr = data[1]?.quotation?.contact?.prefix
              ? data[1]?.quotation?.contact?.prefix + "."
              : "";
            let fu = pr + f + l;
            setattn(fu);
          }
        }
      }
      // setpodetails(data[1])
      if (s === "invoice") {
        setcompany(data[1]?.invoice?.party?.firm_name);
        setquotationno(data[1]?.invoice?.invoice_no);
      } else {
        setcompany(data[1]?.quotation?.party?.firm_name);
        setquotationno(data[1]?.quotation?.quotation_no);
      }

      setpodetails(data[0]);
      setdeliveryno(data[1]?.delivery_number);
      setpo(data[10]?.po_number ? data[10]?.po_number : data[1]?.po_number);
    });
    // url.get("invoice/" + id).then(({ data }) => {

    //      setcreatedate(data[0].issue_date)
    //      setpodetails(data[0].invoice_detail)
    //      setcompany(data[0].quotation.party.firm_name)
    //     setpodetails(data[0].invoice_detail)
    //     setdeliveryno(data[0].delivery_no)
    //     setpo(data[0].quotation.quotation_no)

    //   });
  }, [id]);
  const invoicegenrate = (sidebarSettings) => {
    // alert(id)
    const postatus = {
      status: "po",
    };
    // let url = `https://jsonplaceholder.typicode.com/users/${id}`
    Swal.fire({
      title: "Are you sure?",
      text: "You want to convert this quotation into Purchase Order !",
      icon: "danger",
      showCancelButton: true,
      confirmButtonText: "Yes,!",
      icon: "warning",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        url.put(+"/" + id, postatus).then((res) => {
          let activeLayoutSettingsName = settings.activeLayout + "Settings";
          let activeLayoutSettings = settings[activeLayoutSettingsName];
          updateSettings({
            ...settings,
            [activeLayoutSettingsName]: {
              ...activeLayoutSettings,
              leftSidebar: {
                ...activeLayoutSettings.leftSidebar,
                ...sidebarSettings,
              },
            },
          });

          window.location.href = "../Newinvoiceview";
          Swal.fire("Invoice!", " has been generated.", "success");
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "........:)", "error");
      }
    });
  };

  const [prepBy, setPrefBy] = useState("");
  const [delBy, setDelBy] = useState("");

  const changeSub1 = (e, n) => {
    url
      .post("deleveryPrep/" + (delBy ? delBy : null) + "/d/" + id)
      .then(({ data }) => {
        setE1(false);
        setE2(false);
        setAlive(true);
      });
  };

  const changeSub = (e, n) => {
    setDelBy(n);
  };

  const changeData = (e, n, o) => {
    if (o == "p") {
      setPrefBy(n?.name);
      url
        .post("deleveryPrep/" + n.name + "/" + o + "/" + id)
        .then(({ data }) => {
          setE1(false);
          setE2(false);
          setAlive(true);
        });
    } else {
      setDelBy(n?.delevered_by ? n?.delevered_by : n);
    }
  };

  const handlePrint = () => window.print();
  window.onafterprint = function () {
    window.close();
    window.location.href = ``;
  };
  const updateSidebarMode = (sidebarSettings) => {
    if (sidebarSettings.mode == "close") {
      let activeLayoutSettingsName = settings.activeLayout + "Settings";
      let activeLayoutSettings = settings[activeLayoutSettingsName];
      updateSettings({
        ...settings,
        [activeLayoutSettingsName]: {
          ...activeLayoutSettings,
          leftSidebar: {
            ...activeLayoutSettings.leftSidebar,
            ...sidebarSettings,
          },
        },
      });
    } else {
      routerHistory.push(navigatePath + "/dnoteview");
      // let activeLayoutSettingsName = settings.activeLayout + "Settings";
      // let activeLayoutSettings = settings[activeLayoutSettingsName];
      // updateSettings({
      //   ...settings,
      //   [activeLayoutSettingsName]: {
      //     ...activeLayoutSettings,
      //     leftSidebar: {
      //       ...activeLayoutSettings.leftSidebar,
      //       ...sidebarSettings,
      //     },
      //   },
      // });
    }
  };

  const [e1, setE1] = useState(false);
  const [e2, setE2] = useState(false);

  const editDelNote = () => {
    routerHistory.push(`/editDelivery/${id}`);
  };

  const openEdit = () => {
    setE1(!e1);
    setE2(false);
  };
  const openEditD = () => {
    setE2(!e2);
    setE1(false);
  };
  let subTotalCost = 0;
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
    <Card elevation={6} className="m-sm-30">
      <div className={clsx("invoice-viewer py-4", classes.invoiceViewer)}>
        <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
          <Link onClick={() => updateSidebarMode({ mode: "on" })}>
            <IconButton>
              <Icon>arrow_back</Icon>
            </IconButton>
          </Link>
          <div>
            <Button
              className="mr-4 py-2"
              color="primary"
              variant="outlined"
              onClick={() => {
                editDelNote();
              }}
            >
              EDIT
            </Button>
            <Button
              onClick={handlePrinting}
              className="py-2"
              color="secondary"
              variant="outlined"
            >
              PRINT DELIVERYNOTE
            </Button>
          </div>
        </div>

        <div
          id="print-area"
          ref={componentRef}
          style={{ fontFamily: "Calibri", fontSize: 16 }}
        >
          {pageNumber.map((item, i) => {
            if (i == 0) {
              pos = 1538;
            } else {
              pos = pos + 1590;
            }

            return (
              <span
                className="showPageNumber"
                style={{
                  position: "absolute",
                  top: pos,
                  left: "50%",
                  display: "none",
                }}
              >
                {" "}
                <center>{item}</center>
              </span>
            );
          })}

          <table>
            {/* <thead>
          <tr>
            <td>

           
            <div class="empty-header"> 

<div className="px-2 flex justify-between">
  <div className="flex">
    <div className="pr-12">
      <img src={logo} alt="this is car image" style={{ marginLeft: '15px', width: 237 }} />

    </div>
    
    <div className="viewer__order-info px-4 mb-4 flex justify-between">
    </div>
  </div>
  <div className="flex">
  <div>
    <h2 style={{color:'#1d2257',textAlign:'right'}}>
      
    شركة أماكو العربية للمقاولات</h2>

      <h3 style={{color:'#1d2257',textAlign:'right',fontSize:20}}>
        AMACO ARABIA CONTRACTING COMPANY
        
      </h3>
      <h5 style={{color:'#555',textAlign:'right',fontSize:17}} className="font-normal b-4 capitalize">
       C.R No. 2055003404 | VAT No. 310398615200003


      </h5>
      
    </div>
  </div>
</div>


</div>
</td>
</tr>
</thead>
 */}
            <Header></Header>

            {/* <hr></hr> */}
            <tbody>
              <tr>
                <td>
                  <div className="px-2 pt-5 flex justify-between">
                    <div className="flex">
                      <div className="pl-2 mb-4">
                        <h3 style={{ fontSize: 20 }}>
                          <strong>DELIVERY NOTE</strong>
                        </h3>
                        {/* <h4>DELIVERY NOTE</h4> */}
                        {vat}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 flex justify-between">
                    {/*         
        <div className="px-4 flex justify-between">
          
         
          </div>
          </div>








        <div className="px-2 flex justify-between">
            <div className="px-2 flex justify-end">
              <div className="flex " >
              <div className="">
              <div className="pl-2 pb-4">
              <span style={{fontWeight:1000}}>Customer Name</span>
              <br></br>
            {company}
        
            </div>
            <div className="pl-2 pb-4">
              <span style={{fontWeight:1000}}>Attention</span>
              <br></br>
              {attn?attn:"--"}
             
             
            </div>
            <div className="pl-2 ">
          
              <span style={{fontWeight:1000}}>P.O. Number</span>
              <br></br>
              {po}
            
            </div>
            </div>
            <div>
              </div>
              </div>
            </div>
            <div className="px-2 flex justify-left">
              <div className="flex " >
              <div className="">
              <div className="pl-2 pb-4">
              <span style={{fontWeight:1000}}>Delivery Date</span>
              <br></br>
              {moment(createdate).format('DD MMM YYYY')}
        
            </div>
            <div className="pl-2 pb-4">
              <span style={{fontWeight:1000}}>Delivery Number</span>
              <br></br>
              {deliveryno}
             
             
            </div>
            <div className="pl-2 ">
          
              <span style={{fontWeight:1000}}>Quotation Number</span>
              <br></br>
              {quotationno}
            
            </div>
            </div>
            <div>
              </div>
              </div>
            </div> */}

                    <div className="px-2 flex justify-left">
                      <div className="flex ">
                        <div className="">
                          <div className="pl-2">
                            <h5 style={{ fontWeight: 1000 }}></h5>
                            {/* {moment(createdate).format('DD MMM YYYY')} */}
                          </div>
                          <div className="pl-2 ">
                            <h5 style={{ fontWeight: 1000 }}></h5>
                            {/* {deliveryno} */}
                          </div>
                          <div className="pl-2 ">
                            <h5 style={{ fontWeight: 1000 }}></h5>
                            {/* {quotationno} */}
                          </div>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                  <Box
                    display="flex"
                    p={1}
                    bgcolor="background.paper"
                    className="pl-2 pr-2 flex justify-between"
                  >
                    <Grid container spacing={3} className="p-4">
                      <Grid
                        className="pl-2 pb-4 pr-2 mr-2"
                        xs={5}
                        style={{ wordBreak: "break-word" }}
                      >
                        <span style={{ fontWeight: 1000 }}>CUSTOMER NAME</span>
                        <br></br>
                        {company}
                      </Grid>
                      <Grid className="pl-0 pb-4" xs={4}>
                        <span style={{ fontWeight: 1000 }}>DELIVERY DATE</span>
                        <br></br>
                        {moment(createdate).format("DD MMM YYYY")}
                      </Grid>

                      <Grid className="pl-2 pb-4 pr-0 mr-1" align="right" xs>
                        <span style={{ fontWeight: 1000 }}>P.O. NUMBER</span>
                        <br></br>
                        {po ? po : "--"}
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    display="flex"
                    p={1}
                    bgcolor="background.paper"
                    className="pl-2 pr-2 flex justify-between"
                  >
                    <Grid container spacing={3} className="p-4">
                      <Grid
                        className="pl-2 pb-4 pr-2 mr-2"
                        xs={5}
                        style={{ wordBreak: "break-word" }}
                      >
                        <span style={{ fontWeight: 1000 }}>ATTENTION</span>
                        <br></br>
                        {attn ? attn : "--"}
                      </Grid>
                      <Grid className="pl-0 pb-4" xs={4}>
                        <span style={{ fontWeight: 1000 }}>
                          DELIVERY NUMBER
                        </span>
                        <br></br>
                        {deliveryno}
                      </Grid>
                      <Grid className="pl-2 pb-4 pr-0 mr-1" align="right" xs>
                        <span style={{ fontWeight: 1000 }}>
                          {s == "invoice"
                            ? "INVOICE NUMBER"
                            : "QUOTATION NUMBER"}
                        </span>
                        <br></br>
                        {quotationno}
                      </Grid>
                    </Grid>
                  </Box>

                  <Card
                    className="mb-4"
                    elevation={0}
                    title=""
                    borderRadius="borderRadius"
                  >
                    <div className="viewer__order-info px-4 mb-4 pt-5 flex justify-between">
                      <Table style={{ border: "1px solid #ccc", fontSize: 16 }}>
                        <TableHead
                          style={{
                            backgroundColor: "#1d2257",
                            display: "table-row-group",
                          }}
                        >
                          <TableRow style={{ border: "1px solid #ccc" }}>
                            <TableCell
                              className="pr-0"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: 1000,
                                fontSize: "11pt",
                              }}
                              align="center"
                            ><span style={{ fontSize: 16 }}>رقم</span>
                              <br></br> 
                              S.No.
                            </TableCell>
                            <TableCell
                              className="pr-0"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: 1000,
                                fontSize: "11pt",
                              }}
                              align="center"
                              colspan={3}
                            > <span style={{ fontSize: 16 }}>وصف</span>
                              <br></br> 
                              DESCRIPTION
                            </TableCell>

                            <TableCell
                              className="pr-0"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: 1000,
                                fontSize: "11pt",
                              }}
                              align="center"
                            >  <span style={{ fontSize: 16 }}>وحدة</span>
                              <br></br>
                              UOM
                            </TableCell>
                            <TableCell
                              className="pr-0"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: 1000,
                                fontSize: "11pt",
                              }}
                              align="center"
                            >
                             <span style={{ fontSize: 16 }}>كمية</span>
                              <br></br>
                              QTY
                            </TableCell>
                            <TableCell
                              className="pr-0"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: 1000,
                                fontSize: "11pt",
                              }}
                              align="center"
                            >
                             <span style={{ fontSize: 16 }}>الكمية المسلمة</span>
                              <br></br>
                              DELIVERED QTY
                            </TableCell>
                            <TableCell
                              className="pr-0"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: 1000,
                                fontSize: "11pt",
                              }}
                              align="center"
                            >
                             <span style={{ fontSize: 16 }}>تسليم الكمية</span>
                              <br></br>
                              DELIVERING QTY
                            </TableCell>
                            <TableCell
                              className="pr-0"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: 1000,
                                fontSize: "11pt",
                              }}
                              align="center"
                            >
                             <span style={{ fontSize: 16 }}>الرصيد الكمية</span>
                              <br></br>
                              BALANCE QTY
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {podetails.map((item, index) => {
                            return (
                              <TableRow
                                key={index}
                                style={{ border: "1px solid #ccc" }}
                              >
                                <TableCell
                                  className="pr-0"
                                  align="center"
                                  colspan={1}
                                  style={{
                                    border: "1px solid #ccc",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
                                >
                                  {index + 1}
                                </TableCell>

                                <TableCell
                                  className="pl-2 capitalize"
                                  align="left"
                                  colspan={3}
                                  style={{
                                    border: "1px solid #ccc",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
                                >
                                  {/* { localStorage.getItem('division')==1 ?  item[0]?.description ? item[0]?.description : item[0]?.description :item[0]?.description } */}
                                  {item[0]?.description}
                                </TableCell>

                                <TableCell
                                  className="pr-0 capitalize"
                                  align="center"
                                  style={{
                                    border: "1px solid #ccc",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
                                >
                                  {item[0].delivery_notes_detail.unit_of_measure
                                    ? item[0]?.delivery_notes_detail
                                        .unit_of_measure
                                    : item[0]?.delivery_notes_detail?.product
                                        ?.unit_of_measure}
                                </TableCell>
                                <TableCell
                                  className="pr-0 capitalize"
                                  align="center"
                                  style={{
                                    border: "1px solid #ccc",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
                                >
                                  {parseInt(
                                    item[0]?.total_quantity
                                  ).toLocaleString()}
                                </TableCell>
                                <TableCell
                                  className="pr-0 capitalize"
                                  style={{
                                    textAlign: "center",
                                    border: "1px solid #ccc",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
                                >
                                  {parseInt(
                                    item[0]?.total_delivered_quantity
                                  ).toLocaleString()}
                                </TableCell>
                                <TableCell
                                  className="pr-0 capitalize"
                                  style={{
                                    textAlign: "center",
                                    border: "1px solid #ccc",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
                                >
                                  {parseInt(
                                    item[0]?.delivering_quantity
                                  ).toLocaleString()}
                                </TableCell>
                                <TableCell
                                  className="pr-0 capitalize"
                                  style={{
                                    textAlign: "center",
                                    border: "1px solid #ccc",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
                                >
                                  {parseInt(
                                    parseInt(item[0]?.total_quantity) -
                                      parseInt(
                                        item[0]?.total_delivered_quantity
                                      ) -
                                      parseInt(item[0]?.delivering_quantity)
                                  ).toLocaleString() < 0
                                    ? 0
                                    : parseInt(
                                        parseInt(item[0]?.total_quantity) -
                                          parseInt(
                                            item[0]?.total_delivered_quantity
                                          ) -
                                          parseInt(item[0]?.delivering_quantity)
                                      ).toLocaleString()}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>

                    <br></br>
                    <div style={{
                        pageBreakInside: "avoid",
                      }}>
                        
                    <div
                      
                      className="viewer__order-info px-4 mb-4 flex justify-between"
                    >
                      <div className="ml-24" style={{ fontWeight: 1000 }}>
                        Prepared By{" "}
                        <span
                          id="none"
                          onClick={() => {
                            openEdit();
                          }}
                        >
                          <Icon style={{ fontSize: "15px" }}>edit</Icon>
                        </span>
                      </div>
                      <div className="ml-4" style={{ fontWeight: 1000 }}>
                        Delivered By
                        {e2 ? (
                          <>
                            <span
                              id="none"
                              onClick={() => {
                                changeSub1();
                              }}
                            >
                              &nbsp;{" "}
                              <Icon style={{ fontSize: "15px" }}>done</Icon>
                            </span>
                          </>
                        ) : (
                          <>
                            <span
                              id="none"
                              onClick={() => {
                                openEditD();
                              }}
                            >
                              &nbsp;{" "}
                              <Icon style={{ fontSize: "15px" }}>edit</Icon>
                            </span>
                          </>
                        )}
                      </div>
                      <div className="mr-24" style={{ fontWeight: 1000 }}>
                        <h5 style={{ fontWeight: 1000 }}>Received by</h5>
                      </div>
                    </div>
                    <div className="viewer__order-info px-4 mb-4  flex justify-between">
                      <div className="ml-4">
                        {!e1 && prepBy ? (
                          <center>
                            <div className="mr-14">
                              <h5
                                style={{ marginRight: "-246px" }}
                                className="font-normal  capitalize"
                              >
                                {prepBy}
                              </h5>
                            </div>
                          </center>
                        ) : (
                          <></>
                        )}
                        {e1 && (
                          <>
                            <Autocomplete
                              id="filter-demo"
                              variant="outlined"
                              style={{ minWidth: 300, maxWidth: "300px" }}
                              options={users}
                              getOptionLabel={(option) =>
                                option?.name ? option?.name : ""
                              }
                              filterOptions={(options, params) => {
                                const filtered = filter(options, params);
                                if (params.inputValue !== " ") {
                                  // filtered.unshift({
                                  //   inputValue: params.inputValue,
                                  //   firm_name: (<Button variant="outlined" color="primary" size="small" onClick={() => routerHistory.push(navigatePath + "/party/addparty")}>+Add New</Button>)
                                  // });
                                }
                                return filtered;
                              }}
                              onChange={(event, newValue) =>
                                changeData(event, newValue, "p")
                              }
                              size="small"
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Choose Prepared By"
                                />
                              )}
                            />
                          </>
                        )}
                      </div>
                      <div>
                        {!e2 && delBy ? (
                          <center>
                            <div className="mr-14">
                              <h5
                                style={{
                                  marginRight: e1
                                    ? "35px"
                                    : prepBy
                                    ? "-216px"
                                    : "-271px",
                                }}
                                className="font-normal  capitalize"
                              >
                                {delBy}
                              </h5>
                            </div>
                          </center>
                        ) : (
                          <></>
                        )}
                        {e2 && (
                          <>
                            <span
                              style={{
                                marginRight: "100",
                                position: "relative",
                                left: "88px",
                              }}
                            >
                              <Autocomplete
                                id="filter-demo"
                                variant="outlined"
                                style={{ minWidth: 300, maxWidth: "300px" }}
                                options={delBys}
                                freeSolo
                                value={delBy}
                                getOptionLabel={(option) =>
                                  option?.delevered_by
                                    ? option?.delevered_by
                                    : delBy
                                    ? delBy
                                    : ""
                                }
                                filterOptions={(options, params) => {
                                  const filtered = filter(options, params);
                                  if (params.inputValue !== " ") {
                                    filtered.unshift({
                                      inputValue: params?.inputValue,
                                      // firm_name: (<Button variant="outlined" color="primary" size="small" onClick={() => routerHistory.push(navigatePath + "/party/addparty")}>+Add New</Button>)
                                    });
                                  }
                                  return filtered;
                                }}
                                onInputChange={(event, newValue) =>
                                  changeData(event, newValue, "d")
                                }
                                onChange={(event, newValue) =>
                                  changeData(event, newValue, "d")
                                }
                                size="small"
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Choose Delivered By"
                                  />
                                )}
                              />
                            </span>
                          </>
                        )}
                      </div>
                      <div className="mr-14">
                        <h5 className="font-normal  capitalize">
                          Employee Name & ID:
                        </h5>

                        {/* <h5 align="center"> DIQ 5210 </h5> */}
                      </div>
                    </div>
                    </div>

                    <div style={{pageBreakInside:'avoid'}} className="viewer__order-info px-4 mb-4 pt-20 flex justify-between">
                      <div className="ml-4"></div>

                      <div className="mr-4">
                        <h5
                          className="font-normal t-4 capitalize"
                          style={{ textAlign: "center" }}
                        >
                          --------------------------------------------
                        </h5>
                        <h5
                          className="t-4 capitalize"
                          style={{ textAlign: "center", fontWeight: 1000 }}
                        >
                          (Sign & Stamp)
                        </h5>
                    </div>
                    </div>
                    <div></div>
                  </Card>
                  <div></div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <div class="empty-footer"></div>
            </tfoot>
          </table>

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
                    Tel.: +966 13 363 2387| Fax: +966 13 363 2387 | P.O.Box 7452
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
            {/* <Footer></Footer> */}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InvoiceViewer;
