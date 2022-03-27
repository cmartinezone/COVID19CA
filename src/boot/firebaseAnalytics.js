const firebase = require('firebase/app')
//Adding Services
require('firebase/analytics')
//require('firebase/firestore')

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlosx8hCTM4m-3noNMB9J_AKM5mLEbzdc",
  authDomain: "covid19ca-app.firebaseapp.com",
  databaseURL: "https://covid19ca-app.firebaseio.com",
  projectId: "covid19ca-app",
  storageBucket: "covid19ca-app.appspot.com",
  messagingSenderId: "364118099232",
  appId: "1:364118099232:web:47aebd96b0ec434bbd8345",
  measurementId: "G-FNS7V5ET3Y"
}
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 firebase.analytics();
 const analytics =  firebase.analytics();
 //const db = firebase.firestore()
 export { analytics }
