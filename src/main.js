import * as firebase from "./firebase.js";
import * as calc from "./IndexCalculations.js"


//Assigning indexes in database to constant values
const INDEX_0_DATE = new Date('2010,1,1');
const APPARENT_TEMP_MAX = '/daily/apparent_temperature_max/';
const APPARENT_TEMP_MEAN = '/daily/apparent_temperature_mean/';
const APPARENT_TEMP_MIN = '/daily/apparent_temperature_min/';
const TEMP_MAX = '/daily/temperature_2m_max/';
const TEMP_MEAN = '/daily/temperature_2m_mean/';
const TEMP_MIN = '/daily/temperature_2m_min/';
const TIME = '/daily/time/';

//List of requested weather data
var WEATHER_VARIABLES = [TIME];


//Event listener for button click
$("#calculate-dates").click(() => {
  //I was too lazy to group all the weather data so I calculate indexes in database from given dates
  let startId = calc.countDaysBetweenDates(INDEX_0_DATE, new Date($("#start_date").val()));
  let endId = calc.countDaysBetweenDates(new Date($("#start_date").val()), new Date($("#end_date").val())) + startId

  //Checks what weather data to fetch and adds it to a list
  let checkboxes = document.querySelectorAll('input:checked');
  checkboxes.forEach(checkbox => {
    switch (checkbox.id) {
      case 'apparent_temp_max':
        WEATHER_VARIABLES.push(APPARENT_TEMP_MAX);
        break;
      case 'apparent_temp_mean':
        WEATHER_VARIABLES.push(APPARENT_TEMP_MEAN);
        break;
      case 'apparent_temp_min':
        WEATHER_VARIABLES.push(APPARENT_TEMP_MIN);
        break;
      case 'temp_max':
        WEATHER_VARIABLES.push(TEMP_MAX);
        break;
      case 'temp_mean':
        WEATHER_VARIABLES.push(TEMP_MEAN);
        break;
      case 'temp_min':
        WEATHER_VARIABLES.push(TEMP_MIN);
        break;
      default:
        break;

    }
  });

  //Fetch data and reset variables
  firebase.getDataInRange(startId, endId, WEATHER_VARIABLES);
  WEATHER_VARIABLES = [TIME];

});