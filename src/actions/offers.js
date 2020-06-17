import db from '../db';
import { createRef } from '.';
import { FETCH_OFFERS_SUCCESS, CHANGE_OFFER_STATUS } from '../types';

/**
 * ------------------------------------------
 * Create offer
 * ------------------------------------------
 */
export const createOffer = offer => dispatch =>
  db.collection('offers').add(offer);

/**
 * ------------------------------------------
 * Extract data from offer
 * - we need to extract data since toUser/fromUser and
 * - service documents in our offers collection are only references
 * ------------------------------------------
 */
const extractDataFromOffer = async (offer, userType) => {
  const service = await offer.service.get();
  const user = await offer[userType].get();

  offer.service = await service.data();
  offer.service.id = service.id;
  offer[userType] = user.data();

  return offer;
};

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

    // wrap offers.map() in Promise.all since extraDataFromOffer
    // returns an array of promises
    const mappedOffers = await Promise.all(
      offers.map(offer => extractDataFromOffer(offer, 'toUser')),
    );

    dispatch({
      type: FETCH_OFFERS_SUCCESS,
      offers: mappedOffers,
      offersType: 'sent',
    });
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

    const mappedOffers = await Promise.all(
      offers.map(offer => extractDataFromOffer(offer, 'fromUser')),
    );

    dispatch({
      type: FETCH_OFFERS_SUCCESS,
      offers: mappedOffers,
      offersType: 'received',
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * ------------------------------------------
 * Change offer status
 * ------------------------------------------
 */
export const changeOfferStatus = (offerId, status) => async dispatch => {
  try {
    await db.collection('offers').doc(offerId).update({ status });
    dispatch({
      type: CHANGE_OFFER_STATUS,
      status,
      offerId,
      offersType: 'received',
    });
  } catch (error) {
    console.log(error);
  }
};
