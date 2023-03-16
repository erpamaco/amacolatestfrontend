import React, { useState } from "react";
import { Divider, Tab,Card, Tabs } from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "matx";
import PartyDetails from "./PartyDetails";
// import CustomerInvoice from "./CustomerInvoice";
// import CustomerLogs from "./CustomerLogs";
import MemberEditorDialog from "../../partycontact"
// import FormDialog from "../../partycontact"
import ContactDetails from "./ContactDetails";
// import PartyInfo from "./PartyView";
import BankDetails from "./BankDetails";
import Invoice from "./Invoice";
import { navigatePath } from "app/views/invoice/InvoiceService";
import { useParams } from "react-router-dom";

const CustomerViewer = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const { id } = useParams();

  const [
    shouldOpenConfirmationDialog,
  ] = useState(false);

  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);

  };

  // const handleDeleteUser = (user) => {

  //   setShouldOpenConfirmationDialog(true);
  // };

  const handleTabChange = (e, value) => {
    setTabIndex(value);
  };

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <div className="flex flex-wrap justify-between pt-2">
          <Breadcrumb
            routeSegments={[
              { name: "PARTY", path: navigatePath + "/party/viewparty" },
              { name: "PARTY DETAILS" },
            ]}
          />
        </div>
      </div>
      <div>
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
      </div>
<Card>
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

      {tabIndex === 0 && <PartyDetails ids={id} />}
      {tabIndex === 1 && <ContactDetails ids={id} />}
      {tabIndex === 2 && <BankDetails ids={id} />}
      {tabIndex === 3 && <Invoice ids={id} />}
      </Card>
    </div>
  );
};

const tabList = ["COMPANY DETAILS", "CONTACT DETAILS", "BANK DETAILS", "INVOICES"];

export default CustomerViewer;
