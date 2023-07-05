import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, set, onValue, orderByKey, startAt, endAt } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import * as data from "./main.js";
import * as calc from "./IndexCalculations.js"

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

const INDEX_0_DATE = new Date('2010,1,1');
const APPARENT_TEMP_MAX = '/daily/apparent_temperature_max/';
const APPARENT_TEMP_MEAN = '/daily/apparent_temperature_mean/';
const APPARENT_TEMP_MIN = '/daily/apparent_temperature_min/';
const TEMP_MAX = '/daily/temperature_2m_max/';
const TEMP_MEAN = '/daily/temperature_2m_mean/';
const TEMP_MIN = '/daily/temperature_2m_min/';
const TIME = '/daily/time/';


const ALL_DATA = {
  APPARENT_TEMP_MAX_DATA: [],
  APPARENT_TEMP_MEAN_DATA: [],
  APPARENT_TEMP_MIN_DATA: [],
  TEMP_MAX_DATA: [],
  TEMP_MEAN_DATA: [],
  TEMP_MIN_DATA: [],
  TIME_DATA: []
}

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export function getDataInRange(startId, endId, columns) {
  console.log(columns);

  ALL_DATA.APPARENT_TEMP_MAX_DATA.length = 0;
  ALL_DATA.APPARENT_TEMP_MEAN_DATA.length = 0;
  ALL_DATA.APPARENT_TEMP_MIN_DATA.length = 0;
  ALL_DATA.TEMP_MAX_DATA.length = 0;
  ALL_DATA.TEMP_MEAN_DATA.length = 0;
  ALL_DATA.TEMP_MIN_DATA.length = 0;
  ALL_DATA.TIME_DATA.length = 0;

  columns.forEach(column => {
    const dbRef = ref(database, column);
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.key >= startId && childSnapshot.key <= endId) {
          switch (column) {
            case '/daily/apparent_temperature_max/':
              ALL_DATA.APPARENT_TEMP_MAX_DATA.push(childSnapshot.val());
              break;
            case '/daily/apparent_temperature_mean/':
              ALL_DATA.APPARENT_TEMP_MEAN_DATA.push(childSnapshot.val());
              break;
            case '/daily/apparent_temperature_min/':
              ALL_DATA.APPARENT_TEMP_MIN_DATA.push(childSnapshot.val());
              break;
            case '/daily/temperature_2m_max/':
              ALL_DATA.TEMP_MAX_DATA.push(childSnapshot.val());
              break;
            case '/daily/temperature_2m_mean/':
              ALL_DATA.TEMP_MEAN_DATA.push(childSnapshot.val());
              break;
            case '/daily/temperature_2m_min/':
              ALL_DATA.TEMP_MIN_DATA.push(childSnapshot.val());
              break;
            case '/daily/time/':
              ALL_DATA.TIME_DATA.push(childSnapshot.val());
              break;
          }
        }
      });
    });
  });
  calc.assignDataForChart(ALL_DATA);

}
