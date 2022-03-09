import { call, take, put } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as userAction from '../actions/userActions';


const url = process.env.REACT_APP_API_URL;

export function* userRegistrationSaga() {
  while (true) {
    const { username, fullname, email, password, role } = 
      yield take(userAction.REGISTER_USER_REQUEST);
    try {
      const result = yield axios.post(url + `/register`, {
        username, fullname, password, email, role
      });
      if (result.data.errors) {
        toast.error(result.data.errors);
      } else {
        toast.success(result.data.message);
      }
      
    } catch (e) {
      console.log('ERROR in userRegistrationSaga ',e);
      toast.error(e.response.data.error);
    }
  }
}

export function* userActivationSaga() {
  while (true) {
    const { token } = 
      yield take(userAction.ACTIVATE_USER_REQUEST);
    try {
      const result = yield axios.post(url + `/activation`, {
        token
      });
      if (result.data.message) {
        toast.success(result.data.message);
      } else {
        console.log(result);
        toast.error('Activation Failed: ', result);
      }
    } catch (e) {
      console.log('ERROR in userActivationSaga ',e);
      toast.error(e.response.data.error);
    }
  }
}

export function* forgetPasswordSaga() {
  while (true) {
    const { email } = yield take(userAction.FORGET_PASSWORD_REQUEST);
    try {
      const result = yield axios.put(url + `/forgetpassword`, {
        email
      });
      if (result.data.message) {
        toast.success(result.data.message);
      } else {
        console.log(result);
        toast.error('Forget password request failed: ', result);
      }
    } catch (e) {
      console.log('ERROR in forgetPasswordSaga ',e);
      toast.error(e.response.data.error);
    }
  }
}

export function* resetPasswordSaga() {
  while (true) {
    const { newPassword, token } = yield take(userAction.RESET_PASSWORD_REQUEST);
    try {
      const result = yield axios.put(url + `/resetpassword`, {
        newPassword,
        resetPasswordLink: token
      });
      if (result.data.message) {
        toast.success(result.data.message);
      } else {
        console.log(result);
        toast.error('Reset password request failed: ', result);
      }
    } catch (e) {
      console.log('ERROR in resetPasswordSaga ',e);
      toast.error(e.response.data.error);
    }
  }
}

function postLoginApi({username, password}) {
  return axios.post(url + `/login`,{username,password})
    .then(response => ({ result:response }))
    .catch(error => ({error}))
}

export function* userAuthenticationSaga(){
  while (true){
      const {username, password, history} = yield take(userAction.REQUEST_AUTHENTICATE_USER);
      try {
        const {result, error} = yield call(postLoginApi, {username, password})
        if (result && result.data.token) {
          yield put(userAction.setState(result.data));
          yield put(userAction.processAuthenticateUser(userAction.AUTHENTICATED));
          history.push(`/`);
        } else {
          toast.error(error.response.data.errors);          
        }         

      } catch (e) {
          console.log('Failure in userAuthenticationSaga: ',e);
          /* catch block handles failed login */
          yield put(userAction.processAuthenticateUser(userAction.NOT_AUTHENTICATED));
      }
  }
}