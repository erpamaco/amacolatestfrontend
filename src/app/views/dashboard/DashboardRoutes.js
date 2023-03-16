import React from "react";
import { authRoles } from "../../auth/authRoles";
import { navigatePath } from "../invoice/InvoiceService";

const dashboardRoutes = [
  {
    path: navigatePath + "/dashboard/alternative/:d",
    component: React.lazy(() => import("./Analytics")),
    // auth: authRoles.sa,
  },
  {
    path: navigatePath + "/dashboard/alternative",
    component: React.lazy(() => import("./Analytics")),
    // auth: authRoles.sa,
  },
  {
    path: navigatePath + "/rental/dashboard/alternative",
    component: React.lazy(() => import("../rental/Dashboards/RentalAnalytics")),
    // auth: authRoles.sa,
  },
  {
    path: navigatePath + "/dashboard/default",
    component: React.lazy(() => import("./Analytics2")),
    // auth: authRoles.admin,
  },
  {
    path: navigatePath + "/dashboard/inventory-management",
    component: React.lazy(() => import("./InventoryManagement")),
    // auth: authRoles.admin,
  },
];

export default dashboardRoutes;
