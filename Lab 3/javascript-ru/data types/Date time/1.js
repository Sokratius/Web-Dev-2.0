function getWeekDay(date) {
    let days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    return days[date.getDay()];
}
  
let date = new Date(2014, 0, 3); // 3 января 2014 года
alert( getWeekDay(date) ); // ПТ