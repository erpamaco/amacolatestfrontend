import React from "react";
import { navigatePath } from "../../invoice/InvoiceService";

const equipmentRoutes = [
  {
    path: navigatePath + "/rental/equipment/addequipment",
    component: React.lazy(() => import("./Addequipment")),
  },
  {
    path: navigatePath + "/rental/equipment/viewequipment",
    component: React.lazy(() => import("./EquipmentViewTabs")),
  },

  {
    path: navigatePath + "/rental/singleequipment/:id",
    component: React.lazy(() =>
      import("./EquipmentViewer")
    ),
  },
  ];

export default equipmentRoutes;
