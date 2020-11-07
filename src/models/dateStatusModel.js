const mongoose = require('mongoose')

const dateStatusesSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  country: { type: String, required: true },
  date: { type: Date, required: true },
  cases: { type: Number, required: true },
  deaths: { type: Number, required: true },
  recovered: { type: Number, required: true }
})

module.exports = mongoose.model('dateStatuses', dateStatusesSchema)
