import { combineReducers } from 'redux';

const createOfferList = offersType => {
  return (state = [], action) => {
    // check to see if offersType passed in is either 'sent' or 'received'
    // if doesn't match on first loop, return state. The next loop will match
    // and move to switch statement
    if (action.offersType !== offersType) {
      return state;
    }

    switch (action.type) {
      case 'FETCH_OFFERS_SUCCESS':
        return action.offers;
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
