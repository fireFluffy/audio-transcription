// Modules
import { hot } from 'react-hot-loader';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
// Containers
import PageContainer from './Page';

function App(): React.SFC {
  return (
    <Router>
      <MainWrap>
        <MainWrapIn>
          <PageContainer />
        </MainWrapIn>
      </MainWrap>
    </Router>
  );
}

export default hot(module)(App);

const MainWrap = styled.div``;

const MainWrapIn = styled.div`
  margin: 0 auto;
  padding: 84px 0 45px 0;
  max-width: 805px;
`;
