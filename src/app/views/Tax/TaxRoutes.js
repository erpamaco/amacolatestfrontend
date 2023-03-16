import React from "react";
import { navigatePath } from "../invoice/InvoiceService";

const userRoutes = [
 
  
  {
    path: navigatePath+"/purchasetax",
    component: React.lazy(() => import("./Purchase_Tax"))
  },
  {
    path: navigatePath+"/salestax",
    component: React.lazy(() => import("./Sales_Tax"))
  },
      
];

export default userRoutes;
