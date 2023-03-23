import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCllqNB02dRI5GX5VB_bqAI27eLOwzIEXo",
  authDomain: "artista-bc519.firebaseapp.com",
  projectId: "artista-bc519",
  storageBucket: "artista-bc519.appspot.com",
  messagingSenderId: "516067119628",
  appId: "1:516067119628:web:8d49ef8ae35ec383e6d429"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth }