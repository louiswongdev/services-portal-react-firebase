import firebase from 'firebase/app';
import 'firebase/database';

const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

// detect connection state. Check if user is connected online
// snapshot.val() will return true if user is connected
const onConnectionChanged = callback =>
  firebase
    .database()
    .ref('.info/connected')
    .on('value', snapshot => callback(snapshot.val()));

const createFirebaseRef = (collection, id) =>
  firebase.database().ref(`${collection}/${id}`);

export const checkUserConnection = uid => {
  const userStatusDatabseRef = createFirebaseRef('status', uid);

  onConnectionChanged(isConnected => {
    // if user is not connected, set user to 'offline'
    if (!isConnected) {
      userStatusDatabseRef.set(isOfflineForDatabase);
      return;
    }

    // if user is connected, set user to 'online'
    userStatusDatabseRef
      .onDisconnect()
      .set(isOfflineForDatabase)
      .then(_ => userStatusDatabseRef.set(isOnlineForDatabase));
  });
};
