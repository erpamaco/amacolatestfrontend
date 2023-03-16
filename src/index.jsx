// import "babel-polyfill";
// import cssVars from "css-vars-ponyfill";

import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./app/App";
import { HashRouter } from 'react-router-dom'


// cssVars();
// if(localStorage.getItem('rememberMe')){
//     window.onbeforeunload = () => {
//       // localStorage.removeItem('rememberMe');
//       localStorage.clear();
//     }

// }
// window.onbeforeunload = function (e) {
//   window.onunload = function () {
//           window.localStorage.isMySessionActive = "false";

//   }
//   return undefined;
// };
// window.onload = function () {
//   window.localStorage.isMySessionActive = "true";


// };
// if(window.localStorage.isMySessionActive==='true')
// {
//   localStorage.clear();
// }

// window.onload = function () {
//           window.localStorage.isMySessionActive = "true";
// };
ReactDOM.render(<><App /></>, document.getElementById("root"));

// for IE-11 support un-comment cssVars() and it's import in this file
// and in MatxTheme file

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
