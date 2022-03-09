import { call, put, select, take } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as dashboardAction from '../actions/dashboardActions';
import { getActiveDashboardState, compileActiveDbViewRows } from '../../helpers/dashBUtil';


const url = process.env.REACT_APP_API_URL;

const getViewArr = (state: any):string[] => state.viewArr;

async function getActiveDashboardApi(token: string) {
  return axios.get(url + `/data/dashboard`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => ({ result:response }))
    .catch(error => ({error}))
}

export function* activeDataRequestSaga(){
  while (true){
      const {token, history} = yield take(dashboardAction.ACTIVE_DATA_REQUEST);
      try {
        const {result, error} = yield call(getActiveDashboardApi, token);
        
        if (result && result.data.length > 0) {
          
          const rows = getActiveDashboardState(result.data);          

          if(rows) {
            const viewArr:string[] = yield select(getViewArr);
            const viewRows = compileActiveDbViewRows(viewArr, rows);
            yield put(dashboardAction.setActiveDashState(viewRows));
          }

        } else {

          if (error.response.data.errors) {
            toast.error(error.response.data.errors);
          } else 
          if (error.response.statusText === 'Unauthorized') {
            toast.error('Session Expired. \nPlease login again.');
            history.push('/login');
          }
                
        }         

      } catch (e) {
          console.log('Failure in activeDataRequestSaga: ',e);
          /* catch block handles failed active Dash request */
          //yield put(dashboardAction.process(dashboardAction.X));
      }
  }
}
