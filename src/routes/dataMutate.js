const express = require('express')
const router = express.Router()
const allowRebuild = require('../middlewares/allowRebuild')

// controllers
const addData = require('../controllers/addData')

// POST: /datamutate/createDBmodel
router.post('/createDBmodel', allowRebuild.Authorize, addData.createDBmodel)

// POST /datamutate/addLatestStatus
router.post('/addLatestStatus', addData.addLatestStatus)

// PUT /datamutate/updateLatestStatus
router.put('/updateLatestStatus', addData.updateLatestStatus)

module.exports = router
