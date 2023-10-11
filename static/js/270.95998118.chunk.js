(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[270],{3576:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(104),c=a(18),i=a(3632),o=a(3383),u=a(3633),m=a(61),s=function(){var e=Object(m.a)(),t=Object(n.useState)([]),a=Object(c.a)(t,2),l=a[0],s=a[1],d=Object(n.useRef)(0);Object(n.useEffect)((function(){s(f(d.current));var e=setInterval((function(){d.current+=25,d.current=d.current>100?0:d.current,s(f(d.current))}),2e3);return function(){e&&clearInterval(e)}}),[]);var f=function(e){return[{x:1,y:e},{x:2,y:100-e}]};return r.a.createElement("div",{style:{height:"320px"}},r.a.createElement("svg",{viewBox:"0 0 400 400",width:"100%",height:"100%"},r.a.createElement(i.a,{standalone:!1,animate:{duration:1e3},width:400,height:400,data:l,innerRadius:120,cornerRadius:25,labels:function(){return null},style:{data:{fill:function(e){var t=e.y>30?"green":"red";return 1===e.x?t:"transparent"}}}}),r.a.createElement(o.a,{duration:1e3,data:{percent:d.current,data:l}},(function(t){return r.a.createElement(u.a,{textAnchor:"middle",verticalAnchor:"middle",x:200,y:200,text:"".concat(Math.round(t.percent),"%"),style:{fontSize:45,fill:e.palette.text.secondary}})}))))},d=a(7),f=a(3612),y=a(3634),h=a(3635),E=a(3662),b=a(3663),v=a(192),p=a(297),x={0:"E",45:"NE",90:"N",135:"NW",180:"W",225:"SW",270:"S",315:"SE"},g={base:"gold",highlight:"darkOrange"},k={base:"tomato",highlight:"orangeRed"},O=function(e){var t=e.origin,a={stroke:k.base,strokeWidth:2,fill:g.base};return r.a.createElement("g",null,r.a.createElement("circle",{cx:t.x,cy:t.y,r:30,style:a}))},j=function(e){var t=e.datum,a=e.active,n=e.color,l=Object(p.a)(),c=["".concat(x[null===t||void 0===t?void 0:t._x]),"".concat(Math.round(null===t||void 0===t?void 0:t._y1)," mph")],i={fill:l?l.palette.text.secondary:n.highlight,textAnchor:"middle"},o=[Object(d.a)(Object(d.a)({},i),{},{fontSize:18,fontWeight:"bold"})];return a?r.a.createElement(u.a,{text:c,style:o,x:175,y:175,renderInPortal:!0}):null},w=function(){return v.keys(x).map((function(e){var t=Math.floor(17*v.random())+4;return{windSpeed:t,windGust:t+v.random(2,10),windBearing:+e}}))},S=function(){var e=Object(n.useState)(w()),t=Object(c.a)(e,2),a=t[0],l=t[1],i=Object(p.a)();return Object(n.useEffect)((function(){l(w());var e=setInterval((function(){l(w())}),4e3);return function(){e&&clearInterval(e)}}),[]),r.a.createElement("div",{className:"h-320"},r.a.createElement(f.a,{polar:!0,animate:{duration:500,onLoad:{duration:500}},theme:y.a.material,innerRadius:30,domainPadding:{y:10},events:[{childName:"all",target:"data",eventHandlers:{onMouseOver:function(){return[{target:"labels",mutation:function(){return{active:!0}}},{target:"data",mutation:function(){return{active:!0}}}]},onMouseOut:function(){return[{target:"labels",mutation:function(){return{active:!1}}},{target:"data",mutation:function(){return{active:!1}}}]}}}]},r.a.createElement(h.a,{dependentAxis:!0,labelPlacement:"vertical",style:{axis:{stroke:"none"}},tickFormat:function(){return""}}),r.a.createElement(h.a,{labelPlacement:"parallel",tickValues:v.keys(x).map((function(e){return+e})),tickFormat:v.values(x)}),r.a.createElement(E.a,null,r.a.createElement(b.a,{style:{data:{fill:function(e,t){return t?g.highlight:g.base},width:40}},data:a,x:"windBearing",y:"windSpeed",labels:function(){return""},labelComponent:r.a.createElement(j,{theme:i,color:g})}),r.a.createElement(b.a,{style:{data:{fill:function(e,t){return t?k.highlight:k.base},width:40}},data:a,x:"windBearing",y:function(e){return e.windGust-e.windSpeed},labels:function(){return""},labelComponent:r.a.createElement(j,{color:k})})),r.a.createElement(O,null)))},N=a(3659),C=a(3574),z=function(){var e=Object(n.useState)([]),t=Object(c.a)(e,2),a=t[0],l=t[1],i=Object(p.a)(),o=function(){return v.range(7).map((function(){return[{x:1,y:v.random(1,5)},{x:2,y:v.random(1,10)},{x:3,y:v.random(2,10)},{x:4,y:v.random(2,10)},{x:5,y:v.random(2,15)}]}))};return Object(n.useEffect)((function(){l(o());var e=setInterval((function(){l(o())}),4e3);return function(){return clearInterval(e)}}),[]),r.a.createElement("div",{className:"h-320"},r.a.createElement(f.a,{width:700,containerComponent:r.a.createElement(N.a,{responsive:!0}),theme:y.a.material,animate:{duration:1e3},style:{label:{fontSize:45,fill:i.palette.text.secondary}}},r.a.createElement(E.a,{colorScale:"blue"},a.map((function(e,t){return r.a.createElement(C.a,{key:t,data:e,interpolation:"basis"})})))))},M=a(13),P=a(3664),R=[{strength:1,intelligence:250,luck:1,stealth:40,charisma:50},{strength:2,intelligence:300,luck:2,stealth:80,charisma:90},{strength:5,intelligence:225,luck:3,stealth:60,charisma:120}],W=function(e){var t=Object(n.useState)({data:[],maxima:{}}),a=Object(c.a)(t,2),l=a[0],i=a[1],o=Object(n.useCallback)((function(e){var t=Object.keys(e[0]).reduce((function(t,a){return t[a]=e.map((function(e){return e[a]})),t}),{});return Object.keys(t).reduce((function(e,a){return e[a]=Math.max.apply(Math,Object(M.a)(t[a])),e}),{})}),[]),m=Object(n.useCallback)((function(e){var t=o(e);return e.map((function(e){return a=e,Object.keys(a).map((function(e){return{x:e,y:a[e]/t[e]}}));var a}))}),[o]);return Object(n.useEffect)((function(){i({data:m(R),maxima:o(R)})}),[m,o]),r.a.createElement("div",{className:"h-320"},r.a.createElement(f.a,{polar:!0,theme:y.a.material,domain:{y:[0,1]}},r.a.createElement(P.a,{colorScale:["gold","orange","tomato"],style:{data:{fillOpacity:.2,strokeWidth:2}}},l.data.map((function(e,t){return r.a.createElement(C.a,{key:t,data:e})}))),Object.keys(l.maxima).map((function(e,t){return r.a.createElement(h.a,{key:t,dependentAxis:!0,style:{axisLabel:{padding:10},axis:{stroke:"none"},grid:{stroke:"grey",strokeWidth:.25,opacity:.5}},tickLabelComponent:r.a.createElement(u.a,{labelPlacement:"vertical"}),labelPlacement:"perpendicular",axisValue:t+1,label:e,tickFormat:function(t){return Math.ceil(t*l.maxima[e])},tickValues:[.25,.5,.75]})})),r.a.createElement(h.a,{labelPlacement:"parallel",tickFormat:function(){return""},style:{axis:{stroke:"none"},grid:{stroke:"grey",opacity:.5}}})))},I=a(3387),A=function(){var e=Object(n.useState)({clicked:!1,style:{data:{fill:"tomato"}}}),t=Object(c.a)(e,2),a=t[0],l=t[1];return r.a.createElement("div",{className:"h-320"},r.a.createElement(f.a,{domainPadding:{x:50,y:[0,20]},scale:{x:"time"}},r.a.createElement(b.a,{dataComponent:r.a.createElement(I.a,{events:{onMouseOver:function(){var e=a.clicked?"blue":"tomato",t=!a.clicked;l({clicked:t,style:{data:{fill:e}}})}}}),style:a.style,data:[{x:new Date(1986,1,1),y:2},{x:new Date(1996,1,1),y:3},{x:new Date(2006,1,1),y:5},{x:new Date(2016,1,1),y:4}]})))},B=a(3665),D=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return r.a.createElement("g",null,r.a.createElement(u.a,e),r.a.createElement(B.a,Object.assign({},e,{text:"# ".concat(e.text),style:{fill:"white"},x:200,y:250,orientation:"top",pointerLength:0,cornerRadius:50,flyoutWidth:100,flyoutHeight:100,flyoutStyle:{fill:"black"}})))};D.defaultEvents=B.a.defaultEvents;var F=function(){return r.a.createElement("div",{className:"flex justify-center"},r.a.createElement("div",{style:{width:"300px"}},r.a.createElement(i.a,{style:{labels:{fill:"white"}},innerRadius:100,labelRadius:120,labels:function(e){return e.y},labelComponent:r.a.createElement(D,null),data:[{x:1,y:5},{x:2,y:4},{x:3,y:2},{x:4,y:3},{x:5,y:1}]})))};t.default=function(){return r.a.createElement("div",{className:"m-sm-30"},r.a.createElement("div",{className:"mb-sm-30"},r.a.createElement(l.b,{routeSegments:[{name:"Charts",path:"/charts"},{name:"Victory Charts"}]})),r.a.createElement(l.z,{title:"circular progress bar"},r.a.createElement(s,null)),r.a.createElement("div",{className:"py-3"}),r.a.createElement(l.z,{title:"stacked polar bar"},r.a.createElement(S,null)),r.a.createElement("div",{className:"py-3"}),r.a.createElement(l.z,{title:"area animation Chart"},r.a.createElement(z,null)),r.a.createElement("div",{className:"py-3"}),r.a.createElement(l.z,{title:"victory radar Chart"},r.a.createElement(W,null)),r.a.createElement("div",{className:"py-3"}),r.a.createElement(l.z,{title:"alternative events Chart"},r.a.createElement(A,null)),r.a.createElement("div",{className:"py-3"}),r.a.createElement(l.z,{title:"custom tooltip label"},r.a.createElement(F,null)))}}}]);