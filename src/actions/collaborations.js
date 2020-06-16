import db from '../db';

/**
 * ------------------------------------------
 * Create collaboration
 * ------------------------------------------
 */
export const createCollaboration = async ({ collaboration, message }) => {
  const collabRef = await db.collection('collaborations').add(collaboration);

  message.cta = `/collaborations/${collabRef.id}/`;
  await createMessage(message);
};

/**
 * ------------------------------------------
 * Change offer status
 * ------------------------------------------
 */
export const createMessage = async message => {
  return db
    .collection('profiles')
    .doc(message.toUser)
    .collection('messages') // create sub-collection inside profile of user
    .add(message);
};
