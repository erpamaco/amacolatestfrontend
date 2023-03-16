import React from "react";
import { Grid, Fade } from "@material-ui/core";
// import ProductPrice from "./ProducrPrice";
import EquipmentInfo from "./EquipmentInfo";
import EquipmentActions from "./EquipmentActions";
import EquipmentFiles from "./EquipmentFiles";

const EquipmentDetails = () => {
  return (
    <Fade in timeout={300}>
      <Grid container spacing={2}>
        <Grid item lg={4} md={6} xs={12}>
          <EquipmentInfo />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <EquipmentFiles />
        </Grid>
        
        <Grid item lg={4} md={6} xs={12}>
          <EquipmentActions />
        </Grid>
      </Grid>
    </Fade>
  );
};

export default EquipmentDetails;
