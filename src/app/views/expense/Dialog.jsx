import React, { useState, useEffect } from "react";
import { Dialog, Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router";

const MemberEditorDialog = ({ open, handleClose,img }) => {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");

  const routerHistory = useHistory();

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className="px-6 pt-2 pb-4"
      style={{ zIndex: 1000 }}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <img src={img}></img>
    </Dialog>
  );
};

export default MemberEditorDialog;
