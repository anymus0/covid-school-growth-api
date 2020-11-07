const express = require('express')
const router = express.Router()

// controllers
const addData = require('./../controllers/addData')

router.get('/createDBmodel', addData.createDBmodel)

module.exports = router
