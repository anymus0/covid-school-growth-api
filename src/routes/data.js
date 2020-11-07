const express = require('express')
const router = express.Router()
const allowRebuild = require('./../middlewares/allowRebuild')

// controllers
const addData = require('./../controllers/addData')

router.get('/createDBmodel', allowRebuild.Authorize, addData.createDBmodel)

module.exports = router
