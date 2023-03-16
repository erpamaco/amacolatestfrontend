import { authRoles } from "./auth/authRoles";
import "bootstrap/dist/css/bootstrap.min.css";
import { navigatePath } from "./views/invoice/InvoiceService";

export const navigationPrint = [
  {
    name: "DASHBOARD",
    path: navigatePath + "/dashboard/alternative",
    // path: "/dashboard",
    icon: "dashboard",
  },

  {
    name: "PARTY",
    path: navigatePath + "/party/viewparty",
    icon: "people",
  },
  {
    name: "PRODUCT",
    path: navigatePath + "/product/viewsubcategory",
    icon: "queue",
  },

  {
    name: "PURCHASE",
    icon: "monetization_on",
    children: [
      {
        name: "RFQ",
        path: navigatePath + "/sales/rfq-form/rfqview",
      },
      {
        name: "PURCHASE ORDER",
        path: navigatePath + "/Newinvoiceview",
      },
      {
        name: "PURCHASE INVOICE",
        path: navigatePath + "/purchaseinvoiceview",
      },
      {
        name: "PURCHASE RETURN",
        path: navigatePath + "/purchasereturn",
      },
    ],
  },
  {
    name: "SALES",
    icon: "trending_up",
    children: [
      {
        name: "QUOTATION",
        path: navigatePath + "/quoateview/0",
        // path: "/Newquoteanalysis",
        // icon:"folder",
      },
      {
        name: "DELIVERY NOTE",
        path: navigatePath + "/dnoteview",
        // path: "/Newquoteanalysis",
        // icon:"folder",
      },
      {
        name: "INVOICE",
        path: navigatePath + "/inv",
        // icon:"folder",
      },
      {
        name: "SALES RETURN",
        path: navigatePath + "/salesreturn",
        // icon: "folder",
      },
    ],
    // }
    // ]
  },
  {
    name: "ACCOUNT",
    icon: "developer_board",
    children: [
      {
        name: "ACCOUNT DASHBOARD",
        icon: "dashboard",
        path: navigatePath + "/dashboard",
      },
      {
        name: "EXPENSES",
        icon: "attach_money",
        path: navigatePath + "/expenseview",
      },
      {
        name: "TRANSACTION",
        icon: "account_balance_wallet",
        path: navigatePath + "/transaction",
      },

      // {
      // name: "STATEMENTS",
      // icon: "book",
      // children: [
      //   {
      // name: "CUSTOMER",
      // icon: "people",
      // path: "/customeraccount",
      //   },
      {
        name: "STATEMENTS",
        icon: "book",
        // path: "/account",
        children: [
          {
            name: "VENDOR",
            // icon: "people",
            path: navigatePath + "/vendor",
          },
          {
            name: "CUSTOMER",
            // icon: "people",
            path: navigatePath + "/customeraccount",
          },
          {
            name: "MASTER",
            // icon: "account_balance",
            path: navigatePath + "/master",
          },
          {
            name: "PERSONAL",
            // icon: "account_balance",
            path: navigatePath + "/personalTab",
          },
        ],
      },
    ],
    // }

    // ]
  },
  {
    name: "REPORT",
    icon: "assignment",

    children: [
      // {
      //   name: "BALANCE SHEET",
      //   icon:"description",
      //   path: "/balanceSheet",

      // },
      // {
      //   name: "PROFIT LOSS",
      //   icon:"swap_vert",
      //   path: "/ProfitLoss",

      // },
      {
        name: "TAX",
        path: "/product/producthistory",
        icon: "monetization_on",
        children: [
          {
            name: "PURCHASE",
            path: navigatePath + "/purchasetax",
          },
          {
            name: "SALES",
            path: navigatePath + "/salestax",
          },
          {
            name: "VAT",
            path: navigatePath + "/vatstatement",
          },
        ],
      },
      // {

      //   name: "Product",
      //   path: "/product/producthistory",

      // },
      {
        name: "SALES",
        icon: "graphic_eq",
        path: navigatePath + "/salesreport",
      },
    ],
  },
  {
    name: "USERS",
    icon: "people",
    path: navigatePath + "/userTab",
  },
  {
    name: "PERMISSION",
    icon: "security",
    children: [
      {
        name: "MODULES",
        path: navigatePath + "/modules",
      },
    ],
  },

  {
    name: "EMPLOYEES",
    icon: "badge",
    path: navigatePath + "/employees",
  },
  // {
  //   name: "STOCK",
  //   icon: "show_chart",
  //   path: navigatePath+"/stock",
  // },
];
