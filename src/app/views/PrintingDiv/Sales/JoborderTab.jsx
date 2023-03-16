import React, { useState,useEffect } from "react";
import { Divider, Tab, Tabs,  Button } from "@material-ui/core";
import { Breadcrumb,ConfirmationDialog } from "matx";
import { Icon } from "@material-ui/core";
import { Link,useParams } from "react-router-dom";
// import MemberEditorDialog from "../../partycontact"
// import FormDialog from "../../partycontact"
import SimpleMuiTable from "./JobOrder";
import Ongoing from "./OngoingJob";
import Completed from "./CompltedJob";

const CustomerViewer = () => {
  const {id}= useParams()
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
  useEffect(() => {
   if(id==="1")
   {
    //  console.log(id);
     setTabIndex(1)
   }
   else if(id==="2")
   {
     setTabIndex(2);
   }
   else
    setTabIndex(0);
  }, [id]);
  
  

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
      <div className="viewer_actions px-4 flex justify-between">
      <Breadcrumb
          routeSegments={[
            // { name: "Add new", path: "/sales/rfq-form/Rfqform" },
            { name: "Job Order List" },
          ]}
        />

        <div className="text-right">
          <Link to={"/print_addquote"}>
            <Button
              className="py-2"
              variant="outlined"
              color="primary"
            >
              <Icon>add</Icon> Add New 
          </Button>
          </Link>
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

      {tabIndex === 0 && <SimpleMuiTable />} 
      {tabIndex === 1 && <Ongoing />}
      {tabIndex === 2 && <Completed />}  
    </div>
  );
};

const tabList = ["New", "Ongoing", "Completed"];

export default CustomerViewer;
