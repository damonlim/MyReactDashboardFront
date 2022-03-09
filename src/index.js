import { CssBaseline } from "@mui/material";
import React from "react";
import { render } from "react-dom";
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from "./redux/configureStore";
import App from "./components/App";
import { LayoutProvider } from "./context/LayoutContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';


const theme = createTheme({
  palette: {
    mode: "dark",
  },
  drawerWidth: 200,
});

const store = configureStore();

render(
  <>
    <LayoutProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </ThemeProvider>
    </LayoutProvider>   
    <ToastContainer autoClose={3000} hideProgressBar />
  </>,
  document.getElementById("root")
);
