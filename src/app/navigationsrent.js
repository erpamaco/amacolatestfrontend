import { authRoles } from "./auth/authRoles";

import "bootstrap/dist/css/bootstrap.min.css";
import { navigatePath } from "./views/invoice/InvoiceService";

export const navigationsrent = [
  {
    name: "DASHBOARD",
    path: navigatePath + "/rental/dashboard/alternative",
    // path: "/dashboard",
    icon: "dashboard",
  },

  {
    name: "PARTY",
    path: navigatePath + "/party/viewparty",
    icon: "people",
  },
  {
    name: "CATEGORY",
    path: navigatePath + "/party/viewpartyw",
    icon: "queue",
  },
  {
    name: "EQUIPMENT",
    path: navigatePath + "/rental/equipment/viewequipment",
    icon: "drive_eta",
  },

  {
    name: "SALES",
    icon: "trending_up",
    children: [
      {
        name: "QUOTATION",
        path: navigatePath + "/rental/quoateview/0",
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
     
      
    ],
    // }
    // ]
  },
  // {
  //   name: "PRODUCT",
  //   path: navigatePath + "/product/viewsubcategory",
  //   icon: "queue",
  // },

  // {
  //   name: "VEHICLE",
  //   icon: "drive_eta",
  //   children: [
  //     {
  //       name: "VIEW VEHICLE",
  //       path: navigatePath + "/sales/rfq-form/rfqview",
  //     },
  //     {
  //       name: "DOCUMENTS",
  //       path: navigatePath + "/poTab/0",
  //     },
  //     // {
  //     //   name: "PURCHASE INVOICE",
  //     //   path: navigatePath + "/purchaseinvoiceview",
  //     // },
  //     // {
  //     //   name: "PURCHASE RETURN",
  //     //   path: "/purchasereturn",
  //     // },
  //   ],
  // },
  {
    name: "MAINTAINENCE",
    icon: "receipt",
    children: [
      {
        name: "VIEW TICKETS",
        path: navigatePath + "/quoateview/0",
        // path: "/Newquoteanalysis",
        // icon:"folder",
      },
      {
        name: "GENERATE COST",
        path: navigatePath + "/dnoteview",
        // path: "/Newquoteanalysis",
        // icon:"folder",
      },
      // {
      //   name: "INVOICE",
      //   path: navigatePath + "/inv",
      //   // icon:"folder",
      // },
      // {
      //   name: "SALES RETURN",
      //   path: navigatePath + "/salesreturn",
      //   // icon: "folder",
      // },
    ],
    // }
    // ]
  },
  
  {
    name: "RENTALS",
    icon: "drive_eta",
    children: [
      {
        name: "ENQUIRY",
        // icon: "show_chart",
        path: navigatePath + "/stock",
      },
    
    
      // {
      //   name: "MAINTAINENCE",
      //   path: navigatePath + "/dnoteview",
      //   // path: "/Newquoteanalysis",
      //   // icon:"folder",
      // },
     
      
  {
    name: "MOBILIZATION",
    icon: "show_chart",
    path: navigatePath + "/stock",
  },
  {
    name: "PAYMENT",
    icon: "show_chart",
    path: navigatePath + "/stock",
  },
    
    ],
    // }
    // ]
  },



  {
    name: "REPORT",
    icon: "trending_up",
    children: [
      {
        name: "CUSTOMER A\C STATEMENT",
        path: navigatePath + "/quoateview/0",
        // path: "/Newquoteanalysis",
        // icon:"folder",
      },
      {
        name: "PROFIT & LOSS",
        path: navigatePath + "/dnoteview",
        // path: "/Newquoteanalysis",
        // icon:"folder",
      },
      {
        name: "SALES",
        path: navigatePath + "/quoateview/0",
        // path: "/Newquoteanalysis",
        // icon:"folder",
      },
    
    ],
    // }
    // ]
  },
  // {
  //   name: "ACCOUNT",
  //   icon: "developer_board",
  //   children: [
  //     // {
  //     //   name: "ACCOUNT DASHBOARD",
  //     //   icon: "dashboard",
  //     //   path: navigatePath + "/dashboard",
  //     // },
  //     {
  //       name: "EXPENSES",
  //       icon: "attach_money",
  //       path: navigatePath + "/expenseview",
  //     },
  //     {
  //       name: "TRANSACTION",
  //       icon: "account_balance_wallet",
  //       path: navigatePath + "/transaction",
  //     },

  //     {
  //     name: "STATEMENTS",
  //     icon: "book",
  //     children: [
  //       {
  //     name: "CUSTOMER",
  //     icon: "people",
  //     path: "/customeraccount",
  //       },
  //     {
  //       name: "STATEMENTS",
  //       icon: "book",
  //       // path: "/account",
  //       children: [
  //         {
  //           name: "VENDOR",
  //           // icon: "people",
  //           path: navigatePath + "/vendor",
  //         },
  //         {
  //           name: "CUSTOMER",
  //           // icon: "people",
  //           path: navigatePath + "/customeraccount",
  //         },
  //         {
  //           name: "MASTER",
  //           // icon: "account_balance",
  //           path: navigatePath + "/master",
  //         },
  //         {
  //           name: "PERSONAL",
  //           // icon: "account_balance",
  //           path: navigatePath + "/personalTab",
  //         },
  //       ],
  //     },
  //   ],
  //   }

  //   ]
  // },
  // {
  //   name: "REPORT",
  //   icon: "assignment",

  //   children: [
  //     {
  //       name: "BALANCE SHEET",
  //       icon:"description",
  //       path: "/balanceSheet",

  //     },
  //     {
  //       name: "PROFIT LOSS",
  //       icon:"swap_vert",
  //       path: "/ProfitLoss",

  //     },
  //     {
  //       name: "TAX",
  //       path: "/product/producthistory",
  //       icon: "monetization_on",
  //       children: [
  //         {
  //           name: "PURCHASE",
  //           path: navigatePath + "/purchasetax",
  //         },
  //         {
  //           name: "SALES",
  //           path: navigatePath + "/salestax",
  //         },
  //         {
  //           name: "VAT",
  //           path: navigatePath + "/vatstatement",
  //         },
  //       ],
  //     },
  //     // {

  //     //   name: "Product",
  //     //   path: "/product/producthistory",

  //     // },
  //     {
  //       name: "SALES",
  //       icon: "graphic_eq",
  //       path: navigatePath + "/salesreport",
  //     },
  //   ],
  // },
  // {
  //   name: "USERS",
  //   icon: "people",
  //   path: navigatePath + "/userTab",
  // },
  // {
  //   name: "PERMISSION",
  //   icon: "security",
  //   children: [
  //     {
  //       name: "MODULES",
  //       path: navigatePath + "/modules",
  //     },
  //     {
  //       name: "NOTIFICATION",
  //       path: navigatePath + "/noti",
  //     },
  //   ],
  // },

  // {
  //   name: "EMPLOYEES",
  //   icon: "badge",
  //   path: navigatePath + "/employees",
  // },
 
];
