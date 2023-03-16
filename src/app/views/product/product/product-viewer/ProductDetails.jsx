import React from "react";
import { Grid, Fade } from "@material-ui/core";
import ProductPrice from "./ProducrPrice";
import ProductInfo from "./ProductInfo";
import ProductActions from "./ProductActions";

const ProductDetails = () => {
  return (
    <Fade in timeout={300}>
      <Grid container spacing={2}>
        <Grid item lg={4} md={6} xs={12}>
          <ProductInfo />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <ProductPrice />
        </Grid>
        
        <Grid item lg={4} md={6} xs={12}>
          <ProductActions />
        </Grid>
      </Grid>
    </Fade>
  );
};

export default ProductDetails;
