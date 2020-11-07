const mongoose = require('mongoose')
const Fetchy = require('./../Fetchy')
const Dates = require('./../dates')
const DateStatus = require('./../models/dateStatusModel')

// get JSON data from COVID API and saves it to MongoDB
exports.createDBmodel = async (req, res) => {
  try {
    // generate dates between the start of school and today
    const startDate = new Date('2020-09-01')
    const endDate = new Date()
    const dates = Dates.generateDates(startDate, endDate)

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
    }

    // send res
    res.status(200).json({
      success: true,
      message: 'COVID datas have been added to DB'
    })

    // handle errors
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'server error',
      success: false
    })
  }
}

// add the latest status from COVID API
exports.addLatestStatus = async (req, res) => {
  try {
    const today = new Date(Dates.getToday())
    const nextDay = new Date().setDate(today.getDate() + 1)
    const todayStatus = await DateStatus.findOne({
      // query today as a range to avoid dealing with times
      date: { $gte: today, $lt: nextDay }
    }).exec()
    if (todayStatus !== null) {
      // skip if object already exists in DB
      res.status(200).json({
        message: 'a status for this day already exists!',
        success: false
      })
    } else {
      // fetch new status and add it to DB
      const status = await Fetchy.Get(`https://covid19-api.org/api/status/hu?date=${Dates.getToday()}`)
      const statusDate = new Date(status.last_update)
      if (statusDate.getDate() !== today.getDate()) {
        // skip if there's no status update yet in the COVID API
        res.status(200).json({
          message: 'there is no status update yet!',
          success: false
        })
      } else {
        // save new status to MongoDB
        const newStatus = new DateStatus({
          _id: new mongoose.Types.ObjectId(),
          country: status.country,
          date: status.last_update,
          cases: status.cases,
          deaths: status.deaths,
          recovered: status.recovered
        })
        await newStatus.save()

        res.status(200).json({
          message: 'new status updates saved!',
          success: true
        })
      }
    }

    // handle errors
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'server error',
      success: false
    })
  }
}
