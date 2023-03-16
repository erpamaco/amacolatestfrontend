import React from "react";

const PrintProductRoutes = [
  {
    path: "/print_addproduct/:id",
    component: React.lazy(() => import("./AddProduct")),
  },
//   {
//     path: "/product/producthistory",
//     component: React.lazy(() => import("./producthistory")),
//   },
//   {
//     path: "/demo",
//     component: React.lazy(() => import("./demo")),
//   },
//   {
//     path: "/product/updateproduct",
//     component: React.lazy(() => import("./Updateproduct")),
//   },
  {
    path: "/print_viewproduct/:id",
    component: React.lazy(() => import("./ProductView")),
  },
  {
    path: "/print_categoryview",
    component: React.lazy(() => import("./ProductCategoryView")),
  },
//   {
//     path: "/product/viewcategory",
//     component: React.lazy(() => import("./Viewcategory")),
//   },
//   {
//     path: "/product/Addcategory",
//     component: React.lazy(() => import("./Addcategory")),
//   },
 
//   {
//     path: "/manufacture",
//     component: React.lazy(() => import("./manufacture")),
//   },
  {
    path: "/print_singleproduct",
    component: React.lazy(() =>
      import("./Tab")
    ),
  },
  ];

export default PrintProductRoutes;
