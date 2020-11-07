const dateformat = require('dateformat')

// generates formatted dates between two given Date objets
const generateDates = (start, end) => {
  const dates = []
  const currentDT = new Date(start)
  while (currentDT <= end) {
    // save formatted dates
    dates.push(dateformat(currentDT, 'yyyy-mm-dd'))
    currentDT.setDate(currentDT.getDate() + 1)
  }
  return dates
}

const getToday = () => {
  const today = new Date()
  return dateformat(today, 'yyyy-mm-dd')
}

exports.generateDates = generateDates
exports.getToday = getToday
