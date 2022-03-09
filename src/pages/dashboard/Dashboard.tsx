import { useReducer, useState } from "react";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CellTable from "./CellTable";
import { connect } from 'react-redux';
import * as dashboardAction from '../../redux/actions/dashboardActions';
import { getCookie } from "../../helpers/auth";
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router-dom";
import useRecursiveTimeout from "../../helpers/intervals";
import PageHeader from "../header/PageHeader";

interface Props {
  viewArr: string[];
  viewRows: {};
  activeDataRequest: (token:string, history:ReturnType<typeof useHistory>) => void;
}

interface StateIntf {
  valueView: string;
  views: string[];
}

interface ActionIntf {
  type: string;
  value: string;
}

const scheduledInterval = parseInt(process.env.REACT_APP_DASHBOARD_INTERVAL!);

function Dashboard({viewArr, viewRows, activeDataRequest}: Props) {

  let history = useHistory();
  const [refresh, setRefresh] = useState(true);

  useRecursiveTimeout(() => {
    const token = getCookie('token');
    refresh && token && activeDataRequest(token, history); 
  } , scheduledInterval);

  const selectReducer = (state:StateIntf, action:ActionIntf) => {
    switch (action.type) {
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
    valueView: "all",
    views: viewArr
  });

  const handleChange = (actionType:string) => (event: SelectChangeEvent<typeof state.valueView>) => {
    dispatch({ type: actionType, value: event.target.value })
  };

  const handleChangeRefresh = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRefresh(event.target.checked);
  };    

  return (
    <>
      <Grid container spacing={3}>
        <PageHeader>Active Cells</PageHeader>
        <Grid item xs={12}>
          <Box display="flex">
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
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch checked={refresh} onChange={handleChangeRefresh} />}
            label={refresh?"Disable Refresh":"Enable Refresh"}
          />  
        </Grid>
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
)(Dashboard);