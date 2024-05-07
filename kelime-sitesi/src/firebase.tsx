import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { isBrowser} from "@/util/isBrowser";

const firebaseConfig = {
  apiKey: "AIzaSyAkAHfV2qvh9JT50Y6XzMUpDwY4zAD-QlU",
  authDomain: "kelimeuygulamasi-5fd3e.firebaseapp.com",
  projectId: "kelimeuygulamasi-5fd3e",
  storageBucket: "kelimeuygulamasi-5fd3e.appspot.com",
  messagingSenderId: "337110729804",
  appId: "1:337110729804:web:5892ff7a28688c221de0e9",
  measurementId: "G-LDYRM3WBX3"
};

const app = initializeApp(firebaseConfig);
const authInstance = getAuth(app);
let auth: Auth = authInstance;

let analytics: any = null;
if (isBrowser()) {
  analytics = getAnalytics(app);
}


export { analytics, auth };