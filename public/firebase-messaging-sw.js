importScripts('https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyAH9wgBIIHUh4MCVZKSP5w5YoqQ0mqXqSE',
  authDomain: 'lunchchat-2025.firebaseapp.com',
  projectId: 'lunchchat-2025',
  storageBucket: 'lunchchat-2025.firebasestorage.app',
  messagingSenderId: '65654899967',
  appId: '1:65654899967:web:ca1dccb4d198170762f8ca',
  measurementId: 'G-BYG678DNS1',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage(function (payload) {
  console.log('백그라운드 메시지 수신:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/src/assets/logo.svg',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
