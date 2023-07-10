import { CustomChart } from "./chart.js";


export function countDaysBetweenDates(date1, date2) {
    // Convert the dates to UTC to avoid timezone differences
    const utcDate1 = new Date(date1.toUTCString());
    const utcDate2 = new Date(date2.toUTCString());

    // Calculate the difference in milliseconds
    const timeDifference = utcDate2.getTime() - utcDate1.getTime();

    // Convert milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
}

//Set up data for displating
export function assignDataForChart(data) {
    const labels = data.TIME_DATA;
    let label = '';
    const datasets = [];

    if (data.APPARENT_TEMP_MAX_DATA) {
        label = 'Apparent maximum temperature';
        datasets.push({
            label: label,
            data: data.APPARENT_TEMP_MAX_DATA,
            borderWidth: 1
        })
    }
    if (data.APPARENT_TEMP_MEAN_DATA) {
        label = 'Apparent mean temperature';
        datasets.push({
            label: label,
            data: data.APPARENT_TEMP_MEAN_DATA,
            borderWidth: 1
        })
    }
    if (data.APPARENT_TEMP_MIN_DATA) {
        label = 'Apparent minimum temperature';
        datasets.push({
            label: label,
            data: data.APPARENT_TEMP_MIN_DATA,
            borderWidth: 1
        })
    }
    if (data.TEMP_MAX_DATA) {
        label = 'Maximum Temperature';
        datasets.push({
            label: label,
            data: data.TEMP_MAX_DATA,
            borderWidth: 1
        })
    }
    if (data.TEMP_MEAN_DATA) {
        label = 'Mean temperature';
        datasets.push({
            label: label,
            data: data.TEMP_MEAN_DATA,
            borderWidth: 1
        })
    }
    if (data.TEMP_MIN_DATA) {
        label = 'Minimum temperature';
        datasets.push({
            label: label,
            data: data.TEMP_MIN_DATA,
            borderWidth: 1
        })
    }

    //Creates new chart
    let chart = new CustomChart();
    setTimeout(() => {
        chart.createChart(labels, datasets);
    }, 300);
}