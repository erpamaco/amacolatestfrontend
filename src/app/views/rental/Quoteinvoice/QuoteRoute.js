import React from "react";
import { navigatePath } from "../../invoice/InvoiceService";

const QuoteRoutes = [
 
  
  {
    path: navigatePath+"/rental/quote/:id/:s/:t",
    component: React.lazy(() => import("./Quotedetails"))
  },
  {
    path: navigatePath+"/rental/quickPo/",
    component: React.lazy(() => import("./QuickPo"))
  },
  {
    path: navigatePath+"/rental/quoteedit/:id/:t",
    component: React.lazy(() => import("./Quoteedit"))
  },
  {
    path: navigatePath+"/rental/revisequote/:id/:t",
    component: React.lazy(() => import("./Revisequote"))
  },
  {
    path: navigatePath+"/rental/dnote/:id",
    component: React.lazy(() => import("./dnote"))
  },
  {
    path: navigatePath+"/invoice_dnote/:id",
    component: React.lazy(() => import("./Invoice_dnote"))
  },
  {
    path: navigatePath+"/rental/quoteanalysis/",
    component: React.lazy(() => import("./Quoteanalyse"))
  },
  {
    path: navigatePath+"/rental/purchaseanalysis/:id",
    component: React.lazy(() => import("./purchaseanalysis"))
  },
  {
    path: navigatePath+"/rental/Newquoteanalysis/",
    component: React.lazy(() => import("./NewQuoteanalysis"))
  },
  {
    path: navigatePath+"/rental/QuickQuote/",
    component: React.lazy(() => import("../sales/quoate-form/QuickQuote"))
  },
  {
    path: navigatePath+"/rental/Quoteinvoice/:id",
    component: React.lazy(() => import("./Quoteinvoice"))
  },
  {
    path: navigatePath+"/rental/printdemo",
    component: React.lazy(() => import("./printdemo"))
  },
  {
    path: navigatePath+"/rental/InvoiceCreate",
    component: React.lazy(() => import("./InvoiceCreate"))
  },
  {
    path: navigatePath+"/rental/ProformaInvoiceCreate",
    component: React.lazy(() => import("./ProformaInvoiceCreate"))
  },
  {
    path: navigatePath+"/rental/InvoiceEdit/:id",
    component: React.lazy(() => import("./InvoiceEdit"))
  },
  {
    path: navigatePath+"/rental/ProformaInvoiceEdit/:id",
    component: React.lazy(() => import("./ProformaInvoiceEdit"))
  },
  
];

export default QuoteRoutes;
