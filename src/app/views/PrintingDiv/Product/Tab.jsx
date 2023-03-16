import React, { useState } from "react";
import { Divider, Tab, Tabs,  Button } from "@material-ui/core";
import { Breadcrumb,ConfirmationDialog } from "matx";
import CustomerDetails from "./ProductDetails";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";

// import MemberEditorDialog from "../../partycontact"
// import FormDialog from "../../partycontact"

const CustomerViewer = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const foo =parseInt(params.get('id'))
  
  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);
  
  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
   
  };

  const handleDeleteUser = (user) => {
    
    setShouldOpenConfirmationDialog(true);
  };

  const handleTabChange = (e, value) => {
    setTabIndex(value);
  };
  

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            // { name: "Product View", path: `/product/viewproduct/${foo}` },
            { name: "Category", path: "/print_categoryview" },
            { name: "Product Details" },
          ]}
        />
      </div>
      {/* <div>
      {shouldOpenEditorDialog && (
          <MemberEditorDialog
            handleClose={handleDialogClose}
            open={shouldOpenEditorDialog}
          />
        )}
        {shouldOpenConfirmationDialog && (
          <ConfirmationDialog
            open={shouldOpenConfirmationDialog}
            onConfirmDialogClose={handleDialogClose}
            text="Are you sure to delete?"
          />
        )}
      </div> */}
      
      <Tabs
        className="mt-4"
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        {tabList.map((item, ind) => (
          <Tab className="capitalize" value={ind} label={item} key={ind} />
        ))}
      </Tabs>
      <Divider className="mb-6" />

       {tabIndex === 0 && <CustomerDetails />}
      {/* {tabIndex === 1 && <CustomerInvoice />}
      {tabIndex === 2 && <CustomerLogs />}  */}
    </div>
  );
};

const tabList = ["Details", "", ""];

export default CustomerViewer;
