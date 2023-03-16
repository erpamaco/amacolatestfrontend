import React, { useState, useEffect, useRef } from "react";
import { borders } from "@material-ui/system";
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
  TextField,
  Hidden,
} from "@material-ui/core";
import { RichTextEditor, Breadcrumb } from "matx";
import { Link, useParams, useHistory } from "react-router-dom";
import { numberToWords } from "number-to-words";
import { withStyles } from "@material-ui/core/styles";
import { getInvoiceById, navigatePath } from "../../../invoice/InvoiceService";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import { cond } from "lodash";
import logo from "../../../invoice/amaco-logo.png";
import logos from "./../../../invoice/vision2030.png";
import "bootstrap/dist/css/bootstrap.min.css";
import useSettings from "../../../../hooks/useSettings";
import apiurl from "../../../../../config";
import url from "../../../invoice/InvoiceService";
import Arabic from "../../../../../lang/ar.json";
import { IntlProvider, FormattedNumber } from "react-intl";
import { FormattedMessage } from "react-intl";
import Swal from "sweetalert2";
import Axios from "axios";
import history from "history.js";
import moment from "moment";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ToWords } from "to-words";
import { useReactToPrint } from "react-to-print";

import "../../../Newinvoice/print.css";

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);
const locale = navigator.language;

// import Image from 'react-image-resizer';

const i = 0;
function counter() {
  return i + 1;
}

