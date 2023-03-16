import React from "react";
import { navigatePath } from "../invoice/InvoiceService";

const ExpenseRoutes = [

  {
    path: navigatePath+"/expenseview",
    component: React.lazy(() =>
      import("./customers/customer-viewer/ExpenseViewer")
    ),
  },
  {
    path: navigatePath+"/expensedetails/:id",
    component: React.lazy(() =>
      import("./customers/customer-viewer/Expensdetails")
    ),
  },
  {
    path: navigatePath+"/Singlereceipts/:id",
    component: React.lazy(() =>
      import("./SingleReceipt")
    ),
  },
  {
    path: navigatePath+"/payby",
    component: React.lazy(() =>
      import("./payby")
    ),
  },
  {
    path: navigatePath+"/addexpense",
    component: React.lazy(() =>
      import("./customers/customer-form/CustomerForm")
    ),
  },
  {
    path: navigatePath+"/editexpense/:id/:eid",
    component: React.lazy(() =>
      import("./customers/customer-form/EditExpense")
    ),
  },
  {
    path: navigatePath+"/addField",
    component: React.lazy(() =>
      import("./customers/customer-form/AddField")
    ),
  },
  {
    path: navigatePath+"/transaction",
    component: React.lazy(() =>
      import("./tabs")
    ),
  },
  {
    path: navigatePath+"/addreceipt",
    component: React.lazy(() =>
      import("./addreceipt")
    ),
  },
  {
    path: navigatePath+"/addpayment",
    component: React.lazy(() =>
      import("./addpayment")
    ),
  },

];

export default ExpenseRoutes;
