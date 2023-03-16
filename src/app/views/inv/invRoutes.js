import React from "react";

const invRoutes = [
  
  {
    path: "/invview/:id/:s",
    // exact: true,
    component: React.lazy(() => import("./invview"))
  },
  {
    path: "/editDelivery/:id",
    // exact: true,
    component: React.lazy(() => import("./editDel"))
  },
  

];

export default invRoutes;
