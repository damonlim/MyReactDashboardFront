import React from "react";
import { styled } from '@mui/material/styles';
import { 
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from '@mui/material/AppBar';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { signOutUser } from '../../redux/actions/userActions';
import { signout } from "../../helpers/auth";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: theme.drawerWidth,
    width: `calc(100% - ${theme.drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Header({ history, fullName, signOutUser }) {

  const layoutState = useLayoutState();
  const layoutDispatch = useLayoutDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signout(() => {
      signOutUser();
      toast.error('Signout Successfully');
      history.push('/login');
    });
  };

  // const [isSmall, setSmall] = useState(false);

  // useEffect(function () {
  //   window.addEventListener("resize", handleWindowWidthChange);
  //   handleWindowWidthChange();
  //   return function cleanup() {
  //     window.removeEventListener("resize", handleWindowWidthChange);
  //   };
  // });

  // function handleWindowWidthChange() {
  //   const windowWidth = window.innerWidth;
  //   const breakpointWidth = 250; //Damon todo
  //   const isSmallScreen = windowWidth < breakpointWidth;
  //   setSmall(isSmallScreen);
  // }

  return (
    <AppBar position="absolute"  open={layoutState.isSidebarOpened}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}      
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => toggleSidebar(layoutDispatch)}
          sx={{
            marginRight: '36px',
            ...(layoutState.isSidebarOpened && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>        
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}        
        >
          Damon Dashboard
        </Typography>
        <IconButton
          aria-controls={"profile-menu"}
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Typography
          block
          variant="body2"
          weight={"bold"}
          style={{ display: "flex", alignItems: "center", marginLeft: 8 }}
        >
          {fullName}
        </Typography>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}                              
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleSignOut}>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = state=>{
  return {
    fullName: state.user.fullname
  }
};

const mapDispatchToProps = {
  signOutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);