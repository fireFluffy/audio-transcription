// Modules
import { hot } from 'react-hot-loader';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends React.PureComponent<{}, null> {
  public render() {
    return (
      <Router>
        <div>Type Script</div>
      </Router>
    );
  }
}

export default hot(module)(App);
