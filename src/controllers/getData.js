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
