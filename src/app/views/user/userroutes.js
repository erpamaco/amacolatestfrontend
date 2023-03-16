import React from "react";
import { navigatePath } from "../invoice/InvoiceService";

const userRoutes = [
 
  
  {
    path: navigatePath+"/user",
    component: React.lazy(() => import("./userview"))
  },
  {
    path: navigatePath+"/userTab",
    component: React.lazy(() => import("./userTab"))
  },
  {
    path: navigatePath+"/companyInfo",
    component: React.lazy(() => import("./companyInfo"))
  },
  {
    path: navigatePath+"/division",
    component: React.lazy(() => import("./divisionview"))
  },
  {
    path: navigatePath+"/bankaccount",
    component: React.lazy(() => import("./bankaccount"))
  },
  {
    path: navigatePath+"/profile",
    component: React.lazy(() => import("./profile"))
  },
  {
    path: navigatePath+"/changepass",
    component: React.lazy(() => import("./changepass"))
  },
    
];

export default userRoutes;
