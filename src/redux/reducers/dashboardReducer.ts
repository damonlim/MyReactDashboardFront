import * as dashboardAction from "../actions/dashboardActions";
import initialState from "./initialState";


export default function dashboardReducer(state = initialState.dashboard, action:any) {
  switch (action.type) {
    case dashboardAction.ACTIVE_DATA_REQUEST:
      return state;
    case dashboardAction.SET_ACTIVE_DASHBOARD_STATE:
      return {viewRows:action.viewRows};
    default:
      return state;
  }
}