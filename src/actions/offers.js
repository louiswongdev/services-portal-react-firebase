import db from '../db';
import { createRef } from '.';
import { FETCH_OFFERS_SUCCESS } from '../types';
/**
 * ------------------------------------------
 * Create offer
 * ------------------------------------------
 */
export const createOffer = offer => dispatch =>
  db.collection('offers').add(offer);

/**
 * ------------------------------------------
 * Fetch all Sent Offers
 * ------------------------------------------
 */
export const fetchSentOffers = userId => async dispatch => {
  const userRef = createRef('profiles', userId);

  try {
    const snapShot = await db
      .collection('offers')
      .where('fromUser', '==', userRef)
      .get();

    const offers = snapShot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch({ type: FETCH_OFFERS_SUCCESS, offers, offersType: 'sent' });
  } catch (error) {
    console.log(error);
  }
};

/**
 * ------------------------------------------
 * Fetch all Received Offers
 * ------------------------------------------
 */
export const fetchReceivedOffers = userId => async dispatch => {
  const userRef = createRef('profiles', userId);

  try {
    const snapShot = await db
      .collection('offers')
      .where('toUser', '==', userRef)
      .get();

    const offers = snapShot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch({ type: FETCH_OFFERS_SUCCESS, offers, offersType: 'received' });
  } catch (error) {
    console.log(error);
  }
};
