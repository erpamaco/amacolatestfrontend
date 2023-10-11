(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[191],{1685:function(e,t,a){"use strict";var n=a(3),r=a(6),o=a(33),c=a(0),i=a(5),l=a(11),s=c.forwardRef((function(e,t){var a=e.classes,o=e.className,l=e.component,s=void 0===l?"div":l,u=e.disableGutters,d=void 0!==u&&u,m=e.variant,f=void 0===m?"regular":m,b=Object(r.a)(e,["classes","className","component","disableGutters","variant"]);return c.createElement(s,Object(n.a)({className:Object(i.default)(a.root,a[f],o,!d&&a.gutters),ref:t},b))}));t.a=Object(l.a)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center"},gutters:Object(o.a)({paddingLeft:e.spacing(2),paddingRight:e.spacing(2)},e.breakpoints.up("sm"),{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}),regular:e.mixins.toolbar,dense:{minHeight:48}}}),{name:"MuiToolbar"})(s)},1694:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a(0),r=a(2042);function o(){return n.useContext(r.a)}},1698:function(e,t,a){"use strict";var n=a(3),r=a(6),o=a(0),c=a(5),i=a(11),l=o.forwardRef((function(e,t){var a=e.classes,i=e.className,l=e.row,s=void 0!==l&&l,u=Object(r.a)(e,["classes","className","row"]);return o.createElement("div",Object(n.a)({className:Object(c.default)(a.root,i,s&&a.row),ref:t},u))}));t.a=Object(i.a)({root:{display:"flex",flexDirection:"column",flexWrap:"wrap"},row:{flexDirection:"row"}},{name:"MuiFormGroup"})(l)},2042:function(e,t,a){"use strict";var n=a(0),r=n.createContext();t.a=r},2048:function(e,t,a){"use strict";var n=a(3),r=a(93),o=a(6),c=a(0),i=a(1698),l=a(34),s=a(228),u=a(2042),d=a(2124),m=c.forwardRef((function(e,t){var a=e.actions,m=e.children,f=e.name,b=e.value,p=e.onChange,v=Object(o.a)(e,["actions","children","name","value","onChange"]),h=c.useRef(null),g=Object(s.a)({controlled:b,default:e.defaultValue,name:"RadioGroup"}),O=Object(r.a)(g,2),y=O[0],j=O[1];c.useImperativeHandle(a,(function(){return{focus:function(){var e=h.current.querySelector("input:not(:disabled):checked");e||(e=h.current.querySelector("input:not(:disabled)")),e&&e.focus()}}}),[]);var E=Object(l.a)(t,h),w=Object(d.a)(f);return c.createElement(u.a.Provider,{value:{name:w,onChange:function(e){j(e.target.value),p&&p(e,e.target.value)},value:y}},c.createElement(i.a,Object(n.a)({role:"radiogroup",ref:E},v),m))}));t.a=m},2124:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(0);function r(e){var t=n.useState(e),a=t[0],r=t[1],o=e||a;return n.useEffect((function(){null==a&&r("mui-".concat(Math.round(1e5*Math.random())))}),[a]),o}},2140:function(e,t,a){"use strict";a.d(t,"a",(function(){return h}));var n=a(33),r=a(0),o=a(1560),c=a(5),i=(a(3),a(6),a(704)),l=a(2111),s=a(1691),u=(a(1687),a(93),a(1689)),d=(a(412),a(152),a(1556),a(1557),a(1558),Object(i.a)({toolbar:{flexDirection:"column",alignItems:"flex-start"},toolbarLandscape:{padding:16},dateLandscape:{marginRight:16}},{name:"MuiPickersDatePickerRoot"})),m=function(e){var t=e.date,a=e.views,n=e.setOpenView,i=e.isLandscape,u=e.openView,m=Object(o.b)(),f=d(),b=Object(r.useMemo)((function(){return Object(s.d)(a)}),[a]),p=Object(r.useMemo)((function(){return Object(s.b)(a)}),[a]);return Object(r.createElement)(l.b,{isLandscape:i,className:Object(c.default)(!b&&f.toolbar,i&&f.toolbarLandscape)},Object(r.createElement)(l.c,{variant:b?"h3":"subtitle1",onClick:function(){return n("year")},selected:"year"===u,label:m.getYearText(t)}),!b&&!p&&Object(r.createElement)(l.c,{variant:"h4",selected:"date"===u,onClick:function(){return n("date")},align:i?"left":"center",label:m.getDatePickerHeaderText(t),className:Object(c.default)(i&&f.dateLandscape)}),p&&Object(r.createElement)(l.c,{variant:"h4",onClick:function(){return n("month")},selected:"month"===u,label:m.getMonthText(t)}))};function f(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var b=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?f(a,!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):f(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},u.c,{openTo:"date",views:["year","date"]});function p(e){var t=Object(o.b)();return{getDefaultFormat:function(){return Object(s.c)(e.views,t)}}}var v=Object(l.g)({useOptions:p,Input:l.d,useState:l.i,DefaultToolbarComponent:m}),h=Object(l.g)({useOptions:p,Input:l.a,useState:l.e,DefaultToolbarComponent:m});v.defaultProps=b,h.defaultProps=b},2169:function(e,t,a){"use strict";var n=a(3),r=a(6),o=a(0),c=a(5),i=a(422),l=a(94),s=Object(l.a)(o.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"RadioButtonUnchecked"),u=Object(l.a)(o.createElement("path",{d:"M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"}),"RadioButtonChecked"),d=a(11);var m=Object(d.a)((function(e){return{root:{position:"relative",display:"flex","&$checked $layer":{transform:"scale(1)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.shortest})}},layer:{left:0,position:"absolute",transform:"scale(0)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeIn,duration:e.transitions.duration.shortest})},checked:{}}}),{name:"PrivateRadioButtonIcon"})((function(e){var t=e.checked,a=e.classes,n=e.fontSize;return o.createElement("div",{className:Object(c.default)(a.root,t&&a.checked)},o.createElement(s,{fontSize:n}),o.createElement(u,{fontSize:n,className:a.layer}))})),f=a(39),b=a(15),p=a(120),v=a(1694),h=o.createElement(m,{checked:!0}),g=o.createElement(m,null),O=o.forwardRef((function(e,t){var a=e.checked,l=e.classes,s=e.color,u=void 0===s?"secondary":s,d=e.name,m=e.onChange,f=e.size,O=void 0===f?"medium":f,y=Object(r.a)(e,["checked","classes","color","name","onChange","size"]),j=Object(v.a)(),E=a,w=Object(p.a)(m,j&&j.onChange),C=d;return j&&("undefined"===typeof E&&(E=j.value===e.value),"undefined"===typeof C&&(C=j.name)),o.createElement(i.a,Object(n.a)({color:u,type:"radio",icon:o.cloneElement(g,{fontSize:"small"===O?"small":"medium"}),checkedIcon:o.cloneElement(h,{fontSize:"small"===O?"small":"medium"}),classes:{root:Object(c.default)(l.root,l["color".concat(Object(b.a)(u))]),checked:l.checked,disabled:l.disabled},name:C,checked:E,onChange:w,ref:t},y))}));t.a=Object(d.a)((function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(f.a)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(f.a)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}}),{name:"MuiRadio"})(O)},2239:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(2264);function r(e){return Object(n.a)(e)}},2264:function(e,t,a){"use strict";function n(e){return e}a.d(t,"a",(function(){return n}))},2357:function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}a.d(t,"a",(function(){return n}))},2358:function(e,t,a){"use strict";function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function r(e,t,a){return t&&n(e.prototype,t),a&&n(e,a),e}a.d(t,"a",(function(){return r}))},2369:function(e,t,a){"use strict";function n(e){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}a.d(t,"a",(function(){return n}))},2398:function(e,t,a){"use strict";function n(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}a.d(t,"a",(function(){return n}))},2407:function(e,t,a){"use strict";function n(e,t){return(n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function r(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&n(e,t)}a.d(t,"a",(function(){return r}))},2408:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a(2369);function r(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}var o=a(2409);function c(e){return function(){var t,a=Object(n.a)(e);if(r()){var c=Object(n.a)(this).constructor;t=Reflect.construct(a,arguments,c)}else t=a.apply(this,arguments);return Object(o.a)(this,t)}}},2409:function(e,t,a){"use strict";function n(e){return(n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}a.d(t,"a",(function(){return o}));var r=a(2398);function o(e,t){return!t||"object"!==n(t)&&"function"!==typeof t?Object(r.a)(e):t}},2678:function(e,t,a){"use strict";var n=a(16),r=a(7),o=a(18),c=a(0),i=a.n(c),l=a(52),s=a(300),u=a(2048),d=a(1405),m=a(2169),f=a(1407),b=a(692),p=a(1449),v=a(1560),h=a(2140),g=a(2036);t.a=function(){var e=Object(c.useState)({date:new Date}),t=Object(o.a)(e,2),a=t[0],O=t[1],y=function(e){e.persist(),O(Object(r.a)(Object(r.a)({},a),{},Object(n.a)({},e.target.name,e.target.value)))},j=a.username,E=a.firstName,w=a.creditCard,C=a.mobile,k=a.password,x=a.confirmPassword,P=a.gender,S=a.date,N=a.email;return i.a.createElement("div",null,i.a.createElement(l.ValidatorForm,{onSubmit:function(e){},onError:function(){return null}},i.a.createElement(s.a,{container:!0,spacing:6},i.a.createElement(s.a,{item:!0,lg:6,md:6,sm:12,xs:12},i.a.createElement(l.TextValidator,{className:"mb-4 w-full",label:"Username (Min length 4, Max length 9)",onChange:y,type:"text",name:"username",value:j||"",validators:["required","minStringLength: 4","maxStringLength: 9"],errorMessages:["this field is required"]}),i.a.createElement(l.TextValidator,{className:"mb-4 w-full",label:"First Name",onChange:y,type:"text",name:"firstName",value:E||"",validators:["required"],errorMessages:["this field is required"]}),i.a.createElement(l.TextValidator,{className:"mb-4 w-full",label:"Email",onChange:y,type:"email",name:"email",value:N||"",validators:["required","isEmail"],errorMessages:["this field is required","email is not valid"]}),i.a.createElement(v.a,{utils:g.a},i.a.createElement(h.a,{className:"mb-4 w-full",margin:"none",id:"mui-pickers-date",label:"Date picker",inputVariant:"standard",type:"text",autoOk:!0,value:S,onChange:function(e){O(Object(r.a)(Object(r.a)({},a),{},{date:e}))},KeyboardButtonProps:{"aria-label":"change date"}})),i.a.createElement(l.TextValidator,{className:"mb-8 w-full",label:"Credit Card",onChange:y,type:"number",name:"creditCard",value:w||"",validators:["required","minStringLength:16","maxStringLength: 16"],errorMessages:["this field is required"]})),i.a.createElement(s.a,{item:!0,lg:6,md:6,sm:12,xs:12},i.a.createElement(l.TextValidator,{className:"mb-4 w-full",label:"Mobile Nubmer",onChange:y,type:"text",name:"mobile",value:C||"",validators:["required"],errorMessages:["this field is required"]}),i.a.createElement(l.TextValidator,{className:"mb-4 w-full",label:"Password",onChange:y,name:"password",type:"password",value:k||"",validators:["required"],errorMessages:["this field is required"]}),i.a.createElement(l.TextValidator,{className:"mb-4 w-full",label:"Confirm Password",onChange:y,name:"confirmPassword",type:"password",value:x||"",validators:["required","isPasswordMatch"],errorMessages:["this field is required","password didn't match"]}),i.a.createElement(u.a,{className:"mb-4",value:P||"",name:"gender",onChange:y,row:!0},i.a.createElement(d.a,{value:"Male",control:i.a.createElement(m.a,{color:"secondary"}),label:"Male",labelPlacement:"end"}),i.a.createElement(d.a,{value:"Female",control:i.a.createElement(m.a,{color:"secondary"}),label:"Female",labelPlacement:"end"}),i.a.createElement(d.a,{value:"Others",control:i.a.createElement(m.a,{color:"secondary"}),label:"Others",labelPlacement:"end"})),i.a.createElement(d.a,{control:i.a.createElement(f.a,null),label:"I have read and agree to the terms of service."}))),i.a.createElement(b.a,{color:"primary",variant:"contained",type:"submit"},i.a.createElement(p.a,null,"send"),i.a.createElement("span",{className:"pl-2 capitalize"},"Submit"))))}},3469:function(e,t,a){"use strict";a.r(t);var n=a(2357),r=a(2358),o=a(2407),c=a(2408),i=a(0),l=a.n(i),s=a(104),u=a(2678),d=a(1389),m=function(e){Object(o.a)(a,e);var t=Object(c.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return l.a.createElement("div",{className:"m-sm-30"},l.a.createElement("div",{className:"mb-sm-30"},l.a.createElement(s.b,{routeSegments:[{name:"Forms",path:"/forms"},{name:"Basic"}]})),l.a.createElement(d.a,{className:"px-6 pt-2 pb-4"},l.a.createElement(u.a,null)))}}]),a}(i.Component);t.default=m}}]);