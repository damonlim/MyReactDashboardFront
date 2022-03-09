import { call, put, select, take } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as projectAction from '../actions/projectActions';
import { extractProjectsFromId, extractLibFromResult, extractCellFromResult } from '../../helpers/dashBUtil';


const url = process.env.REACT_APP_API_URL;

async function getAllProjects(token: string) {
  return axios.get(url + `/data/projects`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => ({ result:response }))
    .catch(error => ({error}))
}

export function* getAllProjectsSaga() {
  while(true) {
    const {token, history} = yield take(projectAction.ALL_PROJECTS_REQUEST);
    try {

      const {result, error} = yield call(getAllProjects, token);

      if (result && result.data.length > 0) {

        const projects = extractProjectsFromId(result.data);

        if (projects) {
          yield put(projectAction.setProjectState(projects));
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
    } catch(error) {
      console.error('getAllProjectsSaga error: ', error);
    }
  }
}

async function getProjectData(token: string, project: string, lib: string|null, cell: string|null) {
  return axios.post(url + `/data/projectData`, {
    project,
    lib,
    cell
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => ({ result:response }))
    .catch(error => ({error}))
}

export function* getProjectDataSaga() {
  while(true) {
    const {token, history, project, lib, cell} = yield take(projectAction.PROJECT_DATA_REQUEST);
    try {

      const {result, error} = yield call(getProjectData, token, project, lib, cell);

      if (result && result.data.length > 0) {
        
        if (!lib) {
          // If the lib input is empty, then populate the library data
          const libraries = extractLibFromResult(result.data);
          yield put(projectAction.setProjectLib(libraries!));

        }

        // Update the Cell selection from the returned result
        const cells = extractCellFromResult(result.data);
        console.log('cells: ', cells);
        yield put(projectAction.setProjectCell(cells!));

        yield put(projectAction.setProjectData(result.data));

      } else {
        
        if (error.response!.data!.errors) {
          toast.error(error.response.data.errors);
        } else 
        if (error.response!.statusText === 'Unauthorized') {
          toast.error('Session Expired. \nPlease login again.');
          history.push('/login');
        }
              
      }
    } catch(error) {
      console.error('getProjectDataSaga error: ', error);
    }
  }
}