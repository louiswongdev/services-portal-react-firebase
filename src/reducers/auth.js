import {
  SET_AUTH_USER,
  RESET_AUTH_STATE,
  FETCH_USER_SERVICES_SUCCESS,
  FETCH_USER_MESSAGES_SUCCESS,
  SET_AUTH_USER_LOGOUT,
} from '../types';
import { combineReducers } from 'redux';

const initAuth = () => {
  const user = (state = {}, action) => {
    switch (action.type) {
      case SET_AUTH_USER:
        return {
          // spread in action.user so we don't delete user.message in event
          // FETCH_USER_MESSAGES_SUCCESS fires before SET_AUTH_USER
          ...state,
          ...action.user,
        };
      case SET_AUTH_USER_LOGOUT:
        return action.user;
      case FETCH_USER_SERVICES_SUCCESS:
        return {
          ...state,
          services: action.userServices,
        };
      case FETCH_USER_MESSAGES_SUCCESS:
        return {
          ...state,
          messages: action.messages,
        };
      default:
        return state;
    }
  };

  const isAuth = (state = false, action) => {
    switch (action.type) {
      case SET_AUTH_USER:
        return !!action.user;
      case SET_AUTH_USER_LOGOUT:
        return !!action.user;
      default:
        return state;
    }
  };

  const isAuthResolved = (state = false, action) => {
    switch (action.type) {
      case SET_AUTH_USER:
        return true;
      case SET_AUTH_USER_LOGOUT:
        return true;
      default:
        return state;
    }
  };

  return combineReducers({
    user,
    isAuth,
    isAuthResolved,
  });
};

const auth = initAuth();

export default auth;
