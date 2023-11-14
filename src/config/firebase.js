import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARRC_wZ9xd-e6Fd48eL5KowGJEUqAwgqU",
  authDomain: "kasirq-de606.firebaseapp.com",
  projectId: "kasirq-de606",
  storageBucket: "kasirq-de606.appspot.com",
  messagingSenderId: "474402461531",
  appId: "1:474402461531:web:403fd086b928ecb3032c7e",
  measurementId: "G-VFDW6199LH",
};
// Initialize Firebase
const init = firebase.initializeApp(firebaseConfig);
export const firebaseAuthentication = init.auth();
