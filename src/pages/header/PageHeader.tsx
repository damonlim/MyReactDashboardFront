import React, { FunctionComponent } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const PageHeader: FunctionComponent = (props) => {

  return (
    <Grid item xs={12}>
      <Grid container justifyContent="center">
        <Typography variant="h5">
          {props.children}
        </Typography>  
      </Grid>
    </Grid>
  );
}

export default PageHeader;