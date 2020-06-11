import { FETCH_SERVICES_SUCCESS } from '../types';
import { combineReducers } from 'redux';

const INITIAL_STATE = [];

const initServices = () => {
  const all = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_SERVICES_SUCCESS:
        return action.services;
      default:
        return state;
    }
  };

  return combineReducers({ all });
};

const services = initServices();

export default services;
