import db from '../db';
import { COLLABORATION_CREATED_FROM_OFFER } from '../types';
/**
 * ------------------------------------------
 * Create collaboration
 * ------------------------------------------
 */
export const createCollaboration = ({
  collaboration,
  message,
}) => async dispatch => {
  try {
    // add collaboration in db
    const collabRef = await db.collection('collaborations').add(collaboration);

    // add cta url to message and create the message in db
    message.cta = `/collaborations/${collabRef.id}/`;
    await createMessage(message);

    // mark offer as collaborated
    await db
      .collection('offers')
      .doc(collaboration.fromOffer)
      .update({ collaborationCreated: true });

    // Dispatch collaboration
    dispatch({
      type: COLLABORATION_CREATED_FROM_OFFER,
      offerId: collaboration.fromOffer,
      offersType: 'sent',
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
export const createMessage = async message => {
  return db
    .collection('profiles')
    .doc(message.toUser)
    .collection('messages') // create sub-collection inside profile of user
    .add(message);
};
