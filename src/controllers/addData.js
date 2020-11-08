const mongoose = require('mongoose')
const Fetchy = require('./../Fetchy')
const Dates = require('./../dates')
const DateStatus = require('./../models/dateStatusModel')

// get JSON data from COVID API and save it to MongoDB
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
        success: false,
        message: 'a status for this day already exists!'
      })
    } else {
      // fetch new status and add it to DB
      const status = await Fetchy.Get(`https://covid19-api.org/api/status/hu?date=${Dates.getToday()}`)
      const statusDate = new Date(status.last_update)
      if (statusDate.getDate() !== today.getDate()) {
        // skip if there's no status update yet in the COVID API
        res.status(200).json({
          success: false,
          message: 'there is no status update yet!'
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
          success: true,
          message: 'new status updates saved!'
        })
      }
    }

    // handle errors
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'server error'
    })
  }
}

// update the latest status in the DB with the latest status in the COVID API
exports.updateLatestStatus = async (req, res) => {
  try {
    // find the latest status update in MongoDB and in COVID API
    const latestDBstatus = await DateStatus.findOne({}, {}, { sort: { date: -1 } }).exec()
    const latestAPIstatus = await Fetchy.Get('https://covid19-api.org/api/status/hu')

    // compare dates between DB and API
    const latestDBstatusDate = new Date(latestDBstatus.date)
    const latestAPIstatusDate = new Date(latestAPIstatus.last_update)
    if (latestDBstatusDate < latestAPIstatusDate) {
      // update status in MongoDB
      const newStatusUpdate = {
        date: latestAPIstatusDate,
        cases: latestAPIstatus.cases,
        deaths: latestAPIstatus.deaths,
        recovered: latestAPIstatus.recovered
      }
      await latestDBstatus.updateOne(newStatusUpdate).exec()
      res.status(200).json({
        success: true,
        message: 'refreshed successfully!'
      })
    } else {
      res.status(200).json({
        success: false,
        message: 'we already have the latest status!'
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'could not refresh, server error!'
    })
  }
}
