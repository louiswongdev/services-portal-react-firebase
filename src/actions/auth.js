import firebase from 'firebase/app';
import 'firebase/auth';

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
    db.collection('profile').doc(userProfile.uid).set(userProfile);
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
