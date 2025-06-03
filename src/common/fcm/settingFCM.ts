// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();


// Handle incoming messages while the app is in the foreground
onMessage(messaging, (payload) => {
  console.log('Message received in foreground: ', payload);
  
  // 포그라운드에서 알림 표시
  if (payload.notification) {
    const notificationTitle = payload.notification.title || 'New Message';
    const notificationOptions = {
      body: payload.notification.body || 'You have a new message',
      icon: payload.notification.icon || '/vite.svg',
      tag: 'foreground-notification'
    };

    // 브라우저 알림 생성
    if (Notification.permission === 'granted') {
      new Notification(notificationTitle, notificationOptions);
    }
  }
});

export { messaging };