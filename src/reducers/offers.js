import { combineReducers } from 'redux';
import {
  FETCH_OFFERS_SUCCESS,
  CHANGE_OFFER_STATUS,
  COLLABORATION_CREATED_FROM_OFFER,
} from '../types';

const createOfferList = offersType => {
  return (state = [], action) => {
    // check to see if offersType passed in is either 'sent' or 'received'
    // if doesn't match on first loop, return state. The next loop will match
    // and move to switch statement
    if (action.offersType !== offersType) {
      return state;
    }

    switch (action.type) {
      case FETCH_OFFERS_SUCCESS:
        return action.offers;
      // wrap in curly brackets to keep scope local to case
      case CHANGE_OFFER_STATUS: {
        // find offer being accepted/declined in our array of offers
        // in redux state. Then update its status
        const newState = [...state];
        const offerIndex = newState.findIndex(o => o.id === action.offerId);
        newState[offerIndex].status = action.status;

        return newState;
      }
      case COLLABORATION_CREATED_FROM_OFFER: {
        const newState = [...state];
        const offerIndex = newState.findIndex(o => o.id === action.offerId);
        newState[offerIndex].collaborationCreated = true;

        return newState;
      }
      default:
        return state;
    }
  };
};

const offers = combineReducers({
  received: createOfferList('received'),
  sent: createOfferList('sent'),
});

export default offers;
