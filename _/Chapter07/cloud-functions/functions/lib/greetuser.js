"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
exports.greetUser = functions.https.onRequest((request, response) => {
    const name = request.query.name;
    response.send("Welcome to Firebase Cloud Function, " + name + "!");
});
//# sourceMappingURL=greetuser.js.map