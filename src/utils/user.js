//Based on firebase.js
// contains methods that will
// - "conduct real-time events such as user authentication, sign out from the app, and store the user details"

export function getVacationDays(id) {
  const dateList = [];

  data.forEach((element) => {
    if (element.employee === id) {
      dateList.push(element.vacationDate);
    }
  });

  return dateList;
}

export function getVacationDates(dateList, absenceType) {
  const type = absenceType.toUpperCase();  

    const filteredDates = dateList
      .filter((date) => date.vacationType === type)
      .map((date) => {
        return date.vacationDate;
      });

  if (filteredDates.length > 0) {
    const firstDate = new Date(filteredDates[0]);
    const lastDate = new Date(filteredDates[filteredDates.length - 1]);

    const dates = `${firstDate.getDate()}/${
      firstDate.getMonth() + 1
    } - ${lastDate.getDate()}/${lastDate.getMonth() + 1}`;

    return dates;
  }

  return;
}

export function getVacationWeeks(dateList, absenceType) {
  const type = absenceType.toUpperCase();

  const filteredDates = dateList
    .filter((date) => date.vacationType === type)
    .map((date) => {
      return date.vacationDate;
    });

  const weekNumbers = [];
  for (const date of filteredDates) {
    const utcDate = new Date(date);
    weekNumbers.push(getWeekNumber(utcDate));
  }

  const weeksOff = new Set(weekNumbers);

  return weeksOff;
}

function getWeekNumber(date) {
  // Copy date so don't modify original
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );

  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));

  // Get first day of year
  var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));

  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);

  return weekNo;
}
