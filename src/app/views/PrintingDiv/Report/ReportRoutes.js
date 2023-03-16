import React from "react";

const PrintReportRoutes = [
 
  
  {
    path: "/print_job_report",
    component: React.lazy(() => import("./Job"))
  },
  
  {
    path: "/print_quote_stock",
    component: React.lazy(() => import("./Stock"))
  },
  
  
];

export default PrintReportRoutes;
