import React from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Route, Switch } from "react-router-dom";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import structure from '../Sidebar/Structure'
import Dashboard from "../../pages/dashboard/Dashboard";
import ChangeLog from "../../pages/dashboard/ChangeLog";
import Project from "../../pages/project/Project";
import License from "../../pages/license/License";
import Wiki from "../../pages/wiki/Wiki";
import Design from "../../pages/design/Design";

function Layout(props:any) {

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Header history={props.history}/>
        <Sidebar structure={structure} />
        <Box sx={{ flexGrow: 1, p: 1 }}>
          <Toolbar />
          <Switch>
            <Route exact path="/app/dashboard/activeCells">
              <Dashboard />
            </Route>
            <Route exact path="/app/dashboard/changeLog">
              <ChangeLog />
            </Route>
            <Route path="/app/project" component={Project} />
            <Route path="/app/license" component={License} />
            <Route path="/app/wiki" component={Wiki} />
            <Route path="/app/design" component={Design} />         
          </Switch>
        </Box>
      </Box>
    </>
  );
}

export default Layout;