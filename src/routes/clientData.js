const express = require('express')
const router = express.Router()

// controllers
const getData = require('../controllers/getData')

// GET: /clientdata/getAllStatuses
router.get('/getAllStatuses', getData.getAllStatuses)

// GET: /clientdata/getDailyCases
router.get('/getDailyCases', getData.getDailyCases)

module.exports = router
