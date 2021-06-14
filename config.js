import React ,{Component} from 'react'
import Firebase from 'firebase';
let config = {
  apiKey: "AIzaSyCK0r2tsiKScuX6vsVejfJh7P0dEeV4lhc",
    authDomain: "buzzer-app-6f69b.firebaseapp.com",
    databaseURL: "https://buzzer-app-6f69b.firebaseio.com",
    projectId: "buzzer-app-6f69b",
    storageBucket: "buzzer-app-6f69b.appspot.com",
    messagingSenderId: "270542842127"
};
let app= Firebase.initializeApp(config);
export const db = app.database();