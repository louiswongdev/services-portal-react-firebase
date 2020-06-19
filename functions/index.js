const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();

// Realtime Database trigger: listen to changes in our Realtime DB
// triggered on changes to /status/{uid}
exports.onUserStatusChanged = functions.database
  .ref('/status/{uid}')
  .onUpdate(async (change, context) => {
    // Get the data written to Realtime Database
    const eventStatus = change.after.val();

    // create ref to our firestore doc based on logged in user
    const userFirestoreRef = firestore.doc(`/profiles/${context.params.uid}`);

    // grab value that was written to database
    const statusSnapshot = await change.after.ref.once('value');
    const status = statusSnapshot.val();

    // if value that we have saved in our database has last_changed
    // greater than (or newer) than change that triggered this call
    // that means we already have up-to-date value. don't do anything

    // If the current timestamp for this data is newer than
    // the data that triggered this event, we exit this function.
    // note: last_changed is a timestamp we defined in our
    // isOfflineForDatabase / isOnlineForDatabase object
    if (status.last_changed > eventStatus.last_changed) {
      return null;
    }

    // Otherwise, we convert the last_changed field to a Date
    eventStatus.last_changed = new Date(eventStatus.last_changed);
    // write it to Firestore.
    return userFirestoreRef.update(eventStatus);
  });
