import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'
//import 'firebase/firestore'


let config = {
  apiKey: "xxxxxxxxxxx",
  authDomain: "knoprka-e6c2e.firebaseapp.com",
  databaseURL: "https://knoprka-e6c2e.firebaseio.com",
  projectId: "knoprka-e6c2e",
  // storageBucket: "knoprka-e6c2e.appspot.com",
  // messagingSenderId: "1065915890930",
  appId: "xxxxxxxxxx",
  measurementId: "xxxx"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const db = firebase.database()
//export const store = firebase.firestore()


