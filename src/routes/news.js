const express = require('express')
const router = express.Router()
const newController = require('../app/controllers/NewsController.js')

router.use('/:slug' , newController.show)

// Tuyến đường gốc luôn cuối cùng
router.use('/' , newController.index)



module.exports = router;