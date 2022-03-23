import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDSSSeRJY0_rBl4QVz49IqyOWvjCYiS7zw",
    authDomain: "let-s-chat-d529f.firebaseapp.com",
    projectId: "let-s-chat-d529f",
    storageBucket: "let-s-chat-d529f.appspot.com",
    messagingSenderId: "59955198321",
    appId: "1:59955198321:web:ca91776d40a22465249ed0"
  }).auth();