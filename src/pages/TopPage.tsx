import { Box, Grid, GridList } from '@material-ui/core';
import React, { FC } from 'react';
import StartButton from '../components/StartButton';

const TopPage: FC = () => {
  return (
    <Box paddingTop={10}>
      <GridList>
        <Grid>
          <StartButton />
        </Grid>
      </GridList>
    </Box>
  );
};

export default TopPage;
