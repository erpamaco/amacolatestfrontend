import React, { useState, useEffect } from "react";
import { Divider, Card, Tab, Tabs, Button, Icon } from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "matx";
// import CustomerDetails from "./CustomerDetails";
// import CustomerInvoice from "./CustomerInvoice";
import SimpleMuiTable from "./receiptview";
import Paymentview from "./paymentview";
import MemberEditorDialog from "./addreceipt";
import MemberEditorDialog1 from "./addpayment";
import url from "../../views/invoice/InvoiceService";

const TabViewer = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [shouldOpenEditorDialog1, setShouldOpenEditorDialog1] = useState(false);
  // const [UserList, setUserList] = useState([]);

  const [data1, setdata1] = useState([]);

  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
    useState(false);
  const [shouldOpenConfirmationDialog1, setShouldOpenConfirmationDialog1] =
    useState(false);
  const handleDialogClose1 = () => {
    setShouldOpenEditorDialog1(false);
    // setTabIndex(0)
    url.get("advance-payments").then(({ data }) => {
      setdata1(data);
    });
  };

  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
    setTabIndex(0);
    url.get("receipts").then(({ data }) => {
      setdata1(data);
    });
  };
  useEffect(() => {
    // tabIndex?setTabIndex(1):setTabIndex(0)
    setTabIndex(0);

    // return <SimpleMuiTable data1={data1}/>
  }, []);

  const handleTabChange = (e, value) => {
    setTabIndex(value);
  };

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <div className="flex flex-wrap justify-between mb-6">
          <Breadcrumb
            routeSegments={[
              // { name: "Add Expense", path: "/addexpense" },
              { name: "TRANSACTIONS" },
            ]}
          />
          <div className="text-right ">
            {tabIndex === 0 && (
              <Button
                className="py-2 mr-2"
                color="primary"
                variant="outlined"
                onClick={(e) => setShouldOpenEditorDialog(true)}
              >
                <Icon>add</Icon>
                NEW RECEIPT
              </Button>
            )}
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

            {tabIndex === 1 && (
              <Button
                className="py-2 ml-2"
                color="primary"
                variant="outlined"
                onClick={(e) => setShouldOpenEditorDialog1(true)}
              >
                <Icon>add</Icon>
                NEW PAYMENT
              </Button>
            )}
            {shouldOpenEditorDialog1 && (
              <MemberEditorDialog1
                handleClose={handleDialogClose1}
                open={shouldOpenEditorDialog1}
              />
            )}
            {shouldOpenConfirmationDialog && (
              <ConfirmationDialog
                open={shouldOpenConfirmationDialog1}
                onConfirmDialogClose={handleDialogClose1}
                text="Are you sure to delete?"
              />
            )}
          </div>
        </div>
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

        {tabIndex === 0 && <SimpleMuiTable data1={data1} />}
        {tabIndex === 1 && <Paymentview data1={data1} />}
      </Card>
      {/* {tabIndex === 1 && <CustomerLogs />} */}
    </div>
  );
};

const tabList = ["RECEIPT", "PAYMENT"];

export default TabViewer;
