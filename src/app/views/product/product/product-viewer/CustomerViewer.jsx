import React, { useState } from "react";
import { Divider,Card, Tab, Tabs } from "@material-ui/core";
import { Breadcrumb } from "matx";
import ProductDetails from "./ProductDetails";
import { navigatePath } from "app/views/invoice/InvoiceService";

const CustomerViewer = () => {
  const [tabIndex, setTabIndex] = useState(0); //initial tab index is 0

  /*Change the tab index if tabs are more than one */
  const handleTabChange = (e, value) => {
    setTabIndex(value);
  };

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            {
              name: "CATEGORY",
              path: navigatePath + "/product/viewsubcategory",
            },
            { name: "PRODUCT DETAILS" },
          ]}
        />
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

      {tabIndex === 0 && <ProductDetails />}  
    </Card>
    </div>
  );
};

const tabList = ["DETAILS", "", ""];

export default CustomerViewer;
