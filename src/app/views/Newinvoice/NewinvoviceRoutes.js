import React from "react";
import { navigatePath } from "../invoice/InvoiceService";

const NewinvoiceRoutes = [
  {
    path: navigatePath + "/newinvoice/:id/:del",
    component: React.lazy(() => import("./Newinvoiceview")),
  },
  {
    path: navigatePath + "/newinvoice/:id",
    component: React.lazy(() => import("./Newinvoiceview")),
  },
  {
    path: navigatePath + "/proformanewinvoice/:id",
    component: React.lazy(() => import("./ProformaNewinvoiceview")),
  },
  
  {
    path: navigatePath + "/newEdit",
    component: React.lazy(() => import("./a/New")),
  },
  {
    path: navigatePath + "/poinvview/:id",
    component: React.lazy(() => import("./poinvview")),
  },
  {
    path: navigatePath + "/poinvoice/:id/:his",
    component: React.lazy(() => import("./poinvoice")),
  },
  {
    path: navigatePath + "/poinvoice/:id",
    component: React.lazy(() => import("./poinvoice")),
  },
  {
    path: navigatePath + "/poupdateinvoice/:id",
    component: React.lazy(() => import("./poupdateinvoice")),
  },
  {
    path: navigatePath + "/purchaseedit/:id",
    component: React.lazy(() => import("./purchaseedit")),
  },
  {
    path: navigatePath + "/poinvoicegenerate/:id",
    component: React.lazy(() => import("./poinvoicegenerate")),
  },
  {
    path: navigatePath + "/purchaseinvoice/:id",
    component: React.lazy(() => import("./Purchaseinvoice")),
  },
  {
    path: navigatePath + "/purchaseinvoiceview/:t",
    component: React.lazy(() => import("./PurchaseInvoices.jsx")),
  },
  {
    path: navigatePath + "/purchaseinvoiceview/",
    component: React.lazy(() => import("./PurchaseInvoices.jsx")),
  },
  {
    path: navigatePath + "/piview/:id/:del",
    component: React.lazy(() => import("./PurchaseInvoiceView.jsx")),
  },
  {
    path: navigatePath + "/piview/:id",
    component: React.lazy(() => import("./PurchaseInvoiceView.jsx")),
  },
  

  {
    path: navigatePath + "/piedit/:id",
    component: React.lazy(() => import("./PurchaseInvoiceEdit.jsx")),
  },
  {
    path: navigatePath + "/purchaseinvoicegenarate/",
    component: React.lazy(() => import("./PurchaseInvoiceGenarate")),
  },
  {
    path: navigatePath + "/pdftest/",
    component: React.lazy(() => import("./PDF")),
  },
];

export default NewinvoiceRoutes;
