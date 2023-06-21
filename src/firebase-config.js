import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDsKCO9Xn0n61mAeQcMpjmCrE2M0cRW1MY",
  authDomain: "weather-app-d10c0.firebaseapp.com",
  projectId: "weather-app-d10c0",
  storageBucket: "weather-app-d10c0.appspot.com",
  messagingSenderId: "883222677667",
  appId: "1:883222677667:web:434e7b644748a6fd0c1716",
  databaseURL: 'https://weather-app-d10c0-default-rtdb.europe-west1.firebasedatabase.app'
};

const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export function writeUserData(val) {
  set(ref(database), {
    test: val,
  });
}