(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[253],{2778:function(e,a){},3581:function(e,a,t){"use strict";t.r(a);var n=t(13),l=t(18),c=t(0),r=t.n(c),m=t(104),s=t(2162),o=t(2164),i=t(2163),u=t(2766),E=t.n(u),d=t(1407),b=t(691),f=t(1449),p=t(2152),h=t(1684),x=t(2116),j=t(133),v=function(e){var a=e.messageList,t=e.handleCheckboxSelection,n=Object(c.useState)(!1),u=Object(l.a)(n,2),v=u[0],N=u[1];return r.a.createElement("div",{className:"mx-1 mb-1"},a.map((function(e,a){return r.a.createElement(s.a,{key:e.id,expanded:v===a,elevation:3},r.a.createElement(i.a,{className:"p-0 pl-2 pr-6"},r.a.createElement("div",{className:"flex items-center w-full px-2"},v!==a&&r.a.createElement(c.Fragment,null,r.a.createElement(d.a,{checked:e.selected,onChange:function(e){return t(e,a)},color:"secondary"}),r.a.createElement(b.a,null,r.a.createElement(f.a,null,"star_border"))),r.a.createElement("div",{className:"flex flex-grow items-center justify-between h-full",onClick:function(){return function(e){N(e!==v&&e)}(a)}},v===a&&r.a.createElement("div",{className:"flex items-center ml-3"},r.a.createElement(p.a,{src:e.sender.photo}),r.a.createElement("div",{className:"ml-2"},r.a.createElement("h5",{className:"mb-0 ml-1 font-normal"},e.sender.name),r.a.createElement("small",{className:"text-muted"},Object(x.a)(new Date(e.date).getTime(),"MMMM dd, yyyy")))),v!==a&&r.a.createElement("h5",{className:"mb-0 ml-1 text-14 text-muted font-normal"},e.sender.name),r.a.createElement("p",{className:"m-0"},e.subject),r.a.createElement("small",{className:"text-muted"},Object(j.d)(new Date(e.date))," ago")),r.a.createElement(m.n,{menuButton:r.a.createElement(b.a,null,r.a.createElement(f.a,null,"more_vert"))},r.a.createElement(h.a,{className:"flex items-center"},r.a.createElement(f.a,{className:"mr-4"},"reply")," Reply"),r.a.createElement(h.a,{className:"flex items-center"},r.a.createElement(f.a,{className:"mr-4"},"archive")," Archive"),r.a.createElement(h.a,{className:"flex items-center"},r.a.createElement(f.a,{className:"mr-4"},"delete")," Delete")))),r.a.createElement(o.a,null,r.a.createElement("div",null,E()(e.message))))})))},N=t(692),g=t(2221),y=t(2183),O=t(1701),C=t(2122),w=t(16),k=t(7),S=t(1472),M=t(2167),T=t(52),_=function(e){var a=e.open,t=e.handleClose,n=Object(c.useState)({to:"",subject:"",content:"",attachment:null}),s=Object(l.a)(n,2),o=s[0],i=s[1],u=function(e){e.persist(),i(Object(k.a)(Object(k.a)({},o),{},Object(w.a)({},e.target.name,e.target.value)))},E=o.to,d=o.subject,p=o.content,h=o.attachment;return r.a.createElement(S.a,{open:a,onClose:t,maxWidth:"md",fullWidth:!0},r.a.createElement("div",{className:"p-6"},r.a.createElement(T.ValidatorForm,{onSubmit:function(e){},onError:function(e){return null}},r.a.createElement(T.TextValidator,{className:"mb-4 w-full",label:"To",onChange:u,type:"email",name:"to",value:E,validators:["required","isEmail"],errorMessages:["this field is required","email is not valid"]}),r.a.createElement(T.TextValidator,{className:"mb-4 w-full",label:"Subject",onChange:u,type:"text",name:"subject",value:d,validators:["required"],errorMessages:["this field is required"]}),r.a.createElement(m.y,{content:p,handleContentChange:function(e){i(Object(k.a)(Object(k.a)({},o),{},{content:e}))},placeholder:"insert text here..."}),r.a.createElement("div",{className:"mt-4 flex flex-wrap justify-between"},r.a.createElement(N.a,{onClick:t},"Cancel"),r.a.createElement("div",{className:"flex items-center"},h&&r.a.createElement("p",{className:"mr-6"},h.name),r.a.createElement("label",{htmlFor:"attachment"},r.a.createElement(b.a,{className:"mr-2",component:"span"},r.a.createElement(f.a,null,"attachment"))),r.a.createElement("input",{onChange:function(e){i(Object(k.a)(Object(k.a)({},o),{},{attachment:e.target.files[0]}))},className:"hidden",id:"attachment",type:"file"}),r.a.createElement(M.a,{size:"medium",color:"secondary",type:"submit"},r.a.createElement(f.a,null,"send")))))))},q=function(){var e=r.a.useState(!1),a=Object(l.a)(e,2),t=a[0],n=a[1];return r.a.createElement("div",{className:"mr-4 bg-default"},r.a.createElement(N.a,{onClick:function(){return n(!0)},variant:"contained",className:"py-2 bg-error w-full"},"Compose"),r.a.createElement(g.a,{button:!0},r.a.createElement(y.a,null,r.a.createElement(f.a,null,"inbox")),r.a.createElement(O.a,{primary:"Inbox"})),r.a.createElement(g.a,{button:!0},r.a.createElement(y.a,null,r.a.createElement(f.a,null,"folder_special")),r.a.createElement(O.a,{primary:"Starred"})),r.a.createElement(g.a,{button:!0},r.a.createElement(y.a,null,r.a.createElement(f.a,null,"send")),r.a.createElement(O.a,{primary:"Sent"})),r.a.createElement(g.a,{button:!0},r.a.createElement(y.a,null,r.a.createElement(f.a,null,"inbox")),r.a.createElement(O.a,{primary:"Inbox"})),r.a.createElement(g.a,{button:!0},r.a.createElement(y.a,null,r.a.createElement(f.a,null,"error")),r.a.createElement(O.a,{primary:"Spam"})),r.a.createElement(C.a,null),r.a.createElement(g.a,{button:!0},r.a.createElement(y.a,null,r.a.createElement(f.a,{color:"primary"},"people")),r.a.createElement(O.a,{primary:"Social"})),r.a.createElement(g.a,{button:!0},r.a.createElement(y.a,null,r.a.createElement(f.a,{color:"secondary"},"local_offer")),r.a.createElement(O.a,{primary:"Promotions"})),r.a.createElement(g.a,{button:!0},r.a.createElement(y.a,null,r.a.createElement(f.a,{color:"secondary"},"forums")),r.a.createElement(O.a,{primary:"Forums"})),r.a.createElement(_,{open:t,handleClose:function(){n(!1)}}))},F=t(19),R=t(1477),D=t(1405),L=t(704),V=t(5),A=["palette"],I=Object(L.a)((function(e){e.palette,Object(F.a)(e,A);return{topbar:{borderTopRightRadius:4,borderTopLeftRadius:4}}})),J=function(e){var a=e.toggleSidenav,t=e.handleMasterCheckbox,n=e.masterCheckbox,l=I();return r.a.createElement("div",{className:Object(V.default)("py-1 mx-1 flex items-center relative bg-primary",l.topbar)},r.a.createElement(R.a,{smUp:!0},r.a.createElement(b.a,{className:"text-white",onClick:a},r.a.createElement(f.a,null,"short_text"))),r.a.createElement(D.a,{className:"text-white ml-4",control:r.a.createElement(d.a,{checked:n,onChange:t,color:"secondary"}),label:"All"}),r.a.createElement(b.a,null,r.a.createElement(f.a,{className:"text-white"},"delete")),r.a.createElement(b.a,null,r.a.createElement(f.a,{className:"text-white"},"folder_special")),r.a.createElement(b.a,null,r.a.createElement(f.a,{className:"text-white"},"archive")),r.a.createElement(b.a,null,r.a.createElement(f.a,{className:"text-white"},"error")))},W=t(26),z=t.n(W),B=t(1385),P=t(61);a.default=function(){var e=Object(c.useState)(!0),a=Object(l.a)(e,2),t=a[0],s=a[1],o=Object(c.useState)(!1),i=Object(l.a)(o,2),u=i[0],E=i[1],d=Object(c.useState)(!1),b=Object(l.a)(d,2),f=b[0],p=b[1],h=Object(c.useState)([]),x=Object(l.a)(h,2),j=x[0],N=x[1],g=Object(P.a)(),y=Object(B.a)(g.breakpoints.down("sm")),O=function(){E(!u)};return Object(c.useEffect)((function(){y&&E(!1)}),[y]),Object(c.useEffect)((function(){z.a.get("/api/inbox/all").then((function(e){var a=e.data;t&&N(a)}))}),[t]),Object(c.useEffect)((function(){return function(){return s(!1)}}),[]),r.a.createElement("div",{className:"flex m-sm-30"},r.a.createElement("div",{className:"w-full"},r.a.createElement(m.r,null,r.a.createElement(m.q,{width:"220px",toggleSidenav:O,open:u},r.a.createElement(q,null)),r.a.createElement(m.s,null,r.a.createElement(J,{masterCheckbox:f,handleMasterCheckbox:function(e){var a=j,t=e.target.checked;t?a.map((function(e){return e.selected=!0,e})):a.map((function(e){return e.selected=!1,e})),N(a),p(t)},toggleSidenav:O}),r.a.createElement(v,{handleCheckboxSelection:function(e,a){e.persist();var t=j;t[a].selected=e.target.checked,N(Object(n.a)(t))},messageList:j})))))}}}]);