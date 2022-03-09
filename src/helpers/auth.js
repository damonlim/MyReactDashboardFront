//import cookie from 'js-cookie';
import jsCookie from 'js-cookie';
import axios from "axios";

//set in cookie
export const setCookie = (key, value) => {
  if (window !== 'undefined') {
    jsCookie.set(key, value, {
      expires: 1 //1day
    })
  }
}

//remove cookie
export const removeCookie = key => {
  if (window !== 'undefined') {
    jsCookie.remove(key, {
      expires: 1
    })
  }
}

//get from cookie like token
export const getCookie = key => {
  if (window !== 'undefined') {
    return jsCookie.get(key);
  }
}

//set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }  
}

//remove from localstorage
export const removeLocalStorage = key => {
  if (window !== 'undefined') {
    localStorage.removeItem(key);
  }  
}

//Auth user after login
export const authenticate = (response, next) => {
  setCookie('token', response.data.token);
  setLocalStorage('user', response.data.user);
  next();
}

// Access user info from localstorage
export const isAuth = () => {
  if (window !== 'undefined') {
      const cookieChecked = getCookie('token');
      if (cookieChecked) {
        return true;
      }
      return false;
  }
};

//signout
export const signout = next => {
  removeCookie('token');
  removeLocalStorage('user');
  next();
}

//update user data in localstorage
export const updateUser = (response,next) => {
  if (window !== 'undefined') {
    let auth = JSON.parse(localStorage.getItem('user'));
    auth = response.data;
    localStorage.setItem('user', JSON.stringify(auth));
  }
  next();
}
