const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const modes = {
  edit: 'EDIT',
  new: 'NEW'
}

//In Date, month is 0 based
export function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate(); //not month - 1, because we need to get -1th date of next month
}

export function getDay(day, month, year) {
  return new Date(year, month - 1, day).getDay()
}

export function getMonthName(month) {
  return monthNames[month - 1]
}

export function getPreviousMonth({ month, year }) {
  return ({
    month: month === 1 ? 12 : month - 1,
    year: month === 1 ? year - 1 : year
  })
}

export function getNextMonth({ month, year }) {
  return ({
    month: month === 12 ? 1 : month + 1,
    year: month === 12 ? year + 1 : year
  })
}

export const colors = ['#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5', '#ff8b94']

// export const getMonthArray = (month, year) => {
//   const size = new Date(year, month, 0).getDate();
//   const arr = []
//   for (let i = 0; i < size; i++) {
//     arr.push(i + 1)
//   }
//   return arr
// }