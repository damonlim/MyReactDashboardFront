import React, { useState } from "react";
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import classnames from "classnames";
import MoreVertIcon from '@mui/icons-material/MoreVert';

// styles
import useStyles from "./styles";

export default function Widget({
  children,
  title,
  subtitle,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  inheritHeight,
  className,
  style,
  ...props
}) {
  var classes = useStyles(props);

  // local
  var [moreButtonRef, setMoreButtonRef] = useState(null);
  var [isMoreMenuOpen, setMoreMenuOpen] = useState(false);

  const [date, setDate] = React.useState('');

  return (
    <div
      className={classnames(
        {
          [classes.inheritHeight]: inheritHeight,
          [classes.widgetWrapper]: !inheritHeight
        },
        className
      )}
      style={style}
    >
      <Paper
        className={classnames(classes.paper, {
          [props.paperClass]: props.paperClass
        })}
        classes={{ root: classes.widgetRoot }}
      >
        {!title ? (
          <>
            {header ? (
              <div className={classes.widgetHeader}>{header}</div>
            ) : null}
          </>
        ) : (
          <>
              <div className={classes.widgetHeader}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Box display={"flex"} style={{ width: "calc(100% - 20px)" }}>
                    <Typography
                      variant="h5"
                      color="text"
                      colorBrightness={"secondary"}
                      noWrap
                    >
                      {title}
                    </Typography>
                    <Box alignSelf="flex-end" ml={1}>
                      <Typography
                        color="text"
                        colorBrightness={"hint"}
                        variant={"caption"}
                      >
                        {subtitle}
                      </Typography>
                    </Box>
                  </Box>
                  {!disableWidgetMenu && (
                    <IconButton
                      color="primary"
                      className={classes.moreButton}
                      aria-owns="widget-menu"
                      aria-haspopup="true"
                      onClick={() => setMoreMenuOpen(true)}
                      buttonRef={setMoreButtonRef}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  )}
                </Box>
              </div>
            
          </>
        )}     


        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [classes.paddingTop]: !title && !noBodyPadding,
            [bodyClass]: bodyClass
          })}
        >
          {children}
        </div>
      </Paper>
    </div>
  );  
}