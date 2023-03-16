/* eslint-disable no-unused-vars */
import React, { useState, useEffect,setState } from "react";
import {
  Dialog,
  Button,
  Grid,
  IconButton,
  Tooltip,
  TableCell,
  TableHead
} from "@material-ui/core";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";


import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";


import Swal from "sweetalert2";
import url, {getcategories}from "../invoice/InvoiceService"
import { makeStyles } from "@material-ui/core/styles";
import { SettingsInputAntenna } from "@material-ui/icons";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const Annexure = ({ uid, open, handleDialogClose,DataList,onChange }) => {
  const classes = useStyles();
  // const [state, setState] = useState({
  //   name: "abc",
  //   email: "",
  //   phone: "",
  //   balance: "",
  //   age: "",
  //   company: "",
  //   address: "",
  //   isActive: false,
  //   isAlive: true,
  // });
  const [cname, setcname] = useState('');
  const [cdescription, setcdescription] = useState('');
  const [userList, setUserList] = useState([]);
  const [isAlive, setIsAlive] = useState(true);
  const [isAlivecat, setIsAlivecat] = useState('');
  const [loading, setloading] = useState(false);
 
  
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
 
  const columnStyleWithWidth1 = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "50px",
    wordBreak: "break-word",
    wordWrap: "break-word",
    overflowWrap:"break-word",
    hyphens:"auto"
  }


const capitalize_arr =(value) =>{
  let wordsArray = value.split(' ')
    let capsArray = []

    wordsArray.forEach(word => {
        capsArray.push(word[0].toUpperCase() + word.slice(1))
    });

    return capsArray.join(' ')
}
const resetform = () =>{
  setcname('')
  setcdescription('')
}
function handleChange(event) {
  // Here, we invoke the callback with the new value
  onChange(event.target.value);
}
  const handleFormSubmit = () => {
    
   
    handleDialogClose()
  
  };
  
//   const setcatid =()=>{
   

//     handleClose()
//   }

  useEffect(() => {
    
    // url.get(url+"categories").then(({ data }) => {
    //   setUserList(data);

    // });
    // url.get("http://dataqueuesystems.com/amaco/amaco/public/api/products-in-category").then(({ data }) => {
    //   if (isAlive) setUserList(data);
    

    // Object.keys(data).forEach(function(key) {

    //   arr.push(data[key]);
    //   setUserList(arr)
    // });


    // });
   
   
  },[])
 
    // return () => setIsAlive(false);

 

  return (
    <Dialog onClose={handleDialogClose} data={DataList}open={open} className="px-6 pt-2 pb-4" style={{zIndex:1000}} fullWidth={fullWidth}
    maxWidth={maxWidth}>
      <div className="p-6"  >
      <input value={DataList} onChange={handleChange} />
       <Button onClick={()=>handleFormSubmit()}>SAVE</Button>
                {/* <Divider className="mb-2" /> */}
        {/* <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          
        >
        
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
           */}
       
        
      {/* </ExpansionPanelDetails>
      </ExpansionPanel> */}
      </div>
    </Dialog>
    
  );
};

export default Annexure;
