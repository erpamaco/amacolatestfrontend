(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[296],{3536:function(e,a,t){"use strict";t.r(a);t(7);var n=t(18),s=t(0),l=t.n(s),r=t(52),c=t(153),m=t.n(c),o=t(1389),i=t(613),u=t(692),d=t(1449),p=(t(2036),t(70)),b=t(4);a.default=function(){var e=Object(s.useState)({date:new Date}),a=Object(n.a)(e,2),t=a[0],c=(a[1],Object(p.a)().user),w=Object(s.useState)(""),f=Object(n.a)(w,2),v=f[0],E=f[1],N=Object(s.useState)(""),O=Object(n.a)(N,2),g=O[0],j=O[1],x=Object(s.useState)(""),h=Object(n.a)(x,2),y=h[0],C=h[1],S=Object(s.useState)(""),P=Object(n.a)(S,2),z=P[0],k=P[1],J=function(){j(""),C(""),E(""),k("")};t.username,t.firstName,t.creditCard,t.mobile,t.password,t.confirmPassword,t.gender,t.date,t.email;return l.a.createElement("div",null,l.a.createElement(o.a,{className:"m-sm-30 p-25",elevation:20},l.a.createElement("div",{className:"max-w-600 mx-auto"},l.a.createElement(r.ValidatorForm,{onSubmit:function(e){var a={id:c.id,password:v,newpassword:g};g==y?b.g.post("old-password-new",a).then((function(e){1==e.data.msg?(m.a.fire({title:"Success",type:"success",icon:"success",text:"Password changed successfully."}),J()):k("Old password is Incorrect")})):k("New password doesn't match")},autoComplete:"off",width:"200px"},l.a.createElement(i.a,{className:"w-full mb-4",label:"Old Password",variant:"outlined",onChange:function(e){return E(e.target.value)},type:"textarea",name:"name",size:"small",value:v}),l.a.createElement(i.a,{className:"w-full mb-4",label:"New Password",variant:"outlined",onChange:function(e){return j(e.target.value)},type:"textarea",name:"cname",size:"small",value:g}),l.a.createElement(i.a,{className:"w-full mb-4",label:"Confirm Password",autoComplete:"none",onChange:function(e){return C(e.target.value)},name:"mobno",type:"text",size:"small",variant:"outlined",value:y,fullWidth:!0}),z&&l.a.createElement("p",{className:"text-error"},z),l.a.createElement("div",{className:"flex items-center "},l.a.createElement(u.a,{variant:"outlined",color:"primary",type:"submit"},l.a.createElement(d.a,null,"save")," Save"),l.a.createElement(u.a,{color:".bg-green",variant:"outlined",className:"ml-4",onClick:J},l.a.createElement(d.a,null,"loop"),l.a.createElement("span",{className:"pl-2 capitalize"},"reset")),l.a.createElement("div",{className:"flex justify-between items-center"}))))))}}}]);