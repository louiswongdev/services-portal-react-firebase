import db from '../db';
import {
  COLLABORATION_CREATED_FROM_OFFER,
  FETCH_USER_MESSAGES_SUCCESS,
} from '../types';

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

/**
 * ------------------------------------------
 * Subscribe to messages
 * ------------------------------------------
 */
export const subscribeToMessages = userId => dispatch => {
  return db
    .collection('profiles')
    .doc(userId)
    .collection('messages')
    .onSnapshot(snapshot => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({ type: FETCH_USER_MESSAGES_SUCCESS, messages });
    });
};

// const subscribeToMessages1 = (userId, callback) =>
//   db
//     .collection('profiles')
//     .doc(userId)
//     .collection('messages')
//     .onSnapshot(snapshot => {
//       const messages = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       callback(messages);
//     });

// export const subscribeToMessages = userId => dispatch =>
//   subscribeToMessages1(userId, messages =>
//     dispatch({ type: FETCH_USER_MESSAGES_SUCCESS, messages }),
//   );

/**
 * ------------------------------------------
 * Mark message as read
 * ------------------------------------------
 */
export const markMessageAsRead = async message => {
  try {
    await db
      .collection('profiles')
      .doc(message.toUser)
      .collection('messages')
      .doc(message.id)
      .update({ isRead: true });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * ------------------------------------------
 * Fetch Collaborations
 * ------------------------------------------
 */
export const fetchCollaborations = async userId => {
  try {
    const snapshot = await db
      .collection('collaborations')
      .where('allowedPeople', 'array-contains', userId)
      .get();

    const collaborations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return collaborations;
  } catch (error) {
    throw new Error(error.message);
  }
};

// export const fetchCollaborations = async userId => {
//   const snapshot = await db.collection('collaborations')
//     .where('allowedPeople', '==', 'array-contains', userId)
//     .get()
//     .then(snapshot =>
//       snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
//     );
// };
