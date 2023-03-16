import React from "react";
import { navigatePath } from "../invoice/InvoiceService";

const statementRoutes = [
 
  
  {
    path: navigatePath+"/customeraccount",
    component: React.lazy(() => import("./customer"))
  },
  {
    path: navigatePath+"/vendor",
    component: React.lazy(() => import("./vendorstatement"))
  },
  {
    path: navigatePath+"/assets",
    component: React.lazy(() => import("./assets"))
  },
  {
    path: navigatePath+"/Account_dashboard",
    component: React.lazy(() => import("./account_dashboard"))
  },
  {
    path: navigatePath+"/accountpayable",
    component: React.lazy(() => import("./accountpayable"))
  },
  {
    path: navigatePath+"/advancesummary",
    component: React.lazy(() => import("./advancesummary"))
  },
  {
    path: navigatePath+"/bankstatement",
    component: React.lazy(() => import("./bankstatement"))
  },
  {
    path: navigatePath+"/cashstatement",
    component: React.lazy(() => import("./cashstatement"))
  },
  {
    path: navigatePath+"/vatstatement",
    component: React.lazy(() => import("./vatstatement"))
  },
  {
    path: navigatePath+"/profitLoss",
    component: React.lazy(() => import("./profitLossTab"))
  },
  {
    path: navigatePath+"/balanceSheet",
    component: React.lazy(() => import("./balanceSheet"))
  },
  {
    path: navigatePath+"/customer_account/:ids",
    component: React.lazy(() => import("./customer"))
  },
  {
    path: navigatePath+"/account/:id",
    component: React.lazy(() => import("./account"))
  },
  {
    path: navigatePath+"/personalTab",
    component: React.lazy(() => import("./personalTab"))
  },
  {
    path: navigatePath+"/master",
    component: React.lazy(() => import("./master"))
  },
  {
    path: navigatePath+"/employee",
    component: React.lazy(() => import("./employee"))
  },
  {
    path: navigatePath+"/dashboard",
    component: React.lazy(() => import("./dashboard"))
  },
  
    
];

export default statementRoutes;
