import React,{useState,useEffect} from "react";
import {
  Card,
  TextField,
  MenuItem,
  IconButton,
  Icon,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  Tooltip

} from "@material-ui/core";
import { Link,useHistory } from "react-router-dom";
import MemberEditorDialog from "./accountSummary";
import clsx from "clsx";
import Swal from "sweetalert2";
import { useTheme } from "@material-ui/styles";
import ReactEcharts from "echarts-for-react";
// import StatCard3 from "./shared/StatCard3";
import url,{getpaidDivision,divisionId, navigatePath} from "../../views/invoice/InvoiceService";
import DoughnutChart from "../charts/echarts/Doughnut";
// import ComparisonChart2 from "../charts/echarts/ComparisonChart2";
// import StatCard4 from "./shared/StatCard4";
// import GaugeProgressCard from "./shared/GuageProgressCard";
// import FollowerCard from "./shared/FollowerCard";
// import FollowerCard2 from "./shared/FollowerCard2";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(({ palette, ...theme }) => ({
  productTable: {
    "& small": {
      height: 15,
      width: 50,
      borderRadius: 500,
      boxShadow:
        "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
    },
    "& td": {
      borderBottom: "none",
    },
    "& td:first-child": {
      paddingLeft: "16px !important",
    },
  },
}));


const Dashbard = () => {
  const classes = useStyles();
  const [PersonalAccount,setPersonalAccount]=useState([]);
  const [PaymentAccount,setPaymentAccount]=useState([]);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [isAlive, setisAlive] = useState(false);
  const [catid, setcatid] = useState('');

  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);
  const theme = useTheme();
  const handleDialogClose = () => {
    setcatid(null)
    setShouldOpenEditorDialog(false);

  };
  useEffect(() => {
  // updateSidebarMode({ mode: "close" })
  document.title = "Request for quoatation - Amaco";
  getpaidDivision().then(({ data }) => {
     
    setPersonalAccount(data.filter(obj=>obj.type=="personal").map((item)=>{
        return item
    }));
  });
  url.get("payment-account").then(({ data }) => {
     
    setPaymentAccount(data);
  });
  return setisAlive(true)
},[isAlive])
const InvestMent=(id,uid,amount,divid)=>{

  Swal.fire({
    title: 'Are you sure?',
    text: 'You want to convert Investments!',
    icon: 'danger',
    showCancelButton: true,
    confirmButtonText: 'Yes,!',
    icon: 'warning',
    cancelButtonText: 'No,'
  }).then((result) => {
    if (result.value) {
      let obj={
        'payment_account_id':id,
        'user_id':uid,
        'balance':Math.abs(amount),
        'received_by':divid
      }
      url.post("InvestmentsDetails",obj).then(({ data }) => {
         
       setisAlive(false)
      });
  
      

    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        icon:'error',
        text:'Cancelled',
        // 'Your Quotation is safe :)',
        
      })
    }
  })
  
}
  const statList = [
    {
      icon: "receipt",
      amount: 23,
      title: "New Quotation Request",
    },
    {
      icon: "hourglass_empty",
      amount: 12,
      title: "Pending Quotation",
    },
    {
      icon: "shopping_cart",
      amount: 10,
      title: "Sales Orders",
    },
    {
      icon: "dvr",
      amount: 30,
      title: "Todays Sale",
    },
  ];
  return (
    <div className="analytics m-sm-30">
      <div className="flex justify-between items-center items-center mb-6">

        <h3 className="m-0">PERSONAL ACCOUNT</h3>
        {/* <TextField defaultValue="1" variant="outlined" size="small" select>
          <MenuItem value="1">This Month</MenuItem>
          <MenuItem value="2">Last Month</MenuItem>
          <MenuItem value="3">Six Month</MenuItem>
          <MenuItem value="4">Last Year</MenuItem>
        </TextField> */}
      </div>
      <div className="m-8 pt-4 pl-8 pr-4 ">
     
          
            



            <Grid container className={classes.root} spacing={3}>
      
     
        
      {PersonalAccount.map((item, ind) => (
        
        <Card
      className="flex flex-wrap justify-between items-center  p-sm-24 mt-4  mr-3 bg-paper"
      elevation={6}
     style={{width:308,border:"1px solid #000"}}
      
    >
      <div className="flex items-center">
        {/* <Icon className={classes.icon}>group</Icon> */}
        <div className="ml-3">
          <h5 className="">
            {item.name}
            </h5>
            {/* className="m-0 mt-1 text-primary font-medium" */}
            <div style={{clear:'both'}}>
            {parseFloat(item.balance) < 0 ?<><h6  style={{float: 'left'}} className="m-0 mt-1 mb-1 text-green font-medium">
            {parseFloat(item.balance).toLocaleString(undefined,{
                                minimumFractionDigits:2
                              })} SAR 
            </h6>
            <br />
            <Tooltip title="Convert to Investment">
            <small className="border-radius-4 bg-primary text-white px-2 py-2px" style={{cursor:'pointer'}} onClick={()=>InvestMent(item.id,item.user_id,item.balance,divisionId)}>
             {/* <Icon size="small"  style={{fontSize:16,paddingTop:3,cursor:'pointer'}} >cached</Icon> */}
             Investment
         </small>
         </Tooltip>
         </>
            :<><h6  style={{float: 'left'}} className="m-0  text-primary font-medium">
            {parseFloat(item.balance).toLocaleString(undefined,{
                                minimumFractionDigits:2
                              })} SAR 
            </h6>
            <br />
            {/* <small className="border-radius-4 bg-primary text-white px-4 py-4px">
             <Icon size="small"  style={{fontSize:16,paddingTop:3}}>cached</Icon>Investment
         </small> */}
            </>}
            
            
        </div>
        
        </div>
      </div>
      <Tooltip title="View Details" placement="top">
      <Link to={navigatePath+`/account/${item.id}`}>
          <Icon color="primary">arrow_right_alt</Icon>
          
      </Link>
      </Tooltip>
     
      {/* <Tooltip title="Account Summary" placement="top">
  
          <Icon color="secondary" onClick={()=>setShouldOpenEditorDialog(true)}>arrow_right_alt</Icon>
          
      
      </Tooltip> */}

    </Card>

        ))}
  </Grid>
  

     
      
  {shouldOpenEditorDialog && (
        <MemberEditorDialog
          handleClose={handleDialogClose}
          open={shouldOpenEditorDialog}
          catid={catid}
         

        />
      )}
      
        

    
  </div>
  </div>

    
    
   
  







            



   





      
     

  
  );
  
};

const productList = [
  {
    imgUrl: "/assets/images/products/headphone-2.jpg",
    name: "earphone",
    price: 100,
    available: 15,
  },
  {
    imgUrl: "/assets/images/products/headphone-3.jpg",
    name: "earphone",
    price: 1500,
    available: 30,
  },
  {
    imgUrl: "/assets/images/products/iphone-2.jpg",
    name: "iPhone x",
    price: 1900,
    available: 35,
  },
  {
    imgUrl: "/assets/images/products/iphone-1.jpg",
    name: "iPhone x",
    price: 100,
    available: 0,
  },
  {
    imgUrl: "/assets/images/products/headphone-3.jpg",
    name: "Head phone",
    price: 1190,
    available: 5,
  },
];

export default Dashbard;
