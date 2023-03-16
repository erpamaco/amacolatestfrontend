import React from "react";
import { navigatePath } from "../invoice/InvoiceService";

const partyRoutes = [
  {
    path: navigatePath + "/party/addparty",
    component: React.lazy(() => import("./Addparty")),
  },
  {
    path: navigatePath + "/partycontact",
    component: React.lazy(() => import("./partycontact")),
  },
  {
    path: navigatePath + "/party/updateparty/:id",
    component: React.lazy(() => import("./updateparty")),
  },
  {
    path: navigatePath + "/party/viewparty",
    component: React.lazy(() => import("./Viewparty")),
  },
  {
    path: navigatePath + "/pages/view-customer/:id",
    component: React.lazy(() =>
      import("./customers/customer-viewer/CustomerViewer")
    ),
  },
];

export default partyRoutes;
