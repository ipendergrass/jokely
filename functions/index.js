'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
/**
 * This database triggered function will check for child nodes that are older than the
 * cut-off time. Each child needs to have a `timestamp` attribute.
 */
exports.deleteJokeContent = functions.firestore.document('/data/{user_id}/jokes/{joke_id}').onDelete((change, context) => {
    let contentRef = admin.firestore().collection('data').doc(context.params.user_id).collection('jokes').doc(change.id).collection('content')
   return  contentRef.get().then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        contentRef.doc(doc.id).delete()
      })
    })
    // const ref = change.after.ref.parent; // reference to the parent
    // const now = Date.now();
    // const cutoff = now - CUT_OFF_TIME;
    // const oldItemsQuery = ref.orderByChild('timestamp').endAt(cutoff);
    // const snapshot = await oldItemsQuery.once('value');
    // // create a map with all children that need to be removed
    // const updates = {};
    // snapshot.forEach(child => {
    //   updates[child.key] = null;
    // });
    // // execute all updates in one go and return the result to end the function
    // return ref.update(updates);
  });