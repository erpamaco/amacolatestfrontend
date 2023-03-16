import React from "react";

const partyRoutes = [
  {
    path: "/print_addparty",
    component: React.lazy(() => import("./Addparty")),
  },
  // {
  //   path: "/partycontact",
  //   component: React.lazy(() => import("./partycontact")),
  // },
  // {
  //   path: "/party/updateparty",
  //   component: React.lazy(() => import("./updateparty")),
  // },
  {
    path: "/print_viewparty",
    component: React.lazy(() => import("./ViewParty")),
  },
  {
    path: "/print_tab",
    component: React.lazy(() =>
      import("./Tab")
    ),
  },
  ];

export default partyRoutes;
