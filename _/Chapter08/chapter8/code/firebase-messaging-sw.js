importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-messaging.js');


var config = {
    messagingSenderId: "41428255555"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.onMessage(function(payload) {
    console.log("Message kkkk. ", payload);
    // [START_EXCLUDE]
    // Update the UI to include the received message.
   // appendMessage(payload);
    // [END_EXCLUDE]
  });

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

return self.registration.showNotification(notificationTitle,
    notificationOptions);
});