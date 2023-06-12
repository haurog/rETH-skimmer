const rocketPoolStartDate = new Date("2021-11-09T00:00:00Z")
const rocketPoolStartDateForCalendar = new Date("2021-11-08T00:00:00Z")  // started on Nov 9th at midnight, but need to set 1 day earlier to be able to select the start date in the calendar
const today = new Date();
const startOfTheMonth = new Date(today.getFullYear(), today.getMonth(), 1);
var tempLastMonth = new Date;  // Will be set to a date in the last month
tempLastMonth.setDate(startOfTheMonth.getDate() - 10);  // temporary date to be sure to be in the last month
const startOfLastMonth = new Date(tempLastMonth.getFullYear(), tempLastMonth.getMonth(), 1);

export const importantDates = {
    rocketPoolStartDate : rocketPoolStartDate,
    rocketPoolStartDateForCalendar : rocketPoolStartDateForCalendar,
    today : today,
    startOfTheMonth : startOfTheMonth,
    startOfLastMonth : startOfLastMonth,
};