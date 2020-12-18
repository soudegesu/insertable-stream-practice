import { Box, Grid } from '@material-ui/core';
import React, { FC } from 'react';
import StartButton from '../components/StartButton';
import InputVideoStream from '../components/InputVideoStream';

const TopPage: FC = () => {
  return (
    <Box paddingTop={10}>
      <Grid container>
        <Grid item>
          <InputVideoStream />
        </Grid>
      </Grid>
      <Box padding={1}>
        <StartButton />
      </Box>
    </Box>
  );
};

export default TopPage;
