(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[231],{1684:function(e,t,a){"use strict";var n=a(6),r=a(33),l=a(3),i=a(0),s=a(5),c=a(11),o=a(2221),m=i.forwardRef((function(e,t){var a,r=e.classes,c=e.className,m=e.component,d=void 0===m?"li":m,u=e.disableGutters,p=void 0!==u&&u,f=e.ListItemClasses,b=e.role,v=void 0===b?"menuitem":b,g=e.selected,E=e.tabIndex,h=Object(n.a)(e,["classes","className","component","disableGutters","ListItemClasses","role","selected","tabIndex"]);return e.disabled||(a=void 0!==E?E:-1),i.createElement(o.a,Object(l.a)({button:!0,role:v,tabIndex:a,component:d,selected:g,disableGutters:p,classes:Object(l.a)({dense:r.dense},f),className:Object(s.default)(r.root,c,g&&r.selected,!p&&r.gutters),ref:t},h))}));t.a=Object(c.a)((function(e){return{root:Object(l.a)({},e.typography.body1,Object(r.a)({minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",width:"auto",overflow:"hidden",whiteSpace:"nowrap"},e.breakpoints.up("sm"),{minHeight:"auto"})),gutters:{},selected:{},dense:Object(l.a)({},e.typography.body2,{minHeight:"auto"})}}),{name:"MuiMenuItem"})(m)},2132:function(e,t,a){"use strict";var n=a(3),r=a(6),l=a(0),i=a(5),s=a(689),c=a(11),o=a(132),m=l.forwardRef((function(e,t){var a=e.children,c=e.classes,m=e.className,d=e.component,u=void 0===d?"div":d,p=e.disablePointerEvents,f=void 0!==p&&p,b=e.disableTypography,v=void 0!==b&&b,g=e.position,E=e.variant,h=Object(r.a)(e,["children","classes","className","component","disablePointerEvents","disableTypography","position","variant"]),N=Object(o.b)()||{},x=E;return E&&N.variant,N&&!x&&(x=N.variant),l.createElement(o.a.Provider,{value:null},l.createElement(u,Object(n.a)({className:Object(i.default)(c.root,m,"end"===g?c.positionEnd:c.positionStart,f&&c.disablePointerEvents,N.hiddenLabel&&c.hiddenLabel,"filled"===x&&c.filled,"dense"===N.margin&&c.marginDense),ref:t},h),"string"!==typeof a||v?a:l.createElement(s.a,{color:"textSecondary"},a)))}));t.a=Object(c.a)({root:{display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap"},filled:{"&$positionStart:not($hiddenLabel)":{marginTop:16}},positionStart:{marginRight:8},positionEnd:{marginLeft:8},disablePointerEvents:{pointerEvents:"none"},hiddenLabel:{},marginDense:{}},{name:"MuiInputAdornment"})(m)},2152:function(e,t,a){"use strict";var n=a(3),r=a(6),l=a(0),i=a(5),s=a(11),c=a(94),o=Object(c.a)(l.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var m=l.forwardRef((function(e,t){var a=e.alt,s=e.children,c=e.classes,m=e.className,d=e.component,u=void 0===d?"div":d,p=e.imgProps,f=e.sizes,b=e.src,v=e.srcSet,g=e.variant,E=void 0===g?"circular":g,h=Object(r.a)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),N=null,x=function(e){var t=e.src,a=e.srcSet,n=l.useState(!1),r=n[0],i=n[1];return l.useEffect((function(){if(t||a){i(!1);var e=!0,n=new Image;return n.src=t,n.srcSet=a,n.onload=function(){e&&i("loaded")},n.onerror=function(){e&&i("error")},function(){e=!1}}}),[t,a]),r}({src:b,srcSet:v}),j=b||v,y=j&&"error"!==x;return N=y?l.createElement("img",Object(n.a)({alt:a,src:b,srcSet:v,sizes:f,className:c.img},p)):null!=s?s:j&&a?a[0]:l.createElement(o,{className:c.fallback}),l.createElement(u,Object(n.a)({className:Object(i.default)(c.root,c.system,c[E],m,!y&&c.colorDefault),ref:t},h),N)}));t.a=Object(s.a)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},circular:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}}),{name:"MuiAvatar"})(m)},2221:function(e,t,a){"use strict";var n=a(3),r=a(6),l=a(0),i=a(5),s=a(11),c=a(683),o=a(229),m=a(34),d=a(420),u=a(29),p="undefined"===typeof window?l.useEffect:l.useLayoutEffect,f=l.forwardRef((function(e,t){var a=e.alignItems,s=void 0===a?"center":a,f=e.autoFocus,b=void 0!==f&&f,v=e.button,g=void 0!==v&&v,E=e.children,h=e.classes,N=e.className,x=e.component,j=e.ContainerComponent,y=void 0===j?"li":j,O=e.ContainerProps,w=(O=void 0===O?{}:O).className,C=Object(r.a)(O,["className"]),S=e.dense,I=void 0!==S&&S,_=e.disabled,k=void 0!==_&&_,z=e.disableGutters,V=void 0!==z&&z,D=e.divider,L=void 0!==D&&D,P=e.focusVisibleClassName,R=e.selected,M=void 0!==R&&R,A=Object(r.a)(e,["alignItems","autoFocus","button","children","classes","className","component","ContainerComponent","ContainerProps","dense","disabled","disableGutters","divider","focusVisibleClassName","selected"]),F=l.useContext(d.a),T={dense:I||F.dense||!1,alignItems:s},$=l.useRef(null);p((function(){b&&$.current&&$.current.focus()}),[b]);var B=l.Children.toArray(E),G=B.length&&Object(o.a)(B[B.length-1],["ListItemSecondaryAction"]),H=l.useCallback((function(e){$.current=u.findDOMNode(e)}),[]),J=Object(m.a)(H,t),q=Object(n.a)({className:Object(i.default)(h.root,N,T.dense&&h.dense,!V&&h.gutters,L&&h.divider,k&&h.disabled,g&&h.button,"center"!==s&&h.alignItemsFlexStart,G&&h.secondaryAction,M&&h.selected),disabled:k},A),U=x||"li";return g&&(q.component=x||"div",q.focusVisibleClassName=Object(i.default)(h.focusVisible,P),U=c.a),G?(U=q.component||x?U:"div","li"===y&&("li"===U?U="div":"li"===q.component&&(q.component="div")),l.createElement(d.a.Provider,{value:T},l.createElement(y,Object(n.a)({className:Object(i.default)(h.container,w),ref:J},C),l.createElement(U,q,B),B.pop()))):l.createElement(d.a.Provider,{value:T},l.createElement(U,Object(n.a)({ref:J},q),B))}));t.a=Object(s.a)((function(e){return{root:{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,"&$focusVisible":{backgroundColor:e.palette.action.selected},"&$selected, &$selected:hover":{backgroundColor:e.palette.action.selected},"&$disabled":{opacity:.5}},container:{position:"relative"},focusVisible:{},dense:{paddingTop:4,paddingBottom:4},alignItemsFlexStart:{alignItems:"flex-start"},disabled:{},divider:{borderBottom:"1px solid ".concat(e.palette.divider),backgroundClip:"padding-box"},gutters:{paddingLeft:16,paddingRight:16},button:{transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:e.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},secondaryAction:{paddingRight:48},selected:{}}}),{name:"MuiListItem"})(f)},3593:function(e,t,a){"use strict";a.r(t);var n=a(13),r=a(18),l=a(0),i=a.n(l),s=a(613),c=a(2132),o=a(1449),m=a(1477),d=a(2193),u=a(691),p=function(e){var t=e.viewMode,a=e.sliderValue,n=e.handleSldierChange,r=e.handleInputChange,l=e.handleViewChange;return i.a.createElement("div",{className:"flex flex-wrap items-center justify-between"},i.a.createElement("div",{className:"flex items-center"},i.a.createElement(s.a,{onChange:r,InputProps:{startAdornment:i.a.createElement(c.a,{position:"start"},i.a.createElement(o.a,null,"search"))}})),i.a.createElement("div",{className:"flex items-center"},i.a.createElement(m.a,{xsDown:!0},"grid"===t&&i.a.createElement(d.a,{className:"w-120 mr-4",value:a,min:25,step:null,marks:[{value:25},{value:50},{value:75},{value:100}],onChange:n,"aria-labelledby":"continuous-slider"}),i.a.createElement(u.a,{color:"grid"===t?"primary":"default",onClick:function(){return l("grid")}},i.a.createElement(o.a,null,"view_comfy")),i.a.createElement(u.a,{color:"list"===t?"primary":"default",onClick:function(){return l("list")}},i.a.createElement(o.a,null,"list")))))},f=a(26),b=a.n(f),v=a(16),g=a(19),E=a(1389),h=a(300),N=a(2152),x=a(1684),j=a(104),y=a(704),O=a(5),w=["palette"],C=Object(y.a)((function(e){e.palette,Object(g.a)(e,w);return{listCard:{"& .project-image":{height:75,width:100},"& .card__button-group":{display:"none",position:"absolute",top:0,bottom:0,right:0,zIndex:1},"&:hover":{"& .card__button-group":{display:"flex"}}}}})),S=function(e){var t=e.list,a=void 0===t?[]:t,n=C();return i.a.createElement("div",null,a.map((function(e,t){var r;return i.a.createElement(E.a,{className:Object(O.default)((r={},Object(v.a)(r,n.listCard,!0),Object(v.a)(r,"card p-2 relative",!0),Object(v.a)(r,"mb-4",t<a.length),r)),key:e.id,elevation:3},i.a.createElement(h.a,{container:!0,justify:"space-between",alignItems:"center"},i.a.createElement(h.a,{item:!0,md:6},i.a.createElement("div",{className:"flex items-center"},i.a.createElement("img",{className:"project-image w-full",src:e.projectImage,alt:"project"}),i.a.createElement("div",{className:"ml-4"},i.a.createElement("p",{className:"m-0 mb-2"},e.projectName),i.a.createElement("div",{className:"flex"},i.a.createElement("small",{className:"text-muted"},e.date),i.a.createElement("small",{className:"text-muted ml-6"},e.email))))),i.a.createElement(h.a,{item:!0,md:2},i.a.createElement("div",{className:"text-muted flex items-center"},i.a.createElement(o.a,{fontSize:"small"},"chat_bubble_outline"),i.a.createElement("span",{className:"mr-6 ml-1"},e.comment),i.a.createElement(o.a,{fontSize:"small"},"desktop_windows"),i.a.createElement("span",{className:"ml-1"},e.revision))),i.a.createElement(h.a,{item:!0,md:2},i.a.createElement("div",{className:"flex items-center"},i.a.createElement(N.a,{src:e.userImage}),i.a.createElement("span",{className:"ml-4"},e.userName))),i.a.createElement(h.a,{item:!0,md:2},i.a.createElement("div",{className:"card__button-group items-center bg-paper"},i.a.createElement(o.a,{fontSize:"small",className:"mr-4 text-muted cursor-pointer"},"filter_none"),i.a.createElement(o.a,{fontSize:"small",className:"mr-4 text-muted cursor-pointer"},"share"),i.a.createElement(o.a,{fontSize:"small",className:"mr-4 text-muted cursor-pointer"},"edit"),i.a.createElement(o.a,{fontSize:"small",className:"mr-4 text-muted cursor-pointer"},"delete")),i.a.createElement("div",{className:"card__drop-menu text-right"},i.a.createElement(m.a,{smDown:!0},i.a.createElement(j.n,{menuButton:i.a.createElement(u.a,null,i.a.createElement(o.a,null,"more_horiz"))},i.a.createElement(x.a,{className:"flex items-center"},i.a.createElement(o.a,{className:"mr-4"},"filter_none")," Duplicate"),i.a.createElement(x.a,{className:"flex items-center"},i.a.createElement(o.a,{className:"mr-4"},"share")," Share"),i.a.createElement(x.a,{className:"flex items-center"},i.a.createElement(o.a,{className:"mr-4"},"edit")," Edit"),i.a.createElement(x.a,{className:"flex items-center"},i.a.createElement(o.a,{className:"mr-4"},"delete")," Delete")))))))})))},I=a(1407),_=a(692),k=["palette"],z=Object(y.a)((function(e){e.palette,Object(g.a)(e,k);return{gridCard:{"& .grid__card-overlay":{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:2,opacity:0,transition:"all 250ms ease-in-out",background:"rgba(0, 0, 0, 0.67)","& > div:nth-child(2)":{position:"absolute",top:0,bottom:0,right:0,left:0,zIndex:-1}},"& .grid__card-bottom":{"& .email":{display:"none"}},"&:hover":{"& .grid__card-overlay":{opacity:1},"& .grid__card-bottom":{"& .email":{display:"block"},"& .date":{display:"none"}}}}}})),V=function(e){var t=e.list,a=void 0===t?[]:t,n=e.sliderValue,r=z();return i.a.createElement("div",null,i.a.createElement(h.a,{container:!0,spacing:2},a.map((function(e,t){return i.a.createElement(h.a,{item:!0,sm:(a=n,25===a?2:50===a?3:75===a?4:100===a?6:void 0),key:e.id},i.a.createElement(E.a,{className:Object(O.default)("flex-column h-full",r.gridCard),elevation:6},i.a.createElement("div",{className:"grid__card-top text-center relative"},i.a.createElement("img",{className:"block w-full",src:e.projectImage,alt:"project"}),i.a.createElement("div",{className:"grid__card-overlay flex-column"},i.a.createElement("div",{className:"flex items-center justify-between"},i.a.createElement(I.a,{className:"text-white"}),i.a.createElement("div",{className:"flex items-center"},i.a.createElement(o.a,{fontSize:"small",className:"mr-3 cursor-pointer text-white"},"filter_none"),i.a.createElement(o.a,{fontSize:"small",className:"mr-3 cursor-pointer text-white"},"share"),i.a.createElement(o.a,{fontSize:"small",className:"mr-3 cursor-pointer text-white"},"edit"),i.a.createElement(o.a,{fontSize:"small",className:"mr-3 cursor-pointer text-white"},"delete"))),i.a.createElement("div",{className:"flex items-center justify-center"},i.a.createElement(_.a,{variant:"outlined",className:"text-white border-color-white"},"View Details")))),i.a.createElement("div",{className:"grid__card-bottom text-center py-2"},i.a.createElement("p",{className:"m-0"},e.projectName),i.a.createElement("small",{className:"date text-muted"},e.date),i.a.createElement("small",{className:"email text-muted"},e.email))));var a}))))},D=a(192);t.default=function(){var e=Object(l.useState)([]),t=Object(r.a)(e,2),a=t[0],s=t[1],c=Object(l.useState)(50),o=Object(r.a)(c,2),d=o[0],u=o[1],f=Object(l.useState)([]),v=Object(r.a)(f,2),g=v[0],E=v[1],h=Object(l.useState)("grid"),N=Object(r.a)(h,2),x=N[0],j=N[1],y=Object(l.useMemo)((function(){return Object(D.debounce)((function(e){var t=a.filter((function(t){return t.projectName.toLowerCase().match(e.toLowerCase())}));E(Object(n.a)(t))}),200)}),[a]);return Object(l.useEffect)((function(){b.a.get("/api/list/all").then((function(e){s(e.data),E(e.data)}))}),[]),i.a.createElement("div",{className:"list m-sm-30"},i.a.createElement("div",{className:"mb-4"},i.a.createElement(p,{viewMode:x,handleViewChange:function(e){j(e)},handleInputChange:function(e){var t=e.target.value;y(t)},handleSldierChange:function(e,t){u(t)},sliderValue:d})),i.a.createElement(m.a,{xsDown:!0},"list"===x?i.a.createElement(S,{list:g}):i.a.createElement(V,{list:g,sliderValue:d})),i.a.createElement(m.a,{smUp:!0},i.a.createElement(V,{list:g,sliderValue:d})))}}}]);