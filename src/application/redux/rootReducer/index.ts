// Modules
import { combineReducers } from 'redux';
// Reducers
import testReducer from '../testReducer/reducers';

const rootReducer = combineReducers({
  test: testReducer,
});

export default rootReducer;
