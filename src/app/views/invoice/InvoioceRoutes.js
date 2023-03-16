import React from "react";
import { navigatePath } from "./InvoiceService";
const invoiceRoutes = [
  // {
  //   path: "/invoice/rfqprint",
  //   component: React.lazy(() => import("./Rfqprint"))
  // },
  {
    path: navigatePath+"/invoice/list",
    // exact: true,
    component: React.lazy(() => import("./InvoiceViewer"))
  },
  {
    path: navigatePath+"/invoice/:id/:search",
    // exact: true,
    component: React.lazy(() => import("./InvoiceViewer"))
  },
  {
    path: navigatePath+"/invoice/:id",
    component: React.lazy(() => import("./InvoiceDetails"))
  },

  {
    path: navigatePath+"/edit/:id",
    component: React.lazy(() => import("./InvoiceEditor"))
  },
  
];

export default invoiceRoutes;
