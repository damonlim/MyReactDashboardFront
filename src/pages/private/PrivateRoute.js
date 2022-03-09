import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../helpers/auth';
import { LayoutProvider } from "./context/LayoutContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuth() ? (
              <LayoutProvider>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Component {...props} />
                </ThemeProvider>
              </LayoutProvider>                              
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
    ></Route>
);

export default PrivateRoute;