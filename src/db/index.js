import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase
  .initializeApp({
    apiKey: 'AIzaSyBgdBzlvwqzIB5EguZm7U9Pju4VrtJVqHc',
    authDomain: 'service-bookapp.firebaseapp.com',
    databaseURL: 'https://service-bookapp.firebaseio.com',
    projectId: 'service-bookapp',
    storageBucket: 'service-bookapp.appspot.com',
    messagingSenderId: '787716745030',
    appId: '1:787716745030:web:9ab0ad5c8ecda826fca747',
  })
  .firestore();

export default db;

export const { Timestamp } = firebase.firestore;
// export { Timestamp };
