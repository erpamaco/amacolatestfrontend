import React from "react";
import { Grid, Fade } from "@material-ui/core";
import ProductPriceList from "./ProductPriceList";
// import CustomerEmailSender from "./CustomerEmailSender";
import ProductInfos from "./ProductInfo";
import ProductAction from "./ProductAction";

const ProductDetails = () => {
  return (
    <Fade in timeout={300}>
      <Grid container spacing={2}>
        <Grid item lg={4} md={6} xs={12}>
          <ProductInfos />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <ProductPriceList />
        </Grid>
        {/* <Grid item lg={4} md={6} xs={12}>
          <CustomerEmailSender />
        </Grid> */}
        <Grid item lg={4} md={6} xs={12}>
          <ProductAction/>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default ProductDetails;
