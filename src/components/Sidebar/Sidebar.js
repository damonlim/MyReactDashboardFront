import React from "react";
import { styled } from '@mui/material/styles';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MuiDrawer from '@mui/material/Drawer';
import IconButton from "@mui/material/IconButton";
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

// components
import SidebarLink from "./components/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar
} from "../../context/LayoutContext";

import { Divider, ListItemIcon, ListItemText, Toolbar } from "@mui/material";


function Sidebar({ structure }) {

  const layoutState = useLayoutState();
  const layoutDispatch = useLayoutDispatch();

  const openedMixin = (theme) => ({
    width: theme.drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(9)} + 1px)`,
    },
  });

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: theme.drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );

  return (
    <Drawer variant="permanent" open={layoutState.isSidebarOpened}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            isSidebarOpened={layoutState.isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

}

export default Sidebar;
