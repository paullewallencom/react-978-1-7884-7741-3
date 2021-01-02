import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

export const greetUser = functions.https.onRequest((request, response) => {
        const name = request.query.name;
        response.send("Welcome to Firebase Cloud Function, "+name+"!");
});



