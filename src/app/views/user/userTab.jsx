import React, { useState, useEffect } from "react";
import { Divider, Tab, Card, Tabs, Button } from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "matx";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
// import MemberEditorDialog from "../../partycontact"
// import FormDialog from "../../partycontact"
import SimpleMuiTable from "./userview";
import MemberEditorDialog from "./useradd";
// import AcceptQuote from "./Acceptquote";
import UserTrash from "./userTrash";
import LoginLog from "./LoginLog";
import ActivityLog from "./ActivityLog";
import url from "../invoice/InvoiceService";

const CustomerViewer = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userid, setuserid] = useState(null);
  const [alive, setAlive] = useState(false);
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
    useState(false);
  const [logData, setLogData] = useState([]);

  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
    setAlive(true);
  };

  const handleDeleteUser = (user) => {
    setShouldOpenConfirmationDialog(true);
  };

  const handleTabChange = (e, value) => {
    setTabIndex(value);
  };

  useEffect(() => {
    url.get("activityLogs").then(({ data }) => {
      setLogData(data);
    });
  }, []);

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <div className="viewer_actions px-0 flex justify-between">
          <Breadcrumb
            routeSegments={[
              // { name: "Add new", path: "/sales/rfq-form/Rfqform" },
              { name: "USERS" },
            ]}
          />

          <div className="text-right">
            <Button
              className="py-2"
              color="primary"
              variant="outlined"
              onClick={(e) => setShouldOpenEditorDialog(true)}
            >
              <Icon>add</Icon>
              ADD NEW
            </Button>
          </div>
        </div>
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
      {shouldOpenEditorDialog && (
        <MemberEditorDialog
          handleClose={handleDialogClose}
          open={shouldOpenEditorDialog}
          userid={userid}
          alive={setAlive}
          userList={setUserList}
        />
      )}
      {shouldOpenConfirmationDialog && (
        <ConfirmationDialog
          open={shouldOpenConfirmationDialog}
          onConfirmDialogClose={handleDialogClose}
          text="Are you sure to delete?"
        />
      )}

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

        {tabIndex === 0 && (
          <SimpleMuiTable alive={alive} setAlive={setAlive} logData={logData} />
        )}
        {/* {/* {tabIndex === 1 && <AcceptQuote />} */}
        {tabIndex === 1 && <UserTrash />}
        {tabIndex === 2 && <LoginLog />}
        {tabIndex === 3 && <ActivityLog logData={logData} />}
      </Card>
    </div>
  );
};

const tabList = ["NEW", "TRASH", "LOGIN LOGS", "ACTIVITY LOG"];

export default CustomerViewer;
