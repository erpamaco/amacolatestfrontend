import React, { useState, useEffect, useRef } from "react";
import { borders } from "@material-ui/system";
import converter from "number-to-words";
import Arabic from "../../../lang/ar.json";
import Box from "@material-ui/core/Box";
import { IntlProvider, FormattedNumber } from "react-intl";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useReactToPrint } from "react-to-print";
import { numberToWords } from "number-to-words";
import "./print.css";
// import DeleteComment from "./DeleteComment";
import Alert from "@mui/material/Alert";

// import { IntlProvider } from "react-intl-number-format"
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { useHistory } from "react-router";
// import translate from 'google-translate-api';
import { Translator, Translate } from "react-auto-translate";
import { toArabic } from "arabic-digits";
import Header from "./Header";
import Footer from "./Footer";
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
import {
  ApiKey,
  basePath,
  getInvoiceById,
  navigatePath,
} from "../invoice/InvoiceService";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import { cond, result } from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import url from "../invoice/InvoiceService";
import logo from "./../invoice/amaco-logo.png";
import NLogo from "./am.png";

import logos from "./../invoice/vision2030.png";

import Swal from "sweetalert2";
import useSettings from "../../hooks/useSettings";
import { setCORS } from "google-translate-api-browser";
import { ToWords } from "to-words";
import translate from "translate-google-api";
import Axios from "axios";
import QRCode from "qrcode.react";

