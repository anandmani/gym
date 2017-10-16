const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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

export const colors = ['#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5', '#ff8b94']

// export const getMonthArray = (month, year) => {
//   const size = new Date(year, month, 0).getDate();
//   const arr = []
//   for (let i = 0; i < size; i++) {
//     arr.push(i + 1)
//   }
//   return arr
// }