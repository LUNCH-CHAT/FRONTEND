importScripts('https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyDkXTADaJ1MyRBdChF_Yq-_ihfzg-JDxTU',
  authDomain: 'lunchchat-cbcb9.firebaseapp.com',
  projectId: 'lunchchat-cbcb9',
  storageBucket: 'lunchchat-cbcb9.firebasestorage.app',
  messagingSenderId: '328766583436',
  appId: '1:328766583436:web:bd27072e6dc0b02a9741a9',
  measurementId: 'G-BMTC632BWB',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage(function (payload) {
  console.log('백그라운드 메시지 수신:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/favicon.svg',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
