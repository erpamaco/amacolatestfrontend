import React from "react";

const demoRoutes = [
  {
    path: "/demo/demo1",
    exact: true,
    component: React.lazy(() => import("./demo1"))
  },
  {
    path: "/demo/:id",
    exact: true,
    component: React.lazy(() => import("./demo2"))
  },
];

export default demoRoutes;
