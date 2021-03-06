import db from '../db';
import firebase from 'firebase/app';
import {
  COLLABORATION_CREATED_FROM_OFFER,
  FETCH_USER_MESSAGES_SUCCESS,
  SET_COLLABORATION,
  SET_COLLABORATION_JOINED_PEOPLE,
  UPDATE_COLLABORATION_USER,
  SET_COLLABORATION_MESSAGE,
  RESET_COLLABORATION_MESSAGES,
  REMOVE_COLLABORATION_MESSAGE,
} from '../types';
import { createRef } from './index';

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

/**
 * ------------------------------------------
 * Subscribe to Collaborations
 * ------------------------------------------
 */
export const subToCollaboration = (collabId, doneCB) => dispatch => {
  const collabRef = db.collection('collaborations').doc(collabId);

  return collabRef.onSnapshot(async snapshot => {
    const collaboration = { id: snapshot.id, ...snapshot.data() };

    let joinedPeople = [];
    if (collaboration.joinedPeople) {
      joinedPeople = await Promise.all(
        collaboration.joinedPeople.map(async userRef => {
          const userSnapshot = await userRef.get();
          return { id: userSnapshot.id, ...userSnapshot.data() };
        }),
      );
    }

    dispatch({ type: SET_COLLABORATION, collaboration });
    dispatch({ type: SET_COLLABORATION_JOINED_PEOPLE, joinedPeople });
    doneCB({ joinedPeople });
  });
};

/**
 * ------------------------------------------
 * Join Collaboration
 * ------------------------------------------
 */
export const joinCollaboration = (collabId, uid) => {
  const userRef = createRef('profiles', uid);

  return db
    .collection('collaborations')
    .doc(collabId)
    .update({
      joinedPeople: firebase.firestore.FieldValue.arrayUnion(userRef),
    });
};

/**
 * ------------------------------------------
 * Leave Collaboration
 * ------------------------------------------
 */
export const leaveCollaboration = (collabId, uid) => {
  const userRef = createRef('profiles', uid);

  return db
    .collection('collaborations')
    .doc(collabId)
    .update({
      joinedPeople: firebase.firestore.FieldValue.arrayRemove(userRef),
    });
};

/**
 * ------------------------------------------
 * Subscribe to Profile (give up-to-date user status state on
 * collaboration detail page)
 * ------------------------------------------
 */
export const subToProfile = uid => dispatch => {
  const profileRef = db.collection('profiles').doc(uid);

  return profileRef.onSnapshot(snapshot => {
    const user = { id: snapshot.id, ...snapshot.data() };
    // debugger;
    dispatch({ type: UPDATE_COLLABORATION_USER, user });
  });
};

/**
 * ------------------------------------------
 * Send messages
 * ------------------------------------------
 */
export const sendChatMessage = ({
  message,
  collabId,
  timestamp,
}) => dispatch => {
  return db
    .collection('collaborations')
    .doc(collabId)
    .collection('messages')
    .doc(timestamp)
    .set(message)
    .catch(error => {
      dispatch({
        type: REMOVE_COLLABORATION_MESSAGE,
        messageId: message.timestamp.toString(),
      });
      return Promise.reject('Collaboration is expired');
    });
};

/**
 * ------------------------------------------
 * Subscribe to chat messages
 * ------------------------------------------
 */
export const subToMessages = collabId => dispatch => {
  const messageRef = db
    .collection('collaborations')
    .doc(collabId)
    .collection('messages');

  dispatch({ type: RESET_COLLABORATION_MESSAGES });

  return messageRef.onSnapshot(snapshot => {
    const messages = snapshot.docChanges();

    dispatch({ type: SET_COLLABORATION_MESSAGE, messages });
  });
};

/**
 * ------------------------------------------
 * Subscribe to messages (when use accepts collaboration)
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

/**
 * ------------------------------------------
 * Start collaboration timer
 * ------------------------------------------
 */
export const startCollaboration = (collabId, expiresAt) => {
  return db.collection('collaborations').doc(collabId).update({ expiresAt });
};
