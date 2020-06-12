import firebase from 'firebase/app';
import 'firebase/auth';
import { SET_AUTH_USER } from '../types';
import db from '../db';

/**
 * ------------------------------------------
 * Register User
 * ------------------------------------------
 */
export const register = async ({ email, password, fullName, avatar }) => {
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const userProfile = {
      uid: user.uid,
      fullName,
      email,
      avatar,
      services: [],
      description: '',
    };

    createUserProfile(userProfile);
    // return user;
    return userProfile;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * ------------------------------------------
 * Create User Profile
 * ------------------------------------------
 */
export const createUserProfile = async userProfile => {
  try {
    db.collection('profiles').doc(userProfile.uid).set(userProfile);
  } catch (error) {
    console.log(error);
  }
};

/**
 * ------------------------------------------
 * Get User Profile
 * ------------------------------------------
 */
export const getUserProfile = async uid => {
  try {
    const snapshot = await db.collection('profiles').doc(uid).get();

    const userProfile = { uid, ...snapshot.data() };

    return userProfile;
  } catch (error) {
    console.log(error);
  }
};

/**
 * ------------------------------------------
 * Login User
 * ------------------------------------------
 */
export const login = async ({ email, password }) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * ------------------------------------------
 * Auth state change
 * ------------------------------------------
 */
export const onAuthStateChanged = authCB =>
  firebase.auth().onAuthStateChanged(authCB);

export const storeAuthUser = authUser => {
  return async dispatch => {
    if (authUser) {
      try {
        const userWithProfile = await getUserProfile(authUser.uid);
        dispatch({ type: SET_AUTH_USER, user: userWithProfile });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      dispatch({ type: SET_AUTH_USER, user: null });
    }
  };
};
