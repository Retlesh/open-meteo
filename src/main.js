import { writeUserData } from "./firebase-config";

const API =
  "https://api.open-meteo.com/v1/forecast?latitude=50.26&longitude=19.03&hourly=temperature_2m";

const API_ARCHIVE =
  "https://archive-api.open-meteo.com/v1/archive?latitude=50.26&longitude=19.03&start_date=2023-05-22&end_date=2023-06-05";
  
const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

class CustomChart {
  constructor() {
    this.id = "";
    this.ctx;
    this.type = "line";

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
      type: "line",
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

writeUserData();
//types of charts
//area
//line
