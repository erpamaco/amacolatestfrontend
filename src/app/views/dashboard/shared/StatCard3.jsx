import React,{useEffect,useState} from "react";
import { Grid, Card, IconButton, Icon } from "@material-ui/core";
import url from "../../../views/invoice/InvoiceService";
import moment from "moment";

const StatCard3 = () => {
  const[salesCount,setsalesCount]=useState('')
  const[acceptquoteCount,setacceptquoteCount]=useState('')
  const[requestedquoteCount,setrequestedquoteCount]=useState('')
  const[revenueCount,setrevenueCount]=useState('')
  let final=0;
  let pendingCount=0;
  useEffect(() => {
    url.get("invoice").then(({ data }) => {
      setsalesCount(data.length)
    });
    url.get("sales-list").then(({ data }) => {
      
     let res = data.filter((item) => item.state !== 'accept').map((obj) => {
        return obj
      });
      pendingCount=res?.length;
     
      setacceptquoteCount(res.length)
    });
    url.get("quotations-accepted-list").then(({ data }) => {
       
      let final = data?.length;
      setrequestedquoteCount(final+pendingCount)
     
   });
   var today = new Date();
   var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
   var date = new Date(today.getFullYear(), today.getMonth()+1, 0);
  
   url.get("invoice").then(({ data }) => {
       
    var result=data.filter(obj=>(moment(obj.created_at).format('YYYY-MM-DD')>=moment(firstDayOfMonth).format('YYYY-MM-DD') && moment(obj.created_at).format('YYYY-MM-DD')<=moment(date).format('YYYY-MM-DD')));

    var revenue=result.reduce((a,v) =>  a = a + parseFloat(v?.grand_total) , 0 );
    setrevenueCount(revenue)

  });
   

  }, [ ])
  const statList = [
    {
      icon: "receipt",
      amount: requestedquoteCount,
      title: "Quotation Request",
    },
    {
      icon: "hourglass_empty",
      amount: acceptquoteCount,
      title: "Pending Quotation",
    },
    {
      icon: "dvr",
      amount: salesCount,
      title: "Total Sales",
    },
    {
      icon: "monetization_on",
      amount: revenueCount.toLocaleString(undefined,{
        minimumFractionDigits:2
      }),
      title: "Revenue",
    },
    
  ];

  return (
    <div>
      <Grid container spacing={3}>
        {statList.map((item, ind) => (
          <Grid key={item.title} item md={3} sm={6} xs={12}>
            <Card elevation={3} className="p-5 flex">
              <div>
                <IconButton size="small" className="p-2 bg-light-gray">
                  <Icon className="text-muted">{item.icon}</Icon>
                </IconButton>
              </div>
              <div className="ml-4">
                <h3 className="mt-1 text-32">{item.amount.toLocaleString()}</h3>
                <p className="m-0 text-muted">{item.title}</p>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default StatCard3;
