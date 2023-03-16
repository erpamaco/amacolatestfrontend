import url, { getpaidDivision,newF } from "../views/invoice/InvoiceService";
var obj = [];

// const uid = localStorage.getItem('user_id');
// url.get(`userPermission/${uid}`).then(({ data }) => {
//   localStorage.setItem("permissiondata" ,JSON.stringify(data.permission));
// })
export const authRoles = {
  sa: ['SA'], // Only Super Admin has access
  admin: ['SA', 'ADMIN'], // Only SA & Admin has access
  editor: ['SA', 'ADMIN', 'EDITOR'], // Only SA & Admin & Editor has access
  guest: ['SA', 'ADMIN', 'EDITOR', 'GUEST'] // Everyone has access
}




// Check out app/views/dashboard/DashboardRoutes.js
// Only SA & Admin has dashboard access

// const dashboardRoutes = [
//   {
//     path: "/dashboard/analytics",
//     component: Analytics,
//     auth: authRoles.admin <===============
//   }
// ];


// Check navigaitons.js

// {
//   name: "Dashboard",
//   path: "/dashboard/analytics",
//   icon: "dashboard",
//   auth: authRoles.admin <=================
// }