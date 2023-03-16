import React from "react";
import { navigatePath } from "../invoice/InvoiceService.js";

const StockRoute = [

  {
    path: navigatePath+"/stock",
    component: React.lazy(() =>
      import("./Stock.jsx")
    ),
  },

];

export default StockRoute;
