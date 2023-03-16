import React, {
  useContext,
  useEffect,
  useState
} from "react";
import { Redirect, useLocation } from "react-router-dom";
import AppContext from "app/contexts/AppContext";
import useAuth from "app/hooks/useAuth";
import { navigatePath } from "app/views/invoice/InvoiceService";

const getUserRoleAuthStatus = (pathname, user, routes) => {
  const matched = routes.find((r) => r.path === pathname);

  const authenticated =
    matched && matched.auth && matched.auth.length
      ? matched.auth.includes(user?.role.name)
      : true;
  // console.log(matched, user);
  return authenticated;
};

const AuthGuard = ({ children }) => {
  const {
    isAuthenticated,
    user
  } = useAuth();

  const [previouseRoute, setPreviousRoute] = useState(null);
  const { pathname } = useLocation();

  const { routes } = useContext(AppContext);
  const isUserRoleAuthenticated = getUserRoleAuthStatus(pathname, user, routes);
  let authenticated = isAuthenticated && isUserRoleAuthenticated;


  // IF YOU NEED ROLE BASED AUTHENTICATION,
  // UNCOMMENT ABOVE TWO LINES, getUserRoleAuthStatus METHOD AND user VARIABLE
  // AND COMMENT OUT BELOW LINE
  // let authenticated = isAuthenticated;

  useEffect(() => {
    // console.log('authentication'+authenticated)
    if (previouseRoute !== null) setPreviousRoute(pathname);
  }, [pathname, previouseRoute]);

  if (authenticated) return <>{children}</>;
  else {
    return (
      <Redirect
        to={{
          pathname: navigatePath + "/session/signin",
          state: { redirectUrl: previouseRoute },
        }}
      />
    );
  }
};

export default AuthGuard;
