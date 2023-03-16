import React, { useState } from "react";
import { Divider, Card, Tab, Tabs, Button, Icon } from "@material-ui/core";
import { Breadcrumb } from "matx";
import ExpensePending from "./ExpensePending";
import ExpenseVerified from "./ExpenseVerified";
import ExpenseCompleted from "./ExpenseCompleted";
import { Link } from "react-router-dom";
import { navigatePath } from "app/views/invoice/InvoiceService";

const ExpenseViewer = () => {
  const [tabIndex, setTabIndex] = useState(0);

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
              { name: "EXPENSES" },
            ]}
          />
          <div className="text-right">
            <Link to={navigatePath + "/addexpense"}>
              <Button className="py-2" color="primary" variant="outlined">
                <Icon>add</Icon>
                ADD NEW
              </Button>
            </Link>
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

        {tabIndex === 0 && <ExpensePending />}
        {tabIndex === 1 && <ExpenseVerified />}
        {tabIndex === 2 && <ExpenseCompleted />}
      </Card>
    </div>
  );
};

const tabList = ["PENDING", "VERIFIED", "COMPLETED"];

export default ExpenseViewer;
