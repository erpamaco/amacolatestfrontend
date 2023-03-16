import React, { useState } from "react";
import { Divider, Tab, Tabs,  Button } from "@material-ui/core";
import { Breadcrumb,ConfirmationDialog } from "matx";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
import ProfitLoss from "./ProfitLoss";
import ProfitLossShare from "./profitLossShare"
import ExpensePLReport from './ExpensePLReport'


const ProfitLossTab = () => {
  const [tabIndex, setTabIndex] = useState(0);

  
  
  const handleTabChange = (e, value) => {
    setTabIndex(value);
  };

  
  

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
        
        </div>
      </div>
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

       {tabIndex === 0 && <ProfitLoss />}
     {tabIndex === 1 && <ProfitLossShare />}
     {tabIndex === 2 && <ExpensePLReport />}
      {/* {tabIndex === 1 && <UserTrash />}   */}
    </div>
  );
};

const tabList = ["PROFIT & LOSS REPORT", "PROFIT & LOSS SHARE",'EXPENSE PROFIT & LOSS REPORT'];

export default ProfitLossTab;
