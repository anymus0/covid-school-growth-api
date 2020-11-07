const mongoose = require('mongoose')
const Fetchy = require('./../Fetchy')
const generateDates = require('./../dates')
const DateStatus = require('./../models/dateStatusModel')

exports.createDBmodel = async (req, res) => {
  try {
    // generate dates between the start of school and today
    const startDate = new Date('2020-09-01')
    const endDate = Date.now()
    const dates = generateDates(startDate, endDate)
    // const statuses = []

    // get raw data from COVID API for each date
    // await doesn't work in array.foreach, so use normal for
    for (const date of dates) {
      const status = await Fetchy.Get(`https://covid19-api.org/api/status/hu?date=${date}`)
      // save the status to MongoDB
      const newStatus = new DateStatus({
        _id: new mongoose.Types.ObjectId(),
        country: status.country,
        date: status.last_update,
        cases: status.cases,
        deaths: status.deaths,
        recovered: status.recovered
      })
      await newStatus.save()
      // statuses.push(status)
    }

    // send res
    await res.status(200).json({
      // statuses: statuses,
      success: true
    })

    // handle errors
  } catch (error) {
    console.error(error)
  }
}
