const DateStatus = require('./../models/dateStatusModel')

exports.getAllStatuses = async (req, res) => {
  try {
    // get every status from DB
    const statuses = await DateStatus.find({}).exec()
    res.status(200).json({
      success: true,
      statuses: statuses
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'server error!'
    })
  }
}

exports.getDailyCases = async (req, res) => {
  try {
    const dailyCases = []
    // get every status from DB
    const statuses = await DateStatus.find({}).exec()

    // loop through every status
    statuses.forEach(async (status, i) => {
      // calculate number of new cases
      const newCases = statuses[i].cases - statuses[i - 1].cases
      const newDailyCase = {
        date: status.date,
        newCases: newCases
      }
      // add newDailyCase obj to array
      dailyCases.push(newDailyCase)
    })

    res.status(200).json({
      success: true,
      dailyCases: dailyCases
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'server error!'
    })
  }
}
