import { useEffect, useReducer } from "react";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CellTable from "./CellTable";
import { connect } from 'react-redux';
import * as dashboardAction from '../../redux/actions/dashboardActions';
import { getCookie } from "../../helpers/auth";
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router-dom";
import PageHeader from "../header/PageHeader";


interface Props {
  viewArr: string[];
  viewRows: {};
  activeDataRequest: (token:string, history:ReturnType<typeof useHistory>) => void;
}

interface StateIntf {
  valueProject: string;
  valueView: string;
  views: string[];
}

interface ActionIntf {
  type: string;
  value: string;
}

// const scheduledInterval = parseInt(process.env.REACT_APP_DASHBOARD_INTERVAL!);
const scheduledInterval = 2000;

function License({viewArr, viewRows, activeDataRequest}: Props) {

  let history = useHistory();

  useEffect(() => {
    const token = getCookie('token');
    
    if (token) {
      activeDataRequest(token, history);
    }
    let interval = setInterval(() => {

      // call DashboardAction
      activeDataRequest(token, history);

    }, scheduledInterval);
    return () => {
      clearInterval(interval);
    }
  }, []);

  const selectReducer = (state:StateIntf, action:ActionIntf) => {
    switch (action.type) {
      case "SELECT_PROJECT":
        return {
          ...state,
          valueProject: action.value
        };
      case "SELECT_VIEW":
        let actionValueView = [];
        if (action.value === 'all') {
          actionValueView.push(...viewArr);    
        } else {
          actionValueView.push(action.value);
        }
        return {
          ...state,
          valueView: action.value,
          views: actionValueView
        };
      default:
        return {
          ...state
        };
    }
  };

  const [state, dispatch] = useReducer(selectReducer, {
    valueProject: "GT_GOBY7_MINI_TC_V1P1",
    valueView: "all",
    views: viewArr
  });

  const handleChange = (actionType:string) => (event: SelectChangeEvent<typeof state.valueView>) => {
    dispatch({ type: actionType, value: event.target.value })
  };

  return (
    <>
      <Grid container spacing={3}>
      <PageHeader>License / Compute</PageHeader>
        <Grid item xs={12}>
          <Box display="flex">
          <FormControl
              sx={{flexGrow: 0}}
          >
            <InputLabel id="id-project-label">Project</InputLabel>
            <Select
              labelId="id-project-label"
              id="id-project-name"
              value={state.valueProject}
              onChange={handleChange("SELECT_PROJECT")}
              input={<OutlinedInput label="Project" />}
            >
              <MenuItem value={"GT_GOBY7_MINI_TC_V1P1"}>GT_GOBY7_MINI_TC_V1P1</MenuItem>
            </Select>
          </FormControl>
          <FormControl
              sx={{flexGrow: 0, mx: 2}}
          >
            <InputLabel id="id-view-label">View</InputLabel>
            <Select
              labelId="id-view-label"
              id="id-view-name"
              value={state.valueView}
              onChange={handleChange('SELECT_VIEW')}
              input={<OutlinedInput label="View" />}
              defaultValue="all"
            >
              <MenuItem value={"all"}>ALL</MenuItem>
              {viewArr.map((name) => (
                <MenuItem key={name} value={name}>
                  {name.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>          
          </Box>
        </Grid>
        {state.views.map(viewName => (
            <Grid key={uuidv4()} item xs={12}>
              <Paper>
                <CellTable title={viewName} viewRows={viewRows}/>
              </Paper>
            </Grid>
        ))}

      </Grid>
    </>
  )
}

const mapStateToProps = (state:any)=>{
  const viewArr = state.viewArr;
  const viewRows = state.dashboardData.viewRows;

  return {
    viewArr,
    viewRows
  }  
};

const mapDispatchToProps = (dispatch:any)=>({
  activeDataRequest(token:string, history:ReturnType<typeof useHistory>) {
      dispatch(dashboardAction.activeDataRequest(token, history));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(License);