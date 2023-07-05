import * as firebase from "./firebase.js";
import * as calc from "./IndexCalculations.js"

const INDEX_0_DATE = new Date('2010,1,1');
const APPARENT_TEMP_MAX = '/daily/apparent_temperature_max/';
const APPARENT_TEMP_MEAN = '/daily/apparent_temperature_mean/';
const APPARENT_TEMP_MIN = '/daily/apparent_temperature_min/';
const TEMP_MAX = '/daily/temperature_2m_max/';
const TEMP_MEAN = '/daily/temperature_2m_mean/';
const TEMP_MIN = '/daily/temperature_2m_min/';
const TIME = '/daily/time/';

var WEATHER_VARIABLES = [TIME];

var chart;

$("#create_new_chart").click((e) => {
  chart = new CustomChart();
  chart.createChart();
});


$("#calculate-dates").click(() => {
  let startId = calc.countDaysBetweenDates(INDEX_0_DATE, new Date($("#start_date").val()));
  let endId = calc.countDaysBetweenDates(new Date($("#start_date").val()), new Date($("#end_date").val())) + startId

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
  // console.log(WEATHER_VARIABLES);

  firebase.getDataInRange(startId, endId, WEATHER_VARIABLES)
  WEATHER_VARIABLES = [TIME];

});


// firebase.getDataInRange(10,20, APPARENT_TEMP_MEAN);

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export class CustomChart {
  constructor() {
    this.id = "";
    this.ctx;
    this.type = "bar";

    this.chart;
    this.config;
    this.data;
    this.actions;

    this.generateID();
  }

  generateID() {
    let temp = new Date().toISOString();
    for (let i = 0; i < temp.length; i++) {
      if (NUMBERS.includes(parseInt(temp[i]))) {
        this.id += String(temp[i]);
      }
    }
  }

  createChartContainer() {
    $("#charts").append(`<div><canvas id='${this.id}'></canvas></div>`);
    this.ctx = $(`#${this.id}`);
  }

  createConfig() {
    return {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Chart.js Line Chart",
          },
        },
      },
    };
  }

  createChart() {
    this.createChartContainer();

    this.chart = new Chart(this.ctx, {
      type: this.type,
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Weather Chart",
        },
      },
    });
  }
}

//types of charts
//area
//line
