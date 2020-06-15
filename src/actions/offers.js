import db from '../db';

export const createOffer = offer => dispatch =>
  db.collection('offers').add(offer);
