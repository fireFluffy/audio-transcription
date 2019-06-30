// State
import testState from '../states';
// Constants
import TEST_CONSTANT from '../constants';

const testReducer = (state = testState, { payload, type }: { payload: boolean; type: string }) => {
  switch (type) {
    case TEST_CONSTANT:
      return {
        ...state,
        test: payload,
      };

    default:
      return state;
  }
};

export default testReducer;
