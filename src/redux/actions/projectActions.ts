import {ProjectShape} from '../../helpers/dashBUtil';

export const ALL_PROJECTS_REQUEST = `ALL_PROJECTS_REQUEST`;
export const PROJECT_DATA_REQUEST = `PROJECT_DATA_REQUEST`;
export const SET_PROJECT_STATE = `SET_PROJECT_STATE`;
export const SET_PROJECT_DATA = `SET_PROJECT_DATA`;
export const SET_PROJECT_LIB = `SET_PROJECT_LIB`;
export const SET_PROJECT_CELL = `SET_PROJECT_CELL`;

export const allProjectsRequest = (token: string, history:any) => ({    
    type: ALL_PROJECTS_REQUEST,
    token,
    history
});

export const setProjectState = (projects:string[])=>({
  type: SET_PROJECT_STATE,
  projects
});

export const getProjectData = (token: string, history: any, project:string, lib:string|null, cell:string|null) => ({
  type: PROJECT_DATA_REQUEST,
  token,
  history,
  project,
  lib,
  cell
});

export const setProjectLib = (lib:string[]) => ({
  type: SET_PROJECT_LIB,
  lib
});

export const setProjectCell = (cell:string[]) => ({
  type: SET_PROJECT_CELL,
  cell
});

export const setProjectData = (projects:ProjectShape[]) => ({
  type: SET_PROJECT_DATA,
  projects
});
