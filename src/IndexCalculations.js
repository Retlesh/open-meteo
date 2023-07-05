export function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

export function countDaysBetweenDates(date1, date2) {
    //     date1 = date1.replace('-', ',');
    //     date2 = date2.replace('-', ',');
    // console.log(date1, date2);
    // Convert the dates to UTC to avoid timezone differences
    const utcDate1 = new Date(date1.toUTCString());
    const utcDate2 = new Date(date2.toUTCString());

    // Calculate the difference in milliseconds
    const timeDifference = utcDate2.getTime() - utcDate1.getTime();

    // Convert milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
}

export function assignDataForChart(data) {
    console.log(data);

}