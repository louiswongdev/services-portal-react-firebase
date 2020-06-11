import {
  FETCH_SERVICE_SUCCESS,
  CLEAR_SERVICE,
  REQUEST_SERVICE,
} from '../types';
import { combineReducers } from 'redux';

const INITIAL_STATE = {};

const initSelectedService = () => {
  const item = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_SERVICE_SUCCESS:
        return action.service;
      case CLEAR_SERVICE:
        return INITIAL_STATE;
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    switch (action.type) {
      case REQUEST_SERVICE:
        return true;
      case FETCH_SERVICE_SUCCESS:
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    item,
    isFetching,
  });
};

const selectedService = initSelectedService();

export default selectedService;
