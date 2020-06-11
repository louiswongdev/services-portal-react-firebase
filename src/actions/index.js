import {
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICE_SUCCESS,
  CLEAR_SERVICE,
  REQUEST_SERVICE,
} from '../types';

import db from '../db';

export const fetchServices = () => {
  return async dispatch => {
    try {
      const snapshot = await db.collection('services').get();
      const services = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(services);

      dispatch({ type: FETCH_SERVICES_SUCCESS, services });
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchServiceById = id => {
  return async dispatch => {
    // dispatch({ type: CLEAR_SERVICE });
    dispatch({ type: REQUEST_SERVICE });
    try {
      // const snapshot = await db.collection(`services/${id}`).get();
      const snapshot = await db.collection('services').doc(id).get();
      const service = { id: snapshot.id, ...snapshot.data() };

      dispatch({
        type: FETCH_SERVICE_SUCCESS,
        service,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// export const clearService = () => {
//   return { type: CLEAR_SERVICE };
// };

// export const requestService = () => ({
//   type: REQUEST_SERVICE,
// });
