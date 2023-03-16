import FirebaseLogin from "./login/FirebaseLogin";
import JwtLogin from "./login/JwtLogin.jsx";
import NotFound from "./NotFound";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./login/changepassword";
import FirebaseRegister from "./register/FirebaseRegister";
import React from "react";
import { navigatePath } from "../invoice/InvoiceService";

const sessionRoutes = [
  {
    path: navigatePath + "/session/signup",
    component: FirebaseRegister,
  },
  {
    path: navigatePath + "/session/signin",
    component: JwtLogin,
  },
  {
    path: navigatePath + "/session/signin",
    component: JwtLogin,
  },
  {
    path: navigatePath + "/session/change-password/:email",
    component: ChangePassword,
  },
  {
    path: navigatePath + "/session/forgot-password",
    component: ForgotPassword,
  },
  {
    path: navigatePath + "/session/404",
    component: NotFound,
  },
];

export default sessionRoutes;
