// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDkXTADaJ1MyRBdChF_Yq-_ihfzg-JDxTU',
  authDomain: 'lunchchat-cbcb9.firebaseapp.com',
  projectId: 'lunchchat-cbcb9',
  storageBucket: 'lunchchat-cbcb9.firebasestorage.app',
  messagingSenderId: '328766583436',
  appId: '1:328766583436:web:bd27072e6dc0b02a9741a9',
  measurementId: 'G-BMTC632BWB',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);
