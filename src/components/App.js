import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Login from "../pages/login/Login";
import ForgetPassword from "../pages/login/ForgetPassword";
import ResetPassword from "../pages/login/ResetPassword";
import Register from "../pages/login/Register";
import Activate from "../pages/login/Activate";
import {isAuth} from "../helpers/auth";

function App() {

  return (
    <>
      <Router>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard/activeCells" />} />
        <PrivateRoute path="/app" component={Layout} />
        <Route path='/login' exact render={props => <Login {...props} />} />
        <Route path='/users/password/forget' exact render={props => <ForgetPassword {...props} />} />
        <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} />
        <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
        <Route path='/register' exact render={props => <Register {...props} />} />
      </Router>
    </>
  );

  function PrivateRoute({ component:Component, ...rest }) {

    return (
      <Route
        {...rest}
        render={props =>
          isAuth() ? (
              <Component {...props} />
          ) : (
            <Redirect to={"/login"} />
          )
        }
      />
    );
  }
}

export default App;