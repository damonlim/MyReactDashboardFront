export const ACTIVE_DATA_REQUEST = `ACTIVE_DATA_REQUEST`;
export const SET_ACTIVE_DASHBOARD_STATE = `SET_ACTIVE_DASHBOARD_STATE`;

export const activeDataRequest = (token: string, history:any) => ({    
    type: ACTIVE_DATA_REQUEST,
    token,
    history
});

export const setActiveDashState = (viewRows:any)=>({
  type:SET_ACTIVE_DASHBOARD_STATE,
  viewRows
});
