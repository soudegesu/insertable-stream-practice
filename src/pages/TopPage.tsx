import { Box, Grid } from '@material-ui/core';
import React, { FC } from 'react';
import StartButton from '../components/StartButton';
import InputVideoStream from '../components/InputVideoStream';
import OutputVideoStream from '../components/OutputVideoStream';
import ConnectButton from '../components/ConnectButton';

const TopPage: FC = () => {
  return (
    <Box paddingTop={10}>
      <Grid container>
        <Grid item>
          <InputVideoStream />
        </Grid>
        <Grid item>
          <OutputVideoStream />
        </Grid>
      </Grid>
      <Box padding={1}>
        <Grid container spacing={1}>
          <Grid item>
            <StartButton />
          </Grid>
          <Grid item>
            <ConnectButton />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TopPage;
