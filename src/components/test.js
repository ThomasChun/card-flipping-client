'use strict';

let sport = 'Baseball';
let currentYear = 2019;
let years = [];
if (sport === 'Basketball' || sport === 'Hockey') {
  while (currentYear - 1900 > 0) {
    let year = ((currentYear + 1) % 100).toString().length === 2 ? `${currentYear}/${(currentYear + 1) % 100}` : `${currentYear}/0${(currentYear + 1) % 100}` ;
    years.push(year);
    currentYear--;
  }
  console.log(years);
} else if (sport === 'Baseball' || sport === 'Football') {
  while (currentYear - 1900 > 0) {
    years.push(currentYear);
    currentYear--;
  }
  console.log(years);
} else {
  console.log('Please enter valid sport!');
}

