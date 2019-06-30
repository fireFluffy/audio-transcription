// Modules
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// Store
import initStore from './application/redux/store';
// Components
import App from './application/containers/App';

const MOUNT_NODE = document.getElementById('root');
const store = initStore();

if (MOUNT_NODE) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    MOUNT_NODE
  );
}
