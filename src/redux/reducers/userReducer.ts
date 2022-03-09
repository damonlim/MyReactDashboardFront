import * as userAction from "../actions/userActions";
import initialState from "./initialState";


export default function userReducer(state = initialState.user, action:any) {
  switch (action.type) {
    case userAction.SET_STATE:
      return action.state;
    case userAction.REQUEST_AUTHENTICATE_USER:
      return { ...state, authenticated:userAction.AUTHENTICATING };
    case userAction.PROCESSING_AUTHENTICATE_USER:
      return { ...state, authenticated:action.authenticated };
    case userAction.SIGN_OUT_USER:
      return { ...initialState.user }
    default:
      return state;
  }
}