import { useEffect, useReducer, useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import ProjectTable from "./ProjectTable";
import { connect } from 'react-redux';
import * as dashboardAction from '../../redux/actions/dashboardActions';
import * as projectAction from '../../redux/actions/projectActions';
import { getCookie } from "../../helpers/auth";
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router-dom";
import { ProjectShape } from '../../helpers/dashBUtil';
import PageHeader from "../header/PageHeader";


interface Props {
  projects: string[];
  libraries: string[];
  cells: string[];  
  projectData: ProjectShape[];
  getAllProjects: (token:string, history:ReturnType<typeof useHistory>) => void;
  getProjectData: (token:string, history:ReturnType<typeof useHistory>, project:string, lib:string|null, cell:string|null) => void;
}

interface StateIntf {
  valueProject: string;
  valueLibrary: string | null;
  valueCell: string | null;
}

interface ActionIntf {
  type: string;
  value: string;
}


function Project({projects, libraries, cells, projectData, getAllProjects, getProjectData}: Props) {

  let history = useHistory();

  useEffect(() => {
    const token = getCookie('token');
    getAllProjects(token, history);
  }, []); // eslint-disable-line


  const selectReducer = (state:StateIntf, action:ActionIntf) => {
    switch (action.type) {
      case "SELECT_PROJECT":
        return {
          ...state,
          valueProject: action.value
        };
      case "SELECT_LIBRARY":
        return {
          ...state,
          valueLibrary: action.value
        };
      case "SELECT_CELL":
        return {
          ...state,
          valueCell: action.value
        };
      default:
        return {
          ...state
        };
    }
  };

  const [state, dispatch] = useReducer(selectReducer, {
    valueProject: "",
    valueLibrary: "",
    valueCell: ""
  });

  const handleProjectChange = (event: React.SyntheticEvent<Element, Event>, value: string|null) => {
    getProjectData(getCookie('token'), history, value!, null, null);
    //Reset the library selection to all
    state.valueLibrary = "";
    state.valueCell = "";
    if (value) {
      dispatch({ type: 'SELECT_PROJECT', value });
    }
  };

  const handleLibraryChange = (event: React.SyntheticEvent<Element, Event>, value: string|null) => {  
    state.valueLibrary = value; 
    getProjectData(getCookie('token'), history, state.valueProject, value, null );
    if (value) {
      dispatch({ type: 'SELECT_LIBRARY', value });
    }
  };

  const handleCellChange = (event: React.SyntheticEvent<Element, Event>, value: string|null) => {  
    state.valueCell = value; 
    getProjectData(getCookie('token'), history, state.valueProject, state.valueLibrary, value );
    if (value) {
      dispatch({ type: 'SELECT_CELL', value });
    }
  };


  return (
    <>
      <Grid container spacing={3}>
        <PageHeader>Project</PageHeader>
        <Grid item xs={12}>
          <Box display="flex">
            <Autocomplete
              sx={{flexGrow: 0, width: 300, mx: 1}}
              value={state.valueProject}
              id="id-project-name"
              options={projects}
              onChange={handleProjectChange}
              renderInput={(params) => <TextField {...params} label="Project" />}
            />
            <Autocomplete
              sx={{flexGrow: 0, width: 200, mx: 1}}
              disabled={state.valueProject.length === 0}
              value={state.valueLibrary}
              id="id-library-name"
              options={libraries}
              onChange={handleLibraryChange}
              renderInput={(params) => <TextField {...params} label="Library" />}
            />
            <Autocomplete
              sx={{flexGrow: 0, width: 200, mx: 1}}
              disabled={state.valueProject.length === 0}
              value={state.valueCell}
              id="id-cell-name"
              options={cells}
              onChange={handleCellChange}
              renderInput={(params) => <TextField {...params} label="Cell" />}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Paper>
            <ProjectTable key={uuidv4()} projectData={projectData}/>
          </Paper>
        </Grid>

      </Grid>
    </>
  )
}

const mapStateToProps = (state:any)=>{
  const projects = state.projectData.projects;
  const libraries = state.projectData.libs;
  const cells = state.projectData.cells;
  const projectData = state.projectData.projectData;

  return {
    projects,
    libraries,
    cells,
    projectData
  }  
};

const mapDispatchToProps = (dispatch:any)=>({
  activeDataRequest(token:string, history:ReturnType<typeof useHistory>) {
      dispatch(dashboardAction.activeDataRequest(token, history));
  },
  getAllProjects(token:string, history:ReturnType<typeof useHistory>) {
    dispatch(projectAction.allProjectsRequest(token, history));
  },
  getProjectData(token:string, history:ReturnType<typeof useHistory>, project:string, lib:string|null, cell:string|null) {
    dispatch(projectAction.getProjectData(token, history, project, lib, cell));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);