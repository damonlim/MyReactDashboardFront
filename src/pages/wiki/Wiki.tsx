import * as React from 'react';
import Grid from '@mui/material/Grid';
import PageHeader from '../header/PageHeader';


export default function WikiPage() {

  return (
    <>
      <Grid container spacing={3}>
        <PageHeader>Wiki</PageHeader>
      </Grid>
    </>
  );
}