import React, { useState, useEffect, useRef } from "react";
import {
  Icon,
  Divider,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Card,
  Button,
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { getInvoiceById, navigatePath } from "./InvoiceService";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
// import Rfqprint from "./Rfqprint"
import "bootstrap/dist/css/bootstrap.min.css";
import { cond, identity } from "lodash";
import logo from "./amaco-logo.png";
import logos from "./vision2030.png";
import useSettings from "../../hooks/useSettings";
import { useHistory } from "react-router";
import url from "../invoice/InvoiceService";
import Arabic from "../../../lang/ar.json";
import { IntlProvider } from "react-intl";
import { FormattedMessage } from "react-intl";
import Swal from "sweetalert2";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import Header from "../statements/Header";
import Footer from "../statements/Footer";
import "../Newinvoice/print.css";
const locale = navigator.language;

// import Image from 'react-image-resizer';

const useStyles = makeStyles(({ palette, ...theme }) => ({
  "@global": {
    "@media print": {
      "@page": {
        "@bottom-left": {
          content: "counter(page)",
        },
      },

      "body, html": {
        visibility: "hidden",
        size: "auto",
        marginTop: "10px",

        // content: 'none !important',
        // "-webkit-print-color-adjust": "exact !important",
      },

      "#header": {
        // padding: "10px",

        /* These do the magic */
        position: "fixed",
        //top: '1em',
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

const InvoiceViewer = ({ toggleInvoiceEditor }) => {
  const [state, setState] = useState({});
  const componentRef = useRef();
  const [rfq, setrfq] = useState([]);
  const [rdate, setrdate] = useState([]);
  const [ddate, setddate] = useState([]);
  const [cname, setcname] = useState([]);
  const [email, setemail] = useState(" ");
  const [company, setcompany] = useState("");
  const [city, setcity] = useState("");
  const [street, setstreet] = useState("");
  const [pono, setpo] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [vatno, setvatno] = useState("");
  const [regno, setregno] = useState("");
  const [rfq_details, setrfqdetails] = useState([]);
  const [files, setfiles] = useState([]);
  const [images, setimages] = useState([]);
  const [pdf, setpdf] = useState([]);
  const [contact, setcontact] = useState("");
  const [firm_name, setfirm_name] = useState("");
  const [contactperson, setcontactperson] = useState("");
  const [contactpersonemail, setcontactpersonemail] = useState("");
  const [contactpersoncontact, setcontactpersoncontact] = useState("");
  const [vendor_id, setvendor_id] = useState("");
  const [designation, setdesignation] = useState("");
  const [pageNumber, setPageNumber] = useState([]);

  let pos = 0;

  const { id, search } = useParams();
  const classes = useStyles();
  const { settings, updateSettings } = useSettings();
  // Menu Button function
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  const i = 0;

  const handlePrintingCur = useReactToPrint({
    content: () => componentRef.current,
    header: () => componentRef.current,
  });
  const routerHistory = useHistory();

  const handlePrinting = () => {
    var totalPages = Math.ceil(componentRef.current.scrollHeight / 1123);
    console.log(totalPages);
    // totalPages = totalPages - 2
    let a = [];
    for (var i = 0; i < totalPages; i++) {
      var j = i;
      j = ++j;
      var q = "Page " + j + " of " + totalPages;
      a[i] = q;
    }
    console.log(a);
    setPageNumber(a);
    setTimeout(() => {
      handlePrintingCur();
    }, 500);
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
      window.location.href = "../sales/rfq-form/rfqview";
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
    }
  };

  useEffect(() => {
    // updateSidebarMode({ mode: "close" })

    document.title = "Request for quoatation - Amaco";
    url.get("rfq/" + id).then(({ data }) => {
      setrdate(moment(data[0].requested_date).format("DD MMM YYYY"));
      setddate(moment(data[0].require_date).format("DD MMM YYYY"));
      setcname(data[0]?.party[0]?.fname);
      setcompany(data[0]?.party[0]?.firm_name);
      setfirm_name(data[0]?.party[0]?.firm_name_in_ar);
      setcity(data[0]?.party[0]?.city);
      setstreet(data[0]?.party[0]?.street);
      setzipcode(data[0]?.party[0]?.zip_code);
      setpo(data[0]?.party[0]?.post_box_no);
      setvatno(data[0]?.party[0]?.vat_no);
      setregno(data[0]?.party[0]?.registration_no);
      setcontactperson(data[0]?.contact?.fname);
      setcontactpersonemail(data[0]?.contact?.email);
      // console.log('ss', data[0])
      setcontactpersoncontact(data[0]?.contact?.mobno);
      setdesignation(data[0]?.contact?.designation);

      setrfqdetails(data[0]?.rfq_details);

      setfiles(data[0].files);
      setcontact(data[0]?.party[0]?.contact);
      setvendor_id(data[0]?.party[0]?.vendor_id);
      // for (var a = 0; a < data[0].files.length; a++) {
      //
      //   var words = data[0].files[a].file_name.split('.');

      // }
    });
    url.get("rfq/" + id).then(({ data }) => {});

    // if (id !== "add")
    //   getInvoiceById(id).then((res) => {
    //     setState({ ...res.data });
    //   });
  }, []);
  const deleteRfq = () => {
    handleClose();
    Swal.fire({
      title: "Are you sure?",
      text: "You want move RFQ Details to trash !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Move it!",
      icon: "warning",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        url.delete(`rfq/${id}`).then((res) => {
          Swal.fire("Moved to Trash !", " RFQ has been moved to trash.", "success");

          routerHistory.push(navigatePath + "/sales/rfq-form/rfqview");
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your RFQ is safe :)", "error");
      }
    });

    // url.delete(url + "rfq/" + id).then(({ data }) => {

    // })
  };
  const handlePrint = () => window.print();
  window.onafterprint = function () {
    window.close();
    window.location.href = ``;
  };
  const updateRfq = () => {
    // updateSidebarMode({ mode: "close" })
    // window.location.href = `../edit/${id}`
    routerHistory.push(`../edit/${id}`);
  };

  const restoreRfq = () => {
    handleClose();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to recover this RFQ!",
      icon: "danger",
      showCancelButton: true,
      confirmButtonText: "Yes",
      icon: "warning",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        url.put(`rfqRecover/${id}`).then((res) => {
          Swal.fire("Recovered!", " RFQ has been Recovered.", "success");

          routerHistory.push(navigatePath + "/sales/rfq-form/rfqview");
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "", "error");
      }
    });
  };

  const deleteTrueRfq = () => {
    handleClose();
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this RFQ!",
      icon: "danger",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      icon: "warning",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        url.delete(`rfqdelete/${id}`).then((res) => {
          Swal.fire("Deleted!", " RFQ has been deleted.", "success");

          routerHistory.push(navigatePath + "/sales/rfq-form/rfqview");
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your RFQ is safe :)", "error");
      }
    });

    // url.delete(url + "rfq/" + id).then(({ data }) => {

    // })
  };
  const quoteView = (sidebarSettings) => {
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

    routerHistory.push(navigatePath + `/purchaseanalysis/${id}`);
    // window.location.href = `/purchaseanalysis/${id}`
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
    <Card className={clsx("invoice-viewer py-4", classes.invoiceViewer)}>
       
      <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
        <Link to={  search == 'po' ? navigatePath + "/sales/rfq-form/rfqview/2" : navigatePath + "/sales/rfq-form/rfqview/0" }>
          <IconButton>
            <Icon>arrow_back</Icon>
          </IconButton>
        </Link>
        {search == 'po' ? '' : 
        <div>
          <Button
            variant="outlined"
            color="primary"
            className="mr-4 py-2"
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            ACTION<Icon>expand_more</Icon>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
          
            {search ? (
              <>
                <MenuItem onClick={() => deleteTrueRfq()}>DELETE RFQ</MenuItem>
                <MenuItem onClick={() => restoreRfq()}>RESTORE RFQ</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={() => deleteRfq()}>DELETE RFQ</MenuItem>
                <MenuItem onClick={ handlePrinting}>PRINT RFQ</MenuItem>
                <MenuItem onClick={() => updateRfq()}>EDIT RFQ</MenuItem>
              </>
            )}
          </Menu>
          {!search && (
            <Button
              className="mr-4 py-2"
              color="warnning"
              variant="outlined"
              onClick={() => quoteView({ mode: "on" })}
            >
              GENERATE PURCHASE ORDER
            </Button>
          )}
        </div> }
      </div>

      <div
        id="print-area"
        ref={componentRef}
        style={{ fontFamily: "Calibri", fontSize: 16 }}
      >
        {pageNumber.map((item, i) => {
          if (i == 0) {
            pos = 1535;
          } else {
            pos = pos + 1563;
          }

          return (
            <span
              className="showPageNumber"
              style={{
                position: "relative",
                top: pos,
                display: "none",
              }}
            >
              {" "}
              <center>{item}</center>
            </span>
          );
        })}
        <table>
          {/* <thead style={{display:"table-header-group"}} >
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
</thead> */}
          <Header></Header>

          {/* <hr></hr> */}
          <tbody style={{ marginBottom: "50px" }}>
            <tr>
              <td>
                {/* <div className="viewer__order-info px-4 mb-4 flex justify-between">
          
          <div>
          <div>
        <tr style={{ height: 5, fontSize: 13, textAlign: 'right'}}>
            <h5 className="font-normal t-4 capitalize">
              <strong>Buyer Details</strong>{" "}
            </h5>
            </tr>
        </div>
            <tr style={{ height: 5, fontSize: 13, textAlign: 'left'}}>
              <td style={{ height: 'auto !important' }}><strong>Attn.</strong></td>
              <td style={{ height: 'auto !important' }}>{contactperson}</td>
            </tr>
            <tr style={{ height: 5, fontSize: 13, textAlign: 'left'}}>
              <td style={{ height: 'auto !important' }}><strong>Designation</strong>&nbsp;</td>
              <td style={{ height: 'auto !important' }}>{designation}</td>
            </tr>
            <tr style={{ height: 5, fontSize: 13, textAlign: 'left'}}>
              <td style={{ height: 'auto !important' }}><strong>Company</strong></td>
              <td style={{ height: 'auto !important' }}>{company}</td>
            </tr>
            <tr style={{ height: 5, fontSize: 13, textAlign: 'left'}}>
              <td style={{ height: 'auto !important' }}><strong>Address</strong></td>
              <td style={{ height: 'auto !important' }}>{street}-{city},{pono} {zipcode}</td>
            </tr>
            <tr style={{ height: 5, fontSize: 13, textAlign: 'left'}}>
              <td style={{ height: 'auto !important' }}><strong>Email-Id</strong></td>
              <td style={{ height: 'auto !important' }}>{contactpersonemail}</td>
            </tr>
            <tr style={{ height: 5, fontSize: 13, textAlign: 'left'}}>
              <td style={{ height: 'auto !important' }}><strong>Contact</strong></td>
              <td style={{ height: 'auto !important' }}>{contactpersoncontact}</td>
            </tr>
            
            
            <tr style={{ height: 5, fontSize: 13, textAlign: 'left'}}>
              <td style={{ height: 'auto !important' }}><strong>C.R No</strong></td>
              <td style={{ height: 'auto !important' }}>{regno}</td>
            </tr>
            <tr style={{ height: 5, fontSize: 13, textAlign: 'left'}}>
              <td style={{ height: 'auto !important' }}><strong>VAT No</strong></td>
              <td style={{ height: 'auto !important' }}>{vatno}</td>
            </tr>
            
            
            
            
            
        



          </div>
        

          <div className="text-right">
          <div>
            <tr>
              <td>
                <h5 className="font-normal capitalize">
                  <strong>Supplier Details </strong>{" "}
                </h5>
              </td>
            </tr>
            </div>
            <tr style={{ height: 5, fontSize: 13, textAlign: 'left'}}>
              <td><strong>Submitted By</strong>&nbsp;</td>
              <td >Mr.Abbas Ahamed Shazli</td>
            </tr>
            <tr style={{ height: 5, fontSize: 13,textAlign: 'left' }}>
              <td ><strong>Designation</strong></td>
              <td >Business Development Manager - ISD Division</td>
            </tr>
            <tr style={{ height: 5, fontSize: 13,textAlign: 'left' }}>
              <td><strong>Company</strong></td>
              <td>AMACO ARABIA CONTRACTING COMPANY</td>
            </tr>
            <tr style={{ height: 5, fontSize: 13,textAlign: 'left' }}>
              <td><strong>Address</strong></td>
              <td>PO BOX 7452, AI Jubail 31951, KSA</td>
            </tr>
            <tr style={{ height: 5, fontSize: 13,textAlign: 'left'}}>
              <td><strong>E-mail ID</strong></td>
              <td>ABBAS@AMACO.COM.SA</td>
            </tr>
            <tr style={{ height: 5, fontSize: 13,textAlign: 'left' }}>
              <td><strong>Mob/Tel</strong></td>
              <td>535515212</td>
            </tr>
            <tr style={{ height: 5, fontSize: 13,textAlign: 'left' }}>
              <td><strong>Vendor Id.</strong></td>
              <td>{vendor_id}</td>
            </tr>

            
          </div>
        </div>

        
        <div className="viewer_actions px-4  flex items-center justify-between">
          <div>
            <h5>RFQ No. : {id}</h5>
         </div>
         <div>
            <h5>RFQ DATE: {rdate}</h5>
            </div>
         <div>
         
            <h5>BID CLOSING DATE: {ddate}</h5>
        </div>
      </div> */}
                <div className="px-2 flex justify-between">
                  <div className="px-2 flex justify-end">
                    <div className="flex ">
                      <div className="">
                        <div className="pl-2 pb-4">
                          <span style={{ fontWeight: 1000 }}>
                            SUPPLIER NAME
                          </span>
                          <br></br>
                          {company ? company : '---'}
                        </div>
                        <div className="pl-2 pb-4 ">
                          <span style={{ fontWeight: 1000 }}>EMAIL ID</span>
                          <br></br>
                          {contactpersonemail ? contactpersonemail : '---'}
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div className="px-2 flex justify-left">
                    <div className="flex ">
                      <div className="">
                        <div className="pl-2 pb-4">
                          <span style={{ fontWeight: 1000 }}>RFQ DATE</span>
                          <br></br>
                          {moment(rdate).format("DD MMM YYYY")}
                        </div>
                        <div className="pl-2 pb-4 ">
                          <span style={{ fontWeight: 1000 }}>
                            BID CLOSING DATE
                          </span>
                          <br></br>
                          {moment(ddate).format("DD MMM YYYY")}
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>

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

                <Card className="mb-4" elevation={0}>
                  <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
                    <Table>
                      <TableHead
                        style={{
                          border: "1px solid #ccc",
                          fontFamily: "Calibri",
                          backgroundColor: "#1d2257",
                          fontWeight: 1000,
                          fontSize: 16,
                        }}
                      >
                        <TableRow
                          style={{
                            border: "1px solid #ccc",
                            fontFamily: "Calibri",
                            color: "#fff",
                            fontWeight: 1000,
                            fontSize: 16,
                          }}
                        >
                          <TableCell
                            className="pl-0"
                            colspan={1}
                            align="center"
                            style={{
                              border: "1px solid #ccc",
                              fontFamily: "Calibri",
                              color: "#fff",
                              fontWeight: 1000,
                              fontSize: 16,
                            }}
                          >
                           <span style={{ fontSize: 16 }}>رقم</span>
                              <br></br>
                            S.No.
                          </TableCell>
                          <TableCell
                            className="px-0"
                            colspan={3}
                            align="center"
                            style={{
                              border: "1px solid #ccc",
                              fontFamily: "Calibri",
                              color: "#fff",
                              fontWeight: 1000,
                              fontSize: 16,
                            }}
                          >
                          <span style={{ fontSize: 16 }}>وصف</span>
                              <br></br>
                            DESCRIPTION
                          </TableCell>
                          <TableCell
                            className="px-0"
                            align="center"
                            style={{
                              border: "1px solid #ccc",
                              fontFamily: "Calibri",
                              color: "#fff",
                              fontWeight: 1000,
                              fontSize: 16,
                            }}
                          >
                          <span style={{ fontSize: 16 }}>كمية</span>
                              <br></br>
                            QTY
                          </TableCell>
                          <TableCell
                            className="px-0"
                            align="center"
                            style={{
                              border: "1px solid #ccc",
                              fontFamily: "Calibri",
                              color: "#fff",
                              fontWeight: 1000,
                              fontSize: 16,
                            }}
                          >
                             <span style={{ fontSize: 16 }}>وحدة</span>
                              <br></br> UOM
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rfq_details?.map((item, index) => {
                          subTotalCost += item.unit * item.price;

                          return (
                            <TableRow key={index}>
                              <TableCell
                                className="pr-0 capitalize"
                                align="left"
                                colspan={1}
                                align="center"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  color: "#000",
                                  fontSize: 16,
                                }}
                              >
                                {index + 1}
                              </TableCell>

                              <TableCell
                                className="pr-0 pl-2 capitalize"
                                align="left"
                                colspan={3}
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  color: "#000",
                                  fontSize: 16,
                                }}
                              >
                                <strong>{item?.product_name}</strong>(
                                {item?.description})
                                {/* <strong></strong>({item?.description}) */}
                              </TableCell>

                              <TableCell
                                className="pr-0 capitalize"
                                align="center"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  color: "#000",
                                  fontSize: 16,
                                }}
                              >
                              {parseFloat(item?.quantity).toLocaleString(undefined, { minimumFractionDigits: 0})}
                              </TableCell>
                              <TableCell
                                className="pr-0 capitalize"
                                align="center"
                                style={{
                                  border: "1px solid #ccc",
                                  fontFamily: "Calibri",
                                  color: "#000",
                                  fontSize: 16,
                                }}
                              >
                                {item?.unit_of_measure}
                              </TableCell>

                              {/* <TableCell className="pl-0 capitalize" align="left">
                      {item.product[0].unit_price}
                    </TableCell> */}
                              {/* <TableCell className="pl-0">
                      <Link to={"/sales/rfq-form/rfqanalysis"}>
                        <Icon>search</Icon>
                      </Link>
                    </TableCell> */}
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <div class="empty-footer"></div>
          </tfoot>
        </table>
        <div class="footer">
          {/* <footer style={{visibility: "hidden" }}>
      
        
    
        <div >
        <div id="outer" style={{"position": "relative", width:'1050px', backgroundColor:'#c1c1c1',"transform": "skew(-20deg)",marginLeft:'40px',marginRight:'50px'}}>
        <p style={{color:'#fff',paddingTop:5,paddingBottom:5,"transform": "skew(20deg)"}} align="center"> Tel.: +966 13 363 2387| Fax: +966 13 363 2387 | P.O.Box 9290 | Jubail 31951 | Kingdom of Saudi Arabia</p>
        <div id="spacer" style={{width: "200px", height: "10px", marginRight:0,}}></div>
        <div style={{"position": "fixed", bottom: 0, width: "100%", height: 30, backgroundColor:"#1d2257",}}> <p   style={{textAlign: 'center',color:'white',fontFamily: "Calibri",paddingTop:5,paddingBottom:10,"transform": "skew(20deg)"}}>E-mail: sales@amaco.com.sa | Website: www.amaco.com.sa</p></div>
    </div> 
           </div>
        <h6> </h6>
        
        
        </footer> */}
          <Footer></Footer>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap justify-center items-center m--2">
          {files.map((item, index) => (
            <Card
              elevation={6}
              className={clsx({
                "flex-column justify-center items-center py-6 px-8 m-2 cursor-pointer": true,
              })}
            >
              {item.file_name.split(".")[1] === "jpg" && (
                <Icon>photo_library</Icon>
              )}
              {item.file_name.split(".")[1] === "png" && (
                <Icon>photo_library</Icon>
              )}
              {item.file_name.split(".")[1] === "pdf" && (
                <Icon>picture_as_pdf</Icon>
              )}

              <a href={item.img_url} target="_blank">
                {item.file_name.split("/")[2]}
              </a>
              {/* <a href={"https://www.amacoerp.com/amaco/php_file/images/" + id + "/" + item.file_name} target="_blank">{item.file_name}</a> */}
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default InvoiceViewer;
