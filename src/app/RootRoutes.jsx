import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import utilitiesRoutes from "./views/utilities/UtilitiesRoutes";

import materialRoutes from "./views/material-kit/MaterialRoutes";
import chartsRoute from "./views/charts/ChartsRoute";
import dragAndDropRoute from "./views/Drag&Drop/DragAndDropRoute";
import invoiceRoutes from "./views/invoice/InvoioceRoutes";
import QuoteRoute from "./views/Quoteinvoice/QuoteRoute";
import NewinvoiceRoutes from "./views/Newinvoice/NewinvoviceRoutes"
import calendarRoutes from "./views/calendar/CalendarRoutes";
import crudRoute from "./views/CRUD/CrudRoutes";
import inboxRoute from "./views/inbox/InboxRoutes";
import demoRoutes from "./views/demo/demoRoutes"
import formsRoutes from "./views/forms/FormsRoutes";
import partyRoutes from "./views/party/PartyRoutes";
// --------------rental routes/
import rentalQuoteRoute from "./views/rental/Quoteinvoice/QuoteRoute";
import equipmentRoutes from "./views/rental/Equipment/EquipmentRoutes";
import rentalSalesRoutes from "./views/rental/sales/SalesRoutes";
// ----------------------------------------------------------
import productRoutes from "./views/product/productRoutes";
import salesRoutes from "./views/sales/SalesRoutes";
import mapRoutes from "./views/map/MapRoutes";
import chatRoutes from "./views/chat-box/ChatRoutes";
import todoRoutes from "./views/todo/TodoRoutes";
import pageLayoutRoutes from "./views/page-layouts/PageLayoutRoutees";
import ListRoute from "./views/list/ListRoute";

import pricingRoutes from "./views/pricing/PricingRoutes";
import scrumBoardRoutes from "./views/scrum-board/ScrumBoardRoutes";
import ecommerceRoutes from "./views/ecommerce/EcommerceRoutes";
import pagesRoutes from "./views/pages/pagesRoutes";
import dataTableRoutes from "./views/data-table/dataTableRoutes";
import invRoutes from "./views/inv/invRoutes";
import ExpenseRoutes from "./views/expense/ExpenseRoutes";
import userRoutes from "./views/user/userroutes";
import statementRoutes from "./views/statements/StatementRoute";
import TaxRoutes from "./views/Tax/TaxRoutes";
import PrintQuoteRoutes from "./views/PrintingDiv/Sales/salesRoutes";
import PrintPartyRoutes from "./views/PrintingDiv/Party/PartyRoutes";
import PrintProductRoutes from "./views/PrintingDiv/Product/ProductRoutes";
import PrintReportRoutes from "./views/PrintingDiv/Report/ReportRoutes";
import PrintPurRoutes from "./views/PrintingDiv/Purchase/PurRoutes";
import StockRoute from "./views/Stock/StockRoute";
import PermissionRoute from "./views/Permission/PermissionRoute";
import EmployeeRoute from "./views/Employees/EmployeeRoute";
import { navigatePath } from "./views/invoice/InvoiceService";
const redirectRoute = [
  {
    path: "/",
    exact: true,

    component: () => <Redirect to={localStorage.getItem("division") == 8 ? navigatePath + "/rental/dashboard/alternative" : navigatePath + "/dashboard/alternative"} />,
  },
];

// const errorRoute = [
//   {
//     component: () => <Redirect to="/session/404" />,
//   },
// ];

const routes = [
  ...dashboardRoutes,
  ...StockRoute,
  ...EmployeeRoute,
  ...statementRoutes,
  ...userRoutes,
  ...ExpenseRoutes,
  ...invRoutes,
  ...QuoteRoute,
  ...rentalQuoteRoute,
  ...NewinvoiceRoutes,
  ...demoRoutes,
  ...partyRoutes,
  ...equipmentRoutes,
  ...productRoutes,
  ...salesRoutes,
  ...rentalSalesRoutes,
  ...materialRoutes,
  ...utilitiesRoutes,
  ...chartsRoute,
  ...dragAndDropRoute,
  ...calendarRoutes,
  ...invoiceRoutes,
  ...crudRoute,
  ...inboxRoute,
  ...formsRoutes,
  ...mapRoutes,
  ...chatRoutes,
  ...todoRoutes,
  ...scrumBoardRoutes,
  ...ecommerceRoutes,
  ...pageLayoutRoutes,
  ...pricingRoutes,
  ...ListRoute,
  ...pagesRoutes,
  ...dataTableRoutes,
  ...redirectRoute,
  ...TaxRoutes,
  ...PrintQuoteRoutes,
  ...PrintPartyRoutes,
  ...PrintProductRoutes,
  ...PrintReportRoutes,
  ...PrintPurRoutes,
  ...PermissionRoute,

  // ...errorRoute,
];

export default routes;
