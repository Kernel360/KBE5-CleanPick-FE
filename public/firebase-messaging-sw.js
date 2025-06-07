// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBCPxzTODNr71giImckgBQVxQKnxxcoqTY",
  authDomain: "cleanpick-b9107.firebaseapp.com",
  projectId: "cleanpick-b9107",
  storageBucket: "cleanpick-b9107.firebasestorage.app",
  messagingSenderId: "161880352186",
  appId: "1:161880352186:web:51038f682a14357fc1a983",
  measurementId: "G-FMJ885YYFV"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/vite.svg'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
}); 