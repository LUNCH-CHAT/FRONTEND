// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAH9wgBIIHUh4MCVZKSP5w5YoqQ0mqXqSE',
  authDomain: 'lunchchat-2025.firebaseapp.com',
  projectId: 'lunchchat-2025',
  storageBucket: 'lunchchat-2025.firebasestorage.app',
  messagingSenderId: '65654899967',
  appId: '1:65654899967:web:ca1dccb4d198170762f8ca',
  measurementId: 'G-BYG678DNS1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
