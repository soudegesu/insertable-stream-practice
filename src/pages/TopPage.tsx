import { Box, Grid } from '@material-ui/core';
import React, { FC } from 'react';
import StartButton from '../components/StartButton';
import VideoStream from '../components/VideoStream';

const TopPage: FC = () => {
  return (
    <Box paddingTop={10}>
      <Grid container>
        <Grid item>
          <VideoStream />
        </Grid>
      </Grid>
      <Box padding={1}>
        <StartButton />
      </Box>
    </Box>
  );
};

export default TopPage;
