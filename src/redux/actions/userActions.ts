export const REGISTER_USER_REQUEST = `REGISTER_USER_REQUEST`;
export const ACTIVATE_USER_REQUEST = `ACTIVATE_USER_REQUEST`;
export const FORGET_PASSWORD_REQUEST = `FORGET_PASSWORD_REQUEST`;
export const RESET_PASSWORD_REQUEST = `RESET_PASSWORD_REQUEST`;
export const REQUEST_AUTHENTICATE_USER = `REQUEST_AUTHENTICATE_USER`;
export const SET_STATE = `SET_STATE`;
export const PROCESSING_AUTHENTICATE_USER = `PROCESSING_AUTHENTICATE_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const SIGN_OUT_USER = `SIGN_OUT_USER`;


export const registerUserRequest = (
  username:string, fullname:string, email:string, password:string, role:string
  ) => ({    
    type: REGISTER_USER_REQUEST,
    username,
    fullname,
    email,
    password,
    role
});

export const activateUserRequest = (token:string) => ({
  type: ACTIVATE_USER_REQUEST,
  token
});

export const forgetPasswordRequest = (email:string) => ({
  type: FORGET_PASSWORD_REQUEST,
  email
});

export const resetPasswordRequest = (newPassword:string, token:string) => ({
  type: RESET_PASSWORD_REQUEST,
  newPassword,
  token
});

export const requestAuthenticateUser = (
  username:string, password:string, history:any
  )=>({
    type:REQUEST_AUTHENTICATE_USER,
    username,
    password,
    history
});

export const setState = (state = {})=>({
  type:SET_STATE,
  state
});

export const processAuthenticateUser = (status = AUTHENTICATING)=>({
    type: PROCESSING_AUTHENTICATE_USER,
    authenticated: status
});

export const signOutUser = () => ({
  type: SIGN_OUT_USER,  
});

