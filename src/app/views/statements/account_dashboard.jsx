import React from "react";
import {
  Card,
  TextField,
  MenuItem,
  IconButton,
  Icon,
  Grid,
} from "@material-ui/core";

import InventoryLineChart from './revenuechart';
import DoughnutChart from './profitsharechart';
import { useTheme } from "@material-ui/styles";
import Campaigns from './profitsharechart';

const Analytics2 = () => {
  const theme=useTheme()
  return (
    <div className="analytics m-sm-30">
      <div className="flex justify-between items-center items-center mb-6">
        <h3 className="m-0">Overview</h3>
        <TextField defaultValue="1" variant="outlined" size="small" select>
          <MenuItem value="1">This Month</MenuItem>
          <MenuItem value="2">Last Month</MenuItem>
          <MenuItem value="3">Six Month</MenuItem>
          <MenuItem value="4">Last Year</MenuItem>
        </TextField>
      </div>

      {/* <StatCard3 /> */}

      <Card className="mt-5 mb-6" elevation={3}>
        <div className=" px-4 py-3 mb-6 flex justify-between items-center bg-light-gray">
          <span className="font-medium text-muted">STATISTICS</span>
          <IconButton size="small">
            <Icon>more_horiz</Icon>
          </IconButton>
        </div>
        {/* <ComparisonChart2 height={400} /> */}
      </Card>

      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          {/* <StatCard4 /> */}
          <InventoryLineChart />
        </Grid>
        <Grid item md={6} xs={12}>
       
         
          <InventoryLineChart />
        </Grid>
        
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          {/* <StatCard4 /> */}
        </Grid>
        <Grid item md={6} xs={12}>
          {/* <GaugeProgressCard /> */}
          <Campaigns />
        </Grid>
        
      </Grid>
    
    </div>
  );
};

export default Analytics2;
