import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
    databaseURL: "https://whatsapp-7d03b-default-rtdb.firebaseio.com",
    apiKey: "AIzaSyCOXdjC8-LTPyUHvF4aaoEjnEx_t0R0py0",
    authDomain: "whatsapp-7d03b.firebaseapp.com",
    projectId: "whatsapp-7d03b",
    storageBucket: "whatsapp-7d03b.appspot.com",
    messagingSenderId: "707304250307",
    appId: "1:707304250307:web:6e98781bd4e961acc73b76",
    measurementId: "G-1C7KK3LXRF"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;