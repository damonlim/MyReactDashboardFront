import { combineReducers } from "redux";
import user from "./userReducer";
import dashboardData from "./dashboardReducer";
import viewArr from "./viewReducer";
import projectData from "./projectReducer";


const rootReducer = combineReducers({
  user,
  dashboardData,
  viewArr,
  projectData
});

export default rootReducer;