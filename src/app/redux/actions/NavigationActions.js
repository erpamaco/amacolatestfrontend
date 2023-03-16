import { navigatePath } from "app/views/invoice/InvoiceService";

export const SET_NAVIGATION = "SET_NAVIGATION";
export const GET_NAVIGATION = "GET_NAVIGATION";
export const RESET_NAVIGATION = "RESET_NAVIGATION";

export function getNavigation(user) {
  return {
    type: GET_NAVIGATION,
  };
}

export function logoutUser() {
  return dispatch => {
    jwtAuthService.logout();

    routerHistory.push({
      pathname: navigatePath + "/session/signin",
    });

    dispatch({
      type: USER_LOGGED_OUT,
    });
  };
}
