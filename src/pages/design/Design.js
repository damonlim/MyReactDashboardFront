import React from "react";
import { Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import DesignHeader from "./DesignHeader";
import ServerResourceTable from "./ServerResourceTable";
import Total5mLoadChart from "./chart/Total5mLoad";
import Widget from "../../components/Widget/Widget";
import classNames from "classnames";
import PageHeader from "../header/PageHeader";


function Dashboard() {

  const [dataSet, setDataSet] = React.useState('frc');
  const handleChange = (event, newValue) => {
    setDataSet(newValue)
  }

  //chart titles
  const total5mTitle = `node exporter: Overall total 5m Load & average CPU used %`;
  const totalMemoryTitle = `node exporter: Overall total memory & average memory used %`;
  const totalDiskTitle = `node exporter: Overall total disk & average disk used %`;


  return (
    <>
      <PageHeader>Design Management System</PageHeader>
      <DesignHeader dataSet={dataSet} handleChange={handleChange}/>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper>
            <ServerResourceTable />
          </Paper>
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <Paper>
            <Typography
              variant="h12"
              color="text"
            >
              {total5mTitle}
            </Typography>            
            <Total5mLoadChart />
          </Paper>
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <Paper>
          <Typography
              variant="h12"
              color="text"
            >
              {totalMemoryTitle}
            </Typography>            
            {/* <Total5mLoadChart /> */}
          </Paper>
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <Paper>
          <Typography
              variant="h12"
              color="text"
            >
              {totalDiskTitle}
            </Typography>            
            {/* <Total5mLoadChart /> */}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
          <Total5mLoadChart />
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard;