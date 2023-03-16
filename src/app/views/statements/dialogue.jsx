/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  Grid,
  IconButton,
  Tooltip,
  TableCell,
  TableHead
} from "@material-ui/core";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import VatStatement from "./vatstatement";
import ProfitLoss from "./ProfitLoss";
import CloseIcon from "@material-ui/icons/Close";
import Customer from "./customer";
import Cashstatement from "./cashstatement";
import BankStatement from "./bankstatement";
import Advance from "./advancesummary";
import Assets from "./assets";
import Accountpayable from "./accountpayable";




import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";


import Swal from "sweetalert2";
import url, {getcategories}from "../invoice/InvoiceService"
import { makeStyles } from "@material-ui/core/styles";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  '#bread':{
    visibility:'hidden',
    display:'none'
  }
}));

const StatementDialog = ({ value, open, handleClose,catid,catList }) => {
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState("lg");
    const {classes}=useStyles();

  return (
    <Dialog onClose={handleClose} open={open} className="px-6 pt-2 pb-4" style={{zIndex:1000}} fullWidth={fullWidth}
    maxWidth={maxWidth}>
        <div className="mt-4">
          <Tooltip title="close">
            <Icon className="mx-6 flex-end" color="secondary" onClick={()=>handleClose()}>cancel</Icon>
            </Tooltip>
            {/* <CloseIcon className="justify-end pl-4" onClick={()=>handleClose()}></CloseIcon> */}
            {value=='vat'&&<VatStatement value="hidden"></VatStatement>}
            {value=='profit'&&<ProfitLoss></ProfitLoss>}
            {value=='receivable'&&<Customer value="hidden"></Customer>}
            {value=='bank'&&<BankStatement value="hidden"></BankStatement>}
            {value=='cash'&& <Cashstatement value="hidden"></Cashstatement>}
            {value=='advance'&&<Advance></Advance>}
            {value=='assets'&&<Assets></Assets>}
            {value=='pay'&&<Accountpayable ></Accountpayable>}

        </div>
          </Dialog>
    
  );
};

export default StatementDialog;
