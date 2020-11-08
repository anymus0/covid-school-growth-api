const express = require('express')
const router = express.Router()
const allowRebuild = require('../middlewares/allowRebuild')

// controllers
const addData = require('../controllers/addData')

// POST: /data/createDBmodel
router.post('/createDBmodel', allowRebuild.Authorize, addData.createDBmodel)

// POST /data/addLatestStatus
router.post('/addLatestStatus', addData.addLatestStatus)

// PUT /data/updateLatestStatus
router.put('/updateLatestStatus', addData.updateLatestStatus)

module.exports = router
