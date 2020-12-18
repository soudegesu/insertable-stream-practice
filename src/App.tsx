import React, { FC } from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import TopPage from './pages/TopPage';

const App: FC = () => {
  return (
    <Container>
      <TopPage />
    </Container>
  );
};

export default App;