// import translate from 'google-translate-api'
// const translate = require('google-translate-api');
const locale = navigator.language;
// const translate = require('google-translate-api');
const config = {
  headers: {
    "content-type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    method: "GET",
  },
};
// const translate = require('google-translate-open-api').default;

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
      "#pageCut": {
        height: 80,
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
      "#noprint": {
        visibility: "hidden",
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

const InvoiceViewer = ({ toggleInvoiceEditor ,data}) => {
  const [state, setState] = useState({});
  const [rfq, setrfq] = useState([]);
  const [rdate, setrdate] = useState([]);
  const [ddate, setddate] = useState([]);
  const [cname, setcname] = useState([]);
  const [cname_ar, setcname_ar] = useState([]);
  const [company, setcompany] = useState("");
  const [city, setcity] = useState("");
  const routerHistory = useHistory();

  const [city_ar, setcity_ar] = useState("");
  const [street, setstreet] = useState("");
  const [street_ar, setstreet_ar] = useState("");
  const [pono, setpo] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [vatno, setvatno] = useState("");
  const [vatno_ar, setvatno_ar] = useState("");
  const [podetails, setpodetails] = useState([]);
  const [quoteno, setquoteno] = useState("");
  const [vat_in_value, setvat_in_value] = useState("");
  const [total_value, settotal_value] = useState("");
  const [net_amount, setnet_amount] = useState(0);
  const [firm_name_in_ar, setfirm_name_in_ar] = useState("");
  const [invoiceno, setinvoiceno] = useState("");
  const [issue_date, setissue_date] = useState("");
  const [dis_per, setdis_per] = useState(0);
  const [res, setres] = useState(false);
  const [ress, setress] = useState("");
  const { id, del } = useParams();
  const classes = useStyles();
  const { settings, updateSettings } = useSettings();
  const [arcompany, setarcompany] = useState("");
  const [araddress, setaraddress] = useState("");
  const [quoteid, setquoteid] = useState("");
  const [companyaddress, setcompanyaddress] = useState("");
  const componentRef = useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [qrValue, setQrValue] = useState("");

  const [pageNumber, setPageNumber] = useState([]);

  let pos = 0;

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  const handlePrintingCur = useReactToPrint({
    content: () => componentRef.current,
    header: () => componentRef.current,
  });

  const handlePrinting = () => {
    var totalPages = Math.ceil(componentRef.current.scrollHeight / 1123);
    console.log(componentRef.current.scrollHeight);
    // totalPages = totalPages - 2

    if (componentRef.current.scrollHeight < 1512) {
      totalPages = 1;
      // totalPages = totalPages - 2+1
    }
    // console.log('E')
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

  function handleClose() {
    setAnchorEl(null);
  }
  const ans = new Intl.NumberFormat("en-IN", {
    notation: "compact",
    compactDisplay: "short",
    style: "currency",
    currency: "INR",
  })
    .format(1000)
    .replace("T", "K");

  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
    },
  });
  let fval;
  const myFunction = async () => {
    const result = await translate(`I'm fine.`, {
      tld: "cn",
      to: "ar",
      proxy: {
        host: "127.0.0.1",
        port: 9000,
        auth: {
          username: "mikeymike",
          password: "rapunz3l",
        },
      },
    });
  };

  const [vatExclude, setVatExclude] = useState(false);

  const [buildNumber, setBuildNumber] = useState("");
  const [post_box_no, setpost_box_no] = useState("");
  const [country, setcountry] = useState("");
  const [bank, setBank] = useState([]);
  const [sign, setSignature] = useState([]);
  const [comment, setComment] = useState("");
  const [aprove, setApprove] = useState("");
  const [sstatus, setSStatus] = useState("");

  useEffect(() => {
    myFunction();
    // translate('Ik spreek Engels', {to: 'en'}).then(res => {

    //   //=> I speak English

    //   //=> nl
    //   }).catch(err => {

    //   });

    // url.get(`https://api.mymemory.translated.net/get?q=Hello%20World!&langpair=en|ar`).then(({ data }) => {

    // })

    url.get("signature").then(({ data }) => {
      setSignature(data);
    });

    // url.get("invoice/" + id).then(({ data }) => {
      console.log(data);
      if (data) {
        setBank(data[4]?.[0]);
        document.title =
          "AMACO-" + data[0].invoice_no + "-" + data[0].party?.firm_name;
        setquoteid(data[0].quotation_id ? data[0].quotation_id : id);
        setComment(data[0].comment ? data[0].comment : "");
        data[0].quotation_id ? setres(true) : setres(false);
        setdis_per(data[0].discount_in_percentage);
        setApprove(data[0].approve);

        setSStatus(data[0]?.submit_status);
        setVatExclude(parseInt(data[0].exclude_from_vat) ? true : false);
        setpodetails(data[0].invoice_detail);
        setcompany(data[0].party?.firm_name);

        setBuildNumber(data[0]?.party?.building_no);
        setpost_box_no(data[0]?.party?.post_box_no);
        setcountry(data[0]?.party?.country);

        setcname_ar(data[0].party?.firm_name_in_ar);
        setcity(data[0].party?.city);
        setstreet(data[0].party?.street);
        setzipcode(data[0].party?.zip_code);
        setpo(
          data[0].po_number == 'null' ? '' : data[0].po_number ? data[0].po_number : data[0]?.quotation ? data[0]?.quotation?.po_number == 'null' ? '' : data[0]?.quotation?.po_number : ''
        );
        setvatno(data[0].party?.vat_no);
        setvatno_ar(toArabic(data[0].party?.vat_no));
        setinvoiceno(data[0].invoice_no);
        setissue_date(data[0].issue_date);
        setvat_in_value(data[0].vat_in_value);
        setnet_amount(data[0].grand_total);
        settotal_value(data[0].total_value);
        setfirm_name_in_ar(data[0].party?.firm_name_in_ar);
        let words = toWords?.convert(parseFloat(data[0]?.grand_total));
        let riyal = words.replace("Rupees", "Riyals");
        let halala;
        let words1 = numberToWords.toWords(data[0].grand_total);
        let decimal = parseFloat(
          parseFloat(data[0].grand_total).toFixed(2).split(".")[1]
        );
        setress(
          words1.split(",").join(" ") +
            " Riyals" +
            (parseFloat(data[0].grand_total.split(".")[1]) !== NaN
              ? parseFloat(data[0].grand_total.split(".")[1]) == 0.0
                ? "."
                : " & " + (numberToWords?.toWords(decimal) + " Halalas.")
              : " ")
        );
        if (parseFloat(data[0].grand_total) % 1 === 0) {
          halala = riyal.replace("Paise", "Halala");
        } else {
          halala = riyal.replace("Paise", "Halalas");
        }

        setQrValue(
          "Amaco Arabia Contracting Company" +
            "                                                         " +
            "شركة أماكو العربية للمقاولات" +
            "                                                                                                                                    VAT NUMBER: " +
            310398615200003 +
            "                                              " +
            "DATE:  " +
            data[0].issue_date +
            "                                              INVOICE NUMBER:   " +
            data[0].invoice_no +
            "                                              VAT AMOUNT:   " +
            parseFloat(data[0].vat_in_value).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            }) +
            " SAR" +
            "                                              GRAND TOTAL:  " +
            parseFloat(data[0].grand_total).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            }) +
            " SAR"
        );
        setQrValue(
          "Amaco Arabia Contracting Company" +
            "                                                         " +
            "شركة أماكو العربية للمقاولات" +
            "                                                                                                                                    VAT NUMBER: " +
            310398615200003 +
            "                                              " +
            "DATE: " +
            data[0].issue_date +
            "                                              INVOICE NUMBER: " +
            data[0].invoice_no +
            "                                              VAT AMOUNT: " +
            parseFloat(data[0].vat_in_value).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            }) +
            " SAR" +
            "                                              GRAND TOTAL: " +
            parseFloat(data[0].grand_total).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            }) +
            " SAR"
        );
        setQrValue(
          "Amaco Arabia Contracting Company" +
            "                                                         " +
            "شركة أماكو العربية للمقاولات" +
            "                                                                                                                                    VAT NUMBER: " +
            310398615200003 +
            "                                              " +
            "DATE:  " +
            data[0].issue_date +
            "                                              INVOICE NUMBER: " +
            data[0].invoice_no +
            "                                              VAT AMOUNT: " +
            parseFloat(data[0].vat_in_value).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            }) +
            " SAR" +
            "                                              GRAND TOTAL: " +
            parseFloat(data[0].grand_total).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            }) +
            " SAR"
        );

        // setress(halala);
        setstreet_ar(data[0]?.party?.street_ar);
        setcity_ar(data[0]?.party?.city_ar);
        const arr =
          data[0]?.party?.street +
          data[0]?.party?.city +
          data[0]?.party?.zip_code;
        // console.log(arr)
        //         Axios.post(`https://translation.googleapis.com/language/translate/v2?key=${ApiKey}&q=${data[0].party?.street}&target=ar`, {
        //       method: 'POST',
        //       headers: {
        //         "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
        // "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
        // "Access-Control-Max-Age": 86400
        //       },
        //     })
        //       .then(({ data }) => {
        //           setstreet(data.data.translations[0].translatedText);
        //           // console.log(data.data.translations[0].translatedText);

        //       })
      }
      //     Axios.post(`https://translation.googleapis.com/language/translate/v2?key=${ApiKey}&q=${data[0].party?.city}&target=ar`, {
      //       method: 'POST',
      //       headers: {
      //         "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
      // "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
      // "Access-Control-Max-Age": 86400
      //       },
      //     })
      // .then(({ data }) => {
      //     setcity(data.data.translations[0].translatedText);
      //     // console.log(data.data.translations[0].translatedText);

      // })
    // });
  }, [id]);
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
      routerHistory.push(navigatePath + "/inv");
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

  const counter = (i) => {
    ++i;
  };
  const dnotegenrate = (sidebarSettings) => {
    if (res) {
      routerHistory.push(navigatePath + `/dnote/${quoteid}`);
    } else {
      routerHistory.push(navigatePath + `/invoice_dnote/${id}`);
    }
  };
  const invoicegenrate = (sidebarSettings) => {
    // alert(id)
    const postatus = {
      status: "po",
    };
    // let url = `https://jsonplaceholder.typicode.com/users/${id}`
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'You want to convert this quotation into Purchase Order !',
    //   icon: 'danger',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes,!',
    //   icon: 'warning',
    //   cancelButtonText: 'No, keep it'
    // }).then((result) => {
    //   if (result.value) {

    //     url.put(url + '/' + id, postatus)
    //       .then(res => {

    //  let activeLayoutSettingsName = settings.activeLayout + "Settings";
    //         let activeLayoutSettings = settings[activeLayoutSettingsName];
    //         updateSettings({
    //           ...settings,
    //           [activeLayoutSettingsName]: {
    //             ...activeLayoutSettings,
    //             leftSidebar: {
    //               ...activeLayoutSettings.leftSidebar,
    //               ...sidebarSettings,
    //             },
    //           },
    //         });
    url.put("invoice/" + id).then((res) => {
      window.location.href = `../invview/${id}`;
      //   Swal.fire(
      //     'PO!',
      //     ' has been generated.',
      //     'success'
      //   )
    });

    // } else if (result.dismiss === Swal.DismissReason.cancel) {
    //   Swal.fire(
    //     'Cancelled',
    //     '........:)',
    //     'error'
    //   )
    // }
    // })
  };

  const aproveStatus = (st) => {
    Swal.fire({
      title: "Are you sure?",
      text:
        st === "0"
          ? "Do you want to Reject this Invoice ?"
          : "Do you want to Approve this Invoice ?",
      // icon: 'danger',
      showCancelButton: true,
      confirmButtonText: "Yes",
      icon: "warning",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        const arr = {
          data: st,
        };
        url
          .post(`updateApproveRejectStatus/${id}`, arr)
          .then(() => {
            if (st == "0") {
              Swal.fire(
                "Rejected!",
                "Invoice has been Moved to Trash.",
                "success"
              );
            } else {
              Swal.fire("Approved!", "Invoice has been Approved.", "success");
            }
          })
          .catch(() => {});
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "", "error");
      }
    });
  };

  const [dcDailog, setDcDailog] = useState(false);
  const [dcComment, setDcComment] = useState("");

  const deleteinvoice = () => {
    handleClose();
    setDcDailog(true);
  };

  const callDeleteFun = (comment) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do You Want To Move This Invoice To Trash!",
      // icon: 'danger',
      showCancelButton: true,
      confirmButtonText: "Yes, Move it!",
      icon: "warning",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        url.delete(`invoiceDelete/${id}/${comment}`).then(({ res }) => {
          Swal.fire("Moved!", "Invoice has been Moved to Trash.", "success");

          routerHistory.push(navigatePath + "/inv/1");
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Invoice is safe :)", "error");
      }
    });
  };

  const closeDeleteDialog = () => {
    setDcDailog(false);
    callDeleteFun(dcComment);
  };

  const deleteSinv = () => {
    handleClose();
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Invoice!",
      // icon: 'danger',
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      icon: "warning",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        url.delete(`deleteSinv/${id}`).then((res) => {
          Swal.fire("Moved!", "Invoice has been Deleted.", "success");

          routerHistory.push(navigatePath + "/inv");
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Invoice is safe :)", "error");
      }
    });
  };

  const restoreSInv = () => {
    handleClose();
    Swal.fire({
      title: "Are you sure?",
      text: "Do You Want Restore this Invoice!",
      // icon: 'danger',
      showCancelButton: true,
      confirmButtonText: "Yes, Restore it!",
      icon: "warning",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        url
          .put(`restoreSInv/${id}/${localStorage.getItem("division")}`)
          .then((res) => {
            Swal.fire("Moved!", "Invoice has been Restored.", "success");

            routerHistory.push(navigatePath + "/inv");
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Invoice is safe :)", "error");
      }
    });
  };
  const handlePrint = () => window.print();
  window.onafterprint = function () {
    window.close();
    window.location.href = ``;
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
            {/* <Button
            className="mr-4 py-2"
            color="primary"
            variant="outlined"
            onClick={() => invoicegenrate({ mode: "on" })}
          >
            Delivery Note
          </Button> */}
            {/* <Button
            className="mr-4 py-2"
            style={{ color: 'red' }}
            variant="outlined"
            onClick={() => deleteinvoice()}
          >
            Delete Invoice
          </Button>
          <Button
            onClick={handlePrint}
            className="py-2"
            color="secondary"
            variant="outlined"
          >
            Print Invoice
          </Button> */}
          
            {/* <Button
              className="mr-4 py-2"
              color="primary"
              variant="outlined"
              onClick={() => handlePrinting()}
            >
             PRINT INVOICE
            </Button> */}
          </div>
        </div>

        <div
          id="print-area"
          ref={componentRef}
          style={{ fontFamily: "Calibri", fontSize: 16 }}
        >
          {/* <header id="header"> */}

          {pageNumber.map((item, i) => {
            if (i == 0) {
              pos = 1538;
            } else {
              pos = pos + 1568;
            }

            return (
              <span
                className="showPageNumber"
                style={{
                  position: "relative",
                  top: pos,
                  // left: "50%",
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

            <hr></hr>
            <tbody style={{ marginBottom: "50px" }}>
              <tr>
                <td>
                  <div className="px-2 pt-5 flex justify-between">
                    <div className="flex">
                      <div className="pl-2  mb-4">
                        {del && (
                          <>
                            <Alert severity="warning">{comment}</Alert>
                          </>
                        )}
                        <h3 style={{ fontSize: 20 }}>
                          <strong>VAT INVOICE</strong>
                        </h3>
                        {vat}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="pr-2 px-4 mb-4">
                        <h3>
                          <strong>فاتورة ضريبة</strong>
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* 
                  <div className="px-2 flex justify-between" style={{'flex-shrink':1}}>
                    <div className="px-2 flex justify-end">
                    <div className="flex" style={{width:'25%'}}>

                      <div className="pr-12"> 


                          <div className="pl-2 pb-4">
                            <span style={{ fontWeight: 1000 }}>ISSUE DATE</span><br></br>
                            {moment(issue_date).format('DD MMM YYYY')}

                          </div>


                          <div className="pl-2 pb-4 pr-10">
                            <span style={{ fontWeight: 1000 }}>COMPANY NAME</span><br></br>
                            <span>{company}</span><br></br>
                           


                          </div>
                          <div className="pl-2 pb-4">
                            <span style={{ fontWeight: 1000 }}>COMPANY ADDRESS</span><br></br>
                            
                            {street?street+(city?","+city+(zipcode?","+(zipcode):" "):(zipcode?","+(zipcode):" ")):(city?city+(zipcode?" ,"+(zipcode):" "):(zipcode?zipcode: " "))}


                          </div>


                         


                        </div>

                        <div>
                        </div>
                      </div>
                    </div>
                    <div className="px-2 flex justify-center">
                      <div className="flex " >

                        <div className="pr-12">


                          <div className="pb-4" >
                            <span style={{ fontWeight: 1000 }}>INVOICE NUMBER</span>
                            <br></br>
                            {invoiceno}


                          </div>




              <div className="pl-0 pb-4" >

                            <span style={{ fontWeight: 1000 }}>P.O. NUMBER</span><br></br>
                            {pono?pono:"--"}

                          </div>


                          <div className="">
                            <span style={{ fontWeight: 1000 }}>VAT NUMBER</span>
                            <br></br>
                            {vatno}

                          </div>


                        </div>
                        <div>
                        </div>
                      </div>
                    </div>
                    <div className="px-2 flex justify-center">
                      <div className="flex " >
                        <div className="pr-12">
                          <div className="pb-3" align="right">
                            <span style={{ fontWeight: 1000, fontSize: 18 }}>
                              رقم الفاتورة
                            </span><br></br>
                            {invoiceno}


                          </div>

                          <div className="mr-0 pr-0 pb-3" align="right">
                            <span align="right" style={{ fontWeight: 1000, fontSize: 18 }}>
                              رقم أمر الشراء
                            </span><br></br>
                            {pono?toArabic(pono):"--"}


                          </div>
                                              <div className="" align="right">
                            <span style={{ fontWeight: 1000, fontSize: 18 }} >
                          رقم ضريبة 
                            </span><br></br>
                            {toArabic(vatno)}

                          </div>
                        </div>
                        <div>
                        </div>
                      </div>
                    </div>
                    <div className="px-0 mr-2 flex justify-end">
                      <div className="flex " >
                        <div className="pr-2">
                          <div className="mr-0 pr-0 pb-3" align="right">
                            <span align="right" style={{ fontWeight: 1000, fontSize: 18 }} >
                              تاريخ الاصدار
                            </span><br></br>

                            {moment(issue_date).format('DD MMM YYYY')}

                          </div>
                          <div className="mr-0 pr-0 pb-3" align="right">
                            <span style={{ fontWeight: 1000, fontSize: 18 }}>
                             
                  اسم الشركة 

                            </span><br></br>
                            <span>{cname_ar}</span><br></br>
                           
                           



                          </div>
                          <div className="mr-0 pr-0 pb-3" align="right">
                            <span style={{ fontWeight: 1000, fontSize: 18 }}>
                              
                       الشركة  عنوان       
                            </span><br></br>
                           
                            {street_ar?street_ar+(city_ar?","+city_ar+(zipcode?","+toArabic(zipcode):" "):(zipcode?","+toArabic(zipcode):" ")):(city_ar?city_ar+(zipcode?" ,"+toArabic(zipcode):" "):(zipcode?toArabic(zipcode): " "))}



                          </div>

                                                </div>
                        <div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="viewer__billing-info px-4 py-5 flex justify-between">
          <div>
            <span className="mb-2">Bill From</span>
            <p className="mb-4">{seller ? seller.name : null}</p>
            <p className="mb-0 whitespace-pre-wrap">
              {seller ? seller.address : null}
            </p>
          </div>
          <div className="text-right w-full">
            <span className="mb-2">Bill To</span>
            <p className="mb-4">{buyer ? buyer.name : null}</p>
            <p className="mb-0 whitespace-pre-wrap">
              {buyer ? buyer.address : null}
            </p>
          </div>
          <div />
        </div> */}

                  {/* row wise display flex */}

                  <Box
                    display="flex"
                    p={1}
                    bgcolor="background.paper"
                    className="px-2 flex justify-between"
                  >
                    <Grid container spacing={3} className="p-4">
                      <Grid
                        className="pl-2 pb-4 pr-2 mr-2"
                        xs={4}
                        style={{ wordBreak: "break-word" }}
                      >
                        <span style={{ fontWeight: 1000 }}>ISSUE DATE</span>
                        <br></br>
                        {moment(issue_date).format("DD MMM YYYY")}
                      </Grid>
                      <Grid className="pl-0 pb-4" xs>
                        <span style={{ fontWeight: 1000 }}>INVOICE NUMBER</span>
                        <br></br>
                        {invoiceno}
                      </Grid>
                      <Grid className="pl-2 pb-4 pr-20 mr-1" align="right" xs>
                        <span style={{ fontWeight: 1000 }}> رقم الفاتورة</span>
                        <br></br>
                        {invoiceno !== null ? invoiceno : " "}
                      </Grid>
                      <Grid
                        className="pl-2 pb-4 pr-2"
                        align="right"
                        style={{ width: 300 }}
                      >
                        <span style={{ fontWeight: 1000 }} xs={8}>
                          {" "}
                          تاريخ الاصدار
                        </span>
                        <br></br>
                        {moment(issue_date).format("DD MMM YYYY")}
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    display="flex"
                    p={1}
                    bgcolor="background.paper"
                    className="px-2 flex justify-between"
                  >
                    <Grid container spacing={3} className="p-4">
                      <Grid
                        className="pl-2 pb-4 pr-2 mr-2"
                        xs={4}
                        style={{ wordBreak: "break-word" }}
                      >
                        <span style={{ fontWeight: 1000 }}>COMPANY NAME</span>
                        <br></br>
                        {company}
                      </Grid>
                      <Grid className="pl-0 pb-4" xs>
                        <span style={{ fontWeight: 1000 }}>P.O. NUMBER</span>
                        <br></br>
                        {pono !== null ? pono : "---"}
                      </Grid>
                      <Grid className="pl-2 pb-4 pr-20 mr-1" xs align="right">
                        <span style={{ fontWeight: 1000 }}>
                          {" "}
                          رقم أمر الشراء
                        </span>
                        <br></br>
                        {pono !== null ? pono : "---"}
                      </Grid>
                      <Grid
                        className="pl-2 pb-4 pr-2"
                        align="right"
                        style={{ width: 300 }}
                      >
                        <span style={{ fontWeight: 1000 }} xs={8}>
                          اسم الشركة
                        </span>
                        <br></br>
                        {cname_ar}
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    display="flex"
                    p={1}
                    bgcolor="background.paper"
                    className="px-2 flex justify-between"
                  >
                    <Grid container spacing={3} className="p-4">
                      <Grid
                        className="pl-2 pb-4"
                        xs={4}
                        style={{ wordBreak: "break-word" }}
                      >
                        <span style={{ fontWeight: 1000 }}>
                          COMPANY ADDRESS
                        </span>
                        <br></br>
                        {post_box_no ? post_box_no + " ," : ""}
                        {buildNumber ? ", " + buildNumber : ""}
                        {street
                          ? street +
                            (city
                              ? "," + city + (zipcode ? "," + zipcode : " ")
                              : zipcode
                              ? "," + zipcode
                              : " ")
                          : city
                          ? city + (zipcode ? " ," + zipcode : " ")
                          : zipcode
                          ? zipcode
                          : " "}
                        {country ? ", " + country : ""}
                      </Grid>
                      <Grid className="pl-2 pb-4" xs>
                        <span style={{ fontWeight: 1000 }}>VAT NUMBER</span>
                        <br></br>
                        {vatno ? vatno : "---"}
                      </Grid>
                      <Grid className="pl-2 pb-4 pr-20 mr-1" align="right" xs>
                        <span style={{ fontWeight: 1000 }}> رقم ضريبة</span>
                        <br></br>
                        {toArabic(vatno) == "null" ||
                        toArabic(vatno) == null ||
                        toArabic(vatno) == undefined ||
                        toArabic(vatno) == "undefined"
                          ? "---"
                          : toArabic(vatno)}
                      </Grid>
                      <Grid
                        className="pl-2 pb-4 pr-2"
                        align="right"
                        style={{ width: 300 }}
                      >
                        <span style={{ fontWeight: 1000 }} xs={8}>
                          الشركة عنوان
                        </span>
                        <br></br>
                        {post_box_no ? toArabic(post_box_no) + " ," : ""}
                        {street_ar
                          ? street_ar +
                            (city_ar
                              ? "," +
                                city_ar +
                                (zipcode ? "," + toArabic(zipcode) : " ")
                              : zipcode
                              ? "," + toArabic(zipcode)
                              : " ")
                          : city_ar
                          ? city_ar + (zipcode ? " ," + toArabic(zipcode) : " ")
                          : zipcode
                          ? toArabic(zipcode)
                          : " "}
                      </Grid>
                    </Grid>
                  </Box>

                  <Card
                    className="mb-4"
                    elevation={0}
                    borderRadius="borderRadius"
                  >
                    <div className="viewer__order-info px-4 pt-4 mb-4 flex justify-between">
                      <Table
                        style={{ zIndex: "1000", border: "1px solid #ccc" }}
                      >
                        <TableHead
                          style={{
                            backgroundColor: "#1d2257",
                            display: "table-row-group",
                          }}
                        >
                          <TableRow style={{ border: "1px solid #ccc" }}>
                            <TableCell
                              className="pl-0"
                              colspan={1}
                              style={{
                                border: "1px solid #ccc",
                                width: "50px",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: 1000,
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              <span style={{ fontSize: 16 }}>رقم</span>
                              <br></br> S.No.
                            </TableCell>
                            <TableCell
                              className="px-0"
                              colspan={4}
                              style={{
                                border: "1px solid #ccc",
                                width: "px",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: 1000,
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              <span style={{ fontSize: 16 }}>وصف</span>
                              <br></br> DESCRIPTION
                            </TableCell>

                            <TableCell
                              className="px-0"
                              style={{
                                border: "1px solid #ccc",
                                width: "90px",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: 1000,
                                fontSize: 16,
                                wordBreak: "break-word",
                              }}
                              align="center"
                            >
                              <span style={{ fontSize: 16 }}>وحدة</span>
                              <br></br>UOM
                            </TableCell>
                            <TableCell
                              className="px-0"
                              colspan={2}
                              style={{
                                border: "1px solid #ccc",
                                width: "90px",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: 1000,
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              <span style={{ fontSize: 16 }}>كمية</span>
                              <br></br>QTY
                            </TableCell>
                            <TableCell
                              className="px-0"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                width: "130px",
                                color: "#fff",
                                fontWeight: 1000,
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              <span style={{ fontSize: 16 }}>سعر الوحدة</span>
                              <br></br> UNIT PRICE
                            </TableCell>
                            <TableCell
                              className="px-0"
                              style={{
                                border: "1px solid #ccc",
                                wordBreak: "break-word",
                                width: "130px",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: 1000,
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              <span style={{ fontSize: 16 }}>
                                المجموع الفرعي
                              </span>
                              <br></br> SUB TOTAL
                            </TableCell>
                            <TableCell
                              className="px-0"
                              style={{
                                border: "1px solid #ccc",
                                wordBreak: "break-word",
                                width: "130px",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: 1000,
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              <span style={{ fontSize: 16 }}>
                                القيمة الضريبية
                              </span>
                              <br></br>VAT AMOUNT{" "}
                            </TableCell>
                            <TableCell
                              className="px-0"
                              style={{
                                border: "1px solid #ccc",
                                wordBreak: "break-word",
                                width: "130px",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: 1000,
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              <span style={{ fontSize: 16 }}>مجموع</span>
                              <br></br> GRAND TOTAL
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {podetails.map((item, index) => {
                            return (
                              <TableRow
                                key={index}
                                style={{
                                  border: "1px solid #ccc",
                                  fontSize: 18,
                                }}
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
                                  colspan={4}
                                  style={{
                                    border: "1px solid #ccc",
                                    wordBreak: "break-word",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
                                >
                                  <div>
                                    <span style={{ textAlign: "left" }}>
                                      {item.description}
                                    </span>
                                  </div>
                                  <span style={{ float: "right" }}>
                                    {item.arabic_description
                                      ? item.arabic_description
                                      : ""}
                                  </span>
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
                                  {item.unit_of_measure}
                                </TableCell>
                                <TableCell
                                  className="pr-0 capitalize"
                                  align="center"
                                  style={{
                                    border: "1px solid #ccc",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
                                  colspan={2}
                                >
                                  {parseInt(item.quantity).toLocaleString()}
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
                                  {parseFloat(item.sell_price).toLocaleString(
                                    undefined,
                                    { minimumFractionDigits: 2 }
                                  )}
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
                                  {parseFloat(item.total_amount).toLocaleString(
                                    undefined,
                                    { minimumFractionDigits: 2 }
                                  )}
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
                                  {/* {item.total_amount} */}
                                  {parseFloat(
                                    (item.total_amount * 15) / 100
                                  ).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                  })}
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
                                  {(
                                    parseFloat(item.total_amount) +
                                    (item.total_amount * 15) / 100
                                  ).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                  })}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                    <div
                      className="viewer__order-info px-4 pt-4 mb-4 flex justify-between"
                      style={{ pageBreakInside: "avoid" }}
                    >
                      <Table
                        className="movetable"
                        style={{ position: "relative", top: "-105px" }}
                      >
                        <TableHead
                          style={{
                            backgroundColor: "trasparent",
                            visibility: "hidden",
                          }}
                        >
                          <TableRow style={{}}>
                            <TableCell
                              className="pl-0"
                              colspan={1}
                              style={{
                                // border: "1px solid #ccc",
                                width: "50px",
                                fontFamily: "Calibri",
                                color: "transparent",
                                fontWeight: 1000,
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              <span style={{ fontSize: 16 }}>رقم</span>
                              <br></br> S.No.
                            </TableCell>
                            <TableCell
                              className="px-0"
                              colspan={4}
                              style={{
                                // border: "1px solid #ccc",
                                width: "px",
                                fontFamily: "Calibri",
                                color: "transparent",
                                fontWeight: 1000,
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              <span style={{ fontSize: 16 }}>وصف</span>
                              <br></br> DESCRIPTION
                            </TableCell>

                            <TableCell
                              className="px-0"
                              style={{
                                // border: "1px solid #ccc",
                                width: "90px",
                                fontFamily: "Calibri",
                                color: "transparent",
                                fontWeight: 1000,
                                fontSize: 16,
                                wordBreak: "break-word",
                              }}
                              align="center"
                            >
                              <span style={{ fontSize: 16 }}>وحدة</span>
                              <br></br>UOM
                            </TableCell>
                            <TableCell
                              className="px-0"
                              colspan={2}
                              style={{
                                // border: "1px solid #ccc",
                                width: "90px",
                                fontFamily: "Calibri",
                                color: "transparent",
                                fontWeight: 1000,
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              <span style={{ fontSize: 16 }}>كمية</span>
                              <br></br>QTY
                            </TableCell>
                            <TableCell
                              className="px-0"
                              style={{
                                // border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                width: "130px",
                                color: "transparent",
                                fontWeight: 1000,
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              <span style={{ fontSize: 16 }}>سعر الوحدة</span>
                              <br></br> UNIT PRICE
                            </TableCell>
                            <TableCell
                              className="px-0"
                              style={{
                                // border: "1px solid #ccc",
                                wordBreak: "break-word",
                                width: "130px",
                                fontFamily: "Calibri",
                                color: "transparent",
                                fontWeight: 1000,
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              <span style={{ fontSize: 16 }}>
                                المجموع الفرعي
                              </span>
                              <br></br> SUB TOTAL
                            </TableCell>
                            <TableCell
                              className="px-0"
                              style={{
                                // border: "1px solid #ccc",
                                wordBreak: "break-word",
                                width: "130px",
                                fontFamily: "Calibri",
                                color: "transparent",
                                fontWeight: 1000,
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              <span style={{ fontSize: 16 }}>
                                القيمة الضريبية
                              </span>
                              <br></br>VAT AMOUNT{" "}
                            </TableCell>
                            <TableCell
                              className="px-0"
                              style={{
                                // border: "1px solid #ccc",
                                wordBreak: "break-word",
                                width: "130px",
                                fontFamily: "Calibri",
                                color: "transparent",
                                fontWeight: 1000,
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              <span style={{ fontSize: 16 }}>مجموع</span>
                              <br></br> GRAND TOTAL
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow style={{ border: "1px solid #ccc" }}>
                            <TableCell
                              className="pl-0 capitalize"
                              align="center"
                              style={{ fontFamily: "Calibri" }}
                              rowspan={3}
                              colspan={3}
                            >
                              <div
                                className="ml-2"
                                style={{ fontWeight: 1000 }}
                              >
                                <QRCode
                                  level="L"
                                  imageSettings={{
                                    excavate: true,
                                    margin: "50px",
                                    height: "35",
                                    width: "35",
                                    src: NLogo,
                                  }}
                                  size="160"
                                  value={qrValue}
                                />
                              </div>
                            </TableCell>
                            <TableCell
                              className="pl-2 capitalize"
                              align="center"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                              }}
                              rowSpan={3}
                              colSpan={5}
                            >
                              <div
                                className="pl-2 flex justify-between"
                                style={{ fontFamily: "Calibri" }}
                              >
                                <div className="flex">
                                  <div className="pr-0">
                                    <tr>
                                      <td>
                                        <h5 className="font-normal capitalize">
                                          <strong>BANK DETAILS</strong>{" "}
                                        </h5>
                                      </td>
                                    </tr>
                                    <tr
                                      style={{
                                        height: 5,
                                        fontSize: 16,
                                        textAlign: "left",
                                      }}
                                    >
                                      <td style={{ height: "auto !important" }}>
                                        <strong>Bank Name</strong>
                                      </td>
                                      <td style={{ height: "auto !important" }}>
                                        {/* {bank?.bank_name ? bank?.bank_name : '---' } */}
                                        Saudi National Bank
                                      </td>
                                    </tr>
                                    <tr
                                      style={{
                                        height: 5,
                                        fontSize: 16,
                                        textAlign: "left",
                                      }}
                                    >
                                      <td style={{ height: "auto !important" }}>
                                        <strong>Account No</strong>
                                      </td>
                                      <td style={{ height: "auto !important" }}>
                                        {/* {bank?.account_no ? bank?.account_no : '--'} */}
                                        6000000242200
                                      </td>
                                    </tr>
                                    <tr
                                      style={{
                                        height: 5,
                                        fontSize: 16,
                                        textAlign: "left",
                                      }}
                                    >
                                      <td style={{ height: "auto !important" }}>
                                        <strong>IBAN No</strong>
                                      </td>
                                      <td style={{ height: "auto !important" }}>
                                        {/* {bank?.iban_no ? bank?.iban_no : '--' } */}
                                        SA3610000006000000242200
                                      </td>
                                    </tr>
                                  </div>
                                </div>
                              </div>
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
                              colSpan={2}
                            >
                              االمجموع الفرعي
                              <br></br>
                              SUB TOTAL
                            </TableCell>

                            <TableCell
                              style={{
                                textAlign: "right",
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                width: "130px",
                                fontSize: 18,
                              }}
                              colspan={2}
                            >
                              <div>
                                <div
                                  style={{ float: "left" }}
                                  className="pl-10"
                                >
                                  SAR
                                </div>
                                <div style={{ float: "right" }}>
                                  {parseFloat(total_value).toLocaleString(
                                    undefined,
                                    { minimumFractionDigits: 2 }
                                  )}
                                </div>
                                <div style={{ clear: "left" }} />
                              </div>
                            </TableCell>
                          </TableRow>

                          <TableRow style={{ border: "1px solid #ccc" }}>
                            <TableCell
                              className="pr-0 pl-1 capitalize"
                              align="center"
                              style={{
                                border: "1px solid #ccc",
                                wordBreak: "break-word",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                              colSpan={2}
                            >
                              القيمة الضريبية
                              <br></br>
                              TOTAL VAT AMOUNT (15%)
                            </TableCell>

                            <TableCell
                              style={{
                                textAlign: "right",
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                width: "130px",
                                fontSize: 18,
                              }}
                              colspan={2}
                            >
                              <div>
                                <div
                                  style={{ float: "left" }}
                                  className="pl-10"
                                >
                                  SAR
                                </div>
                                <div style={{ float: "right" }}>
                                  {parseFloat(vat_in_value).toLocaleString(
                                    undefined,
                                    { minimumFractionDigits: 2 }
                                  )}
                                </div>
                                <div style={{ clear: "left" }} />
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow style={{ border: "1px solid #ccc" }}>
                            <TableCell
                              className="pr-0 capitalize"
                              align="center"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                wordBreak: "break-word",
                                fontSize: 16,
                              }}
                              colSpan={2}
                            >
                              المجموع الكلي <br></br>
                              GRAND TOTAL
                            </TableCell>

                            <TableCell
                              style={{
                                textAlign: "right",
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                width: "130px",
                                fontSize: 18,
                              }}
                              colspan={2}
                            >
                              <div>
                                <div
                                  style={{ float: "left" }}
                                  className="pl-10"
                                >
                                  SAR
                                </div>
                                <div style={{ float: "right" }}>
                                  {" "}
                                  <strong>
                                    {parseFloat(net_amount).toLocaleString(
                                      undefined,
                                      { minimumFractionDigits: 2 }
                                    )}
                                  </strong>
                                </div>
                                <div style={{ clear: "left" }} />
                              </div>
                            </TableCell>
                          </TableRow>

                          <TableRow style={{ border: "1px solid #ccc" }}>
                            <TableCell
                              className="pl-0 capitalize"
                              colspan={12}
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            >
                              <div className="px-4 flex justify-between">
                                <div className="flex">
                                  <div
                                    className="pr-12"
                                    style={{ wordBreak: "break-word" }}
                                  >
                                    <strong>TOTAL IN WORDS</strong>
                                    <br></br>
                                    {ress}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
{vatExclude && <>
  <TableRow style={{ border: "1px solid #ccc" }}>
                            <TableCell
                              className="pl-0 capitalize"
                              colspan={12}
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                            >
                              <div className="px-4 flex justify-between">
                                <div className="flex">
                                  <div
                                    className="pr-12"
                                    style={{ wordBreak: "break-word" ,color:'red'}}
                                  >
                                   <center>
                                   <strong>THIS IS AN INTER-COMPANY INVOICE.
THIS FILE CANNOT BE FILED FOR VAT RETURNS</strong>
                                   </center>
                                    
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
</>}
                       
                        </TableBody>
                      </Table>
                    </div>
{/*                     
                   <div>
                   {vatExclude ? (
                      <p className="pl-4">
                        <small>
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            This Invoice is not for Filing
                          </span>
                        </small>
                      </p>
                    ) : (
                      ""
                    )}
                   </div> */}

                    <div
                      className="viewer__order-info px-4 pl-24 pr-24 mb-4 flex justify-between"
                      style={{ pageBreakInside: "avoid" ,height:'200px',marginTop:'-68px'}}
                    >
                      <div className="pl-24" style={{ fontWeight: 1000,width:'200px' }}>
                        <h5 className="font-normal t-4 capitalize">
                          <IntlProvider locale={locale} messages={Arabic}>
                            <FormattedMessage id="preparedby" />
                          </IntlProvider>
                        </h5>
                        Prepared by
                        {sstatus == "Invoice Submitted" && (
                          <>
                            {sign[0]?.prepared_by && (
                              <>
                                <img
                                  src={basePath + sign[0]?.prepared_by}
                                  height={100}
                                  width={180}
                                  alt={sign[0]?.prepared_by}
                                />
                              </>
                            )}
                          </>
                        )}
                      </div>
                      <div style={{ fontWeight: 1000,width:'-1px' }} className="pl-2">
                        <h5 className="font-normal t-4 capitalize">
                          <IntlProvider locale={locale} messages={Arabic}>
                            <FormattedMessage id="approvedby" />
                          </IntlProvider>
                        </h5>
                        Approved by
                        {sstatus == "Invoice Submitted" && (
                          <>
                            {sign[0]?.approval_by && (
                              <>
                              
                                <img
                                  src={basePath + sign[0]?.approval_by}
                                  height={100}
                                  width={180}
                                  alt={sign[0]?.approval_by}
                                />
                              </>
                            )}
                          </>
                        )}
                      </div>
                      <div className="mr-0 pr-24" style={{ fontWeight: 1000 ,width:'205px'}}>
                        <h5 className="font-normal t-4 capitalize">
                          <IntlProvider locale={locale} messages={Arabic}>
                            <FormattedMessage id="receivedby" />
                          </IntlProvider>
                        </h5>
                        Received by
                      </div>
                      {/* <div className="mr-28" style={{ fontWeight: 1000 }}>

                        <QRCode

                          level="L"
                          imageSettings={{
                            excavate: true,
                            margin: "50px",
                            height: "35",
                            width: "35",
                            src: NLogo
                          }}
                          size="160"
                          value={qrValue}
                        />
                      </div>
 */}
                    </div>
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
