import React from "react";
import { useTheme } from '@mui/material/styles';

export default function Dot({ color }) {

  const theme = useTheme();

  const _backgroundColor = (color && theme.palette.primary && theme.palette.primary.main) ? theme.palette.primary.main : "#f5f5f5"

  return (
    <div
      style={{
        width: 5,
        height: 5,        
        transition: theme.transitions.create("background-color"),
        borderRadius: "50%",
        backgroundColor: _backgroundColor
      }}
    />
  );
}
