
var config = {
  apiKey: "AIzaSyCbRrDPUdY9_S5uZnd3uRFemuIbb3VD9qU",
  authDomain: "estore-d82ba.firebaseapp.com",
  databaseURL: "https://estore-d82ba-default-rtdb.firebaseio.com",
  projectId: "estore-d82ba",
  storageBucket: "estore-d82ba.appspot.com",
  messagingSenderId: "208387565886",
  appId: "1:208387565886:web:a7e7172b651eb7b6fa646f"
};
  // Initialize Firebase
firebase.initializeApp(config);
var auth = firebase.auth();
var db = firebase.database();

//using local Emulator Suite
if(location.hostname === 'localhost') {
  auth.useEmulator("http://localhost:9099");
  db.useEmulator("localhost",9000);
}
 
  