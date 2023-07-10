import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, set, onValue, orderByKey, startAt, endAt } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import * as data from "./main.js";
import * as calc from "./IndexCalculations.js"

//Setup configuration for connecting to the database
const firebaseConfig = {
  apiKey: "AIzaSyDsKCO9Xn0n61mAeQcMpjmCrE2M0cRW1MY",
  authDomain: "weather-app-d10c0.firebaseapp.com",
  projectId: "weather-app-d10c0",
  storageBucket: "weather-app-d10c0.appspot.com",
  messagingSenderId: "883222677667",
  appId: "1:883222677667:web:434e7b644748a6fd0c1716",
  databaseURL: 'https://weather-app-d10c0-default-rtdb.europe-west1.firebasedatabase.app'
};

//Create db app instance
const app = initializeApp(firebaseConfig);

//Create dictionary for smoother data assignment
const columnsDictionary =
{
  '/daily/apparent_temperature_max/': 'APPARENT_TEMP_MAX_DATA',
  '/daily/apparent_temperature_mean/': 'APPARENT_TEMP_MEAN_DATA',
  '/daily/apparent_temperature_min/': 'APPARENT_TEMP_MIN_DATA',
  '/daily/temperature_2m_max/': 'TEMP_MAX_DATA',
  '/daily/temperature_2m_mean/': 'TEMP_MEAN_DATA',
  '/daily/temperature_2m_min/': 'TEMP_MIN_DATA',
  '/daily/time/': 'TIME_DATA'
}

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);


//Fetch and return requested data
function fetchData(startId, endId, columns) {

    const ALL_DATA = {
      APPARENT_TEMP_MAX_DATA: [],
      APPARENT_TEMP_MEAN_DATA: [],
      APPARENT_TEMP_MIN_DATA: [],
      TEMP_MAX_DATA: [],
      TEMP_MEAN_DATA: [],
      TEMP_MIN_DATA: [],
      TIME_DATA: []
    }

    columns.forEach(column => {
      let dbRef = ref(database, column);
      onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.key >= startId && childSnapshot.key <= endId) {
            ALL_DATA[columnsDictionary[column]].push(childSnapshot.val());
          }
        });
      });
    });
    return ALL_DATA;

}

//Calls fetchData function and passes it for assigning to chart object
export function getDataInRange(startId, endId, columns) {
  calc.assignDataForChart(fetchData(startId, endId, columns));
}
