import React from "react";
import { Grid, Paper, Tab, Tabs } from "@mui/material";


export default function DesignHeader({dataSet, handleChange}) {

  return(
    <Paper sx={{mb:1}}>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
        wrap={'nowrap'}
        style={{ overflowX: 'auto' }}        
      >
        <Tabs
          value={dataSet}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          style={{ marginLeft: 0 }}          
        >
          <Tab
            value="frc"
            label="FRC"
            />
            <Tab
              value="lco" 
            label="LCO"
            />
            <Tab
              value="pun" 
            label="PUN"
            />
            <Tab
              value="sho" 
            label="SHO"
            />
        </Tabs>
      </Grid>
    </Paper>    
  );
}