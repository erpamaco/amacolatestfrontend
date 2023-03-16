import React ,{useState}from "react";
import { Grid, Fade } from "@material-ui/core";
// import CustomerBillings from "./ContactDetails";
// import CustomerEmailSender from "./CustomerEmailSender";
import PartyView from "./PartyView";
import CustomerActions from "./CustomerActions";
import PartyInfo from "./PartyInfo";
const PartyDetails = ({ ids }) => {

  const [verify, setVerify] = useState(false);

  return (
    <Fade in timeout={300}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} xs={12}>
          <PartyView verify={verify} setVerify={setVerify} ids={ids} />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <PartyInfo ids={ids} />
          <br></br>
          <CustomerActions setVerif={setVerify} ids={ids} />



        </Grid>




      </Grid>
    </Fade>
  );
};

export default PartyDetails;
