import React, { useEffect, useState } from "react";
import { Grid, Card, Icon, IconButton, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';
import url from '../../invoice/InvoiceService';

const useStyles = makeStyles(({ palette, ...theme }) => ({
  icon: {
    fontSize: "44px",
    opacity: 0.6,
    color: palette.primary.main,
  },
}));



const StatCards = ({years,eDate}) => {
 
  const [salesCount, setsalesCount] = useState('')
  const [pendingquoteCount, setpendingquoteCount] = useState('')
  const [requestedquoteCount, setrequestedquoteCount] = useState('')
  const [revenueCount, setrevenueCount] = useState('')
  let final = 0;
  let pendingCount = 0;
  const classes = useStyles();
  const [rec,setRec] = useState(0.00)
  const [po,setPo] = useState(0.00)
  const [expense,setExpense] = useState(0.00)

  useEffect(()=>{
    if(eDate.length > 0){
      console.log('dsaCeeDate')
      var today = new Date();
      var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      
      url.get("stateCard").then(({ data }) => {
        setsalesCount(data?.invoice?.filter(obj => (obj.div_id == localStorage.getItem('division') && obj.approve == '1' && moment(obj.issue_date).format('MMM YYYY')==eDate)).length)
        
        var exp = data?.expense?.filter(obj => obj.div_id == localStorage.getItem('division')&&moment(obj.issue_date).format('MMM YYYY')==eDate)?.reduce((a, v) => a = a + parseFloat(v?.amount), 0);
        setExpense(exp)
        
        
        let res = data?.salesList?.filter((item) => item.status == 'New'  && item.div_id == localStorage.getItem('division')&& moment(item.quote_date).format('MMM YYYY')==eDate).map((obj) => {
          return obj
        });
        pendingCount = res?.length;
        setpendingquoteCount(res.length)
  
        
       
        let final = data?.acceptedList?.filter(obj => obj.div_id == localStorage.getItem('division')&& obj.status !== 'trash'&& moment(obj.quotation_date).format('MMM YYYY')==eDate)?.length;
        setrequestedquoteCount(final + pendingCount)
  
        var result = data?.salesTax?.filter(obj => obj.delete_status == 0 && obj.approve == '1' && (moment(obj.issue_date).format('MMM YYYY') >= eDate));
  
        var revenue = result?.filter(obj => obj.div_id == localStorage.getItem('division')&&moment(obj.created_at).format('MMM YYYY')==eDate)?.reduce((a, v) => a = a + parseFloat(v?.grand_total), 0);
        setrevenueCount(revenue)
        
        setRec(data.rec?.filter(obj => obj.division_id == localStorage.getItem('division') && (moment(obj.issue_date).format('MMM YYYY') == eDate)).reduce((total, currentValue)=> total = parseFloat(total) + parseFloat(currentValue.paid_amount),0))
        setPo(data.po?.filter(obj => obj.delete == 0 && obj.div_id == localStorage.getItem('division') && (moment(obj.created_at).format('MMM YYYY') == eDate)).reduce((total, currentValue)=> total = parseFloat(total) + parseFloat(currentValue.net_amount),0))
        
  
  
      });
  
    
      var date = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
    }
  },[eDate])

  useEffect(() => {
    var today = new Date();
    var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    
    url.get("stateCard").then(({ data }) => {
      setsalesCount(data?.invoice?.filter(obj => (obj.div_id == localStorage.getItem('division') && obj.approve == '1' && moment(obj.issue_date).format('YYYY')==years)).length)
      
      var exp = data?.expense?.filter(obj => obj.div_id == localStorage.getItem('division')&&moment(obj.issue_date).format('YYYY')==years)?.reduce((a, v) => a = a + parseFloat(v?.amount), 0);
      setExpense(exp)
      
      
      let res = data?.salesList?.filter((item) => item.status == 'New'  && item.div_id == localStorage.getItem('division')&& moment(item.quote_date).format('YYYY')==years).map((obj) => {
        return obj
      });
      pendingCount = res?.length;
      setpendingquoteCount(res.length)

      
     
      let final = data?.acceptedList?.filter(obj => obj.div_id == localStorage.getItem('division')&& obj.status !== 'trash'&& moment(obj.quotation_date).format('YYYY')==years)?.length;
      setrequestedquoteCount(final + pendingCount)

      var result = data?.salesTax?.filter(obj => obj.delete_status == 0 && obj.approve == '1' && (moment(obj.issue_date).format('YYYY') >= years));

      var revenue = result?.filter(obj => obj.div_id == localStorage.getItem('division')&&moment(obj.created_at).format('YYYY')==years)?.reduce((a, v) => a = a + parseFloat(v?.grand_total), 0);
      setrevenueCount(revenue)

      setRec(data.rec?.filter(obj => obj.division_id == localStorage.getItem('division') && (moment(obj.issue_date).format('YYYY') == years)).reduce((total, currentValue)=> total = parseFloat(total) + parseFloat(currentValue.paid_amount),0))
      setPo(data.po?.filter(obj => obj.delete == 0 && obj.div_id == localStorage.getItem('division') && (moment(obj.created_at).format('YYYY') == years)).reduce((total, currentValue)=> total = parseFloat(total) + parseFloat(currentValue.net_amount),0))
      


    });

  
    var date = new Date(today.getFullYear(), today.getMonth() + 1, 0);



    // url.get("invoice").then(({ data }) => {
    //   setsalesCount(data.filter(obj => obj.div_id == localStorage.getItem('division')).length)
    // });
    // url.get("sales-list").then(({ data }) => {

    //   let res = data.filter((item) => item.state !== 'accept' && item.div_id == localStorage.getItem('division')).map((obj) => {
    //     return obj
    //   });

    //   pendingCount = res?.length;

    //   setpendingquoteCount(res.length)
    // });
    // url.get("quotations-accepted-list").then(({ data }) => {

    //   let final = data?.filter(obj => obj.div_id == localStorage.getItem('division'))?.length;
    //   setrequestedquoteCount(final + pendingCount)

    // });
   
    // url.get("salesTax").then(({ data }) => {

    //   var result = data.filter(obj => (moment(obj.created_at).format('YYYY-MM-DD') > moment(firstDayOfMonth).format('YYYY-MM-DD')));

    //   var revenue = result?.filter(obj => obj.div_id == localStorage.getItem('division'))?.reduce((a, v) => a = a + parseFloat(v?.grand_total), 0);
    //   setrevenueCount(revenue)

    // });


  }, [localStorage.getItem('division'),years])

  return (
    <Grid container spacing={3} className="mb-3">
         <Grid item xs={12} md={4}>
        <Card
          className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
          elevation={6}
        >
          <div className="flex items-center">
            <Icon className={classes.icon}>published_with_changes</Icon>
            <div className="ml-3">
              <small className="text-muted">TOTAL SALES</small>
              <h6 className="m-0 mt-1 text-primary font-medium">{revenueCount.toLocaleString(undefined, {
                minimumFractionDigits: 2
              })}</h6>
            </div>
          </div>
          {/* <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip> */}
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card
          className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
          elevation={6}
        >
          <div className="flex items-center">
            <Icon className={classes.icon}>credit_score</Icon>
            <div className="ml-3">
              <small className="text-muted"> TOTAL RECEIPTS</small>
              <h6 className="m-0 mt-1 text-primary font-medium">{rec?.toLocaleString(undefined, {
                minimumFractionDigits: 2
              })}</h6>
            </div>
          </div>
          {/* <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip> */}
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card
          className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
          elevation={6}
        >
          <div className="flex items-center">
            <Icon className={classes.icon}>monetization_on</Icon>
            <div className="ml-3">
              <small className="text-muted">TOTAL EXPENSES</small>
              <h6 className="m-0 mt-1 text-primary font-medium">
                {expense.toLocaleString(undefined, {
                minimumFractionDigits: 2
              })}
              </h6>
            </div>
          </div>
          {/* <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip> */}
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card
          className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
          elevation={6}
        >
          <div className="flex items-center">
            <Icon className={classes.icon}>receipt</Icon>
            <div className="ml-3">
              <small className="text-muted">QUOTED QUOTATION</small>
              <h6 className="m-0 mt-1 text-primary font-medium">{requestedquoteCount}</h6>
            </div>
          </div>
          {/* <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip> */}
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card
          className="flex flex-wrap justify-between align-center p-sm-24 bg-paper"
          elevation={6}
        >
          <div className="flex items-center">
            <Icon className={classes.icon}>hourglass_empty</Icon>
            <div className="ml-3">
              <small className="text-muted line-height-1">
                PENDING QUOTATION
              </small>
              <h6 className="m-0 mt-1 text-primary font-medium">{pendingquoteCount}</h6>
            </div>
          </div>
          {/* <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip> */}
        </Card>
      </Grid>
   
    
      <Grid item xs={12} md={4}>
        <Card
          className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
          elevation={6}
        >
          <div className="flex items-center">
            <Icon className={classes.icon}>shopping_cart_checkout</Icon>
            <div className="ml-3">
              <small className="text-muted"> PURCHASE ORDERS</small>
              <h6 className="m-0 mt-1 text-primary font-medium">{po.toLocaleString(undefined, {
                minimumFractionDigits: 2
              })}</h6>
            </div>
          </div>
          {/* <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip> */}
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatCards;
