import React from "react";

const PrintPurRoutes = [
 
  
  {
    path: "/print_rfqview",
    component: React.lazy(() => import("./Rfqview"))
  },
  
  {
    path: "/print_AddRfq",
    component: React.lazy(() => import("./AddRfq"))
  },
  {
    path: "/print_po",
    component: React.lazy(() => import("./po"))
  },
  
];

export default PrintPurRoutes;
