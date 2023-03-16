import React from "react";
import { navigatePath } from "../invoice/InvoiceService";

const EmployeeRoute = [

  {
    path: navigatePath+"/employees",
    component: React.lazy(() =>
      import("./Employee")
    ),
  },

];

export default EmployeeRoute;
