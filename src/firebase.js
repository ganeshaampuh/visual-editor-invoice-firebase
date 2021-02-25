
import firebase from 'firebase';
// import '@firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyDlC24Qtxl2zc_T7puHAAHP5deTJiJ9xs8",
    authDomain: "visual-editor-invoice.firebaseapp.com",
    projectId: "visual-editor-invoice",
    storageBucket: "visual-editor-invoice.appspot.com",
    messagingSenderId: "32514306476",
    appId: "1:32514306476:web:d1f75a655860f982340a09",
    databaseUrl: '/users/8niNNmY7UBnsscwGcWSj'
}

firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()

// collection references
const usersCollection = db.collection('users')

// export utils/refs
export {
    db,
    usersCollection
}