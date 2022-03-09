import { makeStyles } from '@mui/styles';

export default makeStyles(theme => ({
  container: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0
  },
  logotypeContainer: {
    backgroundColor: "#90caf9",
    width: "60%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  logotypeImage: {
    width: 165,
  },
  logotypeText: {
    color: "white",
    fontWeight: 500,
    fontSize: 84,
  },
  customFormContainer: {
    width: "40%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "auto",
    alignItems: "center"
  },
  formContainer: {
    width: "40%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    alignItems: "center"
  },
  form: {
    width: 320
  },
  tab: {
    fontWeight: 400,
    fontSize: 18
  },
  greeting: {
    fontWeight: 500,
    textAlign: "center",
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center",
  },
  creatingButtonContainer: {
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  createAccountButton: {
    height: 46,
    textTransform: "none"
  },
  formDividerContainer: {
    display: "flex",
    alignItems: "center"
  },
  formDividerWord: {

  },
  formDivider: {
    flexGrow: 1,
    height: 1
  },
  errorMessage: {
    textAlign: "center"
  },
  textField: {
    borderBottomColor: theme.palette.background.default
  },
  formButtons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  forgetButton: {
    textTransform: "none",
    fontWeight: 400
  },
  loginLoader: {
  },
  copyright: {
    whiteSpace: "nowrap",
  }
}));

