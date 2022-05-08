import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "fir-tutorial-b0a62.firebaseapp.com",
  projectId: "fir-tutorial-b0a62",
  storageBucket: "fir-tutorial-b0a62.appspot.com",
  messagingSenderId: "1050566595018",
  appId: "1:1050566595018:web:2e64973866b12ccdd9ff33",
  measurementId: "G-DDQM2NSRRE",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
