import {
  createFirebaseRef,
  onConnectionChanged,
  isOfflineForDatabase,
  isOnlineForDatabase,
} from '../db/connection';

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
