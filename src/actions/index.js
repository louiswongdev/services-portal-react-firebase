import { FETCH_SERVICES_SUCCESS } from '../types';
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
