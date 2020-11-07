const express = require('express')
const router = express.Router()
const allowRebuild = require('./../middlewares/allowRebuild')

// controllers
const addData = require('./../controllers/addData')

// GET: /data/createDBmodel
router.get('/createDBmodel', allowRebuild.Authorize, addData.createDBmodel)

// GET /data/addLatestStatus
router.get('/addLatestStatus', addData.addLatestStatus)

module.exports = router
