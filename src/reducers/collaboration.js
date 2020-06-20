import { combineReducers } from 'redux';
import {
  SET_COLLABORATION,
  SET_COLLABORATION_JOINED_PEOPLE,
  UPDATE_COLLABORATION_USER,
} from '../types';

const initCollab = () => {
  const collaboration = (state = {}, action) => {
    switch (action.type) {
      case SET_COLLABORATION:
        return action.collaboration;
      default:
        return state;
    }
  };

  const joinedPeople = (state = [], action) => {
    switch (action.type) {
      case SET_COLLABORATION_JOINED_PEOPLE:
        return action.joinedPeople;
      case UPDATE_COLLABORATION_USER:
        const newJoinedPeople = [...state];
        const { user } = action;
        const indexOfUser = newJoinedPeople.findIndex(
          jp => jp.uid === user.uid,
        );

        // user not found, return state
        if (indexOfUser < 0) {
          return state;
        }
        // return state if no changes in user's field state
        // (field state is online or offline)
        if (newJoinedPeople[indexOfUser].state === user.state) {
          return state;
        }

        // there was a change in user's state (online/offine)
        newJoinedPeople[indexOfUser].state = user.state;
        return newJoinedPeople;
      default:
        return state;
    }
  };

  const messages = (state = [], action) => {
    switch (action.type) {
      default:
        return state;
    }
  };

  return combineReducers({
    joined: collaboration,
    joinedPeople,
    messages,
  });
};

const collaboration = initCollab();
export default collaboration;
