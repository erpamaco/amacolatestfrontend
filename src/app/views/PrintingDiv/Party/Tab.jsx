import React, { useState } from "react";
import { Divider, Tab, Tabs} from "@material-ui/core";
import { Breadcrumb,ConfirmationDialog } from "matx";
import CompanyDetails from "./CompanyDetails";
// import MemberEditorDialog from "../../partycontact"
// import FormDialog from "../../partycontact"
import ContactDetails from "./ContactDetails";
import BankDetails from "./BankDetails";

const CustomerViewer = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  
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
      <div className="flex flex-wrap justify-between pt-2">
        <Breadcrumb
          routeSegments={[
            { name: "Party", path: "/print_viewparty" },
            { name: "Party Details" },
          ]}
        />
        </div>
      </div>
      <div>
      {/* {shouldOpenEditorDialog && (
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
        )} */}
      </div>
      
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

       {tabIndex === 0 && <CompanyDetails />}
       {tabIndex === 1 && <ContactDetails />}
      {tabIndex === 2 && <BankDetails />}  
    </div>
  );
};

const tabList = ["Company Details", "Contact Details", "Bank Details","Invoices"];

export default CustomerViewer;
