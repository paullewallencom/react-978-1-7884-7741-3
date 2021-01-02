"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
exports.greetUser = functions.https.onRequest((request, response) => {
    const name = request.query.name;
    response.send("Welcome to Firebase Cloud Function, " + name + "!");
});
exports.makeUppercase = functions.database.ref('/seats/{seatId}')
    .onWrite(event => {
    // Grab the current value of what was written to the Realtime Database.
    const original = event.data.val();
    console.log('Uppercasing', original);
    const uppercase = original.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return event.data.ref.parent.child('uppercase').set(uppercase);
});
//# sourceMappingURL=index.js.map