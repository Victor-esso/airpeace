const getDayName = (dayIndex) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[dayIndex];
  }
  
const getMonthName = (monthIndex) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
  }
const getMonthNameShort = (monthIndex) => {
    const months = [
      'Jan', 'Feb', 'Ma', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[monthIndex];
  }

  const getFormattedDate = (date) => {
    if(!isValidDate(date)){return false;}
    let newDate = new Date(date);
    return `${String(newDate.getMonth() + 1).padStart(2, '0')}/${String(newDate.getDate()).padStart(2, '0')}/${newDate.getFullYear()}`;
  }


  const getMonthData = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const monthData = [];

    // Fill in the days before the month starts
    const startDayIndex = firstDay.getDay();
    const startDate = new Date(year, month, 1 - startDayIndex);
    for (let i = 0; i < startDayIndex; i++) {
        const date = new Date(year, month, 1 - startDayIndex + i);
        const dayIndex = date.getDay();
        const dayNumber = date.getDate();
        const formattedDate = `${String(month).padStart(2, '0')}/${String(dayNumber).padStart(2, '0')}/${year}`;

        monthData.push({
            formattedDate,
            day: getDayName(dayIndex),
            dayNumber,
            month: getMonthName(month-1),
            monthIndex: month-1,
        });
    }

    // Fill in the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const dayIndex = date.getDay();
        const dayNumber = i;
        const formattedDate = `${String(month + 1).padStart(2, '0')}/${String(dayNumber).padStart(2, '0')}/${year}`;

        monthData.push({
            formattedDate,
            day: getDayName(dayIndex),
            dayNumber,
            month: getMonthName(month),
            monthIndex: month,
        });
    }

    // Check if the last day of the month is a Saturday
    const lastDayIndex = lastDay.getDay();
    if (lastDayIndex !== 6) {
        let nextDate = new Date(year, month, daysInMonth + 1);
        while (nextDate.getDay() !== 0) {
            const dayIndex = nextDate.getDay();
            const dayNumber = nextDate.getDate();
            const formattedDate = `${String(month + 2).padStart(2, '0')}/${String(dayNumber).padStart(2, '0')}/${year}`;

            monthData.push({
                formattedDate,
                day: getDayName(dayIndex),
                dayNumber,
                month: getMonthName(month + 1),
                monthIndex: month + 1,
            });
            nextDate.setDate(nextDate.getDate() + 1);
        }
    }

    return monthData;
}

const isDateBetween = (dateToCheck, startDate, endDate) => {
  const date = new Date(dateToCheck);
  const start = new Date(startDate);
  const end = new Date(endDate);
  return date >= start && date <= end;
};

const isDateBefore = (dateToCheck, date) => {
  const checkDate = new Date(dateToCheck);
  const targetDate = new Date(date);
  return checkDate < targetDate;
};

const getTodayDate = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
  const day = String(today.getDate()).padStart(2, '0');
  const year = today.getFullYear();
  return `${month}/${day}/${year}`;
};

const isValidDate = (date) => {
  return !(new Date(date) == 'Invalid Date')
}

const convertDateFormat = (dateString) => {
  const dateParts = dateString.split('/');
  const day = parseInt(dateParts[1], 10);
  const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month = monthNames[parseInt(dateParts[0], 10) - 1];
  const year = dateParts[2];
  return `${day} ${month} ${year}`;
};


export {getDayName , getMonthData , getMonthName , isValidDate , getMonthNameShort , getFormattedDate , isDateBetween , isDateBefore , getTodayDate , convertDateFormat}