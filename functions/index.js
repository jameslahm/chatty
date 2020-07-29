const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");
const cors = require("cors");
admin.initializeApp();



exports.getUser = functions.https.onRequest(async (req, res) => {
  cors(req, res);
  if (res.finished) return;
  const uid = req.query.uid;
  const user = await admin.auth().getUser(uid);
  res.json(user);
});
