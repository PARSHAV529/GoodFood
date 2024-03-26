import { initializeApp } from "firebase/app";
//  import { getAnalytics  } from "firebase/analytics";
import { getAuth ,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOEXngYqafwJQ_cRSdW5MLcK5S6WjyC74",
  authDomain: "food-order-7d569.firebaseapp.com",
  projectId: "food-order-7d569",
  storageBucket: "food-order-7d569.appspot.com",
  messagingSenderId: "565225622864",
  appId: "1:565225622864:web:d2a4c7624cd2f7a8877055",
  measurementId: "G-XBHQS6WVHS"

};

const app = initializeApp(firebaseConfig);
//  const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()


export { auth, app ,provider,firebaseConfig};

