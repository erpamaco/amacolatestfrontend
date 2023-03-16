import React from "react";
import { navigatePath } from "app/views/invoice/InvoiceService";
const PrintQuoteRoutes = [
  {
    path: navigatePath + "/print_quote",
    component: React.lazy(() => import("./Quotation")),
  },

  {
    path: navigatePath + "/print_quote_tab",
    component: React.lazy(() => import("./QuoteTab")),
  },
  {
    path: navigatePath + "/print_quote_invoice/:id/:s",
    component: React.lazy(() => import("./QuoteDetails")),
  },
  {
    path: navigatePath + "/print_addquote/",
    component: React.lazy(() => import("./AddQuote")),
  },
  {
    path: navigatePath + "/print_Joborder/",
    component: React.lazy(() => import("./JobOrder")),
  },
  {
    path: navigatePath + "/print_Joborder_tab/",
    component: React.lazy(() => import("./JoborderTab")),
  },
  {
    path: navigatePath + "/print_Joborder_tabid/:id",
    component: React.lazy(() => import("./JoborderTab")),
  },
  {
    path: navigatePath + "/print_deliverynote",
    component: React.lazy(() => import("./DeliveryNote")),
  },
  {
    path: navigatePath + "/print_quote_edit/:id",
    component: React.lazy(() => import("./QuoteEdit")),
  },
  {
    path: navigatePath + "/print_invoice",
    component: React.lazy(() => import("./Invoice")),
  },
  {
    path: navigatePath + "/print_expense",
    component: React.lazy(() => import("./expense")),
  },
];

export default PrintQuoteRoutes;
