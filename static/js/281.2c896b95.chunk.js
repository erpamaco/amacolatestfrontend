(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[281],{3565:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(104),o=t(18),i=t(19),c=t(704),m=t(692),s=t(2152),u=t(1384),d=t(2221),E=t(2190),p=t(1701),g=t(2189),f=t(1472),b=t(3110),v=t.n(b),h=t(2459),y=t.n(h),C=t(689),k=t(237),O=["onClose","selectedValue"],j=["username@gmail.com","user02@gmail.com"],S=Object(c.a)({avatar:{backgroundColor:k.a[100],color:k.a[600]}});function w(e){var a=S(),t=e.onClose,n=e.selectedValue,r=Object(i.a)(e,O);function o(e){t(e)}return l.a.createElement(f.a,Object.assign({onClose:function(){t(n)},"aria-labelledby":"simple-dialog-title"},r),l.a.createElement(g.a,{id:"simple-dialog-title"},"Set backup account"),l.a.createElement(u.a,null,j.map((function(e){return l.a.createElement(d.a,{button:!0,onClick:function(){return o(e)},key:e},l.a.createElement(E.a,null,l.a.createElement(s.a,{className:a.avatar},l.a.createElement(v.a,null))),l.a.createElement(p.a,{primary:e}))})),l.a.createElement(d.a,{button:!0,onClick:function(){return o("addAccount")}},l.a.createElement(E.a,null,l.a.createElement(s.a,null,l.a.createElement(y.a,null))),l.a.createElement(p.a,{primary:"add account"}))))}function x(){var e=l.a.useState(!1),a=Object(o.a)(e,2),t=a[0],n=a[1],r=l.a.useState(j[1]),i=Object(o.a)(r,2),c=i[0],s=i[1];return l.a.createElement("div",null,l.a.createElement(C.a,{variant:"subtitle1"},"Selected: ",c),l.a.createElement("br",null),l.a.createElement(m.a,{variant:"outlined",color:"primary",onClick:function(){n(!0)}},"Open simple dialog"),l.a.createElement(w,{selectedValue:c,open:t,onClose:function(e){n(!1),s(e)}}))}var N=t(2136),z=t(2135),T=t(2191);function D(){var e=l.a.useState(!1),a=Object(o.a)(e,2),t=a[0],n=a[1];function r(){n(!1)}return l.a.createElement("div",null,l.a.createElement(m.a,{variant:"outlined",color:"primary",onClick:function(){n(!0)}},"Open alert dialog"),l.a.createElement(f.a,{open:t,onClose:r,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},l.a.createElement(g.a,{id:"alert-dialog-title"},"Use Google's location service?"),l.a.createElement(z.a,null,l.a.createElement(T.a,{id:"alert-dialog-description"},"Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.")),l.a.createElement(N.a,null,l.a.createElement(m.a,{onClick:r,color:"primary"},"Disagree"),l.a.createElement(m.a,{onClick:r,color:"primary",autoFocus:!0},"Agree"))))}var G=t(2171),P=l.a.forwardRef((function(e,a){return l.a.createElement(G.a,Object.assign({direction:"up",ref:a},e))}));function W(){var e=l.a.useState(!1),a=Object(o.a)(e,2),t=a[0],n=a[1];function r(){n(!1)}return l.a.createElement("div",null,l.a.createElement(m.a,{variant:"outlined",color:"primary",onClick:function(){n(!0)}},"Slide in alert dialog"),l.a.createElement(f.a,{open:t,TransitionComponent:P,keepMounted:!0,onClose:r,"aria-labelledby":"alert-dialog-slide-title","aria-describedby":"alert-dialog-slide-description"},l.a.createElement(g.a,{id:"alert-dialog-slide-title"},"Use Google's location service?"),l.a.createElement(z.a,null,l.a.createElement(T.a,{id:"alert-dialog-slide-description"},"Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.")),l.a.createElement(N.a,null,l.a.createElement(m.a,{onClick:r,color:"primary"},"Disagree"),l.a.createElement(m.a,{onClick:r,color:"primary"},"Agree"))))}var A=t(613);function B(){var e=l.a.useState(!1),a=Object(o.a)(e,2),t=a[0],n=a[1];function r(){n(!1)}return l.a.createElement("div",null,l.a.createElement(m.a,{variant:"outlined",color:"primary",onClick:function(){n(!0)}},"Open form dialog"),l.a.createElement(f.a,{open:t,onClose:r,"aria-labelledby":"form-dialog-title"},l.a.createElement(g.a,{id:"form-dialog-title"},"Subscribe"),l.a.createElement(z.a,null,l.a.createElement(T.a,null,"To subscribe to this website, please enter your email address here. We will send updates occasionally."),l.a.createElement(A.a,{autoFocus:!0,margin:"dense",id:"name",label:"Email Address",type:"email",fullWidth:!0})),l.a.createElement(N.a,null,l.a.createElement(m.a,{variant:"outlined",color:"secondary",onClick:r},"Cancel"),l.a.createElement(m.a,{onClick:r,color:"primary"},"Subscribe"))))}var L=t(2357),F=t(2358),M=t(2407),R=t(2408),V=t(11),U=t(691),q=t(1693),H=t.n(q),J=Object(V.a)((function(e){return{root:{margin:0,padding:e.spacing(2)},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]}}}))((function(e){var a=e.children,t=e.classes,n=e.onClose;return l.a.createElement(g.a,{disableTypography:!0,className:t.root},l.a.createElement(C.a,{variant:"h6"},a),n?l.a.createElement(U.a,{"aria-label":"Close",className:t.closeButton,onClick:n},l.a.createElement(H.a,null)):null)})),I=Object(V.a)((function(e){return{root:{padding:e.spacing(2)}}}))(z.a),K=Object(V.a)((function(e){return{root:{margin:0,padding:e.spacing(1)}}}))(N.a),Y=function(e){Object(M.a)(t,e);var a=Object(R.a)(t);function t(){var e;Object(L.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=a.call.apply(a,[this].concat(l))).state={open:!1},e.handleClickOpen=function(){e.setState({open:!0})},e.handleClose=function(){e.setState({open:!1})},e}return Object(F.a)(t,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(m.a,{variant:"outlined",color:"secondary",onClick:this.handleClickOpen},"Open dialog"),l.a.createElement(f.a,{onClose:this.handleClose,"aria-labelledby":"customized-dialog-title",open:this.state.open},l.a.createElement(J,{id:"customized-dialog-title",onClose:this.handleClose},"Modal title"),l.a.createElement(I,{dividers:!0},l.a.createElement(C.a,{gutterBottom:!0},"Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."),l.a.createElement(C.a,{gutterBottom:!0},"Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."),l.a.createElement(C.a,{gutterBottom:!0},"Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.")),l.a.createElement(K,null,l.a.createElement(m.a,{onClick:this.handleClose,color:"primary"},"Save changes"))))}}]),t}(l.a.Component),Q=t(2122),X=t(2180),Z=t(1685),$=Object(c.a)((function(e){return{appBar:{position:"relative"},title:{marginLeft:e.spacing(2),flex:1}}})),_=l.a.forwardRef((function(e,a){return l.a.createElement(G.a,Object.assign({direction:"up",ref:a},e))}));function ee(){var e=$(),a=l.a.useState(!1),t=Object(o.a)(a,2),n=t[0],r=t[1];function i(){r(!1)}return l.a.createElement("div",null,l.a.createElement(m.a,{variant:"outlined",color:"primary",onClick:function(){r(!0)}},"Open full-screen dialog"),l.a.createElement(f.a,{fullScreen:!0,open:n,onClose:i,TransitionComponent:_},l.a.createElement(X.a,{className:e.appBar},l.a.createElement(Z.a,null,l.a.createElement(U.a,{edge:"start",color:"inherit",onClick:i,"aria-label":"Close"},l.a.createElement(H.a,null)),l.a.createElement(C.a,{variant:"h6",className:e.title},"Sound"),l.a.createElement(m.a,{color:"inherit",onClick:i},"save"))),l.a.createElement(u.a,null,l.a.createElement(d.a,{button:!0},l.a.createElement(p.a,{primary:"Phone ringtone",secondary:"Titania"})),l.a.createElement(Q.a,null),l.a.createElement(d.a,{button:!0},l.a.createElement(p.a,{primary:"Default notification ringtone",secondary:"Tethys"})))))}var ae=t(751),te=t(1405),ne=t(693),le=t(1684),re=t(694),oe=t(2179),ie=Object(c.a)((function(e){return{form:{display:"flex",flexDirection:"column",margin:"auto",width:"fit-content"},formControl:{marginTop:e.spacing(2),minWidth:120},formControlLabel:{marginTop:e.spacing(1)}}}));function ce(){var e=ie(),a=l.a.useState(!1),t=Object(o.a)(a,2),n=t[0],r=t[1],i=l.a.useState(!0),c=Object(o.a)(i,2),s=c[0],u=c[1],d=l.a.useState("sm"),E=Object(o.a)(d,2),p=E[0],b=E[1];function v(){r(!1)}return l.a.createElement(l.a.Fragment,null,l.a.createElement(m.a,{variant:"outlined",color:"primary",onClick:function(){r(!0)}},"Open max-width dialog"),l.a.createElement(f.a,{fullWidth:s,maxWidth:p,open:n,onClose:v,"aria-labelledby":"max-width-dialog-title"},l.a.createElement(g.a,{id:"max-width-dialog-title"},"Optional sizes"),l.a.createElement(z.a,null,l.a.createElement(T.a,null,"You can set my maximum width and whether to adapt or not."),l.a.createElement("form",{className:e.form,noValidate:!0},l.a.createElement(ae.a,{className:e.formControl},l.a.createElement(ne.a,{htmlFor:"max-width"},"maxWidth"),l.a.createElement(re.a,{value:p,onChange:function(e){b(e.target.value)},inputProps:{name:"max-width",id:"max-width"}},l.a.createElement(le.a,{value:!1},"false"),l.a.createElement(le.a,{value:"xs"},"xs"),l.a.createElement(le.a,{value:"sm"},"sm"),l.a.createElement(le.a,{value:"md"},"md"),l.a.createElement(le.a,{value:"lg"},"lg"),l.a.createElement(le.a,{value:"xl"},"xl"))),l.a.createElement(te.a,{className:e.formControlLabel,control:l.a.createElement(oe.a,{checked:s,onChange:function(e){u(e.target.checked)},value:"fullWidth"}),label:"Full width"}))),l.a.createElement(N.a,null,l.a.createElement(m.a,{onClick:v,color:"primary"},"Close"))))}var me=t(1385),se=t(61);function ue(){var e=l.a.useState(!1),a=Object(o.a)(e,2),t=a[0],n=a[1],r=Object(se.a)(),i=Object(me.a)(r.breakpoints.down("sm"));function c(){n(!1)}return l.a.createElement("div",null,l.a.createElement(m.a,{variant:"outlined",color:"primary",onClick:function(){n(!0)}},"Open responsive dialog"),l.a.createElement(f.a,{fullScreen:i,open:t,onClose:c,"aria-labelledby":"responsive-dialog-title"},l.a.createElement(g.a,{id:"responsive-dialog-title"},"Use Google's location service?"),l.a.createElement(z.a,null,l.a.createElement(T.a,null,"Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.")),l.a.createElement(N.a,null,l.a.createElement(m.a,{onClick:c,color:"primary"},"Disagree"),l.a.createElement(m.a,{onClick:c,color:"primary",autoFocus:!0},"Agree"))))}var de=t(2048),Ee=t(2169),pe=["onClose","value","open"],ge=["None","Atria","Callisto","Dione","Ganymede","Hangouts Call","Luna","Oberon","Phobos","Pyxis","Sedna","Titania","Triton","Umbriel"];function fe(e){var a=e.onClose,t=e.value,n=e.open,r=Object(i.a)(e,pe),c=l.a.useState(t),s=Object(o.a)(c,2),u=s[0],d=s[1],E=l.a.useRef(null);return l.a.useEffect((function(){n||d(t)}),[t,n]),l.a.createElement(f.a,Object.assign({disableBackdropClick:!0,disableEscapeKeyDown:!0,maxWidth:"xs",onEntering:function(){null!=E.current&&E.current.focus()},"aria-labelledby":"confirmation-dialog-title",open:n},r),l.a.createElement(g.a,{id:"confirmation-dialog-title"},"Phone Ringtone"),l.a.createElement(z.a,{dividers:!0},l.a.createElement(de.a,{ref:E,"aria-label":"Ringtone",name:"ringtone",value:u,onChange:function(e,a){d(a)}},ge.map((function(e){return l.a.createElement(te.a,{value:e,key:e,control:l.a.createElement(Ee.a,null),label:e})})))),l.a.createElement(N.a,null,l.a.createElement(m.a,{variant:"outlined",color:"secondary",onClick:function(){a()}},"Cancel"),l.a.createElement(m.a,{onClick:function(){a(u)},color:"primary"},"Ok")))}var be=Object(c.a)((function(e){return{root:{width:"100%",maxWidth:360,backgroundColor:e.palette.background.paper},paper:{width:"80%",maxHeight:435}}}));function ve(){var e=be(),a=l.a.useState(!1),t=Object(o.a)(a,2),n=t[0],r=t[1],i=l.a.useState("Dione"),c=Object(o.a)(i,2),m=c[0],s=c[1];return l.a.createElement("div",{className:e.root},l.a.createElement(u.a,{component:"div",role:"list"},l.a.createElement(d.a,{button:!0,divider:!0,disabled:!0,role:"listitem"},l.a.createElement(p.a,{primary:"Interruptions"})),l.a.createElement(d.a,{button:!0,divider:!0,"aria-haspopup":"true","aria-controls":"ringtone-menu","aria-label":"Phone ringtone",onClick:function(){r(!0)},role:"listitem"},l.a.createElement(p.a,{primary:"Phone ringtone",secondary:m})),l.a.createElement(d.a,{button:!0,divider:!0,disabled:!0,role:"listitem"},l.a.createElement(p.a,{primary:"Default notification ringtone",secondary:"Tethys"})),l.a.createElement(fe,{classes:{paper:e.paper},id:"ringtone-menu",keepMounted:!0,open:n,onClose:function(e){r(!1),e&&s(e)},value:m})))}a.default=function(){return l.a.createElement("div",{className:"m-sm-30"},l.a.createElement("div",{className:"mb-sm-30"},l.a.createElement(r.b,{routeSegments:[{name:"Material",path:"/material"},{name:"Dialog"}]})),l.a.createElement(r.z,{title:"simple Dialog"},l.a.createElement(x,null)),l.a.createElement("div",{className:"py-3"}),l.a.createElement(r.z,{title:"alert dialog"},l.a.createElement(D,null)),l.a.createElement("div",{className:"py-3"}),l.a.createElement(r.z,{title:"transition"},l.a.createElement(W,null)),l.a.createElement("div",{className:"py-3"}),l.a.createElement(r.z,{title:"form dialog"},l.a.createElement(B,null)),l.a.createElement("div",{className:"py-3"}),l.a.createElement(r.z,{title:"customized dialog"},l.a.createElement(Y,null)),l.a.createElement("div",{className:"py-3"}),l.a.createElement(r.z,{title:"full-screen dialog"},l.a.createElement(ee,null)),l.a.createElement("div",{className:"py-3"}),l.a.createElement(r.z,{title:"optimized size dialog"},l.a.createElement(ce,null)),l.a.createElement("div",{className:"py-3"}),l.a.createElement(r.z,{title:"responsive dialog"},l.a.createElement(ue,null)),l.a.createElement("div",{className:"py-3"}),l.a.createElement(r.z,{title:"confirmation dialog"},l.a.createElement(ve,null)))}}}]);