import { FETCH_SERVICE_SUCCESS, CLEAR_SERVICE } from '../types';

const INITIAL_STATE = {
  item: {},
};

const selectedService = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SERVICE_SUCCESS:
      return {
        item: action.service,
      };
    case CLEAR_SERVICE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default selectedService;
