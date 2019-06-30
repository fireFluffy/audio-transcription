// Modules
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
// Store
import rootReducer from '../rootReducer';
import rootSaga from '../rootSaga';
import initialState from '../initialState';

const initStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  const composeEnhancers = composeWithDevTools({
    name: `Redux`,
    realtime: true,
    trace: true,
    traceLimit: 25,
  });
  const enhancer = composeEnhancers(applyMiddleware(...middleware));
  const store = createStore(rootReducer, initialState, enhancer);

  sagaMiddleware.run(rootSaga);

  return store;
};

export default initStore;
