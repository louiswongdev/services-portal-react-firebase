import {
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICE_SUCCESS,
  REQUEST_SERVICE,
  FETCH_USER_SERVICES_SUCCESS,
} from '../types';

import db from '../db';
import { createRef } from '.';

/**
 * ------------------------------------------
 * Fetch Services
 * ------------------------------------------
 */
export const fetchServices = () => {
  return async dispatch => {
    try {
      const snapshot = await db.collection('services').get();
      const services = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch({ type: FETCH_SERVICES_SUCCESS, services });
    } catch (error) {
      console.log(error);
    }
  };
};

/**
 * ------------------------------------------
 * Fetch User Services
 * ------------------------------------------
 */
export const fetchUserServices = userId => {
  return async dispatch => {
    try {
      const snapshot = await db
        .collection('services')
        .where('user', '==', userId)
        .get();
      const userServices = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch({ type: FETCH_USER_SERVICES_SUCCESS, userServices });
    } catch (error) {
      console.log(error);
    }
  };
};

/**
 * ------------------------------------------
 * Fetch Service By ID
 * ------------------------------------------
 */
export const fetchServiceById = id => {
  return async (dispatch, getState) => {
    // Caching: Get current service item and check if it's the same as item id being
    // passed in. This will prevent unnecessary fetch requests if we are
    // trying to click to same service page
    const lastService = getState().selectedService.item;

    if (lastService.id && lastService.id === id) {
      return Promise.resolve();
    }

    // dispatch({ type: CLEAR_SERVICE });
    dispatch({ type: REQUEST_SERVICE });
    try {
      // const snapshot = await db.collection(`services/${id}`).get();
      const snapshot = await db.collection('services').doc(id).get();
      const service = { id: snapshot.id, ...snapshot.data() };
      const user = await service.user.get();
      service.user = user.data();

      dispatch({
        type: FETCH_SERVICE_SUCCESS,
        service,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

/**
 * ------------------------------------------
 * Create Service
 * ------------------------------------------
 */

export const createService = (newService, userId) => {
  return async dispatch => {
    const service = {
      ...newService,
      user: createRef('profiles', userId),
      price: parseInt(newService.price, 10),
      createdAt: new Date(),
    };

    try {
      await db.collection('services').add(service);
    } catch (error) {
      console.log(error);
    }
  };
};
