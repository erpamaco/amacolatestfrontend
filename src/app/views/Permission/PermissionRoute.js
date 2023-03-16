import React from "react";
import { navigatePath } from "../invoice/InvoiceService";

const PermissionRoute = [

  {
    path: navigatePath+"/modules",
    component: React.lazy(() =>
      import("./MainPage")
    ),
  },
  // {
  //   path: navigatePath+"/noti",
  //   component: React.lazy(() =>
  //     import("./Noti")
  //   ),
  // },

];

export default PermissionRoute;
