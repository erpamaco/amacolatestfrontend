import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InvoiceView from "./InvoiceView";
import QuoteView from "./QuoteView";

export default function CirtificateDialig({ open, handleClose, type, data }) {
  return (
    <div>
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth={"xl"}
        onClose={handleClose}
      >
        
        <DialogTitle>{type == "I"  ? 'INVOICE' : 'QUOTATION'}</DialogTitle>
        <DialogContent>{type == "I" ? <InvoiceView data={data}/> : <QuoteView data={[data]}/>}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CLOSE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
