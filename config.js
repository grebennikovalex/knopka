import Firebase from 'firebase'
let knp
let config = {
  apiKey: "AIzaSyBm_g9_yNdAsZ-UzsMIRujinyB2i1eLeHg",
  authDomain: "knoprka-e6c2e.firebaseapp.com",
  databaseURL: "https://knoprka-e6c2e.firebaseio.com",
  projectId: "knoprka-e6c2e",
  storageBucket: "knoprka-e6c2e.appspot.com",
  messagingSenderId: "1065915890930",
  appId: "1:1065915890930:web:2d3dcb8d68e45d73e4246b",
  measurementId: "G-8F7ZWZE6YX"
}

if (!Firebase.apps.length) {
  knp = Firebase.initializeApp(config)
}

export const db = knp.database()


