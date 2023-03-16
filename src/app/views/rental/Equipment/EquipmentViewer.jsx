import React, { useState } from "react";
import { Divider,Card, Tab, Tabs } from "@material-ui/core";
import { Breadcrumb } from "matx";
import EquipmentDetails from "./EquipmentDetails";
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
              name: "EQUIPMENT",
              path: navigatePath + "/rental/equipment/viewequipment",
            },
            { name: "EQUIPMENT DETAILS" },
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

      {tabIndex === 0 && <EquipmentDetails />}  
    </Card>
    </div>
  );
};

const tabList = ["DETAILS", "", ""];

export default CustomerViewer;