const useStyles = makeStyles(({ palette, ...theme }) => ({
  "@global": {
    "@media print": {
      "body, html": {
        visibility: "hidden",
        size: "auto",
        counterReset: i,
        // content: 'none !important',
        "-webkit-print-color-adjust": "exact !important",
        marginTop: "10px",
        ".pagebreak": {
          pageBreakBefore: "always",
        },
      },
      h3: {
        counterIncrement: i,
        content: "Section ",
      },
      "#edits": {
        display: "none",
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
      "#panel": {
        display: "none",
      },
      "#edits": {
        visibility: "hidden",
      },

      "#note": {
        // height:"100px",
        // paddingTop:,
        // "-webkit-print-color-adjust": "exact !important",
        // pageBreak: { pageBreakBefore:'always !important' }
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
      "#sign": {
        // backgroundColor: "#F8F8F8",
        // borderTop: "1px solid #E7E7E7",
        // textAlign: "center",
        // bottom: "0",
        // position:'fixed',
        // width: "100%",
        // justifySelf:"end"
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

const PurchaseRInvoiceViewer = ({ toggleInvoiceEditor }) => {
  const [state, setState] = useState({});
  const routerHistory = useHistory();

  const [po_number, setpo_number] = useState();
  const [rdate, setrdate] = useState([]);
  const [company, setcompany] = useState("");
  const [city, setcity] = useState("");
  const [street, setstreet] = useState("");
  const [pono, setpo] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [vatno, setvatno] = useState("");
  const [regno, setregno] = useState("");
  const [qdetails, setqdetails] = useState([]);
  const [net_amount, setnet_amount] = useState("");
  const [vat_in_value, setvat_in_value] = useState("");
  const [total_value, settotal_value] = useState("");
  const [validity, setvalidity] = useState();
  const [edit, setedit] = useState(false);
  const [payment_terms, setpayment_terms] = useState("");
  const [warranty, setwarranty] = useState("");
  const [delivery_time, setdelivery_time] = useState();
  const [qid, setqid] = useState();
  const [rno, setrno] = useState();
  const componentRef = useRef();
  const [inco_terms, setinco_terms] = useState();
  const [contactpersoncontact, setcontactpersoncontact] = useState("");
  const [company_address, setcompany_address] = useState(
    "Amaco Arabia Contracting Company,P.O. Box 7452, Al Jawhara District,Jubail - 35518, Saudi Arabia."
  );
  const [contactpersonemail, setcontactpersonemail] = useState("");
  const [designation, setdesignation] = useState("");
  const [contactperson, setcontactperson] = useState("");
  const [vendor_id, setvendor_id] = useState("");
  const [party_code, setparty_code] = useState("");
  const { id, del } = useParams();
  const classes = useStyles();
  var fval = 10;
  const { settings, updateSettings } = useSettings();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [res, setres] = useState("");
  const [ress, setress] = useState("");
  const [currency_type, setcurrency_type] = useState("");
  const [freight_type, setfreight_type] = useState("");
  const [expanded, setExpanded] = React.useState("panel1");

  const [party, setParty] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [pageNumber, setPageNumber] = useState([]);
  let pos = 0;

  const [noteList, setnoteList] = useState([]);
  const [address, setaddress] = useState([
    { street: "", city: " ", po_no: " " },
  ]);
  const [content, setContent] = useState(`
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight: 700; color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ANNEXURE (1)</span></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><div><span style="font-weight: 700; color: rgb(0, 0, 0);"><br></span></div>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Delivery Time</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp :2-4 Weeks after PO receives</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<b>FREIGHT TYPE</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp  :Air Freight</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<b>INCO TERMS</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp:CPT</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<b>PAYMENT TERMS</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp :2-4 Weeks after PO receives</p>
  <ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; cursor: text; padding: 0px 0px 0px 1.5em; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; font-size: 13px; letter-spacing: 0.14994px; white-space: pre-wrap;"><li style="list-style-type: none; padding-left: 1.5em;">Purchase order acknowledgment – Acknowledgement of PO with 1 day of issuance is mandatory on supplier. The <span style="color: rgb(0, 0, 0);">acknowledgement must be done by signing and stamping a copy of our PO. </span></li></ul><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; cursor: text; padding: 0px 0px 0px 1.5em; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; font-size: 13px; letter-spacing: 0.14994px; white-space: pre-wrap;"><li style="list-style-type: none; padding-left: 1.5em;"><span style="color: rgb(0, 0, 0);">Specification – It is requested to provide exact specification of material as mentioned in the purchase order, any deviation other than mentioned in PO, must be approved with amendment in purchase order. </span></li></ul><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;">		<span style="font-weight: 700; color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The material should be as per your quotation / Pro forma / Invoice. </span></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; cursor: text; padding: 0px 0px 0px 1.5em; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; font-size: 13px; letter-spacing: 0.14994px; white-space: pre-wrap;"><li style="list-style-type: none; padding-left: 1.5em;"><span style="color: rgb(0, 0, 0);">Packing – All materials must be packed in sea-worthy or air-worthy with protection against corrosion, weather and damage. </span></li></ul><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; cursor: text; padding: 0px 0px 0px 1.5em; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; font-size: 13px; letter-spacing: 0.14994px; white-space: pre-wrap;"><li style="list-style-type: none; padding-left: 1.5em;"><span style="font-weight: 700; color: rgb(0, 0, 0);">Country of origin labels </span><span style="color: rgb(0, 0, 0);">– Country of origin labels ‘’non-removable’’ type must be sticked to all materials in shipment. Failing which customs department in Saudi Arabia will levy penalty of SAR 7,000/- per shipment and shipment will be shipped back. All the charges towards penalty, shipment, and other expenses to be borne by supplier. </span></li></ul><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; cursor: text; padding: 0px 0px 0px 1.5em; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; font-size: 13px; letter-spacing: 0.14994px; white-space: pre-wrap;"><li style="list-style-type: none; padding-left: 1.5em;"><span style="color: rgb(0, 0, 0);">The container must have label indicating the contains of goods in the container and its origin Supplier shall furnish AMACO with all the required and customary certifications, test data, manuals, certificates and technical information and documentation relating to work; including (but not limited) to certificates of origin, weight certificates material test certificate, NDT, pressure test, etc </span> <span style="color: rgb(0, 0, 0);">as specified in the PO. </span></li></ul><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; cursor: text; padding: 0px 0px 0px 1.5em; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; font-size: 13px; letter-spacing: 0.14994px; white-space: pre-wrap;"><li style="list-style-type: none; padding-left: 1.5em;"><span style="color: rgb(0, 0, 0);">Bank details – The payment will be dealt either through transfer or letter of credit. In case of transfer, AMACO will bear transfer charges for the first transfer. If the transfer is not through due to reasons beyond AMACO’s responsibility, supplier will have to bear all the charges. </span></li></ul><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; cursor: text; padding: 0px 0px 0px 1.5em; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; font-size: 13px; letter-spacing: 0.14994px; white-space: pre-wrap;"><li style="list-style-type: none; padding-left: 1.5em;"><span style="color: rgb(0, 0, 0);"> </span><span style="font-weight: 700; color: rgb(0, 0, 0);">Delivery period &amp; penalty – Should supplier fail to deliver or perform the work according to the agreed date (s) and/or schedule set out in the PO, AMACO may in its sole discretion, with or without prior notice to the supplier: </span></li></ul><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;">		<span style="font-weight: 700; color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. Extend the time by means of change order. </span></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;">		<span style="font-weight: 700; color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. Cancel the PO or part of the work and procure goods or services of similar description from other works. </span></p>
  <p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><span style="font-weight: 700; color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. Claim from supplier the damages suffered (including the amount by which the cost of replacements exceeds the</span></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><span style="font-weight: 700; color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;               Price) and to the extend allowed under </span><span style="color: rgb(0, 0, 0); font-weight: 700; letter-spacing: 0.14994px;">in lieuof the agreed liquidated damages provided for above.</span></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"></p>
  <p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><ul style="margin-right: 0px; margin-bottom: this 0px; margin-left: 0px; cursor: text; padding: 0px 0px 0px 1.5em; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; font-size: 13px; letter-spacing: 0.14994px; white-space: pre-wrap;"><li style="list-style-type: none; padding-left: 1.5em;"><span style="color: rgb(0, 0, 0);">Order progress – Order progress reports must be sent on weekly basis, without any reminders. </span></li></ul><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; cursor: text; padding: 0px 0px 0px 1.5em; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; font-size: 13px; letter-spacing: 0.14994px; white-space: pre-wrap;"><li style="list-style-type: none; padding-left: 1.5em;"><span style="color: rgb(0, 0, 0);">Shipping documents – A copy of shipping documents must be sent before attestation for review and confirmation. In case the shipment is sent without review of shipping documents, any demurrage or penalties resulting due to discrepancy in shipping documents, must be borne by supplier. </span></li></ul><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; cursor: text; padding: 0px 0px 0px 1.5em; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; font-size: 13px; letter-spacing: 0.14994px; white-space: pre-wrap;"><li style="list-style-type: none; padding-left: 1.5em;"><span style="color: rgb(0, 0, 0);">Shipping documents must reach in hand at least 3 days before arrival of shipment to port. </span></li></ul><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; cursor: text; padding: 0px 0px 0px 1.5em; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; font-size: 13px; letter-spacing: 0.14994px; white-space: pre-wrap;"><li style="list-style-type: none; padding-left: 1.5em;"><span style="font-weight: 700; color: rgb(0, 0, 0);">Country of Origin </span><span style="color: rgb(0, 0, 0);">– Materials of origin like China and East Europe are not acceptable unless clearly mentioned in purchase order. In the event of supplier sending the material with origin other than agreed in the Purchase order, AMACO reserves the right to reject the material and claim for return of payments made.</span></li></ul><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; cursor: text; padding: 0px 0px 0px 1.5em; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; font-size: 13px; letter-spacing: 0.14994px; white-space: pre-wrap;"><li style="list-style-type: none; padding-left: 1.5em;"><span style="color: rgb(0, 0, 0);">AMACO shall be entitled to inspect and/or test (or arrange for independent inspection/testing) the work at supplier’s facilities prior to and/or at delivery/completion in order to ensure that they conform to the Specifications. In the event that the inspection shows that work do not conform to the specifications or requirements of the PO, AMACO shall be entitled to reject the delivery and cancel the purchase agreement forthwith. </span></li></ul><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; cursor: text; padding: 0px 0px 0px 1.5em; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; font-size: 13px; letter-spacing: 0.14994px; white-space: pre-wrap;"><li style="list-style-type: none; padding-left: 1.5em;"><span style="color: rgb(0, 0, 0);">Quality &amp; Warranty - The work shall conform in all respects to the quality requirements and specifications set out in the PO; and if not specified, to the normal and customary specifications or quality of such goods, or in the case of services; in accordance with accepted industry practices and any applicable professional standards and codes. </span></li></ul><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;">		<span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. Supplier may not change the Specifications, material or manufacturing processes without the prior written consent of AMACO. </span></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. Supplier warrants and guarantees that the Work will be free from faulty design, defects (whether patent or latent), in </span></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;material and workmanship </span><span style="color: rgb(0, 0, 0); letter-spacing: 0.14994px;">&nbsp;(fair wear and tear excluded) and fit for the intended purpose for a period of at least eighteen </span></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><span style="color: rgb(0, 0, 0); letter-spacing: 0.14994px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(18) months after acceptance or twelve (12) months from use,</span><span style="letter-spacing: 0.14994px; color: rgb(0, 0, 0);">&nbsp;installation </span><span style="letter-spacing: 0.14994px; color: rgb(0, 0, 0);">commissioning (whichever is the latest). </span></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>	c.<span style="color: rgb(0, 0, 0);">&nbsp;If any such defects or failure is discovered or occur within the warranty period, AMACO shall notify supplier accordingly,</span></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><span style="color: rgb(0, 0, 0); letter-spacing: 0.14994px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and supplier shall promptly, and at his sole </span><span style="color: rgb(0, 0, 0); letter-spacing: 0.14994px;">cost and risk repair or replace or replace or otherwise makegood any and all </span></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><span style="color: rgb(0, 0, 0); letter-spacing: 0.14994px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;work which are found to be defective. In addition, supplier shall compensate AMACO for all </span><span style="color: rgb(0, 0, 0); letter-spacing: 0.14994px;">costs and expenses reasonably</span></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><span style="color: rgb(0, 0, 0); letter-spacing: 0.14994px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;incurred or suffered in connection with the defect and the repairs or replacement of theworks (or part thereof) under the </span></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><span style="color: rgb(0, 0, 0); letter-spacing: 0.14994px;"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;warranty.</span><br></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;">		<span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d. The repairs/replacement works will carry the same warranty as from the date of replacement. </span></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;">		<span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e. This warranty is additional to and without prejudice to any further or specific terms of warranties offered by supplier or applicable in<span></p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;respect of the work.</span><p style="margin-bottom: 0px; cursor: text; padding: 0px; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; font-size: 16px; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.14994px; white-space: pre-wrap;"><br></p><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 0px; cursor: text; padding: 0px 0px 0px 1.5em; counter-reset: list-1 0 list-2 0 list-3 0 list-4 0 list-5 0 list-6 0 list-7 0 list-8 0 list-9 0; color: rgb(52, 49, 76); font-family: Helvetica, Arial, sans-serif; font-size: 13px; letter-spacing: 0.14994px; white-space: pre-wrap;"><li style="list-style-type: none; padding-left: 1.5em;"><span style="font-weight: 700; color: rgb(0, 0, 0);">Compliance to Laws and Ethics</span><span style="color: rgb(0, 0, 0);"> - In the performance of any purchase agreement, supplier shall take all reasonable steps to ensure full compliance with all laws and regulations of the KSA as well as any other applicable laws or international obligations</span></li></ul>
  `);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleChanges = (event, index) => {
    let newArr = [...noteList]; // copying the old datas array
    newArr[index] = event.target.value; // replace e.target.value with whatever you want to change it to
    // console.log(newArr)
    setnoteList(newArr);
  };
  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
    },
  });
  function handleClose() {
    setAnchorEl(null);
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  const handlePrintingCur = useReactToPrint({
    content: () => componentRef.current,
    header: () => componentRef.current,
  });

  const handlePrinting = () => {
    var totalPages = Math.ceil(componentRef.current.scrollHeight / 1123);
    // totalPages = totalPages - 2
    let a = [];
    for (var i = 0; i < totalPages; i++) {
      var j = i;
      j = ++j;
      var q = "Page " + j + " of " + totalPages;
      a[i] = q;
    }
    setPageNumber(a);
    setTimeout(() => {
      handlePrintingCur();
    }, 500);
  };

  useEffect(() => {
    // updateSidebarMode({ mode: "close" })

    url.get(`getPurchaseReturnDetails/${id}`).then(({ data }) => {
      setParty(data.getReturnParty);
      setTableData(data.getReturnItems);
      document.title =
        "PURCHASE RETURN-" +
        data.getReturnParty[0]?.firm_name +
        "-" +
        data.getReturnParty[0]?.pr_number;
      // setcname(data[0].party.fname)
      // setpo_number(data[0].po_number)

      // setqid(data[0].id)
      // setrno(data[0]?.rfq?.id)
      // setrdate(moment(data[0].updated_at).format('DD MMM YYYY'))
      // setcompany(data[0].party.firm_name)
      // setcity(data[0].party.city)
      // setstreet(data[0].party.street)
      // setzipcode(data[0].party.zip_code)
      // setpo(data[0].party.post_box_no)
      // setregno(data[0].party.registration_no)
      // setvatno(data[0].party.vat_no)
      // setqdetails(data[0].quotation_details)
      // setnet_amount(data[0].net_amount)
      // setvat_in_value(data[0].vat_in_value)
      // settotal_value(data[0].total_value)
      // setcurrency_type(data[0].currency_type)
      // setfreight_type(data[0].freight_type)
      // setvalidity(data[0].validity)
      // setwarranty(data[0].warranty)
      // setinco_terms(data[0].inco_terms)
      // setpayment_terms(data[0].payment_terms)
      // setdelivery_time(data[0].delivery_time)
      // setcontactperson(data[0].contact?.fname)
      // setcontactpersonemail(data[0].contact?.email)
      // setcontactpersoncontact(data[0].party.contact)
      // setdesignation(data[0].contact?.designation)
      // setvendor_id(data[0].party.vendor_id)
      // setparty_code(data[0].party?.party_code)
      // setaddress({ ...address, street: data[0].party.street, city: data[0].party.city, po_no: data[0].party.post_box_no })
      let words = toWords.convert(
        parseFloat(data.getReturnParty[0].net_amount)
      );
      let riyal = words.replace("Rupees", "Riyals");
      let halala = riyal.replace("Paise", "Halala");
      let words1 = numberToWords.toWords(data.getReturnParty[0].net_amount);
      let decimal = parseFloat(
        parseFloat(data.getReturnParty[0].net_amount).toFixed(2).split(".")[1]
      );

      if (data.getReturnParty[0].currency_type == "SAR") {
        setress(
          words1.split(",").join(" ") +
            " Riyals " +
            (parseFloat(data.getReturnParty[0].net_amount.split(".")[1]) !== NaN
              ? parseFloat(data.getReturnParty[0].net_amount.split(".")[1]) ==
                0.0
                ? "."
                : decimal
                ? " & " + numberToWords?.toWords(decimal) + " Halalas."
                : ""
              : " ")
        );
      }
      if (data.getReturnParty[0].currency_type == "AED") {
        setress(
          words1.split(",").join(" ") +
            " Dirham " +
            (parseFloat(data.getReturnParty[0].net_amount.split(".")[1]) !== NaN
              ? parseFloat(data.getReturnParty[0].net_amount.split(".")[1]) ==
                0.0
                ? "."
                : decimal
                ? " & " + numberToWords?.toWords(decimal) + " fils."
                : ""
              : " ")
        );
      }
      if (data.getReturnParty[0].currency_type == "USD") {
        setress(
          words1.split(",").join(" ") +
            " Dollars" +
            (parseFloat(data.getReturnParty[0].net_amount.split(".")[1]) !== NaN
              ? parseFloat(data.getReturnParty[0].net_amount.split(".")[1]) ==
                0.0
                ? "."
                : decimal
                ? " & " + numberToWords?.toWords(decimal) + " Cents."
                : ""
              : " ")
        );
      }
    });
    // setnoteList(Note)
    // Note.map((item, i) => {

    // })
    // if (id !== "add")
    //   getInvoiceById(id).then((res) => {
    //     setState({ ...res.data });
    //   });
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
      window.location.href = `../Newinvoiceview`;
      routerHistory.push("/Newinvoiceview");
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
  const editpurchase = () => {
    // window.location.href=`../purchaseedit/${id}`
    routerHistory.push(navigatePath + `/purchasereturnedit/${id}`);
  };
  const updateCompany = () => {
    const val = {
      id: id,
      company_address: company_address,
    };
    // window.location.href=`../purchaseedit/${id}`
    setedit(false);
    url.post("update_company", val).then(() => {});
  };
  const invoicegenrate = (sidebarSettings) => {
    // alert(id)
    // const postatus={
    //   status:"po"
    // }

    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'You want to create Invoice !',
    //   icon: 'danger',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes,!',
    //   icon: 'warning',
    //   cancelButtonText: 'No, keep it'
    // }).then((result) => {
    //   if (result.value) {

    //     let activeLayoutSettingsName = settings.activeLayout + "Settings";
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

    window.location.href = `../poinvoicegenerate/${id}`;

    //   } else if (result.dismiss === Swal.DismissReason.cancel) {
    //     Swal.fire(
    //       'Cancelled',
    //       '........:)',
    //       'error'
    //     )
    //   }
    // })
  };
  const deletepo = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to move Purchase Return to Trash!",
      icon: "danger",
      showCancelButton: true,
      confirmButtonText: "Yes, Move it!",
      icon: "warning",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        url.delete(`purchase-return-delete/${id}`).then((res) => {
          Swal.fire("Moved!", "Purchase Return has been moved to trash.", "success");

          routerHistory.push(navigatePath + "/purchasereturn/1");
          // routerHistory.push('/quoateview')
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Purchase Return is safe :)", "error");
      }
    });
  };
  const deletePr = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Purchase Return!",
      icon: "danger",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      icon: "warning",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        url.delete(`deletePr/${id}`).then((res) => {
          Swal.fire("Deleted!", "Purchase Return has been deleted.", "success");

          routerHistory.push(navigatePath + "/purchasereturn");
          // routerHistory.push('/quoateview')
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Purchase Return is safe :)", "error");
      }
    });
  };
  const restorePr = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to recover this Purchase Return!",
      icon: "danger",
      showCancelButton: true,
      confirmButtonText: "Yes, Restore it!",
      icon: "warning",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        url.put(`restorePr/${id}`).then((res) => {
          Swal.fire("Recovered!", "Purchase Return has been Restored.", "success");

          routerHistory.push(navigatePath + "/purchasereturn/0");
          // routerHistory.push('/quoateview')
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Purchase Return is safe :)", "error");
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
          <Link to="/purchasereturn">
            <IconButton>
              <Icon>arrow_back</Icon>
            </IconButton>
          </Link>
          <div>
            {/* <Button
            className="mr-4 py-2"
            color="primary"
            variant="outlined"
            onClick={() => toggleInvoiceEditor()}
          >
            Edit Quote
          </Button> */}
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
              {/* <MenuItem  onClick={() => invoicegenrate({ mode: "on" })}>
                    Genrate Purchase Order
                      </MenuItem> */}
              {del ? (
                <>
                  <MenuItem onClick={() => deletePr()}>
                    DELETE PURCHASE RETURN
                  </MenuItem>
                  <MenuItem onClick={() => restorePr()}>
                    RESTORE PURCHASE RETURN
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => deletepo()}>
                    DELETE PURCHASE RETURN
                  </MenuItem>
                  <MenuItem onClick={() => handlePrinting()}>
                    PRINT PURCHASE RETURN
                  </MenuItem>
                  <MenuItem onClick={() => editpurchase()}>
                    EDIT PURCHASE RETURN
                  </MenuItem>
                </>
              )}
            </Menu>

            {/* <Button
            className="mr-4 py-2"
            color="primary"
            variant="outlined"
            onClick={() => invoicegenrate({ mode: "on" })}
          >
            Genrate Invoice
          </Button> */}
            {/* <Button
            onClick={handlePrint}
            className="py-2"
            color="secondary"
            variant="outlined"
          >
            Print Purchase Order
          </Button> */}
          </div>
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
          {/* <header id="header"> */}
          <table>
            <thead style={{ display: "table-header-group" }}>
              <tr>
                <td>
                  <div class="empty-header">
                    <div className="px-2 flex justify-between">
                      <div className="flex">
                        <div className="pr-12">
                          <img
                            src={logo}
                            alt="this is car image"
                            style={{ marginLeft: "15px", width: 237 }}
                          />
                        </div>
                        {/* <div className="pr-12">
    <h4><IntlProvider locale={locale} messages={Arabic}>
        <FormattedMessage
          id="app.channel.plug"
          defaultMessage="Amaco Arabia Contracting Company"
          values="Amaco Arabia Contracting Company"
        />
      </IntlProvider></h4>
      <h5 className="font-normal b-4 capitalize">
        <strong>AMACO ARABIA CONTRACTING COMPANY
      
      </strong>
      </h5>
      <h6 className="font-normal b-4 capitalize">
       C.R No 205500334 | VAT 810398615200003


      </h6>
      
    </div> */}
                        <div className="viewer__order-info px-4 mb-4 flex justify-between"></div>
                      </div>
                      <div className="flex">
                        <div>
                          <h2 style={{ color: "#1d2257", textAlign: "right" }}>
                            {/* <IntlProvider locale={locale} messages={Arabic}> */}
                            {/* <strong><FormattedMessage
          id="app.channel.plug"
          defaultMessage="Amaco Arabia Contracting Company"
          values="Amaco Arabia Contracting Company"
        />
        </strong> */}
                            {/* </IntlProvider></h2> */}
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

            <hr></hr>
            <tbody style={{ marginBottom: "50px" }}>
              <tr>
                <td>
                  <div className="viewer__order-info px-4 mb-4 pt-5 flex justify-between">
                    <div className="ml-2">
                      <section class="pageno"></section>
                      <h3 style={{ fontSize: 20 }}>
                        <strong>PURCHASE RETURN</strong>
                      </h3>
                    </div>
                    <div className="text-center"></div>
                    <div className="text-right"></div>
                  </div>
                  <div className="px-2 flex justify-between"></div>
                  <div className="px-2 flex justify-between"></div>
                  <div className="px-2 flex justify-between"></div>

                  <div className="px-2 flex justify-between">
                    <div className="px-2 flex justify-end">
                      <div className="flex ">
                        <div className="">
                          <div className="pl-2 pb-8">
                            {/* <span style={{fontWeight:1000}}>P.O. Number</span><br></br>
              {po_number} */}
                            <span style={{ fontWeight: 1000 }}>SUPPLIER</span>
                            <br></br>
                            {party[0]?.firm_name}
                            <br />
                            {party[0]?.building_no && party[0]?.building_no}{" "}
                            {party[0]?.post_box_no && party[0]?.post_box_no}{" "}
                            {party[0]?.street && party[0]?.street}{" "}
                            {party[0]?.city && "," + party[0]?.city}{" "}
                            {party[0]?.zip_code && "," + party[0]?.zip_code}{" "}
                            {party[0]?.country && "," + party[0]?.country}{" "}
                            {party[0]?.po_no && "-" + party[0]?.po_no}
                          </div>
                          <div className="pl-2 pb-4">
                            <span style={{ fontWeight: 1000 }}>
                              SUPPLIER VAT NUMBER
                            </span>
                            <br></br>
                            {party[0]?.vat_no}
                          </div>

                          {/* <div className="pl-2 pb-4">
              <span style={{fontWeight:1000}}>Attention</span><br></br>
              {contactperson}
             
             
            </div> */}
                          {/* <div className="pl-2 pb-4" style={{ width: 250 }}>
                                                        <span style={{ fontWeight: 1000 }}>DELIVERY ADDRESS {!edit ? (<span id="edits"><Icon onClick={() => setedit(true)} style={{ fontSize: "12px" }}>edit</Icon></span>) : (<Icon style={{ fontSize: "12px" }} onClick={() => updateCompany()}>done</Icon>)}</span><br></br>
                                                        {!edit && (<div style={{ flexDirection: 'row', display: 'flex' }}>
                                                            {company_address}
                                                        </div>)}


                                                        {edit && (<><TextField style={{ width: 250 }} value={company_address} onChange={(e) => setcompany_address(e.target.value)} multiline>

                                                        </TextField></>)}


                                                    </div> */}
                          {/* <div className="pl-2 pb-4">
           
              <span style={{fontWeight:1000}}>FREIGHT TYPE</span><br></br>
              {freight_type}
              
            
            </div> */}
                          {/* <div className="pl-2 "> */}
                          {/* <span style={{fontWeight:1000}}>Email ID</span><br></br>
              {contactpersonemail} */}
                          {/* <span style={{ fontWeight: 1000 }}>PAYMENT TERMS</span><br></br>
                                                        100% Advance


                                                    </div> */}
                        </div>
                        <div></div>
                      </div>
                    </div>
                    <div className="px-2 flex justify-end">
                      <div className="flex ">
                        <div className="">
                          <div className="pl-2 pb-4">
                            {/* <span style={{fontWeight:1000}}>P.O. Date</span><br></br>
              {moment(rdate).format('DD MMM YYYY')} */}
                            <span style={{ fontWeight: 1000 }}>
                              DEBIT NOTE NUMBER
                            </span>
                            <br></br>
                            {party[0]?.pr_number}
                          </div>
                        </div>
                        <div></div>
                      </div>
                    </div>
                    <div className="px-2 flex justify-end">
                      <div className="flex ">
                        <div className="">
                          <div className="pl-2 pb-4">
                            <span style={{ fontWeight: 1000 }}>
                              DEBIT NOTE DATE
                            </span>
                            <br></br>
                            {moment(party[0]?.ps_date).format("DD MMM YYYY")}
                          </div>

                          <div className="pl-2 pb-4">
                            {/* <span style={{fontWeight:1000}}>Attention</span><br></br>
              {contactperson} */}
                          </div>
                          <div className="pl-2 ">
                            {/* <span style={{fontWeight:1000}}>P.O. Date</span><br></br>
              {moment(rdate).format('DD MMM YYYY')} */}
                          </div>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>

                  <br></br>
                  <Card
                    className="mb-4"
                    elevation={0}
                    borderRadius="borderRadius"
                  >
                    <div className="viewer__order-info px-2 mb-4 flex justify-between">
                      <Table>
                        <TableHead
                          style={{
                            backgroundColor: "#1d2257",
                            display: "table-row-group",
                          }}
                        >
                          <TableRow>
                            <TableCell
                              className="pl-0"
                              colspan={2}
                              style={{
                                border: "1px solid #ccc",
                                width: "50px",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: "1000",
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              S.No.
                            </TableCell>

                            <TableCell
                              className="px-0"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: "1000",
                                fontSize: 16,
                              }}
                              width="0px"
                              align="center"
                            >
                              INVOICE NUMBER
                            </TableCell>
                            <TableCell
                              className="px-0"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: "1000",
                                fontSize: 16,
                              }}
                              width="0px"
                              align="center"
                            >
                              ITEM
                            </TableCell>

                            <TableCell
                              className="px-0"
                              colspan={4}
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: "1000",
                                fontSize: 16,
                              }}
                              width="300px"
                              align="center"
                            >
                              DESCRIPTION
                            </TableCell>
                            {/* <TableCell className="px-0" colspan={3} style={{border: "1px solid #ccc",fontFamily: "Calibri",width:200,color:"#fff",fontWeight:'1000',fontSize: 16}}  align="center">REMARK</TableCell> */}
                            <TableCell
                              className="px-0"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                width: 90,
                                color: "#fff",
                                fontWeight: "1000",
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              QTY
                            </TableCell>
                            <TableCell
                              className="px-0"
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: "1000",
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              UOM
                            </TableCell>

                            <TableCell
                              className="px-0"
                              style={{
                                border: "1px solid #ccc",
                                width: 100,
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: "1000",
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              UNIT PRICE
                            </TableCell>
                            <TableCell
                              className="px-0"
                              style={{
                                border: "1px solid #ccc",
                                width: 100,
                                fontFamily: "Calibri",
                                color: "#fff",
                                fontWeight: "1000",
                                fontSize: 16,
                              }}
                              align="center"
                            >
                              TOTAL
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tableData.map((item, index) => {
                            return (
                              <TableRow
                                key={index}
                                style={{ border: "1px solid #ccc" }}
                              >
                                <TableCell
                                  className="pr-0"
                                  align="center"
                                  colspan={2}
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
                                  style={{
                                    border: "1px solid #ccc",
                                    wordBreak: "break-word",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
                                >
                                  {item?.po_number}
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
                                  {item?.product_description}
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
                                  {item?.description}
                                </TableCell>
                                {/* <TableCell className="pl-0 capitalize" colspan={3} align="center"  style={{border: "1px solid #ccc",fontFamily: "Calibri",fontSize: 16}}>
                     {item?.remark}

                    </TableCell> */}

                                <TableCell
                                  className="pr-0 capitalize"
                                  align="center"
                                  style={{
                                    border: "1px solid #ccc",
                                    fontFamily: "Calibri",
                                    fontSize: 16,
                                  }}
                                >
                                  {parseInt(item.quantity).toLocaleString()}
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
                                  {item?.unit_of_measure}
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
                                  {parseFloat(
                                    item.purchase_price
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
                                  {parseFloat(item.total_amount).toLocaleString(
                                    undefined,
                                    { minimumFractionDigits: 2 }
                                  )}
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
                          <TableRow style={{ border: "1px solid #ccc" }}>
                            <TableCell
                              className="pl-0 capitalize hidecell"
                              colspan={8}
                              style={{
                                border: "1px solid white",
                                fontFamily: "Calibri",
                                width: 200,
                              }}
                            ></TableCell>
                            <TableCell
                              style={{
                                textAlign: "right",
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                              colspan={2}
                            >
                              Total Amount{" "}
                            </TableCell>
                            {/* <TableCell style={{textAlign: "right",border: "1px solid #ccc",fontFamily: "Calibri",borderRight:"1px solid #fff"}}>
                SAR
                </TableCell> */}
                            <TableCell
                              style={{
                                textAlign: "right",
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                              colspan={2}
                            >
                              <div style={{ float: "left" }} className="pl-15">
                                {party[0]?.currency_type}
                              </div>

                              {/* <IntlProvider locale='en-US' style={{wordBreak:'break-word',fontFamily: "Calibri"}}>
                    <FormattedNumber value={total_value} currency={"SAR"} style="currency" />
                    </IntlProvider> */}
                              {parseFloat(party[0]?.total_value).toLocaleString(
                                undefined,
                                { minimumFractionDigits: 2 }
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow style={{ border: "1px solid #ccc" }}>
                            <TableCell
                              className="pr-0 capitalize"
                              colspan={8}
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                width: 200,
                              }}
                            ></TableCell>

                            <TableCell
                              style={{
                                textAlign: "right",
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                              width="130px"
                              colspan={2}
                            >
                              Freight Charges{" "}
                            </TableCell>
                            {/* <TableCell style={{textAlign: "right",border: "1px solid #ccc",fontFamily: "Calibri",width:"130px",borderRight:"1px solid #fff"}}>
                SAR
                </TableCell> */}
                            <TableCell
                              style={{
                                textAlign: "right",
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                              width="130px"
                              colspan={2}
                            >
                              {/* <IntlProvider locale='en-US' style={{wordBreak:'break-word'}}>
                    <FormattedNumber value={vat_in_value} currency={"SAR"} style="currency" />
                    </IntlProvider> */}
                              <div style={{ float: "left" }} className="pl-15">
                                {party[0]?.currency_type}
                              </div>

                              {parseFloat(
                                party[0]?.vat_in_value
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                              })}
                            </TableCell>
                          </TableRow>
                          <TableRow style={{ border: "1px solid #ccc" }}>
                            <TableCell
                              className="pl-0 capitalize"
                              colspan={8}
                              style={{
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                width: 200,
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
                                    <b>{party[0]?.currency_type}</b> {ress}
                                    <br></br>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell
                              style={{
                                textAlign: "right",
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                fontSize: 16,
                              }}
                              colspan={2}
                            >
                              <span>Net Total </span>
                            </TableCell>

                            {/* <TableCell style={{textAlign: "right",border: "1px solid #ccc",fontFamily: "Calibri",width:"130px",borderRight:"1px solid #fff"}}>
                SAR
                </TableCell> */}
                            <TableCell
                              style={{
                                textAlign: "right",
                                border: "1px solid #ccc",
                                fontFamily: "Calibri",
                                width: "130px",
                                fontSize: 16,
                              }}
                              colspan={2}
                            >
                              <div style={{ float: "left" }} className="pl-15">
                                {party[0]?.currency_type}
                              </div>

                              {parseFloat(party[0]?.net_amount).toLocaleString(
                                undefined,
                                { minimumFractionDigits: 2 }
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    {/* <div id="panel">
                                            <ExpansionPanel
                                                square

                                                className="p-4"
                                                expanded={expanded === "panel3"}
                                                onChange={handleChange("panel3")}
                                            >
                                                <ExpansionPanelSummary
                                                    aria-controls="panel3d-content"
                                                    id="panel3d-header"
                                                >
                                                    <span>ANNEXURE</span><Icon>expand_more</Icon>
                                                </ExpansionPanelSummary>

                                                <RichTextEditor
                                                    content={content}
                                                    handleContentChange={(content) => setContent(content)}
                                                    placeholder="insert text here..."
                                                />
                                            </ExpansionPanel>
                                        </div> */}

                    <br></br>
                    {/* <td id="note" style={{ padding: '5vh', pageBreakInside: 'auto', visibility: 'hidden' }} >
                                            <div style={{ breakAfter: 'page' }}></div>
                                            <div style={{ pageBreakInside: 'auto' }} dangerouslySetInnerHTML={{ __html: content }}></div>
                                        </td> */}
                    <div class="sign" class="onepage">
                      <p>
                        <div className="viewer__order-info px-4 pl-24 pr-24 mb-4 flex justify-between">
                          <div className="pl-24" style={{ fontWeight: 1000 }}>
                            <h5 className="font-normal t-4 capitalize">
                              <IntlProvider locale={locale} messages={Arabic}>
                                <FormattedMessage id="preparedby" />
                              </IntlProvider>
                            </h5>
                            Prepared by
                          </div>
                          <div style={{ fontWeight: 1000 }} className="pl-2">
                            <h5 className="font-normal t-4 capitalize">
                              <IntlProvider locale={locale} messages={Arabic}>
                                <FormattedMessage id="approvedby" />
                              </IntlProvider>
                            </h5>
                            Approved by
                          </div>
                          <div
                            className="mr-0 pr-24"
                            style={{ fontWeight: 1000 }}
                          >
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
                      </p>
                    </div>
                    <div class="onepage"></div>
                  </Card>
                  <div className="viewer__order-info px-4 mb-4 flex justify-between">
                    {/* <div>
          <td style={{color:"red"}} colspan={2}>Notes </td>
        <tr style={{ height: 5, fontSize: 14,textAlign: 'left'}}>
              
              <td colspan={2}><li>Quoted Prices are for Complete lot, any paritial order is subject to reconfirmation</li></td>
            </tr>
      <tr style={{ height: 5, fontSize: 14,textAlign: 'left'}}>
              <td colspan={2}><li>This is a system Generated Quote and hence does not Required any Signature</li></td>
        </tr>
        <td style={{color:"red"}} colspan={2}>Terms</td>
        <tr style={{ height: 5, fontSize: 14,textAlign: 'left' }}>
              <td ><Icon style={{fontSize:13,color:'blue'}}>timelapse</Icon> Quoatation Validity  </td>
              <td>{validity}</td>
        </tr>
        <tr style={{ height: 5, fontSize: 14,textAlign: 'left' }}>
              <td ><Icon style={{fontSize:13,color:'blue'}}>monetization_on</Icon> Payment Terms  </td>
              <td>{payment_terms}</td>
        </tr>
        <tr style={{ height: 5, fontSize: 14,textAlign: 'left' }}>
              <td ><Icon style={{fontSize:13,color:'blue'}}>verified_user</Icon> Warranty </td>
              <td>{warranty}</td>
        </tr>
        <tr style={{ height: 5, fontSize: 14,textAlign: 'left' }}>
              <td ><Icon style={{fontSize:13,color:'blue'}}>local_shipping</Icon> Delivery Time </td>
              <td>{delivery_time}</td>
        </tr>
          
        <tr style={{ height: 5, fontSize: 14,textAlign: 'left' }}>
              <td ><Icon style={{fontSize:13,color:'blue'}}>info</Icon> Inco-Term </td>
              <td>{inco_terms}</td>
        </tr>
        
       </div> */}
                    {/* <div>
        <tr>
              <td>
                <h5 className="font-normal capitalize">
                  <strong>BANK DETAILS: </strong>{" "}
                </h5>
              </td>
            </tr>
        <tr style={{ height: 5, fontSize: 14, textAlign: 'left'}}>
              <td style={{ height: 'auto !important' }}><strong>Bank Name:</strong></td>
              <td style={{ height: 'auto !important' }}>National Commerical Bank</td>
            </tr>
        <tr style={{ height: 5, fontSize: 14, textAlign: 'left'}}>
              <td style={{ height: 'auto !important' }}><strong>Account No:</strong></td>
              <td style={{ height: 'auto !important' }}>6000000242200</td>
        </tr>
        <tr style={{ height: 5, fontSize: 14, textAlign: 'left'}}>
              <td style={{ height: 'auto !important' }}><strong>IBAN No:</strong></td>
              <td style={{ height: 'auto !important' }}>SA3610000006000000242200</td>
        </tr>
        
       </div>
      </div> */}
                    {/* <br></br>
      <div className="viewer__order-info px-4 mb-4 flex justify-between">
      <div>
            <h6>We trust our offer falls inline with your requirements. For any clarification please contact under signed</h6>
            <h5>Best Regards,</h5>
            <tr style={{ height: 5, fontSize: 14, textAlign: 'left'}}>
            <td style={{ height: 'auto !important' }}>Mr.Abbas Ahamed Shazli</td>

            </tr>
            <tr style={{ height: 5, fontSize: 14, textAlign: 'left'}}>
            <td >Business Development Manager - ISD Division</td>
            </tr>
            <tr style={{ height: 5, fontSize: 14, textAlign: 'left'}}>
            <td>AMACO ARABIA CONTRACTING COMPANY</td>
            </tr>
            <tr style={{ height: 5, fontSize: 14, textAlign: 'left'}}>
            <td>PO BOX 7452, AI Jubail 31951, KSA</td>
            </tr>
            <tr style={{ height: 5, fontSize: 14, textAlign: 'left'}}>
            <td>ABBAS@AMACO.COM.SA</td>
            </tr>
            <tr style={{ height: 5, fontSize: 14, textAlign: 'left'}}>
            <td>535515212</td>
            </tr>
      </div>
      */}
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <div class="empty-footer"></div>
            </tfoot>
          </table>

          <div class="footer page-number">
            {/* <div class="page-number"></div>
CSS to make the number appear in the div :
  multi-page content here... */}
            <footer style={{ visibility: "hidden" }}>
              {/* <div style={{visibility: "hidden" }} style={{'borderBottom': '30px solid #c1c1c1','borderLeft': '50px solid transparent','height': 0,'width': '100%',paddingLeft:'0'}}>
          
          <p style={{color:'#fff',paddingTop:5,paddingBottom:5}} align="center"> Tel.: +966 13 363 2387| Fax: +966 13 363 2387 | P.O.Box 9290 | Jubail 31951 | Kingdom of Saudi Arabia</p>
                
        </div>
         <div class="main" style={{width:'100%'}} > 
       <div  class="right" style={{width: '90px',height: '10ex',backgroundColor: '#fff',shapeOutside: 'polygon(100% 0, 100% 100%, 0 100%)',float: 'right',webkitClipPath: 'polygon(100% 0, 100% 100%, 0 100%)'}}></div>           
        <p   style={{textAlign: 'center',backgroundColor: '#1d2257',color:'white',fontFamily: "Calibri",paddingTop:5,paddingBottom:5}}>E-mail: sales@amaco.com.sa | Website: www.amaco.com.sa</p>
        </div>
        
        <h3 style={{textAlign:"center"}} ></h3> */}
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

                <div id="content">
                  {/* <div id="pageFooter"  >Page </div> */}
                </div>
              </div>
            </footer>
          </div>
        </div>

        {/* <ExpansionPanel
        square
        
        className="p-4"
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <ExpansionPanelSummary
          aria-controls="panel3d-content"
          id="panel3d-header"
        >
          <h6>ANNEXURE</h6>
        </ExpansionPanelSummary>
        
         <RichTextEditor
        content={content}
        handleContentChange={(content) => setContent(content)}
        placeholder="insert text here..."
      />
      </ExpansionPanel>
   */}
      </div>
    </Card>
  );
};

export default PurchaseRInvoiceViewer;
