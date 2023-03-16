import React from "react";
import { Grid, Fade } from "@material-ui/core";
import CustomerInfo from "./CustmerInfo";
import CustomerActions from "./CustomerActions";
import PartyInfo from "./PartyInfo";
const CompanyDetails = () => {
  return (
    <Fade in timeout={300}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} xs={12}>
          <CustomerInfo />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <PartyInfo />
          <br></br>
          <CustomerActions  />
           
         
        
        </Grid>
      
       
     
         
      </Grid>
    </Fade>
  );
};

export default CompanyDetails;
