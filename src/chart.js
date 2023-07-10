//Numbers for generating chart id
const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export class CustomChart {
    constructor() {
        this.id = "";
        this.ctx;
        this.type = "line";

        this.generateID();
    }

    //Generates id for a chart
    generateID() {
        let temp = new Date().toISOString();
        for (let i = 0; i < temp.length; i++) {
            if (NUMBERS.includes(parseInt(temp[i]))) {
                this.id += String(temp[i]);
            }
        }
    }
    //Creates chart coinainer in DOM
    createChartContainer() {
        $("#charts").append(`<div><canvas id='${this.id}'></canvas></div>`);
        this.ctx = $(`#${this.id}`);
    }

    //Creates a chart
    createChart(labels, datasets) {
        this.createChartContainer();

        this.chart = new Chart(this.ctx, {
            type: this.type,
            data:
            {
                labels: labels,
                datasets: datasets,
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