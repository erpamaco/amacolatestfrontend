(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[268],{3568:function(t,i,e){"use strict";e.r(i);var n=e(0),a=e.n(n),r=e(104),o=e(2629),s=e(2508),u=e(297),p=function(){var t=Object(u.a)(),i=s.j;return a.a.createElement(s.e,{height:320},a.a.createElement(s.h,null),a.a.createElement(s.o,null),a.a.createElement(s.p,{style:{text:{stroke:"none",fill:t.palette.text.secondary,fontWeight:600}}}),a.a.createElement(s.q,{style:{text:{stroke:"none",fill:t.palette.text.secondary,fontWeight:600}}}),a.a.createElement(s.c,{text:"X Axis",className:"alt-x-label",includeMargin:!1,xPercent:.025,yPercent:1.01}),a.a.createElement(s.c,{text:"Y Axis",className:"alt-y-label",includeMargin:!1,xPercent:.06,yPercent:.06,style:{transform:"rotate(-90)",textAnchor:"end"}}),a.a.createElement(i,{className:"first-series",data:[{x:1,y:3},{x:2,y:5},{x:3,y:15},{x:4,y:12}]}),a.a.createElement(i,{className:"second-series",data:null}),a.a.createElement(i,{className:"third-series",curve:"curveMonotoneX",data:[{x:1,y:10},{x:2,y:4},{x:3,y:2},{x:4,y:15}],strokeDasharray:"7, 3"}),a.a.createElement(i,{className:"fourth-series",curve:o.a.alpha(.5),style:{strokeDasharray:"2 2"},data:[{x:1,y:7},{x:2,y:11},{x:3,y:9},{x:4,y:2}]}))},g=e(18),w=e(61),l=function(){var t=Object(n.useState)([]),i=Object(g.a)(t,2),e=i[0],r=i[1],o=Object(w.a)();return Object(n.useEffect)((function(){!function(){for(var t=[],i=0;i<20;i++){for(var e=[],n=0;n<100;n++)e.push({x:n,y:(i/10+1)*Math.sin(Math.PI*(i+n)/50)});t.push({color:i,key:i,data:e,opacity:.8})}r([].concat(t))}()}),[]),a.a.createElement(s.e,{height:320,colorType:"linear",colorDomain:[0,9],colorRange:["yellow","orange"]},a.a.createElement(s.p,{style:{text:{stroke:"none",fill:o.palette.text.secondary,fontWeight:600}}}),a.a.createElement(s.q,{style:{text:{stroke:"none",fill:o.palette.text.secondary,fontWeight:600}}}),e.map((function(t){return a.a.createElement(s.j,t)})))},c=function(){var t=Object(u.a)();return a.a.createElement(s.e,{height:320},a.a.createElement(s.p,{style:{text:{stroke:"none",fill:t.palette.text.secondary,fontWeight:600}}}),a.a.createElement(s.q,{style:{text:{stroke:"none",fill:t.palette.text.secondary,fontWeight:600}}}),a.a.createElement(s.a,{className:"area-series-example",curve:"curveNatural",data:[{x:1,y:10},{x:2,y:5},{x:3,y:15}]}))},m=[{x:"A",y:10},{x:"B",y:5},{x:"C",y:15}],y=[{x:"A",y:12},{x:"B",y:2},{x:"C",y:11}],x=m.map((function(t,i){return{x:t.x,y:Math.max(m[i].y,y[i].y)}})),d=function(){var t=Object(w.a)(),i=s.m;return a.a.createElement(s.e,{xType:"ordinal",height:300,xDistance:100},a.a.createElement(s.p,{style:{text:{stroke:"none",fill:t.palette.text.secondary,fontWeight:600}}}),a.a.createElement(s.q,{style:{text:{stroke:"none",fill:t.palette.text.secondary,fontWeight:600}}}),a.a.createElement(i,{className:"vertical-bar-series-example",data:m}),a.a.createElement(i,{data:y}),a.a.createElement(s.i,{data:x,getLabel:function(t){return t.x}}))},E=[{id:"00036",y:200400,x:1504121437},{id:"00036",y:200350,x:1504121156},{id:"00036",y:200310,x:1504120874},{id:"00036",y:200260,x:1504120590},{id:"00036",y:200210,x:1504120306},{id:"00036",y:200160,x:1504120024},{id:"00036",y:200120,x:1504119740},{id:"00036",y:200070,x:1504119458},{id:"00036",y:200020,x:1504119177},{id:"00036",y:199980,x:1504118893},{id:"00036",y:199930,x:1504118611},{id:"00036",y:199880,x:1504118330},{id:"00036",y:199830,x:1504118048},{id:"00036",y:199790,x:1504117763},{id:"00036",y:199740,x:1504117481}],f=E.reduce((function(t,i){return{max:Math.max(t.max,i.y),min:Math.min(t.min,i.y)}}),{max:-1/0,min:1/0}),h=function(){var t=Object(w.a)(),i=s.m;return a.a.createElement(s.e,{margin:{left:75},xType:"time",height:300,yDomain:[f.min,f.max]},a.a.createElement(i,{className:"vertical-bar-series-example",data:E}),a.a.createElement(s.p,{style:{text:{stroke:"none",fill:t.palette.text.secondary,fontWeight:600}}}),a.a.createElement(s.q,{style:{text:{stroke:"none",fill:t.palette.text.secondary,fontWeight:600}}}))},v=e(2464),b=void 0,k=["A","B","C","D","E","F","G","H","I","J"],N=k.reduce((function(t,i,e){return t.concat(k.map((function(t,n){return{x:"".concat(i,"1"),y:"".concat(t,"2"),color:(e+n)%Math.floor(n/e)||e}})))}),[]),j=N.reduce((function(t,i){return{min:Math.min(t.min,i.color),max:Math.max(t.max,i.color)}}),{min:1/0,max:-1/0}),M=j.min,W=j.max,O=function(){var t=Object(u.a)(),i=Object(v.scaleLinear)().domain([M,(M+W)/2,W]).range(["orange","white","cyan"]);return a.a.createElement(s.e,{xType:"ordinal",xDomain:k.map((function(t){return"".concat(t,"1")})),yType:"ordinal",yDomain:k.map((function(t){return"".concat(t,"2")})).reverse(),margin:50,height:500},a.a.createElement(s.p,{orientation:"top",style:{text:{stroke:"none",fill:t.palette.text.secondary,fontWeight:600}}}),a.a.createElement(s.q,{style:{text:{stroke:"none",fill:t.palette.text.secondary,fontWeight:600}}}),a.a.createElement(s.f,{colorType:"literal",getColor:function(t){return i(t.color)},style:{stroke:"white",strokeWidth:"2px",rectStyle:{rx:10,ry:10}},className:"heatmap-series-example",data:N,onValueMouseOver:function(t){return b.setState({value:t})},onSeriesMouseOut:function(t){return b.setState({value:!1})}}),a.a.createElement(s.i,{style:{pointerEvents:"none"},data:N,labelAnchorX:"middle",labelAnchorY:"baseline",getLabel:function(t){return"".concat(t.color)}}),!1)},C=[{eruptions:3.6,waiting:79},{eruptions:1.8,waiting:54},{eruptions:3.333,waiting:74},{eruptions:2.283,waiting:62},{eruptions:4.533,waiting:85},{eruptions:2.883,waiting:55},{eruptions:4.7,waiting:88},{eruptions:3.6,waiting:85},{eruptions:1.95,waiting:51},{eruptions:4.35,waiting:85},{eruptions:1.833,waiting:54},{eruptions:3.917,waiting:84},{eruptions:4.2,waiting:78},{eruptions:1.75,waiting:47},{eruptions:4.7,waiting:83},{eruptions:2.167,waiting:52},{eruptions:1.75,waiting:62},{eruptions:4.8,waiting:84},{eruptions:1.6,waiting:52},{eruptions:4.25,waiting:79},{eruptions:1.8,waiting:51},{eruptions:1.75,waiting:47},{eruptions:3.45,waiting:78},{eruptions:3.067,waiting:69},{eruptions:4.533,waiting:74},{eruptions:3.6,waiting:83},{eruptions:1.967,waiting:55},{eruptions:4.083,waiting:76},{eruptions:3.85,waiting:78},{eruptions:4.433,waiting:79},{eruptions:4.3,waiting:73},{eruptions:4.467,waiting:77},{eruptions:3.367,waiting:66},{eruptions:4.033,waiting:80},{eruptions:3.833,waiting:74},{eruptions:2.017,waiting:52},{eruptions:1.867,waiting:48},{eruptions:4.833,waiting:80},{eruptions:1.833,waiting:59},{eruptions:4.783,waiting:90},{eruptions:4.35,waiting:80},{eruptions:1.883,waiting:58},{eruptions:4.567,waiting:84},{eruptions:1.75,waiting:58},{eruptions:4.533,waiting:73},{eruptions:3.317,waiting:83},{eruptions:3.833,waiting:64},{eruptions:2.1,waiting:53},{eruptions:4.633,waiting:82},{eruptions:2,waiting:59},{eruptions:4.8,waiting:75},{eruptions:4.716,waiting:90},{eruptions:1.833,waiting:54},{eruptions:4.833,waiting:80},{eruptions:1.733,waiting:54},{eruptions:4.883,waiting:83},{eruptions:3.717,waiting:71},{eruptions:1.667,waiting:64},{eruptions:4.567,waiting:77},{eruptions:4.317,waiting:81},{eruptions:2.233,waiting:59},{eruptions:4.5,waiting:84},{eruptions:1.75,waiting:48},{eruptions:4.8,waiting:82},{eruptions:1.817,waiting:60},{eruptions:4.4,waiting:92},{eruptions:4.167,waiting:78},{eruptions:4.7,waiting:78},{eruptions:2.067,waiting:65},{eruptions:4.7,waiting:73},{eruptions:4.033,waiting:82},{eruptions:1.967,waiting:56},{eruptions:4.5,waiting:79},{eruptions:4,waiting:71},{eruptions:1.983,waiting:62},{eruptions:5.067,waiting:76},{eruptions:2.017,waiting:60},{eruptions:4.567,waiting:78},{eruptions:3.883,waiting:76},{eruptions:3.6,waiting:83},{eruptions:4.133,waiting:75},{eruptions:4.333,waiting:82},{eruptions:4.1,waiting:70},{eruptions:2.633,waiting:65},{eruptions:4.067,waiting:73},{eruptions:4.933,waiting:88},{eruptions:3.95,waiting:76},{eruptions:4.517,waiting:80},{eruptions:2.167,waiting:48},{eruptions:4,waiting:86},{eruptions:2.2,waiting:60},{eruptions:4.333,waiting:90},{eruptions:1.867,waiting:50},{eruptions:4.817,waiting:78},{eruptions:1.833,waiting:63},{eruptions:4.3,waiting:72},{eruptions:4.667,waiting:84},{eruptions:3.75,waiting:75},{eruptions:1.867,waiting:51},{eruptions:4.9,waiting:82},{eruptions:2.483,waiting:62},{eruptions:4.367,waiting:88},{eruptions:2.1,waiting:49},{eruptions:4.5,waiting:83},{eruptions:4.05,waiting:81},{eruptions:1.867,waiting:47},{eruptions:4.7,waiting:84},{eruptions:1.783,waiting:52},{eruptions:4.85,waiting:86},{eruptions:3.683,waiting:81},{eruptions:4.733,waiting:75},{eruptions:2.3,waiting:59},{eruptions:4.9,waiting:89},{eruptions:4.417,waiting:79},{eruptions:1.7,waiting:59},{eruptions:4.633,waiting:81},{eruptions:2.317,waiting:50},{eruptions:4.6,waiting:85},{eruptions:1.817,waiting:59},{eruptions:4.417,waiting:87},{eruptions:2.617,waiting:53},{eruptions:4.067,waiting:69},{eruptions:4.25,waiting:77},{eruptions:1.967,waiting:56},{eruptions:4.6,waiting:88},{eruptions:3.767,waiting:81},{eruptions:1.917,waiting:45},{eruptions:4.5,waiting:82},{eruptions:2.267,waiting:55},{eruptions:4.65,waiting:90},{eruptions:1.867,waiting:45},{eruptions:4.167,waiting:83},{eruptions:2.8,waiting:56},{eruptions:4.333,waiting:89},{eruptions:1.833,waiting:46},{eruptions:4.383,waiting:82},{eruptions:1.883,waiting:51},{eruptions:4.933,waiting:86},{eruptions:2.033,waiting:53},{eruptions:3.733,waiting:79},{eruptions:4.233,waiting:81},{eruptions:2.233,waiting:60},{eruptions:4.533,waiting:82},{eruptions:4.817,waiting:77},{eruptions:4.333,waiting:76},{eruptions:1.983,waiting:59},{eruptions:4.633,waiting:80},{eruptions:2.017,waiting:49},{eruptions:5.1,waiting:96},{eruptions:1.8,waiting:53},{eruptions:5.033,waiting:77},{eruptions:4,waiting:77},{eruptions:2.4,waiting:65},{eruptions:4.6,waiting:81},{eruptions:3.567,waiting:71},{eruptions:4,waiting:70},{eruptions:4.5,waiting:81},{eruptions:4.083,waiting:93},{eruptions:1.8,waiting:53},{eruptions:3.967,waiting:89},{eruptions:2.2,waiting:45},{eruptions:4.15,waiting:86},{eruptions:2,waiting:58},{eruptions:3.833,waiting:78},{eruptions:3.5,waiting:66},{eruptions:4.583,waiting:76},{eruptions:2.367,waiting:63},{eruptions:5,waiting:88},{eruptions:1.933,waiting:52},{eruptions:4.617,waiting:93},{eruptions:1.917,waiting:49},{eruptions:2.083,waiting:57},{eruptions:4.583,waiting:77},{eruptions:3.333,waiting:68},{eruptions:4.167,waiting:81},{eruptions:4.333,waiting:81},{eruptions:4.5,waiting:73},{eruptions:2.417,waiting:50},{eruptions:4,waiting:85},{eruptions:4.167,waiting:74},{eruptions:1.883,waiting:55},{eruptions:4.583,waiting:77},{eruptions:4.25,waiting:83},{eruptions:3.767,waiting:83},{eruptions:2.033,waiting:51},{eruptions:4.433,waiting:78},{eruptions:4.083,waiting:84},{eruptions:1.833,waiting:46},{eruptions:4.417,waiting:83},{eruptions:2.183,waiting:55},{eruptions:4.8,waiting:81},{eruptions:1.833,waiting:57},{eruptions:4.8,waiting:76},{eruptions:4.1,waiting:84},{eruptions:3.966,waiting:77},{eruptions:4.233,waiting:81},{eruptions:3.5,waiting:87},{eruptions:4.366,waiting:77},{eruptions:2.25,waiting:51},{eruptions:4.667,waiting:78},{eruptions:2.1,waiting:60},{eruptions:4.35,waiting:82},{eruptions:4.133,waiting:91},{eruptions:1.867,waiting:53},{eruptions:4.6,waiting:78},{eruptions:1.783,waiting:46},{eruptions:4.367,waiting:77},{eruptions:3.85,waiting:84},{eruptions:1.933,waiting:49},{eruptions:4.5,waiting:83},{eruptions:2.383,waiting:71},{eruptions:4.7,waiting:80},{eruptions:1.867,waiting:49},{eruptions:3.833,waiting:75},{eruptions:3.417,waiting:64},{eruptions:4.233,waiting:76},{eruptions:2.4,waiting:53},{eruptions:4.8,waiting:94},{eruptions:2,waiting:55},{eruptions:4.15,waiting:76},{eruptions:1.867,waiting:50},{eruptions:4.267,waiting:82},{eruptions:1.75,waiting:54},{eruptions:4.483,waiting:75},{eruptions:4,waiting:78},{eruptions:4.117,waiting:79},{eruptions:4.083,waiting:78},{eruptions:4.267,waiting:78},{eruptions:3.917,waiting:70},{eruptions:4.55,waiting:79},{eruptions:4.083,waiting:70},{eruptions:2.417,waiting:54},{eruptions:4.183,waiting:86},{eruptions:2.217,waiting:50},{eruptions:4.45,waiting:90},{eruptions:1.883,waiting:54},{eruptions:1.85,waiting:54},{eruptions:4.283,waiting:77},{eruptions:3.95,waiting:79},{eruptions:2.333,waiting:64},{eruptions:4.15,waiting:75},{eruptions:2.35,waiting:47},{eruptions:4.933,waiting:86},{eruptions:2.9,waiting:63},{eruptions:4.583,waiting:85},{eruptions:3.833,waiting:82},{eruptions:2.083,waiting:57},{eruptions:4.367,waiting:82},{eruptions:2.133,waiting:67},{eruptions:4.35,waiting:74},{eruptions:2.2,waiting:54},{eruptions:4.45,waiting:83},{eruptions:3.567,waiting:73},{eruptions:4.5,waiting:73},{eruptions:4.15,waiting:88},{eruptions:3.817,waiting:80},{eruptions:3.917,waiting:71},{eruptions:4.45,waiting:83},{eruptions:2,waiting:56},{eruptions:4.283,waiting:79},{eruptions:4.767,waiting:78},{eruptions:4.533,waiting:84},{eruptions:1.85,waiting:58},{eruptions:4.25,waiting:83},{eruptions:1.983,waiting:43},{eruptions:2.25,waiting:60},{eruptions:4.75,waiting:75},{eruptions:4.117,waiting:81},{eruptions:2.15,waiting:46},{eruptions:4.417,waiting:90},{eruptions:1.817,waiting:46},{eruptions:4.467,waiting:74}],D=function(){var t=C;return a.a.createElement(s.e,{xDomain:[40,100],yDomain:[1.5,8],getX:function(t){return t.waiting},getY:function(t){return t.eruptions},height:300,width:700},a.a.createElement(s.d,{animation:!0,className:"contour-series-example",style:{stroke:"#125C77",strokeLinejoin:"round"},colorRange:["#79C7E3","#FF9833"],data:t}),a.a.createElement(s.l,{animation:!0,data:t,size:1,color:"#125C77"}),a.a.createElement(s.b,{style:{all:{fill:"#fff"}}}),a.a.createElement(s.p,null),a.a.createElement(s.q,null))};i.default=function(){return a.a.createElement("div",{className:"m-sm-30"},a.a.createElement("div",{className:"mb-sm-30"},a.a.createElement(r.b,{routeSegments:[{name:"Charts",path:"/charts"},{name:"React Vis Charts"}]})),a.a.createElement(r.z,{title:"heatmap with label"},a.a.createElement(O,null)),a.a.createElement("div",{className:"py-3"}),a.a.createElement(r.z,{title:"line chart with many color"},a.a.createElement(l,null)),a.a.createElement("div",{className:"py-3"}),a.a.createElement(r.z,{title:"big base bar series"},a.a.createElement(h,null)),a.a.createElement("div",{className:"py-3"}),a.a.createElement(r.z,{title:"contour map"},a.a.createElement(D,null)),a.a.createElement("div",{className:"py-3"}),a.a.createElement(r.z,{title:"line chart"},a.a.createElement(p,null)),a.a.createElement("div",{className:"py-3"}),a.a.createElement(r.z,{title:"area Chart"},a.a.createElement(c,null)),a.a.createElement("div",{className:"py-3"}),a.a.createElement(r.z,{title:"bar Chart"},a.a.createElement(d,null)))}}}]);