import React, { useState } from 'react';
import { Link , useHistory, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import useStyles from './styles'
import Dot from './Dot';

export default function SidebarLink({
	link,
	icon,
	label,
	children,
	isSidebarOpened,
	nested,
	type,
	click,
	...props
}) {

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(location.pathname === link || location.pathname.includes(link))

	const isLinkActive =
	link && (location.pathname === link || location.pathname.includes(link));

  if (!children)
	return (
		<>
      <ListItem
        component={link && Link}
        to={link}
        button
        disableRipple
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
          [classes.linkIconActive]: isLinkActive,
          })}
          style={{ marginRight: nested && -18 }}
        >
          {nested ? (
            <Dot color={isLinkActive} />
          ) : (
            icon
          )}
        </ListItemIcon>
        <ListItemText        
          classes={{
            primary: classnames(classes.linkText, {
                [classes.linkTextActive]: isLinkActive,
                [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
          primaryTypographyProps={{ style: { whiteSpace: 'normal' } }}
          // primaryTypographyProps={{ style: { whiteSpace: 'pre-wrap', overflowWrap: 'break-word' } }}
        />
      </ListItem>
		</>
	);

  return (
    <>
      <ListItem
        onClick={toggleCollapse}
        key={link}        
        button
        disableRipple
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
          [classes.linkIconActive]: isLinkActive,
          })}
        >
          {icon}
        </ListItemIcon>
        <ListItemText        
          classes={{
            primary: classnames(classes.linkText, {
                [classes.linkTextActive]: isLinkActive,
                [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
          primaryTypographyProps={{ style: { whiteSpace: 'normal' } }}
          // primaryTypographyProps={{ style: { whiteSpace: 'pre-wrap', overflowWrap: 'break-word' } }}
        />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>      
      {children && (
      <Collapse in={isOpen && isSidebarOpened} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map(childrenLink => (
              <SidebarLink
                  key={
                      (childrenLink && childrenLink.link) ||
                      childrenLink.label
                  }
                  location={location}
                  isSidebarOpened={isSidebarOpened}
                  nested
                  {...childrenLink}
              />
          ))}
        </List>
      </Collapse>)}
    </>
  );


  function toggleCollapse(e) {
    if (isSidebarOpened) {
        e.preventDefault()
        setIsOpen(!isOpen)
    }
  }
}