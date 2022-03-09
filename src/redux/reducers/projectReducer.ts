import * as projectAction from "../actions/projectActions";
import initialState from "./initialState";


export default function projectReducer(state = initialState.projectInfo, action:any) {
  switch (action.type) {
    case projectAction.ALL_PROJECTS_REQUEST:
      return state;
    case projectAction.SET_PROJECT_STATE:
      return {...state, projects: action.projects};
    case projectAction.SET_PROJECT_LIB:
      return {...state, libs: action.lib};
    case projectAction.SET_PROJECT_CELL:
      return {...state, cells: action.cell};
    case projectAction.SET_PROJECT_DATA:
      return {...state, projectData: action.projects};
    default:
      return state;
  }
}