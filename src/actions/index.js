import db from '../db';

/**
 * ------------------------------------------
 * Create ref
 * ------------------------------------------
 */
export const createRef = (collection, docId) =>
  db.doc(`${collection}/${docId}`);

export * from './services';
export * from './auth';
